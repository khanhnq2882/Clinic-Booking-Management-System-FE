import { Component } from '@angular/core';
import { AdminService } from '../../service/admin.service';
import { DoctorDTO } from 'src/app/dto/doctor-dto.model';

@Component({
  selector: 'app-list-doctors',
  templateUrl: './list-doctors.component.html',
  styleUrls: ['./list-doctors.component.css']
})
export class ListDoctorsComponent {
  listDoctors: DoctorDTO[] = [];
  page = 1;
  size = 3;
  totalItems !: number;
  totalPages !: number;
  currentPage !: number;
  pageSizes = [1,3,6,9];

  constructor(private adminService: AdminService) {}

  ngOnInit(): void {
    this.getDoctors();
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

  getDoctors() : void {
    const params = this.getRequestParams(this.page, this.size);
    this.adminService.getAllDoctors(params).subscribe({
      next: data => {
        this.listDoctors = data.doctors;
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
    this.getDoctors();
  }

  getNumberArray(n: number): number[] {
    return Array.from({ length: n }, (_, index) => index);
  }

  previousPage() {
    if (this.currentPage > 0) {
      this.page = this.page - 1;
      this.getDoctors();
    }
  }

  nextPage() {
    if (this.currentPage < this.totalPages) {
      this.page = this.page + 1;
    } 
    this.getDoctors();
  }

  changePage(i : number) {
    this.page = i;
    this.getDoctors();
  }

  firstPage() {
    if (this.currentPage != 0) {
      this.page = 1;
      this.getDoctors();
    }
  }

  lastPage() {
   if (this.currentPage < this.totalPages) {
    this.page = this.totalPages;
    this.getDoctors();
   } 
  }
}
