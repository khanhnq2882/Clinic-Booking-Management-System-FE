import { Component, OnInit } from '@angular/core';
import { Observable, map } from 'rxjs';
import { BookingDTO } from 'src/app/dto/booking-dto.model';
import { DoctorService } from 'src/app/service/doctor.service';

@Component({
  selector: 'app-list-user-booking',
  templateUrl: './list-user-booking.component.html',
  styleUrls: ['./list-user-booking.component.css']
})
export class ListUserBookingComponent implements OnInit{
  bookings : BookingDTO[] = [];

  constructor(private doctorService: DoctorService) {}

  ngOnInit(): void {
    this.getAllUserBookings().subscribe((result: BookingDTO[]) => {
      this.bookings = result;   
    });
  }

  getAllUserBookings(): Observable<BookingDTO[]>  {
    return this.doctorService.getAllUserBookings()
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
