import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { RegisterComponent } from './auth/register/register.component';
import { HttpClientModule } from '@angular/common/http';
import { LoginComponent } from './auth/login/login.component';
import { httpInterceptorProviders } from './helpers/auth.interceptor';
import { ChangePasswordComponent } from './auth/change-password/change-password.component';
import { UpdateProfileComponent } from './user/update-profile/update-profile.component';
import { RequestBecomeDoctorComponent } from './user/request-become-doctor/request-become-doctor.component';
import { HomeComponent } from './home/home.component';
import { ListUsersComponent } from './admin/list-users/list-users.component';
import { ListRequestBecomeDoctorComponent } from './admin/list-request-become-doctor/list-request-become-doctor.component';
import { ListDoctorsComponent } from './admin/list-doctors/list-doctors.component';
import { AddServiceCategoryComponent } from './admin/add-service-category/add-service-category.component';
import { AddServiceComponent } from './admin/add-service/add-service.component';
import { ListServicesComponent } from './admin/list-services/list-services.component';
import { ListServiceCategoriesComponent } from './admin/list-service-categories/list-service-categories.component';

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
    AddServiceCategoryComponent,
    AddServiceComponent,
    ListServicesComponent,
    ListServiceCategoriesComponent,
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
