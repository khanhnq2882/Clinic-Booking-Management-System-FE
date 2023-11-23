import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { AuthService } from '../../service/auth.service';
import { NgForm } from '@angular/forms';
import { StorageService } from '../../service/storage.service';
import { Router } from '@angular/router';

export const JWT = "JWT";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit, AfterViewInit{
  @ViewChild('loginForm', {static: false}) loginForm !: NgForm;

  isSuccessful = false;
  isLoginFailed = false;
  errorMessage = '';
  roles: string[] = [];

  ngAfterViewInit(): void {

  }

  ngOnInit(): void {
    if (this.storageService.isLoggedIn()) {
      this.isSuccessful = true;
      this.roles = this.storageService.getUser().roles;
    }
  }

  constructor(private authService: AuthService, private storageService: StorageService, private router: Router) {}

  onSubmit() {
    const loginRequest = {
      username: this.loginForm.value.username,
      password: this.loginForm.value.password
    }
    this.authService.login(loginRequest).subscribe({
      next: data => {
        window.localStorage.setItem(JWT, data.jwtTokenResponse);
        this.isSuccessful = true;
        this.roles = this.storageService.getUser().roles;
        this.reloadPage();
      },
      error: err => {
        this.isLoginFailed = true;
        this.errorMessage = err.error.message;
      }
    })
  }

  reloadPage(): void {
    window.location.reload();
  }

}
