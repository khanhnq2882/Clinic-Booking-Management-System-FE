import { HttpClient, HttpEvent, HttpHeaders, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { UpdateProfileRequest } from '../request/update-profile-request.model';
import { BookingAppointmentRequest } from '../request/booking-appointment-request.model';
import { DoctorDTO } from '../dto/doctor-dto.model';
import { WorkScheduleDTO } from '../dto/work-schedule-dto.model';

const USER_API = 'http://localhost:8080/user/';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private httpClient: HttpClient) { }

  public getAllSkills() : Observable<any>{
    return this.httpClient.get(USER_API+'skills', httpOptions);
  }

  public updateProfile(updateProfileRequest: UpdateProfileRequest) : Observable<any>{
    return this.httpClient.post(USER_API+'update-profile', updateProfileRequest, httpOptions);
  }

  public uploadAvatar(avatar : File) : Observable<HttpEvent<any>>{
    const formData: FormData = new FormData();
    formData.append('avatar', avatar);
    const req = new HttpRequest('POST', USER_API+'upload-avatar', formData, {
      reportProgress: true,
      responseType: 'json',
    });
    return this.httpClient.request(req);
  }

  public getDoctorsBySpecialization(specializationId : number) : Observable<DoctorDTO[]>{
    return this.httpClient.get<DoctorDTO[]>(USER_API+'get-doctors-by-specialization/'+specializationId, httpOptions);
  }

  public getWorkSchedulesByDoctor(userId : number) : Observable<WorkScheduleDTO[]>{
    return this.httpClient.get<WorkScheduleDTO[]>(USER_API+'get-work-schedules-by-doctor/'+userId, httpOptions);
  }

  public bookingAppointment(bookingAppointmentRequest: BookingAppointmentRequest) : Observable<any>{
    return this.httpClient.post(USER_API+'booking-appointment', bookingAppointmentRequest, httpOptions);
  }
  
}
