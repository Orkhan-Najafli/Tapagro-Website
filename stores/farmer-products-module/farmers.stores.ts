import { HeaderConfigs } from "@/utils/configs";
import { defineStore } from "pinia";
import urls from "@/utils/urls.json";
import { useRuntimeConfig } from "#app";
import type { ApiBase } from "~/utils/types";
import type { Farmer } from "~/utils/types/farmer-product";

export const useFarmersStore = defineStore("farmers", {
  state: () => ({
    farmers: new Set<Farmer>() || ([] as Array<Farmer>),
    totalElements: 0 as number,
    totalPages: 0 as number,
    status: "" as string,
    error: null as null | Error,
    baseURL: useRuntimeConfig().public.baseURL,
  }),
  getters: {
    getFarmers: (state) => state.farmers,
    getTotalElements: (state) => state.totalElements,
    getTotalPages: (state) => state.totalPages,
    getStatus: (state) => state.status,
  },
  actions: {
    resetFarmers() {
      this.farmers = new Set();
      this.totalElements = 0;
      this.totalPages = 0;
      this.status = "";
      this.error = null;
    },
    async fetchFarmers(queryData: any) {
      const { data, status, error } = await useAsyncData<ApiBase<Farmer>>(
        "farmers",
        () =>
          $fetch(`${this.baseURL}${urls.farmers}`, {
            headers: {
              ...HeaderConfigs(useCookie("token").value || ""),
            },
            query: queryData,
          })
      );
      this.totalElements = data.value?.totalElements!;
      this.totalPages = data.value?.totalPages!;
      data.value?.content.forEach((item: Farmer) => {
        this.farmers.add(item);
      });
      console.log("status: ", status.value);

      this.status = status.value;
      this.error = error.value;
    },
  },
});
