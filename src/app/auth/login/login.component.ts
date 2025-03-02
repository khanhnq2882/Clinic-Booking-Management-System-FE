import { AfterViewInit, Component, NgZone, OnInit, ViewChild } from '@angular/core';
import { AuthService } from '../../service/auth.service';
import { NgForm } from '@angular/forms';
import { StorageService } from '../../service/storage.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

export const JWT = 'JWT';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  @ViewChild('loginForm', { static: false }) loginForm!: NgForm;

  isSuccessful = false;
  isLoginFailed = false;
  errorMessage = '';
  username !: string;
  roles: string[] = [];

  constructor(
    private authService: AuthService,
    private storageService: StorageService,
    private router: Router,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    const successMessage = sessionStorage.getItem('successMessage');
    if (successMessage) {
      this.toastr.success(successMessage);
      sessionStorage.removeItem('successMessage');
    }

    if (this.storageService.isLoggedIn()) {
      this.isSuccessful = true;
    }
  }

  onSubmit() {
    const loginRequest = {
      username: this.loginForm.value.username,
      password: this.loginForm.value.password,
    };
    this.authService.login(loginRequest).subscribe({
      next: (data) => {
        window.localStorage.setItem(JWT, data.jwtTokenResponse);
        this.isSuccessful = true;
        this.username = this.storageService.getUser().sub;
        this.router.navigate(['/home']).then(() => window.location.reload());
      },
      error: (err) => {
        this.isLoginFailed = true;
        this.errorMessage = err.error.errorMessage;
        this.toastr.error(this.errorMessage);
      }
    })
  }

  reloadPage(): void {
    window.location.reload();
  }

}
