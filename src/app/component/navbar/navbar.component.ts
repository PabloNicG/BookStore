import { Component, OnInit } from '@angular/core';
import { AuthService} from '../../services/auth.service';

import {AngularFireAuth} from '@angular/fire/auth';
import { from } from 'rxjs';


@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  constructor(private authService: AuthService, private afsAuth: AngularFireAuth) { }
  
  public app_name: string = 'BookStore'  //Declaro mi navbar y lo muestro
  public isLogged: boolean = false; //me permite saber si el usuario esta logeado o no // por defecto es false
  ngOnInit() {
    this.getCurrentUser();
  }

  //metodo que controla si el usuario esta logeado o no
  getCurrentUser(){
    this.authService.isAuth().subscribe(auth => {
      if(auth){
        console.log('user logged');
        this.isLogged =  true;
      }else{
        console.log('NOT user logged');
        this.isLogged = false;
      }
    });

  }

  onLogout(){

    this.afsAuth.auth.signOut();
  
  }
}
