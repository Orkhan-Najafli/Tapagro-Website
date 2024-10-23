export interface Shopping {
  id: number;
  items: Array<Item>;
  totalPrice: 0;
  totalDiscountedPrice: 0;
  commonWarehouses: Array<Warehouse>;
  stockSufficientList: any;
  isActive: boolean;
}
export interface QueryParams {
  productId: number;
  count: number;
}
export interface Item {
  id: number;
  product: Product;
  store: Store;
  count: 0;
  totalPrice: 0;
  addedToFavoriteBasket: true;
  stockSufficient: true;
  warehouses: Array<Warehouse>;
}
interface Product {
  id: number;
  name: string;
  thumbnailName: string;
  thumbnailPath: string;
  price: {
    initialPrice: number;
    discount: number;
    discountedPrice: number;
  };
  isActive: boolean;
}
interface Store {
  id: number;
  name: string;
  status: {
    label: string;
    status: string;
  };
}
interface Warehouse {
  id: number;
  name: string;
  address: string;
}
