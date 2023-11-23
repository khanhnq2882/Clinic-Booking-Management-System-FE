import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Observable, map } from 'rxjs';
import { SpecializationResponse } from 'src/app/response/specialization-response.model';
import { AdminService } from 'src/app/service/admin.service';

@Component({
  selector: 'app-add-service-category',
  templateUrl: './add-service-category.component.html',
  styleUrls: ['./add-service-category.component.css']
})
export class AddServiceCategoryComponent implements OnInit{
  @ViewChild('addServiceCategoryForm', {static: false}) addServiceCategoryForm !: NgForm;

  listSpecializations: SpecializationResponse[] = [];
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

  changeSpecialization(e: any) {
    this.specializationId = e.target.value;
  }

  onSubmit() {
    const addServiceCategoryForm = {
      specializationId : this.specializationId,
      serviceCategoryName : this.addServiceCategoryForm.value.serviceCategoryName,
      description : this.addServiceCategoryForm.value.description
    };
    this.adminService.addServiceCategory(addServiceCategoryForm).subscribe({
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
