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
import { ListUsersComponent } from './admin/list-users/list-users.component';
import { ListDoctorsComponent } from './admin/list-doctors/list-doctors.component';
import { AddServiceCategoryComponent } from './admin/add-service-category/add-service-category.component';
import { AddServiceComponent } from './admin/add-service/add-service.component';
import { ListServicesComponent } from './admin/list-services/list-services.component';
import { ListServiceCategoriesComponent } from './admin/list-service-categories/list-service-categories.component';
import { BookingAppointmentComponent } from './user/booking-appointment/booking-appointment.component';
import { ListUserBookingComponent } from './doctor/list-user-booking/list-user-booking.component';
import { ScheduleModule } from './commons/schedule/schedule.module';
import { UpdateDoctorProfileComponent } from './doctor/update-doctor-profile/update-doctor-profile.component';
import { AddressComponent } from './commons/address/address.component';
import { UpdateServiceCategoryComponent } from './admin/update-service-category/update-service-category.component';
import { HomeComponent } from './home/home.component';
import { HeaderComponent } from './commons/header/header.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ListBookingsComponent } from './admin/list-bookings/list-bookings.component';
import { RegisterWorkSchedulesComponent } from './doctor/register-work-schedules/register-work-schedules.component';


@NgModule({
  declarations: [
    AppComponent,
    RegisterComponent,
    LoginComponent,
    ChangePasswordComponent,
    UpdateProfileComponent,
    ListUsersComponent,
    ListDoctorsComponent,
    AddServiceCategoryComponent,
    AddServiceComponent,
    ListServicesComponent,
    ListServiceCategoriesComponent,
    BookingAppointmentComponent,
    ListUserBookingComponent,
    UpdateDoctorProfileComponent,
    AddressComponent,
    UpdateServiceCategoryComponent,
    HomeComponent,
    HeaderComponent,
    ListBookingsComponent,
    RegisterWorkSchedulesComponent,
      ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule, 
    HttpClientModule,
    ScheduleModule,
    NgbModule,
  ],
  providers: [httpInterceptorProviders],
  bootstrap: [AppComponent]
})
export class AppModule { }
