import { Component, OnInit } from '@angular/core';
import { UserResponse } from '../../response/user-response.model';
import { AdminService } from '../../service/admin.service';

@Component({
  selector: 'app-list-users',
  templateUrl: './list-users.component.html',
  styleUrls: ['./list-users.component.css']
})
export class ListUsersComponent implements OnInit{
  listUsers: UserResponse[] = [];
  page = 1;
  size = 3;
  totalItems !: number;
  totalPages !: number;
  currentPage !: number;
  pageSize !: number;
  pageSizes = [1,3,6,9];

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
        console.log(this.currentPage);
        console.log(this.totalPages);
      },
      error : err => {
        console.log(err);
      }
    })
  }
  
  changePageSize(event : any) : void {
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
      this.getUsers();
      console.log(this.listUsers);
    }
  }

}
