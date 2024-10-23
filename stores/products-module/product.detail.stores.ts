import { HeaderConfigs } from "@/utils/configs";
import { defineStore } from "pinia";
import urls from "@/utils/urls.json";
import { useRuntimeConfig } from "#app";
import type { ProductDetail } from "~/utils/types/product";

export const useProductDetailStore = defineStore("product-detail", {
  state: () => ({
    product: {} as ProductDetail,
    status: "" as string,
    error: null as null | Error,
    baseURL: useRuntimeConfig().public.baseURL,
  }),
  getters: {
    getProduct: (state) => state.product,
    getProductStatus: (state) => state.status,
  },
  actions: {
    resetProduct() {
      this.product = {} as ProductDetail;
      this.status = "";
      this.error = null;
    },
    async fetchProduct(productId: number) {
      const { data, status, error } = await useAsyncData<ProductDetail>(
        "product",
        () =>
          $fetch(`${this.baseURL}${urls.products}/${productId}`, {
            headers: {
              ...HeaderConfigs({
                Authorization: useCookie("token").value || "",
              }),
            },
            // query: queryData,
          })
      );

      this.product = data.value!;
      this.status = status.value;
      this.error = error.value;
    },
  },
});
