import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { RegistrationComponent } from './registration/registration.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { NavbarComponent } from './navbar/navbar.component';
import { AuthConfigInterceptor } from './auth-config.interceptor';
import { ReviewerComponent } from './reviewer/reviewer.component';
import { AddNewFileComponent } from './add-new-file/add-new-file.component';
import { ReviewDocumentComponent } from './review-document/review-document.component';

@NgModule({
  declarations: [
    AppComponent,LoginComponent,RegistrationComponent, DashboardComponent, NavbarComponent, ReviewerComponent, AddNewFileComponent, ReviewDocumentComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [{
    provide: HTTP_INTERCEPTORS,
    useClass: AuthConfigInterceptor,
    multi: true
  }],
  bootstrap: [AppComponent]
})
export class AppModule { }
