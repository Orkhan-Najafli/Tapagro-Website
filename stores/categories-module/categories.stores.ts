import { HeaderConfigs, parseUrl } from "@/utils/configs";
import { defineStore } from "pinia";
import urls from "@/utils/urls.json";
import { useRuntimeConfig } from "#app";
import type {
  Categories,
  CategoriesProductType,
} from "~/utils/types/categories";

export const useCategoriesStore = defineStore("categories", {
  state: () => ({
    baseCategory: undefined as Categories | undefined,

    baseCategories: [] as Array<Categories>,
    status: "" as string,
    error: null as null | Error,

    categories: [] as Array<Categories>,
    categoriesStatus: "" as string,
    categoriesError: null as null | Error,

    productTypes: [] as Array<CategoriesProductType>,
    baseURL: useRuntimeConfig().public.baseURL,
  }),
  getters: {
    getBaseCategories: (state) => state.baseCategories,
    getBaseCategoriesStatus: (state) => state.status,
    getCategories: (state) => state.categories,
    getCategoriesStatus: (state) => state.categoriesStatus,
    getBaseCategory: (state) => state.baseCategory,
  },
  actions: {
    setBaseCategory(category: Categories) {
      this.baseCategory = category;
    },
    setProductTypes(index: number) {
      this.categories[index].hide = !this.categories[index].hide;
      // useRouter().push({
      //   query: {
      //     ...useRoute().query,
      //     productTypeLabels: [...this.categories[index].productTypes],
      //   },
      // });
    },
    setCheckedTypes(typeList: Array<string>) {},
    setAllProductTypes(index: number, allProductTypeChecked?: boolean) {
      this.categories[index].productTypes =
        this.categories[index].productTypes &&
        this.categories[index].productTypes.map(
          (type: CategoriesProductType) => {
            return {
              ...type,
              checked: allProductTypeChecked,
            };
          }
        );
    },
    resetCategories() {
      this.categories = [];
      this.categoriesStatus = "";
      this.categoriesError = null;
    },
    async fetchBaseCategories(queryParams?: any) {
      try {
        const { data, status, error } = await useAsyncData<Categories[]>(
          "base-categories",
          () =>
            $fetch(`${this.baseURL}${urls["base-categories"]}`, {
              headers: {
                ...HeaderConfigs(useCookie("token").value || ""),
              },
              method: "GET",
              query: queryParams,
            })
        );
        this.baseCategories =
          data!.value! &&
          data!.value!.map((baseCategory) => {
            return {
              ...baseCategory,
              hide: true,
            };
          });
        this.status = status.value;
        this.error = error?.value;
      } catch (error) {
        console.error("When API call, error happened: ", error);
      }
    },

    async fetchCategories(baseCategoryId: number) {
      const { data, status, error } = await useAsyncData<Categories[]>(
        "categories",
        () =>
          $fetch(
            `${this.baseURL}${parseUrl(urls.categories, {
              baseCategoryId: baseCategoryId,
            })}`,

            {
              headers: {
                ...HeaderConfigs(useCookie("token").value || ""),
              },
              method: "GET",
            }
          )
      );

      for (const category of data!.value!) {
        try {
          await $fetch(
            `${this.baseURL}${parseUrl(urls["product-types"], {
              baseCategoryId: baseCategoryId,
              categoryId: category.id,
            })}`,

            {
              headers: {
                ...HeaderConfigs(useCookie("token").value || ""),
              },
              method: "GET",
            }
          ).then((result: CategoriesProductType[] | any) => {
            category.productTypes =
              result &&
              result.map((productType: CategoriesProductType) => {
                return {
                  ...productType,
                  hide: false,
                  checked: false,
                };
              });
          });
          category.hide = false;
          category.apiCalled = true;
        } catch (err) {
          console.error(
            `Failed to fetch product types for category ${category.id}`,
            err
          );
        }
      }

      // Finally update categories
      this.categories = data!.value!;
      this.categoriesStatus = status.value;
      this.categoriesError = error?.value;
    },
  },
});
