import { DoctorDTO } from "../dto/doctor-dto.model";

export class DoctorPageResponse {
    totalItems !: number;
    doctors : DoctorDTO[] = [];
    totalPages !: string;
    currentPage !: string;
  }