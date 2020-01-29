import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from "@angular/fire/auth";
import { auth } from "firebase/app";
import { Router } from '@angular/router';
import {AuthService} from '../../../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(public afAuth: AngularFireAuth, private router: Router, private authService: AuthService) { }
  
  public email:string='';
  public password:string='';
  
  ngOnInit() {
  }

  //LOGIN
onLogin():void{
 
 this.authService.loginEmailUser(this.email,this.password).then((res)=>{
  this.onLoginRedirect();
  }).catch(err=> console.log('err',err.message));
}

//LOGIN GOOGLE
onLoginGoogle(): void{ //Este metodo me permite loguear con google

  this.authService.loginGoogleUser().then((res)=>{
    this.onLoginRedirect();
  }).catch(err => console.log('err', err.message));
  
  /*Lo que se ha hecho es llevar el login a servicio, se puede llamar a cualquier otra parte de la app a traves del service, nos devuelve una respuesta*/ 
}

//LOGIN FACEBOOK
onLoginFacebook():void{

 this.authService.loginFacebookUser().then((res)=>{
  this.onLoginRedirect();
 }).catch(err => console.log('err',err.message));

}

onLogout(){
  this.authService.logoutUser();
}/**
 Lo que se hace en aqui es desloguear al usuario
 */

onLoginRedirect(): void {
  this.router.navigate(['admin/list-books']);
}/**
Lo que se hace aqui es crear una ruta de redireccion, esto hace que con cualquiera de los metodos que utilice para entrar me redirecciona a la pagina elegida. La ventaja de esto es que si hay que modificar se hace una sola linea y no en 3 o demas metodos de logueo
*/

}
