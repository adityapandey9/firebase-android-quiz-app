import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { ScoreModel } from '../../models/ScoreModel';
import { QuestionModel } from '../../models/QuestionModel';
import { NationalQuestion, ScienceQuestion } from '../../database/Question';
import { HomePage } from '../home/home';
import { QuizPage } from '../quiz/quiz';
import { UserResponse } from '../../models/UserResponse';
import { DatabaseProvider } from '../../providers/database/database';
import { ToastController } from 'ionic-angular';

@Component({
  selector: 'page-score',
  templateUrl: 'score.html',
})
export class ScorePage {
  score: ScoreModel;
  question: QuestionModel[];
  scoreMsg: String;
  total: any;
  userResponse: UserResponse[];
  type: Number;

  constructor(public navCtrl: NavController, public navParams: NavParams, private db: DatabaseProvider, public toastCtrl: ToastController) {
    this.score = this.navParams.get("score");
    this.type = this.navParams.get("type");
    let save = this.navParams.get("save");
    this.userResponse = []; //Used to store the userResponse that is his answers.

    if(this.type == 1){
      this.question = NationalQuestion;
    } else if(this.type == 2){
      this.question = ScienceQuestion;
    }
    //Getting the correct and wrong answers and calculating the total points
    this.checkAnswer(save);
    this.total = this.question.length*10;
    if(this.score.points > (this.total*0.9)){
      this.scoreMsg = "A Great Score, Well Done!!";
    } else if(this.score.points > (this.total*0.5)){
      this.scoreMsg = "A Good Score, you have done!!";
    } else {
      this.scoreMsg = "Aww, you can try it again!!";
    }
    //Save the user score in the firebase database
    if(save){
        this.db.saveQuizScore({score: this.score, type: this.type, total: this.question.length*10}).catch((err)=> {
          this.sendIt("Error whilte uploading your score, kindly Check your Internet connection");
        });
    }
  }

  checkAnswer(save){
    for(let i = 0;i<this.question.length;i++){
      this.userResponse.push({response: Object.keys(this.score.choosen[i].data)});
      //Checking if it is type of string or not
      if(!save){
        continue;
      }
      if(typeof this.question[i].correct == "string"){
        if (this.question[i].correct in this.score.choosen[i].data) {
          this.score.points+=10;
        } else {
          this.score.points-=3;
        }
        continue;
      }
      for(let j in this.question[i].correct){
          let answer = this.question[i].correct[j];
          if(answer in this.score.choosen[i].data){
            this.score.points+=10;
          } else {
            this.score.points-=3;
          }
      }
    }
  }

  sendIt(msg){
    let toast = this.toastCtrl.create({
      message: msg,
      duration: 3000
    });
    toast.present();
  }

  isString(str){
    return (typeof str === "string");
  }

  startHome(){
    this.navCtrl.setRoot(HomePage);
  }

  startGame(){
    this.navCtrl.setRoot(QuizPage, {quiz: this.type});
  }

}
