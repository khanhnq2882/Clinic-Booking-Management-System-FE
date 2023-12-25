import { ServicesDTO } from "../dto/services-dto.model";

export class ServicePageResponse {
    totalItems !: number;
    services : ServicesDTO[] = [];
    totalPages !: string;
    currentPage !: string;
  }