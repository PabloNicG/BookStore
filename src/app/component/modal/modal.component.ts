import { BookInterface } from './../../models/book';
import { DataApiService } from './../../services/data-api.service';
import { Component, OnInit, ViewChild, ElementRef, Input } from '@angular/core';
import {NgForm} from  '@angular/forms';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.css']
})
export class ModalComponent implements OnInit {

  constructor(private dataApi: DataApiService) { }

  //@ViewChild('btnClose') btnClose: ElementRef; //para que el modal se cierre cuando sehaga click en save
  @ViewChild('btnClose',{ static: true }) btnClose: ElementRef;
  @Input() userUid: string;

  ngOnInit() {
  } //Angular ha agregado un cambio por lo que viewChild necesita dos argumentos, se utiliza { static: true } como segundo argumento, de otra forma solo lanzará error

  onSaveBook(bookForm: NgForm): void{
    //nuevo libro
   //
    console.log('bookForm.value.id', bookForm.value.id);
    if(bookForm.value.id === null){
      //nuevo libro
      bookForm.value.userUid = this.userUid; //cuando
      this.dataApi.addBook(bookForm.value);
    }else{
      //update  
      this.dataApi.updateBook(bookForm.value);
    }
    
    bookForm.resetForm();//me permite limpiar el formulario
    
    this.btnClose.nativeElement.click();
  }/*con este metodo puedo ingresar datos al modal y agregar un libro */


}
