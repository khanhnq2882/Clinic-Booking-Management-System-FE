export class Ward {
    wardId: number;
    wardName: string;
    districtId: number;
  
    constructor(wardId: number, wardName: string, districtId: number) {
      this.wardId = wardId;
      this.wardName = wardName;
      this.districtId = districtId;
    }
  }
  