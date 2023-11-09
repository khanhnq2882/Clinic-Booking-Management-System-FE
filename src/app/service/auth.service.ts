import { HttpClient, HttpHeaders} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { RegisterRequest } from '../request/register-request.model';
import { LoginRequest } from '../request/login-request.model';
import { ChangePasswordRequest } from '../request/change-password-request.model';

const AUTH_API = 'http://localhost:8080/auth/';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private httpClient: HttpClient) { }

  public register(registerRequest: RegisterRequest) : Observable<any>{
    return this.httpClient.post(AUTH_API+'register', registerRequest, httpOptions);
  }

  public login(loginRequest: LoginRequest) : Observable<any>{
    return this.httpClient.post(AUTH_API+'login', loginRequest, httpOptions);
  }

  public changePassword(changePasswordRequest: ChangePasswordRequest) : Observable<any>{
    return this.httpClient.post(AUTH_API+'change-password', changePasswordRequest, httpOptions); 
  }

  

  
}
