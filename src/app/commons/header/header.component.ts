import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/service/auth.service';
import { StorageService } from 'src/app/service/storage.service';

@Component({
  selector: 'header-component',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {
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
}
