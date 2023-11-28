import { ServicesResponse } from "./service-response.model";

export class ServicePageResponse {
    totalItems !: number;
    services : ServicesResponse[] = [];
    totalPages !: string;
    currentPage !: string;
  }