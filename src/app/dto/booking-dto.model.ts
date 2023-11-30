import { AddressResponse } from "../response/address-response.model";

export class BookingDTO {
    bookingId !: number;
    bookingCode !: string;
    firstName !: string;
    lastName !: string;
    dateOfBirth !: string;
    gender !: number;
    phoneNumber !: string;
    userAddress !: AddressResponse;
    appointmentDate !: string;
    startTime !: string;
    endTime !: string;
    describeSymptoms !: string;
    status !: string;
  }