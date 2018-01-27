import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { DatabaseProvider } from '../../providers/database/database';
import { ToastController } from 'ionic-angular';
import { ScorePage } from '../score/score';


@Component({
  selector: 'page-topscore',
  templateUrl: 'topscore.html',
})
export class TopscorePage {

  default: String = "nation";
  topNation: any[];
  topScience: any[];
  totalNation: 0;
  totalScience: 0;

  constructor(public navCtrl: NavController, public navParams: NavParams, public db: DatabaseProvider, public toastCtrl: ToastController) {
      this.topNation = [];
      this.topScience = [];
      this.db.getTopScore().then((span)=> {
        span.forEach((val)=> {
          let totalTried = 0;
          for(let i in val.data().score.choosen){
            if(val.data().score.choosen[i].hasOwnProperty('tried')){
              totalTried+=val.data().score.choosen[i].tried;
            }
          }
          if(val.data().type == 1){

            this.topNation.push({
              points: val.data().score.points, 
              choosen: val.data().score.choosen,
              type: val.data().type, 
              total: val.data().total,
              tried: totalTried});

          } else if(val.data().type == 2) {


            this.topScience.push({
              points: val.data().score.points, 
              choosen: val.data().score.choosen, 
              type: val.data().type,
              total: val.data().total,
              tried: totalTried});

          }
        });
      }).catch((err)=> {
        this.sendIt("Cannot get data from the database, Please check your internet connection");
      });
      console.log(this.topNation);
  }

  explain(i, type){
    if(type == 1){
      this.navCtrl.push(ScorePage, {score: this.topNation[i], type: type, save: false});
    } else if(type == 2) {
      this.navCtrl.push(ScorePage, {score: this.topScience[i], type: type, save: false});
    }
  }

  sendIt(msg){
    let toast = this.toastCtrl.create({
      message: msg,
      duration: 3000
    });
    toast.present();
  }

}
