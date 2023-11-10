import { HttpClient, HttpEvent, HttpHeaders, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { UpdateProfileRequest } from '../request/update-profile.model';

const USER_API = 'http://localhost:8080/';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private httpClient: HttpClient) { }

  public updateProfile(updateProfileRequest: UpdateProfileRequest) : Observable<any>{
    return this.httpClient.post(USER_API+'user/update-profile', updateProfileRequest, httpOptions);
  }

  public uploadAvatar(avatar : File) : Observable<HttpEvent<any>>{
    const formData: FormData = new FormData();
    formData.append('avatar', avatar);
    const req = new HttpRequest('POST', USER_API+'user/upload-avatar', formData, {
      reportProgress: true,
      responseType: 'json',
    });
    return this.httpClient.request(req);
  }
  
}
