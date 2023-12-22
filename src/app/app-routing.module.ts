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
import { ListServicesComponent } from './admin/list-services/list-services.component';
import { ListServiceCategoriesComponent } from './admin/list-service-categories/list-service-categories.component';
import { BookingAppointmentComponent } from './user/booking-appointment/booking-appointment.component';
import { ListUserBookingComponent } from './doctor/list-user-booking/list-user-booking.component';
import { ScheduleComponent } from './commons/schedule/schedule.component';
import { UpdateDoctorProfileComponent } from './doctor/update-doctor-profile/update-doctor-profile.component';
import { UpdateServiceCategoryComponent } from './admin/update-service-category/update-service-category.component';
import { AddressComponent } from './commons/address/address.component';
import { UpdateServiceComponent } from './admin/update-service/update-service.component';
import { ListBookingsComponent } from './admin/list-bookings/list-bookings.component';


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
  { path: 'list-services', component: ListServicesComponent },
  { path: 'list-service-categories', component: ListServiceCategoriesComponent },
  { path: 'booking-appointment', component: BookingAppointmentComponent },
  { path: 'list-user-booking', component: ListUserBookingComponent },
  { path: 'address', component: AddressComponent },
  { path: 'schedule', component: ScheduleComponent },
  { path: 'update-doctor-profile', component: UpdateDoctorProfileComponent },
  { path: 'update-service-category/:serviceCategoryId', component: UpdateServiceCategoryComponent },
  { path: 'update-service/:serviceId', component: UpdateServiceComponent },
  { path: 'list-bookings', component: ListBookingsComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
