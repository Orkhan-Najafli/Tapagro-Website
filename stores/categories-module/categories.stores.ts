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
    setProductTypes(index: number, productTypes: Array<CategoriesProductType>) {
      this.categories[index].hide = !this.categories[index].hide;
      this.categories[index].productTypes = productTypes;
    },
    setAllProductTypes(
      index: number,
      allCategoriesChecked?: boolean,
      productTypes?: Array<CategoriesProductType>
    ) {
      this.categories[index].productTypes = this.categories[
        index
      ].productTypes.map((type: CategoriesProductType) => {
        return {
          ...type,
          hide: allCategoriesChecked,
        };
      });
      // this.categories[index].productTypes = productTypes!;
    },
    async fetchBaseCategories() {
      const { data, status, error } = await useAsyncData<Categories[]>(
        "base-categories",
        () =>
          $fetch(
            `${this.baseURL}${urls["base-categories"]}`,

            {
              headers: {
                ...HeaderConfigs(useCookie("token") || ""),
              },
              method: "GET",
            }
          )
      );
      this.baseCategories = data!.value!.map((baseCategory) => {
        return {
          ...baseCategory,
          hide: true,
        };
      });
      this.status = status.value;
      this.error = error?.value;
    },

    async fetchCategories(baseCategoryId: number = 4) {
      const { data, status, error } = await useAsyncData<Categories[]>(
        "base-categories",
        () =>
          $fetch(
            `${this.baseURL}${parseUrl(urls.categories, {
              baseCategoryId: baseCategoryId,
            })}`,

            {
              headers: {
                ...HeaderConfigs(useCookie("token") || ""),
              },
              method: "GET",
            }
          )
      );
      this.categories = data!.value!.map((category) => {
        return {
          ...category,
          hide: false,
        };
      });

      this.categoriesStatus = status.value;
      this.categoriesError = error?.value;
    },
  },
});
