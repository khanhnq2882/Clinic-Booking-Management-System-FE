import { HttpClient, HttpEvent, HttpHeaders, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { RequestDoctorResponse } from '../response/request-doctor-response.model';
import { SpecializationResponse } from '../response/specialization-response.model';
import { ServiceCategoryRequest } from '../request/service-category-request.model';
import { ServiceRequest } from '../request/service-request.model';
import { ServiceCategoryDTO } from '../dto/service-category-dto.model';

const ADMIN_API = 'http://localhost:8080/admin/';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  constructor(private httpClient: HttpClient) { }

  public getAllUsers(params: any) : Observable<any>{
    return this.httpClient.get<any>(ADMIN_API+'get-all-users', {params});
  }

  public getAllRequestDoctors() : Observable<RequestDoctorResponse[]>{
    return this.httpClient.get<RequestDoctorResponse[]>(ADMIN_API+'get-all-request-doctors', httpOptions);
  }

  public approveRequestDoctor(userId: number) : Observable<any> {
    return this.httpClient.post(ADMIN_API+'approve-request-doctor/'+userId, httpOptions);
  }

  public rejectRequestDoctor(userId: number) : Observable<any> {
    return this.httpClient.post(ADMIN_API+'reject-request-doctor/'+userId, httpOptions);
  }

  public getAllDoctors(params: any) : Observable<any>{
    return this.httpClient.get<any>(ADMIN_API+'get-all-doctors', {params});
  }

  public getAllSpecializations() : Observable<SpecializationResponse[]>{
    return this.httpClient.get<SpecializationResponse[]>(ADMIN_API+'get-all-specializations', httpOptions);
  }

  public getServiceCategories(specializationId : number) : Observable<ServiceCategoryDTO[]>{
    return this.httpClient.get<ServiceCategoryDTO[]>(ADMIN_API+'get-all-service-categories/'+specializationId, httpOptions);
  }

  public getAllServiceCategories(params: any) : Observable<any>{
    return this.httpClient.get<any>(ADMIN_API+'get-all-service-categories', {params});
  } 

  public addServiceCategory(serviceCategoryRequest: ServiceCategoryRequest) : Observable<any>{
    return this.httpClient.post(ADMIN_API+'add-service-category', serviceCategoryRequest, httpOptions);
  }

  public getServiceCategory (serviceCategoryId : number) : Observable<any>{
    return this.httpClient.get<any>(ADMIN_API+'get-service-category/'+serviceCategoryId, httpOptions);
  }

  public updateServiceCategory(serviceCategoryId : number, serviceCategoryRequest: ServiceCategoryRequest) : Observable<any>{
    return this.httpClient.post(ADMIN_API+'update-service-category/'+serviceCategoryId, serviceCategoryRequest, httpOptions);
  }

  public getAllServices(params: any) : Observable<any>{
    return this.httpClient.get<any>(ADMIN_API+'get-all-services', {params});
  } 

  public addService(serviceRequest: ServiceRequest) : Observable<any>{
    return this.httpClient.post(ADMIN_API+'add-service', serviceRequest, httpOptions);
  }

  public getService (serviceId : number) : Observable<any>{
    return this.httpClient.get<any>(ADMIN_API+'get-service/'+serviceId, httpOptions);
  }

  public updateService(serviceId : number, serviceRequest: ServiceRequest) : Observable<any>{
    return this.httpClient.post(ADMIN_API+'update-service/'+serviceId, serviceRequest, httpOptions);
  }

  public exportUsersToExcel () : Observable<any>{
    return this.httpClient.get<any>(ADMIN_API+'export-users-to-excel', httpOptions);
  }

  public importServiceCategoriesFromExcel(file : File) : Observable<HttpEvent<any>>{
    const formData: FormData = new FormData();
    formData.append('file', file);
    const req = new HttpRequest('POST', ADMIN_API+'import-service-categories-from-excel', formData, {
      reportProgress: true,
      responseType: 'json',
    });
    return this.httpClient.request(req);
  }

}
