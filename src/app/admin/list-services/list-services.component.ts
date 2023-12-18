import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ServicesDTO } from 'src/app/dto/services-dto.model';
import { AdminService } from 'src/app/service/admin.service';

@Component({
  selector: 'app-list-services',
  templateUrl: './list-services.component.html',
  styleUrls: ['./list-services.component.css']
})
export class ListServicesComponent implements OnInit{
  listServices: ServicesDTO[] = [];
  page = 1;
  size = 3;
  totalItems !: number;
  totalPages !: number;
  currentPage !: number;
  selectedValue : number = 3;
  pageSizes = [3,6,9];
  isSuccess = false;
  isFail = false;
  successMessage = '';
  errorMessage = '';
  selectedFiles?: FileList;
  currentFile?: File;
  message = '';

  constructor(private adminService: AdminService, private router : Router) {}

  ngOnInit(): void {
    this.getServices();
  }

  getRequestParams(page : number, size : number) : any{
    let params : any = {};
    if (page) {
      params['page'] = page - 1;
    }
    if (size) {
      params['size'] = size;
    }
    return params;
  }

  getServices() : void {
    const params = this.getRequestParams(this.page, this.size);
    this.adminService.getAllServices(params).subscribe({
      next: data => {
        this.listServices = data.services;
        this.totalPages = data.totalPages;
        this.currentPage = data.currentPage;
      },
      error : err => {
        console.log(err);
      }
    })
  }
  
  changePageSize(event : any) : void {
    this.size = event.target.value;
    this.page = 1;
    this.getServices();
  }

  getNumberArray(n: number): number[] {
    return Array.from({ length: n }, (_, index) => index);
  }

  previousPage() {
    if (this.currentPage > 0) {
      this.page = this.page - 1;
      this.getServices();
    }
  }

  nextPage() {
    if (this.currentPage < this.totalPages) {
      this.page = this.page + 1;
    } 
    this.getServices();
  }

  changePage(i : number) {
    this.page = i;
    this.getServices();
  }

  firstPage() {
    if (this.currentPage != 0) {
      this.page = 1;
      this.getServices();
    }
  }

  lastPage() {
   if (this.currentPage < this.totalPages) {
    this.page = this.totalPages;
    this.getServices();
   } 
  }

  navigateToUpdate(serviceId : number) : void {
    this.router.navigate(['update-service', serviceId]);
  }

  selectFile(event: any): void {
    this.message = '';
    this.selectedFiles = event.target.files;
    if (this.selectedFiles) {
      const file: File | null = this.selectedFiles.item(0);
      if (file) {
        this.currentFile = file;
        const reader = new FileReader();
        reader.onload = (e: any) => {
          console.log(e.target.result);
        };
        reader.readAsDataURL(this.currentFile);
      }
    }
  }

  importServicesFromExcel() {
    if (this.selectedFiles) {
      const file: File | null = this.selectedFiles.item(0);
      if (file) {
        this.currentFile = file;
        this.adminService.importServicesFromExcel(this.currentFile).subscribe({
          next: (data: any) => {
            this.isSuccess = true;
            this.successMessage = data.message;
          },
          error: (err: any) => {
            this.isFail = true;
            this.errorMessage = err.error;
            this.currentFile = undefined;
          },
        });
      }
      this.selectedFiles = undefined;
    }
  }
  
}
