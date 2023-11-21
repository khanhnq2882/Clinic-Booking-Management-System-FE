import { Component, ElementRef } from '@angular/core';
import { RequestDoctorResponse } from '../response/request-doctor-response.model';
import { AdminService } from '../service/admin.service';
import { Observable, map } from 'rxjs';

declare var $: any;

@Component({
  selector: 'app-list-request-become-doctor',
  templateUrl: './list-request-become-doctor.component.html',
  styleUrls: ['./list-request-become-doctor.component.css']
})
export class ListRequestBecomeDoctorComponent {

  listRequestDoctors: RequestDoctorResponse[] = [];

  constructor(private adminService: AdminService,
    private el: ElementRef) {}

  ngOnInit(): void {
    this.getAllRequestDoctors().subscribe((result: RequestDoctorResponse[]) => {
      this.listRequestDoctors = result;   
    });
  }

  getAllRequestDoctors(): Observable<RequestDoctorResponse[]>  {
    return this.adminService.getAllRequestDoctors()
    .pipe(
      map((response) => {
        if (response) {
          return Object.values(response);
        }
        return [];
      })
    );
  }

  showExperiences(idTarget: string) {
    console.log(idTarget);
    $(`#${idTarget}`).modal('show');
  }
}


