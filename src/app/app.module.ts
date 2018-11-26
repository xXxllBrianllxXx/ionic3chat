import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule, enableProdMode } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';

import { config } from "./app.firebaseconfig";

/***********************************************************************************************/
/***********************************************************************************************
ionic cordova plugin add cordova-plugin-firebase
npm install --save @ionic-native/firebase
npm uninstall angularfire2
npm install angularfire2@5.0.0-rc.4
npm uninstall firebase
npm install firebase@4.8.0
***********************************************************************************************/
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFireModule } from 'angularfire2';
/***********************************************************************************************/
/***********************************************************************************************/

import { MyApp } from './app.component';
import { AuthProvider } from '../providers/auth/auth';
import { UserProvider } from '../providers/user/user';

enableProdMode();

@NgModule({
  declarations: [
    MyApp
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp, {tabsPlacement: 'top', scrollAssist: false, autoFocusAssist: false}),
    AngularFireModule.initializeApp(config)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    AuthProvider,
    AngularFireAuth,
    UserProvider
  ]
})
export class AppModule {}
