import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, ToastController } from 'ionic-angular';

/***********************************************************************/
import { UserProvider } from "../../providers/user/user";
/***********************************************************************/

@IonicPage()
@Component({
  selector: 'page-signup',
  templateUrl: 'signup.html',
})

export class SignupPage {

  newuser = {
    email: '',
    password: '',
    displayName: ''
  }

  constructor(public navCtrl: NavController, 
              public navParams: NavParams , 
              public userservice:UserProvider, 
              public loadingCtrl: LoadingController, 
              public toastCtrl: ToastController) {
  }

  signup(){ 
    
    var toaster = this.toastCtrl.create({
      duration: 3000,
      position: 'bottom'
    });

    if (this.newuser.email == '' || this.newuser.password == '' || this.newuser.displayName == '') {    
      toaster.setMessage('Campos Vacios');  
      toaster.present();
    }else if (this.newuser.password.length <= 7){
      toaster.setMessage('Contraseña Muy Corta');  
      toaster.present();
    }else{

      let loader = this.loadingCtrl.create({
        content: 'Cargando...'
      });
      loader.present();
  
      this.userservice.adduser(this.newuser).then((res: any) => {
  
        loader.dismiss();
  
        if (res.success) {
          this.navCtrl.push('ProfilepicPage');
        }else{
          alert('Error => '+res);
        }
      });
    }    
  }

  goback(){
    this.navCtrl.setRoot('LoginPage');
  }
}
