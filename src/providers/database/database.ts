import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from 'angularfire2/firestore';
import { QuestionModel } from '../../models/QuestionModel';
/*
  Generated class for the DatabaseProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class DatabaseProvider {

  constructor(public firestore: AngularFirestore) {}

  //Used to save the Score of the user with the type of quiz
  saveQuizScore(obj: any) {
    return this.firestore.collection('quiz_score').add(obj);
  }

  //Used to get TopScore of users decending order
  getTopScore() {
    return this.firestore.collection('quiz_score').ref.orderBy("score.points", "desc").get();
  }

  /*
  * I have created it for future use, if need to fetch new questions from firebase database. We can use them
  */

  getNationalQuiz(): AngularFirestoreCollection<QuestionModel> {
    return this.firestore.collection('quiz_national');
  }

  getScienceQuiz(): AngularFirestoreCollection<QuestionModel> {
    return this.firestore.collection('quiz_science');
  }

}
