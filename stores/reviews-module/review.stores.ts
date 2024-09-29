import { HeaderConfigs } from "@/utils/configs";
import { defineStore } from "pinia";
import urls from "@/utils/urls.json";
import { useRuntimeConfig } from "#app";
import type { ApiBase } from "~/utils/types";
import type { Review } from "~/utils/types/reviews";

export const useReviewsStore = defineStore("reviews", {
  state: () => ({
    reviews: new Set<Review>() || ([] as Array<Review>),
    totalElements: 0 as number,
    totalPages: 0 as number,
    status: "" as string,
    error: null as null | Error,
    baseURL: useRuntimeConfig().public.baseURL,
  }),
  getters: {
    getReviews: (state) => state.reviews,
    getTotalElements: (state) => state.totalElements,
    getTotalPages: (state) => state.totalPages,
    getProductsStatus: (state) => state.status,
  },
  actions: {
    async resetReviews() {
      this.reviews = new Set();
      this.totalElements = 0;
      this.totalPages = 0;
      this.status = "";
      this.error = null;
    },
    async fetchReviews(queryData: any) {
      const { data, status, error } = await useAsyncData<ApiBase<Review>>(
        "reviews-list",
        () =>
          $fetch(`${this.baseURL}${urls.reviews}`, {
            headers: {
              ...HeaderConfigs(useCookie("token") || ""),
            },
            query: queryData,
          })
      );
      this.totalElements = data.value?.totalElements!;
      this.totalPages = data.value?.totalPages!;
      data.value?.content.forEach((item: Review) => {
        this.reviews.add(item);
      });
      this.status = status.value;
      this.error = error.value;
    },
  },
});
