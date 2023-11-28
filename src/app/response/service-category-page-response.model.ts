import { ServiceCategoryResponse } from "./service-category-response.model";

export class ServiceCategoryPageResponse {
    totalItems !: number;
    serviceCategories : ServiceCategoryResponse[] = [];
    totalPages !: string;
    currentPage !: string;
  }