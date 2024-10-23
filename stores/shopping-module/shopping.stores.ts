import { HeaderConfigs } from "@/utils/configs";
import { defineStore } from "pinia";
import urls from "@/utils/urls.json";
import { useRuntimeConfig } from "#app";
import type { QueryParams, Shopping } from "~/utils/types/shopping";

export const useShoppingStore = defineStore("shopping", {
  state: () => ({
    shoppingCarts: {} as Shopping,
    status: "" as string,
    error: null as null | Error,

    shoppingCartsAddStatus: "" as string,
    shoppingCartsAddError: null as null | Error,

    visible: false,
    baseURL: useRuntimeConfig().public.baseURL,
  }),
  getters: {
    getShoppingCarts: (state) => state.shoppingCarts,
    getStatus: (state) => state.status,
    getError: (state) => state.error,

    getShoppingCartStatus: (state) => state.shoppingCartsAddStatus,
    getShoppingCartError: (state) => state.shoppingCartsAddError,

    getShoppingVisible: (state) => state.visible,
  },
  actions: {
    setShoppingVisible(visible: boolean) {
      this.visible = visible;
    },
    async fetchShoppingCarts(queryData?: any) {
      const { data, status, error } = await useAsyncData<Shopping>(
        "shopping-carts",
        () =>
          $fetch(`${this.baseURL}${urls.shopping_carts}`, {
            headers: {
              ...HeaderConfigs({
                Authorization: useCookie("token").value || "",
              }),
            },
            query: queryData,
          })
      );
      let stockCheck = data.value?.items.map((item) => item.stockSufficient);
      let checkActive = data.value?.items.some(
        (item) => !item.product.isActive
      );
      this.shoppingCarts = {
        ...data.value,
        stockSufficientList: stockCheck,
        isActive: !checkActive,
      } as Shopping;
      this.status = status.value;
      this.error = error.value;
    },
    async fetchAddShoppingCart(queryData?: QueryParams) {
      const { status, error } = await useAsyncData<unknown>(
        "shopping-carts",
        () =>
          $fetch(`${this.baseURL}${urls.shopping_carts}`, {
            headers: {
              ...HeaderConfigs({
                Authorization: useCookie("token").value || "",
              }),
            },
            query: queryData,
            method: "POST",
          })
      );
      this.shoppingCartsAddStatus = status.value;
      this.shoppingCartsAddError = error.value;
    },
  },
});
