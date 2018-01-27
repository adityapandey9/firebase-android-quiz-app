import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { HttpClientModule } from '@angular/common/http';
import { HttpModule } from '@angular/http';

import { AngularFireModule } from 'angularfire2';
import { AngularFirestoreModule } from 'angularfire2/firestore';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { DatabaseProvider } from '../providers/database/database';
import { QuizPage } from '../pages/quiz/quiz';
import { ScorePage } from '../pages/score/score';
import { TopscorePage } from '../pages/topscore/topscore';

export const firebaseConfig = {
  apiKey: "AIzaSyC7V0wCHO8HJz-SX8FmjoXJqQ66KVOtWOc",
  authDomain: "test-a58d5.firebaseapp.com",
  databaseURL: "https://test-a58d5.firebaseio.com",
  projectId: "test-a58d5",
  storageBucket: "test-a58d5.appspot.com",
  messagingSenderId: "963482979267"
};

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    QuizPage,
    ScorePage,
    TopscorePage
  ],
  imports: [
    HttpModule,
    HttpClientModule,
    BrowserModule,
    IonicModule.forRoot(MyApp),
    AngularFireModule.initializeApp(firebaseConfig),
    AngularFirestoreModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    QuizPage,
    ScorePage,
    TopscorePage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    DatabaseProvider
  ]
})
export class AppModule {}
