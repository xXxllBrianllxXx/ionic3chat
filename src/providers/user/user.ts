import { Injectable } from '@angular/core';

/***********************************************************************/
import { AngularFireAuth } from "angularfire2/auth";
import firebase from 'firebase';
/***********************************************************************/

@Injectable()

export class UserProvider {

  firedata = firebase.database().ref('/chatusers');

  constructor(public afireauth: AngularFireAuth) {
  }

  adduser(newuser){
    
    var promise = new Promise((resolve, reject) => {
      
      this.afireauth.auth.createUserWithEmailAndPassword(newuser.email, newuser.password).then(() => {
        this.afireauth.auth.currentUser.updateProfile({
          displayName: newuser.displayName,
          photoURL: ''
        }).then(() => {
          this.firedata.child(this.afireauth.auth.currentUser.uid).set({
            uid: this.afireauth.auth.currentUser.uid,
            displayName: newuser.displayName,
            photoURL: 'https://cdn.iconscout.com/icon/free/png-256/avatar-375-456327.png'
          }).then(() => {
            resolve({ success: true });
          }).catch((err) => {
            reject(err);
          });
        }).catch((err) => {
          reject(err);
        });
      }).catch((err) => {
        reject(err);
      });
    });

    return promise;
  }
}