import { Component, OnInit } from '@angular/core';
import { BookingDTO } from 'src/app/dto/booking-dto.model';
import { AdminService } from 'src/app/service/admin.service';

@Component({
  selector: 'app-list-bookings',
  templateUrl: './list-bookings.component.html',
  styleUrls: ['./list-bookings.component.css']
})
export class ListBookingsComponent implements OnInit{
  bookings : BookingDTO[] = [];
  isSuccess = false;
  isFail = false;
  successMessage = '';
  errorMessage = '';
  selectedFiles?: FileList;
  currentFile?: File;
  message = '';

  constructor(private adminService: AdminService) {}

  ngOnInit(): void {
    this.getBookings();
  }

  getBookings() : void {
    this.adminService.getBookings().subscribe({
      next: data => {
        this.bookings = data;
      },
      error : err => {
      }
    })
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

  importBookingsFromExcel() {
    if (this.selectedFiles) {
      const file: File | null = this.selectedFiles.item(0);
      if (file) {
        this.currentFile = file;
        this.adminService.importBookingsFromExcel(this.currentFile).subscribe({
          next: (data: any) => {
            this.isSuccess = true;
            this.successMessage = data.message;
          },
          error: (err: any) => {
            this.isFail = true;
            this.errorMessage = err.error.message;
            this.currentFile = undefined;
          },
        });
      }
      this.selectedFiles = undefined;
    }
  }

}
