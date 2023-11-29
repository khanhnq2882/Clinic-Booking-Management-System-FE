import { ServiceCategoryDTO } from "../dto/service-category-dto.model";

export class ServiceCategoryPageResponse {
    totalItems !: number;
    serviceCategories : ServiceCategoryDTO[] = [];
    totalPages !: string;
    currentPage !: string;
  }