import { UserDTO } from "../dto/user-dto.model";

export class UserPageResponse {
    totalItems !: number;
    users : UserDTO[] = [];
    totalPages !: string;
    currentPage !: string;
  }