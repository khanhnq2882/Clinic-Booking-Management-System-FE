import { AddressResponse } from "../response/address-response.model";
import { WorkScheduleDTO } from "./work-schedule-dto.model";

export class DoctorDTO {
    userId !: number;
    userCode !: string;
    email !: string;
    firstName !: string;
    lastName !: string;
    phoneNumber !: string;
    doctorAddress !: AddressResponse;
    specializationName !: string;
    workSchedules : WorkScheduleDTO[] = [];
    status !: string;
  }