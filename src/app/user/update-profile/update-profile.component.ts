import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { Observable, map } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { UserService } from '../../service/user.service';
import { NgForm, Validators } from '@angular/forms';
import { CityResponse } from 'src/app/response/city-response.model';
import { DistrictResponse } from 'src/app/response/district-response.model';
import { WardResponse } from 'src/app/response/ward-response.model';

@Component({
  selector: 'app-update-profile',
  templateUrl: './update-profile.component.html',
  styleUrls: ['./update-profile.component.css'],
})
export class UpdateProfileComponent implements OnInit, AfterViewInit{
  @ViewChild('updateProfileForm', { static: false }) updateProfileForm!: NgForm;

  isSuccessful = false;
  isFailed = false;
  errorMessage = '';
  successMessage = '';
  cities: CityResponse[] = [];
  districts: DistrictResponse[] = [];
  wards: WardResponse[] = [];
  wardId !: number;
  gender : number = 1;
  selectedFiles?: FileList;
  currentFile?: File;
  message = '';
  preview = '';
  selectedCity = 0;
  selectedValue = 0;
  isDistrictsDisabled = false;
  isWardsDisabled = false;
  isButtonDisabled = false;

  constructor(
    private httpClient: HttpClient,
    private userService: UserService,
  ) {}

  ngOnInit(): void {
    this.getCities().subscribe((result: CityResponse[]) => {
      this.cities = result;
    });
    if (this.selectedCity == 0) {
      this.isDistrictsDisabled = true;
      this.isWardsDisabled = true;
    }
  }

  ngAfterViewInit(): void {
    setTimeout(() => {
      this.updateProfileForm.controls["firstName"].addValidators([
        Validators.required,
        Validators.maxLength(20)
      ]); 
      this.updateProfileForm.controls["firstName"].updateValueAndValidity;

      this.updateProfileForm.controls["lastName"].addValidators([
        Validators.required,
        Validators.maxLength(20)
      ]); 
      this.updateProfileForm.controls["lastName"].updateValueAndValidity;

      this.updateProfileForm.controls["phoneNumber"].addValidators([
        Validators.required,
        Validators.pattern("^0[2|3|5|7|8|9][0-9]{8}$")
      ]); 
      this.updateProfileForm.controls["phoneNumber"].updateValueAndValidity;

      this.updateProfileForm.controls["specificAddress"].addValidators([
        Validators.required,
        Validators.maxLength(100)
      ]); 
      this.updateProfileForm.controls["specificAddress"].updateValueAndValidity;
    }, 0); 
  }

  getCities(): Observable<CityResponse[]> {
    return this.httpClient
      .get<CityResponse[]>('http://localhost:8080/address/cities')
      .pipe(
        map((response) => {
          if (response) {
            return Object.values(response);
          }
          return [];
        })
      );
  }

  changeCity(e: any) {
    this.httpClient
      .get<DistrictResponse[]>(
        'http://localhost:8080/address/districts/' + e.target.value
      )
      .pipe(
        map((response) => {
          if (response) {
            return Object.values(response);
          }
          return [];
        })
      )
      .subscribe((result: DistrictResponse[]) => {
        this.districts = result;
      });
      if (e.target.value == 0) {
        this.isDistrictsDisabled = true;
        this.isWardsDisabled = true;
      } else {
        this.isDistrictsDisabled = false;
      }
    this.wards = [];
  }

  changeDistrict(e: any) {
    this.httpClient
      .get<WardResponse[]>('http://localhost:8080/address/wards/' + e.target.value)
      .pipe(
        map((response) => {
          if (response) {
            return Object.values(response);
          }
          return [];
        })
      )
      .subscribe((result: WardResponse[]) => {
        this.wards = result;
      });
      if (e.target.value == 0) {
        this.isWardsDisabled = true;
      } else {
        this.isWardsDisabled = false;
      }
  }

  changeWard(e: any) {
    if (e.target.value != 0) {
      this.wardId = e.target.value;
    }
  }

  onSubmit() {
    const formData = new FormData();
    const updateProfileRequest = {
      firstName: this.updateProfileForm.value.firstName,
      lastName: this.updateProfileForm.value.lastName,
      dateOfBirth: this.updateProfileForm.value.dateOfBirth,
      gender: this.gender,
      phoneNumber: this.updateProfileForm.value.phoneNumber,
      specificAddress: this.updateProfileForm.value.specificAddress,
      wardId: this.wardId,
    };
    const userProfileJson = JSON.stringify(updateProfileRequest);
    const userProfileBlob = new Blob([userProfileJson], {type: 'application/json'})
    formData.append('userprofile', userProfileJson);
    if (this.currentFile) {
      formData.append('avatar', this.currentFile);
    }
    console.log(formData.get('userprofile'));

    this.userService.updateProfile(formData).subscribe({
      next: (data) => {
        this.isSuccessful = true;
        this.successMessage = data.message;
        this.reloadPage();
      },
      error: (err) => {
        this.isFailed = true;
        this.errorMessage = err.error;
      },
    });
  }

  selectedFile(event: any){
    this.message = '';
    this.preview = '';
    this.selectedFiles = event.target.files;
    if (this.selectedFiles) {
      const file: File | null = this.selectedFiles.item(0);
      if (file) {
        this.preview = '';
        this.currentFile = file;
        const reader = new FileReader();
        reader.onload = (e: any) => {
          console.log(e.target.result);
          this.preview = e.target.result;
        };
        reader.readAsDataURL(this.currentFile);
      }
    }
  }

  reloadPage(): void {
    window.location.reload();
  }

  onChange(e : any) {
    if (e.target.value == "1") {
      this.gender = 1;
    }       
    this.gender = 0;
  }

  updateProfileButtonDisabled(): boolean {
    if(this.updateProfileForm?.invalid || !this.isButtonDisabled){
      this.isButtonDisabled = true;
    }else{
      this.isButtonDisabled = false;
    }   
    return this.isButtonDisabled;
  }
}

