import { AngularFireStorage } from '@angular/fire/storage';
import { Router } from '@angular/router';
import { AuthService } from './../../../services/auth.service';
import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  constructor(private router: Router, private authService: AuthService, private storage: AngularFireStorage) { }

  @ViewChild('imageUser', { static: true }) inputImageUser: ElementRef;

  public email: string = '';
  public password: string = '';

  uploadPercent: Observable<number>; //observar el porcentaje de subida del fichero
  urlImage: Observable<string>; //para ver la url de la imagen subida 

  ngOnInit() {
  }

  onUpload(e) {
    //console.log('subir', e.target.files[0]);
    const id = Math.random().toString(36).substring(2);
    const file = e.target.files[0];
    const filePath = `uploads/profile_${id}`;
    const ref = this.storage.ref(filePath);
    const task = this.storage.upload(filePath, file);
    this.uploadPercent = task.percentageChanges();
    task.snapshotChanges().pipe(finalize(() => this.urlImage = ref.getDownloadURL())).subscribe();
  }
  /*Evento para agregar imagen. "e" es el evento, target.files[0] selecciona el primer elemento (ya que lo que devuelve es un array) para darnos cuenta de esto solo hay que ver la herramienta del navegador, donde sale el tipo de imagen (png,jpg) y el tamaño de la misma 
  
  Generamos una constante "id" con MathRandom
  file es donde esta el archivo (array)
  filePath se crea una carpeta y con profile y el id le dan un nombre aleatorio (para que no se suban con el mismo nombre) IMPORTANTE -Se deben poner entre comillas literales-
  ref es la referencia y le pasamos la direccion o nombre del fechero
  task es donde se realiza la subida de fichero se le pasa la ruta y el fichero a subir
  */



  onAddUser(email: string, password: string) {
    this.authService.registerUser(this.email, this.password).then((res) => {

      this.authService.isAuth().subscribe(user => {
        if (user) {

          user.updateProfile({
            displayName: '',
            photoURL: this.inputImageUser.nativeElement.value
          }).then(() => {
            this.router.navigate(['admin/list-books']);

          }).catch((error) => console.log('error', error));
        }
      });
    }).catch(err => console.log('err', err.message));
  }

  //LOGIN GOOGLE
  onLoginGoogle(): void { //Este metodo me permite loguear con google

    this.authService.loginGoogleUser()
    .then((res) => {
      this.onLoginRedirect();
    }).catch(err => console.log('err', err.message));

    /*Lo que se ha hecho es llevar el login a servicio, se puede llamar a cualquier otra parte de la app a traves del service, nos devuelve una respuesta*/
  }

  //LOGIN FACEBOOK
  onLoginFacebook(): void {

    this.authService.loginFacebookUser().then((res) => {
      this.onLoginRedirect();
    }).catch(err => console.log('err', err.message));

  }


  onLoginRedirect(): void {
    this.router.navigate(['admin/list-books']);
  }/**
Lo que se hace aqui es crear una ruta de redireccion, esto hace que con cualquiera de los metodos que utilice para entrar me redirecciona a la pagina elegida. La ventaja de esto es que si hay que modificar se hace una sola linea y no en 3 o demas metodos de logueo
*/
}
