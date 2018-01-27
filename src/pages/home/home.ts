import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { QuizPage } from '../quiz/quiz';
import { TopscorePage } from '../topscore/topscore';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  constructor(public navCtrl: NavController) {

  }

  //For sending user to the quiz 1 that is National Quiz
  quizNational(){
    this.navCtrl.push(QuizPage, {quiz: 1});
  }

  //Sending user to the quiz 2 that is Science Quiz 
  quizScience(){
    this.navCtrl.push(QuizPage, {quiz: 2});
  }

  topScore(){
    this.navCtrl.push(TopscorePage);
  }
}
