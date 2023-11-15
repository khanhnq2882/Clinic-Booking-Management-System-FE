import { Component, OnInit } from '@angular/core';
import { StorageService } from './service/storage.service';
import { AuthService } from './service/auth.service';
import { map } from 'rxjs';

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
  private roles: string[] = [];

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
    this.authService.logout().subscribe({
      next: res => {
        this.storageService.clean();
        window.location.reload();
      },
      error: err => {
        console.log(err);
      }
    });
  }


}
