import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DetalleLibrosComponent } from './pages/detalle-libros/detalle-libros.component';
import { DetalleComponent } from './pages/detalle/detalle.component';
import { FormComponent } from './pages/form/form.component';
import { HomeComponent } from './pages/home/home.component';
import { HomePageComponent } from './pages/home-page/home-page.component';
import { HomeDetalleComponent } from './home-detalle/home-detalle.component';
import { RegisterComponent } from './pages/register/register.component';
import { LoginComponent } from './pages/login/login.component';
import { canActivate, redirectUnauthorizedTo } from '@angular/fire/auth-guard';
const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent , ...canActivate(() => redirectUnauthorizedTo(['register']))},
  { path: 'home/:id', component: HomeDetalleComponent },
  {path: 'libros', component: DetalleLibrosComponent, ...canActivate(() => redirectUnauthorizedTo(['register']))},
  {path: 'libros/page/:page', component: DetalleLibrosComponent},
  {path: 'libros/form', component: FormComponent},
  {path: 'libros/form/:id', component: FormComponent},
  {path: 'libros/detalle/:id', component: DetalleComponent},

  { path: 'register', component: RegisterComponent },
  { path: 'login', component: LoginComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
