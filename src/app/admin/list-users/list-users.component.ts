import { Component, OnInit } from '@angular/core';
import { AdminService } from '../../service/admin.service';
import { UserDTO } from 'src/app/dto/user-dto.model';

@Component({
  selector: 'app-list-users',
  templateUrl: './list-users.component.html',
  styleUrls: ['./list-users.component.css']
})
export class ListUsersComponent implements OnInit{
  listUsers: UserDTO[] = [];
  page = 1;
  size = 3;
  totalItems !: number;
  totalPages !: number;
  currentPage !: number;
  selectedValue : number = 3;
  pageSizes = [3,6,9];
  
  constructor(private adminService: AdminService) {}

  ngOnInit(): void {
    this.getUsers();
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

  getUsers() : void {
    const params = this.getRequestParams(this.page, this.size);
    this.adminService.getAllUsers(params).subscribe({
      next: data => {
        this.listUsers = data.users;
        this.totalPages = data.totalPages;
        this.currentPage = data.currentPage;
      },
      error : err => {
        console.log(err);
      }
    })
  }
  
  changePageSize(event : any) : void {
    this.selectedValue = 0;
    this.size = event.target.value;
    this.page = 1;
    this.getUsers();
  }

  getNumberArray(n: number): number[] {
    return Array.from({ length: n }, (_, index) => index);
  }

  previousPage() {
    if (this.currentPage > 0) {
      this.page = this.page - 1;
      this.getUsers();
    }
  }

  nextPage() {
    if (this.currentPage < this.totalPages) {
      this.page = this.page + 1;
    } 
    this.getUsers();
  }

  changePage(i : number) {
    this.page = i;
    this.getUsers();
  }

  firstPage() {
    if (this.currentPage != 0) {
      this.page = 1;
      this.getUsers();
    }
  }

  lastPage() {
   if (this.currentPage < this.totalPages) {
    this.page = this.totalPages;
    this.getUsers();
   } 
  }

}
