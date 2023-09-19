export interface HttpResponseModel {
  data?: any;
  httpStatus?: string;
  message?: string;
  errors?: string[];
  pagination?: PaginationModel;
}

export interface PaginationModel {
  page: number;
}
