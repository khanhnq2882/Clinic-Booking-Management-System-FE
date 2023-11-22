import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { RegisterComponent } from './register/register.component';
import { HttpClientModule } from '@angular/common/http';
import { LoginComponent } from './login/login.component';
import { httpInterceptorProviders } from './helpers/auth.interceptor';
import { ChangePasswordComponent } from './change-password/change-password.component';
import { UpdateProfileComponent } from './update-profile/update-profile.component';
import { RequestBecomeDoctorComponent } from './request-become-doctor/request-become-doctor.component';
import { HomeComponent } from './home/home.component';
import { ListUsersComponent } from './list-users/list-users.component';
import { ListRequestBecomeDoctorComponent } from './list-request-become-doctor/list-request-become-doctor.component';
import { ListDoctorsComponent } from './list-doctors/list-doctors.component';

@NgModule({
  declarations: [
    AppComponent,
    RegisterComponent,
    LoginComponent,
    ChangePasswordComponent,
    UpdateProfileComponent,
    RequestBecomeDoctorComponent,
    HomeComponent,
    ListUsersComponent,
    ListRequestBecomeDoctorComponent,
    ListDoctorsComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule, 
    HttpClientModule
  ],
  providers: [httpInterceptorProviders],
  bootstrap: [AppComponent]
})
export class AppModule { }
