import { HttpClient, HttpEvent, HttpHeaders, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { UpdateProfileRequest } from '../request/update-profile.model';
import { AddRoleDoctorRequest } from '../request/add-role-doctor-request.model';

const USER_API = 'http://localhost:8080/user/';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private httpClient: HttpClient) { }

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

  public requestBecomeDoctor(addRoleDoctorRequest: AddRoleDoctorRequest) : Observable<any>{
    return this.httpClient.post(USER_API+'request-to-become-doctor', addRoleDoctorRequest, httpOptions);
  }
  
}
