export class UserResponse {
    userId !: string;
    userCode !: string;
    email !: string;
    firstName !: string;
    lastName !: string;
    dateOfBirth !: string;
    gender !: number;
    phoneNumber !: string;
    specificAddress !: string;
    wardName !: string;
    districtName !: string;
    cityName !: string;
    roleNames : string[] = [];
    status !: string;
  }