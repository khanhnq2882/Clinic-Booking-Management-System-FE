import { Component, OnInit } from '@angular/core';
import { StorageService } from './service/storage.service';
import { AuthService } from './service/auth.service';
import { map } from 'rxjs';
import { JWT } from './login/login.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{

  isLoggedIn = false;
  isShowUserBoard = false;
  isShowAdminBoard = false;
  isShowDoctorBoard = false;
  errorMessage = '';
  username = '';
  roles: string[] = [];

  constructor(private storageService: StorageService, private authService: AuthService) {}

  ngOnInit(): void {
    this.isLoggedIn = this.storageService.isLoggedIn();
    if (this.isLoggedIn) {
      this.authService.getUserInfo().subscribe({
        next: (data) => {
          this.roles = data.roles;
          this.username = data.username;
          this.isShowUserBoard = this.roles.includes('ROLE_USER');
          this.isShowAdminBoard = this.roles.includes('ROLE_ADMIN');
          this.isShowDoctorBoard = this.roles.includes('ROLE_DOCTOR');
        },
        error: (err) => {
          this.errorMessage = err.error.message;
        },
      })           
    }
  }

  logout(): void {
    console.log(JWT);
    this.authService.logoutUser().subscribe({
      next: res => {
        localStorage.removeItem('eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJraGFuaG5xIiwiaWF0IjoxNzAwNjc3NzY4LCJleHAiOjE3MDA3NjQxNjh9._FGLnrMNbfmAy3ZSOgD_I3wJuguSIjNwCg1mRDMS9Ts');
        window.location.reload();
      },
      error: err => {
        console.log(err);
      }
    });
  }


}
