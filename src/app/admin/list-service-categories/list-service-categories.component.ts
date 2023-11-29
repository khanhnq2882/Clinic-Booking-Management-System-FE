import { Component, OnInit } from '@angular/core';
import { ServiceCategoryDTO } from 'src/app/dto/service-category-dto.model';
import { AdminService } from 'src/app/service/admin.service';

@Component({
  selector: 'app-list-service-categories',
  templateUrl: './list-service-categories.component.html',
  styleUrls: ['./list-service-categories.component.css']
})
export class ListServiceCategoriesComponent implements OnInit{

  listServiceCategories: ServiceCategoryDTO[] = [];
  page = 1;
  size = 3;
  totalItems !: number;
  totalPages !: number;
  currentPage !: number;
  pageSizes = [1,3,6,9];

  constructor(private adminService: AdminService) {}

  ngOnInit(): void {
    this.getServiceCategories();
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

  getServiceCategories() : void {
    const params = this.getRequestParams(this.page, this.size);
    this.adminService.getAllServiceCategories(params).subscribe({
      next: data => {
        this.listServiceCategories = data.serviceCategories;
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
    this.getServiceCategories();
  }

  getNumberArray(n: number): number[] {
    return Array.from({ length: n }, (_, index) => index);
  }

  previousPage() {
    if (this.currentPage > 0) {
      this.page = this.page - 1;
      this.getServiceCategories();
    }
  }

  nextPage() {
    if (this.currentPage < this.totalPages) {
      this.page = this.page + 1;
    } 
    this.getServiceCategories();
  }

  changePage(i : number) {
    this.page = i;
    this.getServiceCategories();
  }

  firstPage() {
    if (this.currentPage != 0) {
      this.page = 1;
      this.getServiceCategories();
    }
  }

  lastPage() {
   if (this.currentPage < this.totalPages) {
    this.page = this.totalPages;
    this.getServiceCategories();
   } 
  }

}
