export interface Categories {
  id: number;
  label: string;
  name: string;
  iconPath: string;
  rank: number;
  productTypes: Array<CategoriesProductType>;
  // static
  hide?: boolean;
  apiCalled?: boolean;
}
export interface CategoriesProductType {
  id: number;
  label: string;
  name: string;
  productCount: number;
  hide?: boolean;
  checked?: boolean;
}
