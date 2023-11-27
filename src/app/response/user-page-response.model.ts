import { AddressResponse } from "./address-response.model";
import { UserResponse } from "./user-response.model";

export class UserPageResponse {
    totalItems !: number;
    users : UserResponse[] = [];
    totalPages !: string;
    currentPage !: string;
  }