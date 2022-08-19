import { BibliotecaService } from './services/biblioteca.service';
import { NgModule, LOCALE_ID } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './pages/home/home.component';
import { FooterComponent } from './pages/footer/footer.component';
import { HeaderComponent } from './pages/header/header.component';
import { PaginatorComponent } from './pages/paginator/paginator.component';
import { DetalleComponent } from './pages/detalle/detalle.component';
import { CommonModule, registerLocaleData } from '@angular/common';
import localeEs from '@angular/common/locales/es';
import { HttpClientModule } from "@angular/common/http";
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { DetalleLibrosComponent } from './pages/detalle-libros/detalle-libros.component';
import { FormComponent } from './pages/form/form.component';
import { HomePageComponent } from './pages/home-page/home-page.component';
import { HomeDetalleComponent } from './home-detalle/home-detalle.component';
import { RegisterComponent } from './pages/register/register.component';
import { initializeApp,provideFirebaseApp } from '@angular/fire/app';
import { environment } from '../environments/environment';
import { provideAuth,getAuth } from '@angular/fire/auth';
import { LoginComponent } from './pages/login/login.component';

registerLocaleData(localeEs); //Registrmos el LOCALE_ID de 'es' para poder usarlo en los pipe'

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    FooterComponent,
    HeaderComponent,
    PaginatorComponent,
    DetalleComponent,
    DetalleLibrosComponent,
    FormComponent,
    HomePageComponent,
    HomeDetalleComponent,
    RegisterComponent,
    LoginComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    CommonModule,
    HttpClientModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    provideFirebaseApp(() => initializeApp(environment.firebase)),
    provideAuth(() => getAuth())
  ],
  providers: [BibliotecaService,
    { provide: LOCALE_ID, useValue: 'es'} 
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
