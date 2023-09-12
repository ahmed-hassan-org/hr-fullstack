export interface HttpResponseModel {
  data?: any;
  status?: string;
  errors?: string[];
  pagination: PaginationModel;
}

export interface PaginationModel {
  page: number;
}
