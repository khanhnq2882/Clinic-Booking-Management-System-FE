export class District {
    districtId: number;
    districtName: string;
    cityId: number;
  
    constructor(districtId: number, districtName: string, cityId: number) {
      this.districtId = districtId;
      this.districtName = districtName;
      this.cityId = cityId;
    }
  }
  