import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddNewFileComponent } from './add-new-file/add-new-file.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { LoginComponent } from './login/login.component';
import { RegistrationComponent } from './registration/registration.component';
import { ReviewDocumentComponent } from './review-document/review-document.component';
import { ReviewerComponent } from './reviewer/reviewer.component';

const routes: Routes = [
    { path: 'login', component: LoginComponent },
    { path: 'register/requester', component: RegistrationComponent },
    { path: 'dashboard', component: DashboardComponent },
    { path: 'register/reviewer', component: ReviewerComponent },
    { path:'addNew', component:AddNewFileComponent},
    { path:'updateStatus', component:ReviewDocumentComponent}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
