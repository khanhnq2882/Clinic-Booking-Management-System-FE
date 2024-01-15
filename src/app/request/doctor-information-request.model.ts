import { WorkScheduleDTO } from "../dto/work-schedule-dto.model";

export class DoctorProfileRequest {
    firstName!: string;
    lastName !: string;
    dateOfBirth !: string;
    gender !: number;
    phoneNumber !: string;
    specificAddress !: string;
    wardId !: number;
    workSchedules : WorkScheduleDTO[] = [];
    describeExperiences !: string;
  }
  