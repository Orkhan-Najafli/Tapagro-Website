export interface FarmerProduct {
  id: number;
  name: string;
  thumbnailName: string;
  thumbnailPath: string;
  subcategory: string;
  type: string;
  status: {
    label: string;
    status: string;
  };
  createdAt: string;
  publishedAt: string;
  vipAt: string | boolean;
  addedToComparisonBasket?: boolean;
  addedToFavoriteBasket?: boolean;
  isActive?: boolean;
  compareIsActive?: boolean;
  favoriteIsActive?: any;
}
export interface QueryParams {
  page: number;
  size: number;
  sortList?: sortList[];
  isVip?: boolean;
}

interface sortList {
  sortBy: string;
  sortDirection: string;
}
