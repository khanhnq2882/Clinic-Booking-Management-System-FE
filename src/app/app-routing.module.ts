import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { ChangePasswordComponent } from './change-password/change-password.component';
import { UpdateProfileComponent } from './update-profile/update-profile.component';
import { RequestBecomeDoctorComponent } from './request-become-doctor/request-become-doctor.component';
import { HomeComponent } from './home/home.component';
import { ListUsersComponent } from './list-users/list-users.component';
import { ListRequestBecomeDoctorComponent } from './list-request-become-doctor/list-request-become-doctor.component';
import { ListDoctorsComponent } from './list-doctors/list-doctors.component';

const routes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'login', component: LoginComponent },
  { path: 'change-password', component: ChangePasswordComponent },
  { path: 'update-profile', component: UpdateProfileComponent },
  { path: 'request-become-doctor', component: RequestBecomeDoctorComponent },
  { path: 'list-users', component: ListUsersComponent },
  { path: 'list-request-become-doctor', component: ListRequestBecomeDoctorComponent },
  { path: 'list-doctors', component: ListDoctorsComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
