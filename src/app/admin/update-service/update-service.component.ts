import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { map } from 'rxjs';
import { ServiceCategoryDTO } from 'src/app/dto/service-category-dto.model';
import { ServicesDTO } from 'src/app/dto/services-dto.model';
import { SpecializationResponse } from 'src/app/response/specialization-response.model';
import { AdminService } from 'src/app/service/admin.service';

@Component({
  selector: 'app-update-service',
  templateUrl: './update-service.component.html',
  styleUrls: ['./update-service.component.css']
})
export class UpdateServiceComponent implements OnInit{
  @ViewChild('updateServiceForm', { static: false })
  updateServiceForm!: NgForm;

  listSpecializations: SpecializationResponse[] = [];
  service !: ServicesDTO;
  specializationId!: number;
  isSuccessful = false;
  isFailed = false;
  successMessage = '';
  errorMessage = '';
  serviceId!: number;

  listServiceCategories: ServiceCategoryDTO[] = [];
  serviceCategoryId !: number;
  selectedSpecialization = 0;
  selectedValue = 0;
  isServiceCategoriesDisabled = false;

  constructor(
    private adminService: AdminService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.serviceId = this.route.snapshot.params['serviceId'];
    this.adminService
    .getService(this.serviceId)
    .subscribe((result: ServicesDTO) => {
      this.service = result;
    });
  // this.getAllSpecializations().subscribe(
  //   (result: SpecializationResponse[]) => {
  //     this.listSpecializations = result;
  //   }
  // );
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
  }

}
