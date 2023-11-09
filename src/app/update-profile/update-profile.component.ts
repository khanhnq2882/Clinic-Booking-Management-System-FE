import { Component, OnInit, ViewChild } from '@angular/core';
import { City } from '../request/city.model';
import { Observable, map } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { District } from '../request/district.model';
import { Ward } from '../request/ward.model';
import { UserService } from '../service/user.service';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-update-profile',
  templateUrl: './update-profile.component.html',
  styleUrls: ['./update-profile.component.css']
})
export class UpdateProfileComponent implements OnInit{
  @ViewChild('updateProfileForm', {static: false}) updateProfileForm !: NgForm;

  isSuccessful = false;
  isFailed = false;
  errorMessage = '';
  successMessage = '';
  cities: City[] = [];
  districts: District[] = [];
  wards: Ward[] = [];
  id : number = 0;

  constructor(private httpClient: HttpClient, private userService: UserService) {}

  ngOnInit(): void {
    this.getCities().subscribe((result: City[]) => {
      this.cities = result;
    });
  }

  getCities():Observable<City[]> {
    return this.httpClient.get<City[]>('http://localhost:8080/address/cities', )
     .pipe(map(response=> {
        if(response){
           return Object.values(response);
         }
         return [];
     }));
  }

  changeCity(e: any) {
    this.httpClient.get<District[]>('http://localhost:8080/address/districts/'+e.target.value, )
     .pipe(map(response=> {
        if(response){
           return Object.values(response);
         }
         return [];
     })).subscribe((result: District[]) => {
      this.districts = result;
    });
    this.wards = [];
  }

  changeDistrict(e: any) {
    this.httpClient.get<Ward[]>('http://localhost:8080/address/wards/'+e.target.value, )
     .pipe(map(response=> {
        if(response){
           return Object.values(response);
         }
         return [];
     })).subscribe((result: Ward[]) => {
      this.wards = result;
    });
  }

  changeWard(e : any) {
    this.id = e.target.value;
  }

  onSubmit() {
    const updateProfileRequest = {
      firstName: this.updateProfileForm.value.firstName,
      lastName: this.updateProfileForm.value.lastName,
      dateOfBirth: this.updateProfileForm.value.dateOfBirth,
      gender: this.updateProfileForm.value.gender,
      phoneNumber: this.updateProfileForm.value.phoneNumber,
      specificAddress: this.updateProfileForm.value.specificAddress,
      wardId : this.id
    }
    this.userService.updateProfile(updateProfileRequest).subscribe({
      next : data => {
        this.isSuccessful = true;
        this.successMessage = data.message;
      }, 
      error: err => {
        this.isFailed = true;
        this.errorMessage = err.error.message;
      }
    })

  }

}
