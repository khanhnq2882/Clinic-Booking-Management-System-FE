import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { UserResponse } from '../response/user-response.model';

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

}
