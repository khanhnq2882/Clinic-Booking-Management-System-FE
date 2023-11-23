import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RegisterComponent } from './auth/register/register.component';
import { LoginComponent } from './auth/login/login.component';
import { ChangePasswordComponent } from './auth/change-password/change-password.component';
import { UpdateProfileComponent } from './user/update-profile/update-profile.component';
import { RequestBecomeDoctorComponent } from './user/request-become-doctor/request-become-doctor.component';
import { HomeComponent } from './home/home.component';
import { ListUsersComponent } from './admin/list-users/list-users.component';
import { ListRequestBecomeDoctorComponent } from './admin/list-request-become-doctor/list-request-become-doctor.component';
import { ListDoctorsComponent } from './admin/list-doctors/list-doctors.component';
import { AddServiceCategoryComponent } from './admin/add-service-category/add-service-category.component';
import { AddServiceComponent } from './admin/add-service/add-service.component';

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
  { path: 'add-service-category', component: AddServiceCategoryComponent },
  { path: 'add-service', component: AddServiceComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
