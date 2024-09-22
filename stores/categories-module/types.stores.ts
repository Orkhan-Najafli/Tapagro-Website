import { HeaderConfigs, parseUrl } from "@/utils/configs";
import { defineStore } from "pinia";
import urls from "@/utils/urls.json";
import { useRuntimeConfig } from "#app";
import type {
  Categories,
  CategoriesProductType,
} from "~/utils/types/categories";

export const useProductTypesStore = defineStore("types", {
  state: () => ({
    productTypes: [] as Array<CategoriesProductType>,
    status: "" as string,
    error: null as null | Error,

    baseURL: useRuntimeConfig().public.baseURL,
  }),
  getters: {
    getProductTypes: (state) => state.productTypes,
    getStatus: (state) => state.status,
    getError: (state) => state.error,
  },
  actions: {
    async fetchProductTypes(
      baseCategoryId: number = 4,
      categoryId: number,
      index: number
    ) {
      const { data, status, error } = await useAsyncData<
        CategoriesProductType[]
      >("product-types", () =>
        $fetch(
          `${this.baseURL}${parseUrl(urls["product-types"], {
            baseCategoryId: baseCategoryId,
            categoryId: categoryId,
          })}`,

          {
            headers: {
              ...HeaderConfigs(useCookie("token") || ""),
            },
            method: "GET",
          }
        )
      );
      this.productTypes = data!.value!.map((type) => {
        return {
          ...type,
          hide: false,
        };
      });
      useCategoriesStore().setProductTypes(index, this.productTypes);
      this.status = status.value;
      this.error = error?.value;
    },
  },
});
