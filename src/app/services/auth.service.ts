import { UserInterface } from './../models/user';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';
import { Injectable } from '@angular/core';
import {AngularFireAuth} from '@angular/fire/auth';
import {map} from 'rxjs/operators';
import {auth, User} from 'firebase/app';
import {Router} from '@angular/router';
import { resolve } from 'url';
 

//import { from } from 'rxjs';
//REGISTRO DE USUARIOS

@Injectable({
  providedIn: 'root'
})
export class AuthService {


  constructor(private afsAuth: AngularFireAuth, private afs: AngularFirestore) { }
//Para trabajar con firebase

registerUser(email:string, pass:string){
   return new Promise((resolve, reject)=>{
     this.afsAuth.auth.createUserWithEmailAndPassword(email, pass)
     .then(userData => {resolve(userData),
      this.updateUserData(userData.user)})
      .catch(err=>reject(err));
   });
}/*cuando un nuevo usuario se registre se le da un rol -  */

loginEmailUser(email: string, pass: string){
  return new Promise((resolve, reject)=>{
    this.afsAuth.auth.signInWithEmailAndPassword(email, pass).then(userData => resolve(userData), err=> reject(err));
  })
}

loginFacebookUser() {
  return this.afsAuth.auth.signInWithPopup(new auth.FacebookAuthProvider())
    .then(credential => this.updateUserData(credential.user))
}

loginGoogleUser() {
  return this.afsAuth.auth.signInWithPopup(new auth.GoogleAuthProvider())
    .then(credential => this.updateUserData(credential.user))
}

logoutUser(){
  return this.afsAuth.auth.signOut();
}

isAuth(){

return this.afsAuth.authState.pipe(map(auth => auth));

}

private updateUserData(user) {
  const userRef: AngularFirestoreDocument<any> = this.afs.doc(`users/${user.uid}`);
  const data: UserInterface = {
    id: user.uid,
    email: user.email,
    roles: {
      admin: true
    }
  }
  return userRef.set(data, { merge: true })
}/*
  cuando se cree una cuenta se le pasará el usuario*/

  
  isUserAdmin(userUid) {
    return this.afs.doc<UserInterface>(`users/${userUid}`).valueChanges();
  }
}
