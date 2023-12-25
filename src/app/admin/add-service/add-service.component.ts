import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
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
  selectedSpecialization = 0;
  selectedValue = 0;
  isServiceCategoriesDisabled = false;


  constructor(private adminService : AdminService, private router : Router) {}

  ngOnInit(): void {
    this.getAllSpecializations().subscribe((result: SpecializationResponse[]) => {
      this.listSpecializations = result;
    });
    if (this.selectedSpecialization == 0) {
      this.isServiceCategoriesDisabled = true;
    }
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
      if (e.target.value == 0) {
        this.isServiceCategoriesDisabled = true;
      } else {
        this.isServiceCategoriesDisabled = false;
      }
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
        this.router.navigate(['/list-services']).then(() => window.location.reload());
      },
      error : err => {
        this.isFailed = true;
        this.errorMessage = err.error.message;
      }
    })

  }

}
