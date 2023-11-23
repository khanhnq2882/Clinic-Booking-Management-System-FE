import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService } from '../../service/auth.service';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit, AfterViewInit {
  @ViewChild('registerForm', {static : false}) registerForm !: NgForm;

  isSuccessful = false;
  isRegisterFailed = false;
  successMessage = '';
  errorMessage = '';

  constructor(private authService: AuthService){}

  ngAfterViewInit(): void {
  }

  ngOnInit(): void {
  }

  onSubmit() {
    const registerRequest = {
      username: this.registerForm.value.username,
      email: this.registerForm.value.email,
      password: this.registerForm.value.password
    };
    this.authService.register(registerRequest).subscribe({
      next: data => {
        console.log(data);
        this.isSuccessful = true;
        this.successMessage = data.message;
      },
      error: err => {
        this.isRegisterFailed = true;
        this.errorMessage = err.error.message;
      }
    });
  
  }



}
