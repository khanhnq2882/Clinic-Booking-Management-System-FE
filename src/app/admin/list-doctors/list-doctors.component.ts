import { Component } from '@angular/core';
import { map, Observable } from 'rxjs';
import { DoctorResponse } from '../../response/doctor-response.model';
import { AdminService } from '../../service/admin.service';

@Component({
  selector: 'app-list-doctors',
  templateUrl: './list-doctors.component.html',
  styleUrls: ['./list-doctors.component.css']
})
export class ListDoctorsComponent {
  listDoctors: DoctorResponse[] = [];

  constructor(private adminService: AdminService) {}

  ngOnInit(): void {
    this.getAllDoctors().subscribe((result: DoctorResponse[]) => {
      this.listDoctors = result;   
    });
  }

  getAllDoctors(): Observable<DoctorResponse[]>  {
    return this.adminService.getAllDoctors()
    .pipe(
      map((response) => {
        if (response) {
          return Object.values(response);
        }
        return [];
      })
    );
  }

}
