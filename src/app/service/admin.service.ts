import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { UserResponse } from '../response/user-response.model';
import { RequestDoctorResponse } from '../response/request-doctor-response.model';

const ADMIN_API = 'http://localhost:8080/admin/';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  constructor(private httpClient: HttpClient) { }

  public getAllSkills() : Observable<any>{
    return this.httpClient.get(ADMIN_API+'skills', httpOptions);
  }

  public getAllUsers() : Observable<UserResponse[]>{
    return this.httpClient.get<UserResponse[]>(ADMIN_API+'get-all-users', httpOptions);
  }

  public getAllRequestDoctors() : Observable<RequestDoctorResponse[]>{
    return this.httpClient.get<RequestDoctorResponse[]>(ADMIN_API+'get-all-request-doctors', httpOptions);
  }

  public approveRequestDoctor(userId: number) : Observable<any> {
    return this.httpClient.post(ADMIN_API+'approve-request-doctor/'+userId, httpOptions);
  }

}
