import { HttpClient, HttpHeaders} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

const DOCTOR_API = 'http://localhost:8080/doctor/';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class DoctorService {

  constructor(private httpClient: HttpClient) { }

  public getUserBookings(params: any) : Observable<any>{
    return this.httpClient.get<any>(DOCTOR_API+'get-all-user-bookings', {params});
  }

  public confirmedBooking(bookingId: number) : Observable<any> {
    return this.httpClient.post(DOCTOR_API+'confirmed-booking/'+bookingId, httpOptions);
  }

  public cancelledBooking(bookingId: number) : Observable<any> {
    return this.httpClient.post(DOCTOR_API+'cancelled-booking/'+bookingId, httpOptions);
  }


}
