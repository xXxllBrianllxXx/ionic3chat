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
          photoURL: 'https://cdn.iconscout.com/icon/free/png-256/avatar-375-456327.png'
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

  passwordreset(email){

    var promise = new Promise((resolve, reject) => {

      firebase.auth().sendPasswordResetEmail(email).then(() => {
        resolve({success: true});
      }).catch((err) => {
        reject(err);
      });
    });
    
    return promise;
  }

  updateimage(imageurl) {

    var promise = new Promise((resolve, reject) => {
        this.afireauth.auth.currentUser.updateProfile({
            displayName: this.afireauth.auth.currentUser.displayName,
            photoURL: imageurl      
        }).then(() => {
            firebase.database().ref('/users/' + firebase.auth().currentUser.uid).update({
            displayName: this.afireauth.auth.currentUser.displayName,
            photoURL: imageurl,
            uid: firebase.auth().currentUser.uid
            }).then(() => {
                resolve({ success: true });
                }).catch((err) => {
                    reject(err);
                })
        }).catch((err) => {
              reject(err);
           })  
    })
    
    return promise;
  }

  getuserdetails(){
    //firebase.database().ref('/users/' + firebase.auth().currentUser.uid)
    var promise = new Promise((resolve, reject) => {
      this.firedata.child(firebase.auth().currentUser.uid).once('value', (snapshot) => {
        resolve(snapshot.val());
      }).catch((err) => {
        reject(err);
      });
    });

    return promise; 
  }

  updatedisplayname(newname){

    var promise = new Promise((resolve, reject) => {
      this.afireauth.auth.currentUser.updateProfile({
        displayName: newname,
        photoURL: this.afireauth.auth.currentUser.photoURL
      }).then(() => {
        this.firedata.child(firebase.auth().currentUser.uid).update({
          displayName: newname,
          photoURL: this.afireauth.auth.currentUser.photoURL,
          uid: this.afireauth.auth.currentUser.uid
        }).then(() =>{
          resolve({success: true});
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