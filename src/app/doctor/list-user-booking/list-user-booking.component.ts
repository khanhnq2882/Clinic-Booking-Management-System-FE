import { Component, OnInit } from '@angular/core';
import { BookingDTO } from 'src/app/dto/booking-dto.model';
import { DoctorService } from 'src/app/service/doctor.service';

@Component({
  selector: 'app-list-user-booking',
  templateUrl: './list-user-booking.component.html',
  styleUrls: ['./list-user-booking.component.css']
})
export class ListUserBookingComponent implements OnInit{
  bookings : BookingDTO[] = [];
  page = 1;
  size = 3;
  totalItems !: number;
  totalPages !: number;
  currentPage !: number;
  pageSizes = [3,6,9];
  selectedValue = 3;
  isConfirmedSuccess =  false;
  isCancelledSuccess = false;
  confirmedMessage !: string;
  cancelledMessage !: string;

  constructor(private doctorService: DoctorService) {}

  ngOnInit(): void {
    this.getBookings();
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

  getBookings() : void {
    const params = this.getRequestParams(this.page, this.size);
    this.doctorService.getUserBookings(params).subscribe({
      next: data => {
        this.bookings = data.bookings;
        this.totalPages = data.totalPages;
        this.currentPage = data.currentPage;
      },
      error : err => {
      }
    })
  }

  confirmedBooking(bookingId : number) {
    this.doctorService.confirmedBooking(bookingId).subscribe({
      next : data => {
        this.isConfirmedSuccess = true;
        this.confirmedMessage = data;
        window.location.reload();
      }, 
      error : err => {
        this.isConfirmedSuccess = false;
        this.confirmedMessage = err.error;
      }
    })
  }

  cancelledBooking(bookingId : number) {
    this.doctorService.cancelledBooking(bookingId).subscribe({
      next : data => {
        this.isCancelledSuccess = true;
        this.cancelledMessage = data;
        window.location.reload();
      }, 
      error : err => {
        this.isCancelledSuccess = false;
        this.cancelledMessage = err.error;
      }
    })
  }

  changePageSize(event : any) : void {
    this.size = event.target.value;
    this.page = 1;
    this.getBookings();
  }

  getNumberArray(n: number): number[] {
    return Array.from({ length: n }, (_, index) => index);
  }

  previousPage() {
    if (this.currentPage > 0) {
      this.page = this.page - 1;
      this.getBookings();
    }
  }

  nextPage() {
    if (this.currentPage < this.totalPages) {
      this.page = this.page + 1;
    } 
    this.getBookings();
  }

  changePage(i : number) {
    this.page = i;
    this.getBookings();
  }

  firstPage() {
    if (this.currentPage != 0) {
      this.page = 1;
      this.getBookings();
    }
  }

  lastPage() {
   if (this.currentPage < this.totalPages) {
    this.page = this.totalPages;
    this.getBookings();
   } 
  }
}
