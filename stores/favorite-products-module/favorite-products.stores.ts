import { HeaderConfigs } from "@/utils/configs";
import { defineStore } from "pinia";
import urls from "@/utils/urls.json";
import { useRuntimeConfig } from "#app";
import type { ApiBase } from "~/utils/types";
import type { Product, ProductQuery } from "~/utils/types/product";
import { stringify } from "qs";

export const useFavoriteProductsStore = defineStore("favorite-products", {
  state: () => ({
    favoriteProducts: new Set<Product>() || ([] as Array<Product>),
    totalElements: 0 as number,
    totalPages: 0 as number,
    status: "" as string,
    error: null as null | Error,
    favoriteProductIdsForCount: [] as Array<number>,
    favoriteProductIdList: [] as Array<number>,
    count: 0 as number,
    baseURL: useRuntimeConfig().public.baseURL,
  }),
  getters: {
    getFavoriteProducts: (state) => state.favoriteProducts,
    getTotalElements: (state) => state.totalElements,
    getTotalPages: (state) => state.totalPages,
    getFavoriteProductsStatus: (state) => state.status,
    getFavoriteProductIdsForCount: (state) => {
      return [...state.favoriteProductIdsForCount];
    },
    getFavoriteProductIds: (state) => {
      return [...state.favoriteProductIdList];
    },
    getCount: (state) => {
      return state.count;
    },
  },
  actions: {
    async setFavoriteProduct(payload: Array<any>) {
      this.favoriteProductIdsForCount = payload;
      this.favoriteProductIdList = payload;
    },
    async setFavoriteProductIds(payload: any) {
      if (this.favoriteProductIdList.includes(payload)) {
        this.favoriteProductIdList = this.favoriteProductIdList.filter(
          (itemId, i) => {
            if (itemId !== payload) {
              return itemId;
            }
          }
        );
      } else {
        this.favoriteProductIdList.push(payload);
      }
      useCookie("favoriteProducts").value = JSON.stringify([
        ...this.favoriteProductIdList,
      ]);
    },
    async setCount(payload: number) {
      this.count = payload;
    },
    async resetProducts() {
      this.favoriteProducts = new Set();
      this.totalElements = 0;
      this.totalPages = 0;
      this.status = "";
      this.error = null;
    },
    async fetchFavoriteProducts(queryData: any) {
      // const queryString = stringify(queryData, {
      //   encode: false,
      //   indices: true,
      //   allowDots: false,
      //   arrayFormat: "comma", //sortList[0].sortDirection: DESC
      //   // arrayFormat: "repeat", //sortList.sortDirection: DESC
      // });
      const { data, status, error } = await useAsyncData<ApiBase<Product>>(
        "favorite-product-list",
        () =>
          $fetch(`${this.baseURL}${urls.favorites}`, {
            headers: {
              ...HeaderConfigs({
                Authorization: useCookie("token").value || "",
              }),
            },
            query: queryData,
          })
      );
      this.totalElements = data.value?.totalElements!;
      this.totalPages = data.value?.totalPages!;
      data.value?.content.forEach((item: Product) => {
        this.favoriteProducts.add(item);
      });
      this.status = status.value;
      this.error = error.value;
    },
  },
});
