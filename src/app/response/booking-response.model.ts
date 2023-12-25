import { BookingDTO } from "../dto/booking-dto.model";

export class BookingPageResponse {
    totalItems !: number;
    users : BookingDTO[] = [];
    totalPages !: string;
    currentPage !: string;
  }