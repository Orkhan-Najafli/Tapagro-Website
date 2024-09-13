export interface ApiBase<T> {
  content: T[];
  totalPages: number;
  totalElements: number;
}
