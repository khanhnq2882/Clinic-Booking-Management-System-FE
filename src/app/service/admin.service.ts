import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { UserResponse } from '../response/user-response.model';
import { RequestDoctorResponse } from '../response/request-doctor-response.model';
import { DoctorResponse } from '../response/doctor-response.model';
import { SpecializationResponse } from '../response/specialization-response.model';
import { ServiceCategoryRequest } from '../request/service-category-request.model';
import { ServiceRequest } from '../request/service-request.model';

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

  public getAllDoctors() : Observable<DoctorResponse[]>{
    return this.httpClient.get<DoctorResponse[]>(ADMIN_API+'get-all-doctors', httpOptions);
  }

  public getAllSpecializations() : Observable<SpecializationResponse[]>{
    return this.httpClient.get<SpecializationResponse[]>(ADMIN_API+'get-all-specializations', httpOptions);
  }

  public addServiceCategory(serviceCategoryRequest: ServiceCategoryRequest) : Observable<any>{
    return this.httpClient.post(ADMIN_API+'add-service-category', serviceCategoryRequest, httpOptions);
  }

  public addService(serviceRequest: ServiceRequest) : Observable<any>{
    return this.httpClient.post(ADMIN_API+'add-service', serviceRequest, httpOptions);
  }



}
