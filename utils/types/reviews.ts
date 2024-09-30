export interface ReviewDetail {
  id: number;
  rating: number;
  comment: string;
  photos: Array<{
    id: number;
    path: string;
  }>;
  status: {
    label: string;
    status: string;
  };
  product: {
    id: number;
    name: string;
    stateControlled: boolean;
    thumbnail: string;
  };
  store: {
    id: number;
    name: string;
    voen: string;
    merchants: Array<string>;
  };
  rejection: {
    reason: string;
    rejectedAt: Date | string;
  };
  createdAt: Date | string;
  publishedAt: Date | string;
}
export interface Review {
  id: number;
  productName: string;
  comment: string;
  rating: number;
  publishedAt: Date | string;
  status: {
    label: string;
    status: string;
  };
}
