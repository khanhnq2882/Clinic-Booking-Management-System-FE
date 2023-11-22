import { Component} from '@angular/core';
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
  isApproveSuccess = false;
  isApproveFail = false;
  successMessage = '';
  failMessage = '';

  constructor(private adminService: AdminService) {}

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
    $(`#${idTarget}`).modal('show');
  }

  approveRequest(userId : number) {
    this.adminService.approveRequestDoctor(userId).subscribe({
      next : data => {
        this.isApproveSuccess = true;
        this.successMessage = data.message;
      }, 
      error : err => {
        this.isApproveFail = true;
        this.failMessage = err.error.message;
      }
    })
  }


}


