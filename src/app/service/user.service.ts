import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { UpdateProfileRequest } from '../request/update-profile.model';

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
  
}
