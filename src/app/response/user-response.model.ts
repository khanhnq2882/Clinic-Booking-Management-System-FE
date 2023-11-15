import { Address } from "./address.model";

export class UserResponse {
    userCode !: string;
    email !: string;
    firstName !: string;
    lastName !: string;
    dateOfBirth !: string;
    gender !: number;
    phoneNumber !: string;
    address !: Address;
    roles : string[] = [];
    status !: string;
  }