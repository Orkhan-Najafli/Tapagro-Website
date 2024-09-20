export interface Categories {
  id: number;
  label: string;
  name: string;
  iconPath: string;
  rank: number;
  hide?: boolean;
  productTypes: Array<CategoriesProductType>;
}
export interface CategoriesProductType {
  id: number;
  label: string;
  name: string;
  productCount: number;
  hide?: boolean;
}
