import { Component, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService } from '../../service/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent{
  @ViewChild('registerForm', {static : false}) registerForm !: NgForm;

  isSuccessful = false;
  isFailed = false;
  successMessage = '';
  errorMessage = '';
  roles : string[] = [];

  constructor(private authService: AuthService){}

  onSubmit() {
    const registerRequest = {
      username: this.registerForm.value.username,
      email: this.registerForm.value.email,
      password: this.registerForm.value.password,
      roles : this.roles
    };
    this.authService.register(registerRequest).subscribe({
      next: data => {
        this.isSuccessful = true;
        this.successMessage = data.message;
      },
      error: err => {
        this.isFailed = true;
        this.errorMessage = err.error;
      }
    });

  }

  onChange(e : any) {
    if (e.target.value == 'user' && !this.roles.includes('ROLE_USER')) {
      this.roles = this.roles.filter(item => item == 'ROLE_USER');
      this.roles.push('ROLE_USER');
    } 
    if (e.target.value == 'doctor' && !this.roles.includes('ROLE_DOCTOR')) {
      this.roles = this.roles.filter(item => item == 'ROLE_DOCTOR');
      this.roles.push('ROLE_DOCTOR');
    }
    console.log(this.roles);
  }
}
