import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { map, Observable } from 'rxjs';
import { CityResponse } from 'src/app/response/city-response.model';
import { DistrictResponse } from 'src/app/response/district-response.model';
import { WardResponse } from 'src/app/response/ward-response.model';

@Component({
  selector: 'address-component',
  templateUrl: './address.component.html',
  styleUrls: ['./address.component.css']
})
export class AddressComponent {
  cities : CityResponse[] = [];
  districts : DistrictResponse[] = [];
  wards : WardResponse[] = [];
  id !: number;

  constructor(private httpClient: HttpClient) { }

  ngOnInit(): void {
    this.getCities().subscribe((result: CityResponse[]) => {
      this.cities = result;
    });
  }

  getCities(): Observable<CityResponse[]> {
    return this.httpClient
      .get<CityResponse[]>('http://localhost:8080/address/cities')
      .pipe(
        map((response) => {
          if (response) {
            return Object.values(response);
          }
          return [];
        })
      );
  }

  changeCity(e: any) {
    this.httpClient
      .get<DistrictResponse[]>(
        'http://localhost:8080/address/districts/' + e.target.value
      )
      .pipe(
        map((response) => {
          if (response) {
            return Object.values(response);
          }
          return [];
        })
      )
      .subscribe((result: DistrictResponse[]) => {
        this.districts = result;
      });
    this.wards = [];
  }

  changeDistrict(e: any) {
    this.httpClient
      .get<WardResponse[]>('http://localhost:8080/address/wards/' + e.target.value)
      .pipe(
        map((response) => {
          if (response) {
            return Object.values(response);
          }
          return [];
        })
      )
      .subscribe((result: WardResponse[]) => {
        this.wards = result;
      });
  }

  changeWard(e: any) {
    this.id = e.target.value;
  }
}
