import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { LoginComponent } from './login/login.component';
import { RegistrationComponent } from './registration/registration.component';
import { ReviewerComponent } from './reviewer/reviewer.component';

const routes: Routes = [
    { path: 'login', component: LoginComponent },
    { path: 'register/requester', component: RegistrationComponent },
    { path: 'dashboard', component: DashboardComponent },
    { path: 'register/reviewer', component: ReviewerComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
