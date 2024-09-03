import { HeaderConfigs } from "@/utils/configs";
import { defineStore } from "pinia";
import urls from "@/utils/urls.json";
import { useRuntimeConfig } from "#app";
import type { ComparisonCount } from "~/utils/types/comparison";

export const useComparisonStore = defineStore("comparison", {
  state: () => ({
    comparisonCount: undefined as number | undefined | ComparisonCount,
    comparisonCountStatus: "" as string,
    comparisonCountError: null as null | Error,
    baseURL: useRuntimeConfig().public.baseURL,
  }),
  getters: {
    getComparisonCount: (state) => state.comparisonCount,
  },
  actions: {
    async fetchProducts() {
      const { data, status, error } = await useAsyncData(
        "ComparisonCount",
        () =>
          $fetch(`${this.baseURL}${urls["comparison-count"]}`, {
            headers: {
              ...HeaderConfigs(),
            },
            method: "GET",
          })
      );

      this.comparisonCount = data.value as ComparisonCount;
      this.comparisonCountStatus = status.value;
      this.comparisonCountError = error.value;
    },
  },
});
