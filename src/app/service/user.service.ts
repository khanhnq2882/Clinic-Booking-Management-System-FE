import {
  HttpClient,
  HttpEvent,
  HttpHeaders,
  HttpRequest,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { BookingAppointmentRequest } from '../request/booking-appointment-request.model';
import { DoctorDTO } from '../dto/doctor-dto.model';
import { WorkScheduleDTO } from '../dto/work-schedule-dto.model';

const USER_API = 'http://localhost:8080/user/';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
};

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(private httpClient: HttpClient) {}

  public updateProfile(formData: FormData): Observable<any> {
    return this.httpClient.post(USER_API + 'update-profile', formData);
  }

  public getDoctorsBySpecialization(
    specializationId: number
  ): Observable<DoctorDTO[]> {
    return this.httpClient.get<DoctorDTO[]>(
      USER_API + 'get-doctors-by-specialization/' + specializationId,
      httpOptions
    );
  }

  public getWorkSchedulesByDoctor(
    userId: number
  ): Observable<WorkScheduleDTO[]> {
    return this.httpClient.get<WorkScheduleDTO[]>(
      USER_API + 'get-work-schedules-by-doctor/' + userId,
      httpOptions
    );
  }

  public bookingAppointment(
    bookingAppointmentRequest: BookingAppointmentRequest
  ): Observable<any> {
    return this.httpClient.post(
      USER_API + 'booking-appointment',
      bookingAppointmentRequest,
      httpOptions
    );
  }
}
