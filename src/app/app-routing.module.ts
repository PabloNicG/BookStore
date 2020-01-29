import { AuthGuard } from './guards/auth.guard';
import { NgModule } from '@angular/core';
import { Routes, RouterModule, CanActivate } from '@angular/router';
import { HomeComponent } from './component/home/home.component';
import { OffersComponent } from './component/offers/offers.component';
import { DetailsBookComponent } from './component/details-book/details-book.component';
import { ListBooksComponent } from './component/admin/list-books/list-books.component';
import { LoginComponent } from './component/user/login/login.component';
import { RegisterComponent } from './component/user/register/register.component';
import { Page404Component } from './component/page404/page404.component';
import { ProfileComponent } from './component/user/profile/profile.component';


const routes: Routes = [

  
  {path: '', component: HomeComponent}, 
  {path: 'offers', component: OffersComponent, canActivate: [AuthGuard]}, //TODO: solo usuarios identificados - ruta de oferta
  {path: 'book/:id', component: DetailsBookComponent},
  {path: 'admin/list-books', component: ListBooksComponent, canActivate: [AuthGuard]},//TODO: solo usuarios identificados
  {path: 'user/login', component: LoginComponent},
  {path: 'user/register', component: RegisterComponent},
  {path: 'user/profile', component: ProfileComponent, canActivate: [AuthGuard]},//TODO: solo usuarios identificados
  {path: '**', component: Page404Component}
 // Las rutas estan colocadas en orden, ya que de esto depenede de que muestra
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
