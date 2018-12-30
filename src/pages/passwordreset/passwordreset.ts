import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';

/**********************************************************************************************/
import { UserProvider } from "../../providers/user/user";
/**********************************************************************************************/

@IonicPage()
@Component({
  selector: 'page-passwordreset',
  templateUrl: 'passwordreset.html',
})

export class PasswordresetPage {

  email: string;

  constructor(public navCtrl: NavController, public navParams: NavParams, public userservice: UserProvider, public alertCtrl: AlertController) {
  }

  reset(){

    let alert = this.alertCtrl.create({
      buttons: ['Ok']
    });

    this.userservice.passwordreset(this.email).then((res: any) => {
      if(res.success){
        alert.setTitle('Email Enviado');
        alert.setSubTitle('Debe seguir las instrucciones enviadas al correo electronico');
      }
    }).catch((err) => {
        alert.setTitle('Error');
        alert.setSubTitle('Vuelva a intentarlo mas tarde');
    });
  }

  goback(){
    this.navCtrl.setRoot('LoginPage');
  }
}
