import { HttpClient } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { map, Observable } from 'rxjs';
import { CityResponse } from 'src/app/response/city-response.model';
import { DistrictResponse } from 'src/app/response/district-response.model';
import { SpecializationResponse } from 'src/app/response/specialization-response.model';
import { WardResponse } from 'src/app/response/ward-response.model';
import { AdminService } from 'src/app/service/admin.service';
import { UserService } from 'src/app/service/user.service';
import { DoctorDTO } from 'src/app/dto/doctor-dto.model';
import { WorkScheduleDTO } from 'src/app/dto/work-schedule-dto.model';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-booking-appointment',
  templateUrl: './booking-appointment.component.html',
  styleUrls: ['./booking-appointment.component.css']
})
export class BookingAppointmentComponent implements OnInit {
   @ViewChild('addBookingAppointmentForm', {static: false}) addBookingAppointmentForm !: NgForm;

  isSuccessful = false;
  isFailed = false;
  errorMessage = '';
  successMessage = '';
  cities: CityResponse[] = [];
  districts: DistrictResponse[] = [];
  wards: WardResponse[] = [];
  wardId !: number;
  listSpecializations: SpecializationResponse[] = [];
  listDoctors : DoctorDTO[] = [];
  listWorkSchedules : WorkScheduleDTO[] = [];
  specializationId !: number;
  workScheduleId !: number;

  constructor(
    private httpClient: HttpClient,
    private userService: UserService,
    private adminService: AdminService
  ) {}

  ngOnInit(): void {
    this.getCities().subscribe((result: CityResponse[]) => {
      this.cities = result;
    });
    this.getAllSpecializations().subscribe((result: SpecializationResponse[]) => {
      this.listSpecializations = result;
    });
  }

  getAllSpecializations(): Observable<SpecializationResponse[]>  {
    return this.adminService.getAllSpecializations()
    .pipe(
      map((response) => {
        if (response) {
          return Object.values(response);
        }
        return [];
      })
    );
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
  }

  changeWard(e: any) {
    this.wardId = e.target.value;
  }

  changeSpecialization(e: any) {
    this.userService.getDoctorsBySpecialization(e.target.value)
      .pipe(
        map((response) => {
          if (response) {
            return Object.values(response);
          }
          return [];
        })
      )
      .subscribe((result: DoctorDTO[]) => {
        this.listDoctors = result;
      });
      this.listDoctors = [];
  }

  changeDoctor(e: any) {
    this.userService.getWorkSchedulesByDoctor(e.target.value)
    .pipe(
      map((response) => {
        if (response) {
          return Object.values(response);
        }
        return [];
      })
    )
    .subscribe((result: WorkScheduleDTO[]) => {
      this.listWorkSchedules = result;
    });
    this.listWorkSchedules = [];
  }

  changeWorkSchedule (e: any) {
    this.workScheduleId = e.target.value;
  }

  onSubmit() {
    const bookingAppointmentRequest = {
      firstName: this.addBookingAppointmentForm.value.firstName,
      lastName: this.addBookingAppointmentForm.value.lastName,
      dateOfBirth: this.addBookingAppointmentForm.value.dateOfBirth,
      gender: this.addBookingAppointmentForm.value.gender,
      phoneNumber: this.addBookingAppointmentForm.value.phoneNumber,
      specificAddress: this.addBookingAppointmentForm.value.specificAddress,
      wardId: this.wardId,
      appointmentDate : this.addBookingAppointmentForm.value.appointmentDate,
      workScheduleId : this.workScheduleId,
      describeSymptoms : this.addBookingAppointmentForm.value.describeSymptoms
    }
    this.userService.bookingAppointment(bookingAppointmentRequest).subscribe({
      next : data => {
        this.isSuccessful = true;
        this.successMessage = data;
      },
      error : err => {
        this.isFailed = true;
        this.errorMessage = err.error;
      }
    })
  }

}
