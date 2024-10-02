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
  storeNamePhrase?: string;
}

export interface StoreDetail {
  id: number;
  name: string;
  legalAddress: string;
  physicalAddress: string;
  phoneNumber: string;
  email: string;
  website: string;
  deliveryCities: [
    {
      id: number;
      name: string;
    }
  ];
  logoPath: string;
  status: {
    label: string;
    status: string;
  };
}
