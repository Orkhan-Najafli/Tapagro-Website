import { HeaderConfigs } from "@/utils/configs";
import { defineStore } from "pinia";
import urls from "@/utils/urls.json";
import { useRuntimeConfig } from "#app";
import type { ComparisonCount } from "~/utils/types/comparison";

export const useComparisonBasketsStore = defineStore("comparison-baskets", {
  state: () => ({
    comparisonBasketsCount: undefined as undefined | ComparisonCount,
    comparisonBasketCountStatus: "" as string,
    comparisonBasketCountError: null as null | Error,
    baseURL: useRuntimeConfig().public.baseURL,
  }),
  getters: {
    getComparisonBasketsCount: (state) => state.comparisonBasketsCount,
  },
  actions: {
    async fetchProducts() {
      const { data, status, error } = await useAsyncData(
        "ComparisonBasketsCount",
        () =>
          $fetch(`${this.baseURL}${urls["comparison-baskets-count"]}`, {
            headers: {
              ...HeaderConfigs(),
            },
            method: "GET",
          })
      );

      this.comparisonBasketsCount = data.value as ComparisonCount;
      this.comparisonBasketCountStatus = status.value;
      this.comparisonBasketCountError = error.value;
    },
  },
});
