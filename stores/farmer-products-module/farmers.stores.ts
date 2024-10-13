import { HeaderConfigs } from "@/utils/configs";
import { defineStore } from "pinia";
import urls from "@/utils/urls.json";
import { useRuntimeConfig } from "#app";
import type { ApiBase } from "~/utils/types";
import type { Farmer, FarmerDTO } from "~/utils/types/farmer-product";

export const useFarmersStore = defineStore("farmers", {
  state: () => ({
    farmers: new Set<Farmer>() || ([] as Array<Farmer>),
    totalElements: 0 as number,
    totalPages: 0 as number,
    status: "" as string,
    error: null as null | Error,

    farmer: {} as FarmerDTO,
    baseURL: useRuntimeConfig().public.baseURL,
  }),
  getters: {
    getFarmers: (state) => state.farmers,
    getFarmer: (state) => state.farmer,
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
      this.status = status.value;
      this.error = error.value;
    },
    async fetchFarmer(queryData: any) {
      const { data, status, error } = await useAsyncData<FarmerDTO>(
        "farmers",
        () =>
          $fetch(`${this.baseURL}${urls.farmer}`, {
            headers: {
              ...HeaderConfigs(useCookie("token").value || ""),
            },
            query: queryData,
          })
      );
      this.farmer = data.value!;
      this.status = status.value;
      this.error = error.value;
    },
  },
});
