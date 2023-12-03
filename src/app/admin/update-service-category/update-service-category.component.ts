import { Component, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { map, Observable } from 'rxjs';
import { SpecializationResponse } from 'src/app/response/specialization-response.model';
import { AdminService } from 'src/app/service/admin.service';

@Component({
  selector: 'app-update-service-category',
  templateUrl: './update-service-category.component.html',
  styleUrls: ['./update-service-category.component.css']
})
export class UpdateServiceCategoryComponent {
  @ViewChild('updateServiceCategoryForm', {static: false}) updateServiceCategoryForm !: NgForm;

  listSpecializations: SpecializationResponse[] = [];
  specializationId !: number;
  isSuccessful = false;
  isFailed = false;
  successMessage = '';
  errorMessage = '';
  serviceCategoryId !: number;
  
  constructor(private adminService : AdminService, private route : ActivatedRoute, private router : Router) {}

  ngOnInit(): void {
    this.serviceCategoryId = this.route.snapshot.params['serviceCategoryId'];
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
    const updateServiceCategoryForm = {
      specializationId : this.specializationId,
      serviceCategoryName : this.updateServiceCategoryForm.value.serviceCategoryName,
      description : this.updateServiceCategoryForm.value.description
    };
    this.adminService.updateServiceCategory(this.serviceCategoryId , updateServiceCategoryForm).subscribe({
      next : data => {
        this.isSuccessful = true;
        this.successMessage = data.message;
        this.router.navigate(['/list-service-categories']);
      },
      error : err => {
        this.isFailed = true;
        this.errorMessage = err.error;
      }
    })

  }


}
