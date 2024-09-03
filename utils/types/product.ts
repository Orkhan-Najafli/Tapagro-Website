export interface Product {
  id: number;
  name: string;
  fullName?: string;
  storeId: number;
  storeName: string;
  storeStatus: StoreStatus;
  price: Price;
  thumbnailPath: string;
  thumbnailName: string;
  eligibleToShoppingCart: boolean;
  bargainMethod: bargainMethod;
  productType: {
    id: number;
    name: string;
  };
  subcategory: {
    id: number;
    name: string;
  };
  reviewSummary: {
    averageRating: number;
    reviewCount: number;
  };
  addedToComparisonBasket?: boolean;
  addedToFavoriteBasket?: boolean;
  isActive: boolean;
  vipAt?: boolean;
  compareIsActive?: boolean;
  favoriteIsActive?: any;
}
type StoreStatus = {
  label: string;
  status: string;
};
type Price = {
  initialPrice: number;
  discount: number;
  discountedPrice: number;
};
type bargainMethod = {
  label: string;
  status: string;
};
