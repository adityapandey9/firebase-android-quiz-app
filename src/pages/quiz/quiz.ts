import { Component } from '@angular/core';
import {  NavController, NavParams } from 'ionic-angular';

import { DatabaseProvider } from '../../providers/database/database';
import { QuestionModel } from '../../models/QuestionModel';
import { ScorePage } from '../score/score';
import { ScoreModel } from '../../models/ScoreModel';
import { NationalQuestion, ScienceQuestion } from '../../database/Question';

@Component({
  selector: 'page-quiz',
  templateUrl: 'quiz.html',
})
export class QuizPage {
  QuestionCycle: QuestionModel[];
  currentQuestion: QuestionModel;
  score: ScoreModel;
  iswrong: boolean;
  myHash = {}; 
  position = 0;
  size = 0;
  tried = 0;
  space: boolean;

  constructor(public navCtrl: NavController, public navParams: NavParams, public db: DatabaseProvider) {
    let type = this.navParams.get('quiz');
    this.initializeConfig();
    this.initialize();
    if(type == 1){
      this.space = false;
      this.QuestionCycle = NationalQuestion;
    } else if(type == 2){
      this.space = true;
      this.QuestionCycle = ScienceQuestion;
    }
    console.log(this.QuestionCycle);
    this.currentQuestion = this.QuestionCycle[this.position];
  }

  clicked(item){
    if(item in this.myHash){
      delete this.myHash[item];
      this.size--;
      return;
    }
    this.size++;
    this.myHash[item] = true;
  }

  submitit(){
   if(this.validate()){
     this.next();
     this.iswrong = false;
   } else {
    this.score.points-=3;
    this.score.choosen[this.position]['tried'] = ++this.tried;
    this.iswrong = true;
   }
   return;
  }

  validate(){
    if(typeof this.currentQuestion.correct == "string"){
      if(this.size != 1){
        return false;
      }
    this.score.choosen[this.position]['data'] = this.myHash;
    return true;
   }
   
   if(this.size != this.currentQuestion.correct.length){
      return false;
   }
    this.score.choosen[this.position]['data'] = this.myHash;
    return true;
  }

  next(){
    if(this.position+1 < this.QuestionCycle.length){
      this.currentQuestion = this.QuestionCycle[++this.position];
      this.initialize();
    } else {
      delete this.myHash;
      this.navCtrl.setRoot(ScorePage, {score: this.score, type: this.navParams.get('quiz'), save: true});
    }
    return;
  }

  initialize(){
    this.iswrong = false;
    this.size = 0;
    this.tried = 0;
    this.myHash = {};
    this.score.choosen[this.position] = {};
    return;
  }

  initializeConfig(){
    this.space = false;
    this.score = {points: 0, choosen: {}};
    return;
  }

}
