import { AddressResponse } from "./address-response.model";
import { WorkScheduleResponse } from "./work-schedule-response.model";

export class DoctorResponse {
    userId !: number;
    userCode !: string;
    email !: string;
    firstName !: string;
    lastName !: string;
    phoneNumber !: string;
    doctorAddress !: AddressResponse;
    specializationName !: string;
    workSchedules : WorkScheduleResponse[] = [];
    status !: string;
  }