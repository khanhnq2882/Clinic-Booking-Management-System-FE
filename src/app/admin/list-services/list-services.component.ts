import { Component, OnInit } from '@angular/core';
import { map, Observable } from 'rxjs';
import { ServicesResponse } from 'src/app/response/service-response.model';
import { AdminService } from 'src/app/service/admin.service';

@Component({
  selector: 'app-list-services',
  templateUrl: './list-services.component.html',
  styleUrls: ['./list-services.component.css']
})
export class ListServicesComponent implements OnInit{
  listServices: ServicesResponse[] = [];

  constructor(private adminService: AdminService) {}

  ngOnInit(): void {
    this.getAllServices().subscribe((result: ServicesResponse[]) => {
      this.listServices = result;   
    });
  }

  getAllServices(): Observable<ServicesResponse[]>  {
    return this.adminService.getAllServices()
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
