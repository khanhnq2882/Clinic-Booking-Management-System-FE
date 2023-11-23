import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Observable, map } from 'rxjs';
import { ServiceCategoryResponse } from 'src/app/response/service-category-response.model';
import { SpecializationResponse } from 'src/app/response/specialization-response.model';
import { AdminService } from 'src/app/service/admin.service';

@Component({
  selector: 'app-add-service',
  templateUrl: './add-service.component.html',
  styleUrls: ['./add-service.component.css']
})
export class AddServiceComponent implements OnInit{
  @ViewChild('addServiceForm', {static: false}) addServiceForm !: NgForm;

  listSpecializations: SpecializationResponse[] = [];
  listServiceCategories: ServiceCategoryResponse[] = [];
  specializationId !: number;
  isSuccessful = false;
  isFailed = false;
  successMessage = '';
  errorMessage = '';

  constructor(private adminService : AdminService) {}

  ngOnInit(): void {
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



}
