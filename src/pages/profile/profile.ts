import { Component, NgZone } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { ImghandlerProvider } from '../../providers/imghandler/imghandler';
import { UserProvider } from '../../providers/user/user';
import firebase from "firebase";

@IonicPage()
@Component({
  selector: 'page-profile',
  templateUrl: 'profile.html',
})

export class ProfilePage {

  avatar: string;
  displayName: string;

  constructor(public navCtrl: NavController, 
              public navParams: NavParams,
              public userservice: UserProvider,
              public zone: NgZone,
              public alertCtrl: AlertController,
              public imghandler: ImghandlerProvider) {
  }

  ionViewWillEnter(){
    this.loaduserdetails();
  }

  loaduserdetails(){
    this.userservice.getuserdetails().then((res: any) => {
      this.displayName = res.displayName;
      this.zone.run(() => {
        this.avatar = res.photoURL;
      });
    });
  }

  editimage(){

    let statusalert = this.alertCtrl.create({
      buttons: ['Ok']
    });

    this.imghandler.uploadimage().then((url: any) => {
      this.userservice.updateimage(url).then((res: any) => {
        if (res.success) {
          statusalert.setTitle('Cambio');
          statusalert.setTitle('Su Imagen Fue Actualizada Exitosamente');
          statusalert.present();
          this.zone.run(() => {
            this.avatar = url;
          });
        }
      }).catch((err) => {
        statusalert.setTitle('Error');
        statusalert.setTitle('Su Imagen No Pudo Ser Actualizada');
        statusalert.present();
      });
    });
  }

  editname(){

    let statusalert = this.alertCtrl.create({
      buttons: ['Ok']
    });

    let alert =this.alertCtrl.create({
      title: 'Editar Alias', 
      inputs: [{
        name: 'nickname',
        placeholder: 'Nuevo Alias'
      }],
      buttons: [{
        text: 'Cancelar',
        role: 'cancel',
        handler: data => {

        }
      },
      {
        text: 'Editar',
        handler: data => {
          if (data.nickname){
            this.userservice.updatedisplayname(data.nickname).then((res: any) => {
              if(res.success){
                statusalert.setTitle('Cambio');
                statusalert.setTitle('Su Alias Fue Actualizado Exitosamente');
                statusalert.present();
                this.zone.run(() => {
                  this.displayName = data.nickname;
                });
              }else{
                statusalert.setTitle('Error');
                statusalert.setTitle('Su Alias No Pudo Ser Actualizado');
                statusalert.present();
              }
            });            
          }
        }
      }]
    });

    alert.present();
  }

  logout(){
    firebase.auth().signOut().then(() => {
      this.navCtrl.parent.parent.setRoot('LoginPage');     
    });
  }
}