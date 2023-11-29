import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Observable, map } from 'rxjs';
import { ServiceCategoryDTO } from 'src/app/dto/service-category-dto.model';
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
  listServiceCategories: ServiceCategoryDTO[] = [];
  specializationId !: number;
  serviceCategoryId !: number;
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

  changeSpecialization(e: any) {
    this.adminService.getServiceCategories(e.target.value)
      .pipe(
        map((response) => {
          if (response) {
            return Object.values(response);
          }
          return [];
        })
      )
      .subscribe((result: ServiceCategoryDTO[]) => {
        this.listServiceCategories = result;
      });
      this.listServiceCategories = [];
  }

  changeServiceCategory(e: any) {
    this.serviceCategoryId = e.target.value;
  }

  onSubmit() {
    const addServiceRequest = {
      serviceCategoryId : this.serviceCategoryId,
      serviceName : this.addServiceForm.value.serviceName,
      price : this.addServiceForm.value.price,
      description : this.addServiceForm.value.description
    };
    this.adminService.addService(addServiceRequest).subscribe({
      next : data => {
        this.isSuccessful = true;
        this.successMessage = data.message;
      },
      error : err => {
        this.isFailed = true;
        this.errorMessage = err.error.message;
      }
    })

  }

}
