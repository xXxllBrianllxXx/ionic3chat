import { Component, NgZone } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController } from 'ionic-angular';
import { ImghandlerProvider } from '../../providers/imghandler/imghandler';
import { UserProvider } from '../../providers/user/user';

@IonicPage()
@Component({
  selector: 'page-profilepic',
  templateUrl: 'profilepic.html',
})

export class ProfilepicPage {

  //imgurl = 'https://cdn2.vectorstock.com/i/thumb-large/08/31/person-icon-male-user-profile-avatar-symbol-vector-20910831.jpg';
  imgurl = 'https://cdn.iconscout.com/icon/free/png-256/avatar-375-456327.png';
  moveon = true;

  constructor(public navCtrl: NavController, 
              public navParams: NavParams, 
              public imgservice: ImghandlerProvider,
              public zone: NgZone, 
              public userservice: UserProvider, 
              public loadingCtrl: LoadingController) {
  }

  chooseimage() {
    let loader = this.loadingCtrl.create({
      content: 'Cargando...'
    })
    loader.present();
    this.imgservice.uploadimage().then((uploadedurl: any) => {
      loader.dismiss();
      this.zone.run(() => {
        this.imgurl = uploadedurl;
        this.moveon = false;
      })
    })
  }

  updateproceed() {
    let loader = this.loadingCtrl.create({
      content: 'Cargando...'
    })
    loader.present();
    this.userservice.updateimage(this.imgurl).then((res: any) => {
      loader.dismiss();
      if (res.success) {
        this.navCtrl.setRoot('TabsPage');
      }
      else {
        alert(res);
      }
    })
  }

  proceed() {
    this.navCtrl.setRoot('TabsPage');
  }

}
