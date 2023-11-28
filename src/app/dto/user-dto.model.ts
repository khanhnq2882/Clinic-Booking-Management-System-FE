import { AddressResponse } from "../response/address-response.model";

export class UserDTO {
    userId !: number;
    userCode !: string;
    email !: string;
    firstName !: string;
    lastName !: string;
    dateOfBirth !: string;
    gender !: number;
    phoneNumber !: string;
    userAddress !: AddressResponse;
    roleNames : string[] = [];
    status !: string;
  }