import { Injectable } from '@angular/core';
import { JWT } from '../auth/login/login.component';
import { JWTResponse } from '../response/jwt-response.model';

export const USER_KEY = 'auth-user';

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  constructor() { }

  clean(): void {
    window.localStorage.removeItem(JWT);
  }

  public saveUser(jwtResponse: JWTResponse) {
    window.localStorage.removeItem(JWT);
    window.localStorage.setItem(JWT, jwtResponse.jwtTokenResponse);
  }

  public getUser() : any{
    const jwtToken = window.localStorage.getItem(JWT);
    let payload;
    if (jwtToken) {
      payload = jwtToken.split('.')[1];
      payload = window.atob(payload);
      return JSON.parse(payload);
    } else {
      return null;
    }
  }

  public isLoggedIn(): boolean {
    const jwtToken = window.localStorage.getItem(JWT);
    if (jwtToken) {
      return true;
    }
    return false;
  }
}
