import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService } from '../../service/auth.service';
import { Router } from '@angular/router';
import { StorageService } from '../../service/storage.service';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.css'],
})
export class ChangePasswordComponent implements OnInit, AfterViewInit {
  @ViewChild('changePasswordForm', { static: false })
  changePasswordForm!: NgForm;

  isSuccessful = false;
  isFailed = false;
  successMessage = '';
  errorMessage = '';
  currentUser: any;

  constructor(
    private authService: AuthService,
    private router: Router,
    private storageService: StorageService
  ) {}

  ngAfterViewInit(): void {}

  ngOnInit(): void {
    this.currentUser = this.storageService.getUser();
  }

  onSubmit() {
    const changePasswordRequest = {
      currentPassword: this.changePasswordForm.value.currentPassword,
      newPassword: this.changePasswordForm.value.newPassword,
      confirmPassword: this.changePasswordForm.value.confirmPassword,
    };
    this.authService.changePassword(changePasswordRequest).subscribe({
      next: (data) => {
        this.isSuccessful = true;
        this.successMessage = data.message;
        // this.storageService.clean();
        // this.router.navigate(['/login']);
      },
      error: (err) => {
        this.isFailed = true;
        this.errorMessage = err.error;
      },
    });
  }
}
