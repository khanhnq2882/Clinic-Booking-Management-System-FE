import { AfterViewInit, Component, ViewChild, ChangeDetectorRef } from '@angular/core';
import { NgForm, Validators } from '@angular/forms';
import { AuthService } from '../../service/auth.service';
import { ToastrService } from 'ngx-toastr';
import { Router, NavigationExtras } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements AfterViewInit{
  @ViewChild('registerForm', {static : false}) registerForm !: NgForm;

  isSuccessful = false;
  isFailed = false;
  successMessage = '';
  roles : string[] = [];
  errorsMap : Map<string, string> = new Map<string, string>();
  errors : string[] = [];
  errorsField : string[] = [];
  isEmailError = false;
  isPasswordError = false;
  
  constructor(
    private authService: AuthService, 
    private toastr: ToastrService, 
    private cdRef: ChangeDetectorRef,
    private router: Router
  ){}

  ngAfterViewInit(): void {
    setTimeout(() => {
      this.registerForm.controls["username"].addValidators([
        Validators.required,
        Validators.minLength(5),
        Validators.maxLength(20)
      ]); 
      this.registerForm.controls["username"].updateValueAndValidity;

      this.registerForm.controls["email"].addValidators([
        Validators.required,
        Validators.pattern("^\\w{3,}.{0,1}\\w{0,}@{1}\\w{2,}.{1}\\w{2,}.{0,1}\\w{2,}$")
      ]); 
      this.registerForm.controls["email"].updateValueAndValidity;

      this.registerForm.controls["password"].addValidators([
        Validators.required,
        Validators.pattern("^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[ !\"#$%&'()*+,-./:;<=>?@\\[\\\\\\]^_`{|}~]).{8,25}$")
      ]); 
      this.registerForm.controls["password"].updateValueAndValidity;
      // this.cdRef.detectChanges();
    }, 0);   
  }

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
        sessionStorage.setItem('successMessage', this.successMessage);
        this.router.navigate(['/login']);
      },
      error: err => {
        this.isFailed = true;
        this.handleErrors(err.error);
      }
    });
  }

  handleErrors(errorMessage : string) {
    for (let error of errorMessage.split(';')) {
      this.errorsField.push(error.trim());
    }
    for (let errorField of this.errorsField) {
      this.errorsMap.set(errorField.split(' : ')[0], errorField.split(':')[1]);
    }
    if (this.errorsMap.has('email')) {
      this.isEmailError = true;
    }
    if (this.errorsMap.has('password')) {
      this.isPasswordError = true;
    }
  }

  private isButtonDisabled = false;
  registerButtonDisabled(): boolean {
    if(this.registerForm?.invalid || !this.isButtonDisabled){
      this.isButtonDisabled = true;
    }else{
      this.isButtonDisabled = false;
    }   
    return this.isButtonDisabled;
  }
}
