import { UserInterface } from './../../../models/user';
import { AngularFireAuth } from '@angular/fire/auth';
import { AuthService } from './../../../services/auth.service';
//import { from } from 'rxjs';
import { BookInterface } from './../../../models/book';
import { DataApiService } from './../../../services/data-api.service';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';


@Component({
  selector: 'app-list-books',
  templateUrl: './list-books.component.html',
  styleUrls: ['./list-books.component.css']
})
export class ListBooksComponent implements OnInit {

  constructor(private dataApi: DataApiService, private authService: AuthService) { }
  private books: BookInterface[];
  public isAdmin: any = null;
  public userUid: string = null;


  ngOnInit() {
    this.getListBooks();
    this.getCurrentUser();
  }

  getCurrentUser() {
    this.authService.isAuth().subscribe(auth => {
      if (auth) {
        this.userUid = auth.uid;
        this.authService.isUserAdmin(this.userUid).subscribe(userRole => {
          this.isAdmin = Object.assign({}, userRole.roles).hasOwnProperty('admin');
          // this.isAdmin = true;
        })
      }
    })
  }/*Metodo para comprobar si el usuario es admin o no */

  getListBooks() {
    this.dataApi.getAllBooks().subscribe(books => {
        this.books = books;
      });
  }

  onDeleteBook(idBook: string): void {

    console.log('Delete Book');
    
    const confirmacion = confirm('Estas seguro de borrar?');
    if(confirmacion){
      this.dataApi.deleteBook(idBook);
     const confirmacion =  console.log('Se ha eliminado correctamente!');
    }
    

  }

  onPreUpdateBook(book: BookInterface){

    console.log('BOOK', book);

    this.dataApi.selectedBook = Object.assign({},book);
  }/*Este metodo me permitira traer el id a la barra superior */
}
