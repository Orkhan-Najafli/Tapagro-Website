export interface Store {
  id: number;
  name: string;
  productCount: number;
  logoPath: string;
  status: {
    label: string;
    status: string;
  };
}
export interface QueryParams {
  page: number;
  size: number;
  storeNamePhrase?: string | undefined;
}
