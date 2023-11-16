import { Component, OnInit } from '@angular/core';
import { map, Observable } from 'rxjs';
import { UserResponse } from '../response/user-response.model';
import { AdminService } from '../service/admin.service';

@Component({
  selector: 'app-list-users',
  templateUrl: './list-users.component.html',
  styleUrls: ['./list-users.component.css']
})
export class ListUsersComponent implements OnInit{
  listUsers: UserResponse[] = [];
  userGender: string = '';
  userAddress: string = '';
  userRoles: string = '';

  constructor(private adminService: AdminService) {}

  ngOnInit(): void {
    this.getAllUsers().subscribe((result: UserResponse[]) => {
      this.listUsers = result;
      for (let user of this.listUsers) {
        if (user.gender == 1) {
          this.userGender = 'Male';
        } 
        this.userGender = 'Female';
        this.userAddress = user.specificAddress+', '+user.wardName+', '+user.districtName+', '+user.cityName;
        this.userRoles = user.roles.join(', ');
      }     
    });
  }

  getAllUsers(): Observable<UserResponse[]>  {
    return this.adminService.getAllUsers()
    .pipe(
      map((response) => {
        if (response) {
          return Object.values(response);
        }
        return [];
      })
    );
  }


}
