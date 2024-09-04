import { HeaderConfigs } from "@/utils/configs";
// import { defineStore } from "@pinia/nuxt";
import { defineStore } from "pinia";
import urls from "@/utils/urls.json";
import { useRuntimeConfig } from "#app";
import type { ApiBase } from "~/utils/types";
import type { Product, ProductQuery } from "~/utils/types/product";

export const useProductsStore = defineStore("products", {
  state: () => ({
    products: [] as Array<Product>,
    totalElements: 0 as number,
    totalPages: 0 as number,
    mountains: null,
    status: "" as string,
    error: null as null | Error,
  }),
  getters: {
    getProducts: (state) => state.products,
    getTotalElements: (state) => state.totalElements,
    getTotalPages: (state) => state.totalPages,
  },
  actions: {
    async fetchProducts(queryData: ProductQuery) {
      const config = useRuntimeConfig();
      const baseURL = config.public.baseURL;

      const { data, status, error } = await useAsyncData<ApiBase<Product>>(
        "products",
        () =>
          $fetch(`${baseURL}${urls.products}`, {
            headers: {
              ...HeaderConfigs(),
            },
            query: queryData,
          })
      );
      this.totalElements = data.value?.totalElements!;
      this.totalPages = data.value?.totalPages!;
      this.products = data.value?.content!;
      this.status = status.value;
      this.error = error.value;
    },
  },
});
