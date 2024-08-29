// import { defineStore } from "@pinia/nuxt";
import { defineStore } from "pinia";
import urls from "@/utils/urls.json";
import { useRuntimeConfig } from "#app";

export const useCounterStore = defineStore("products", {
  state: () => ({
    products: [],
    count: 0,
    mountains: null,
    status: null,
    error: null,
  }),
  getters: {
    doubleCount: (state) => state.count,
  },
  actions: {
    increment() {
      this.count++;
    },
    async fetchMountains() {
      const config = useRuntimeConfig();
      const baseURL = config.public.baseURL;

      const { data, status, error } = await useAsyncData("mountains", () =>
        $fetch(`${baseURL}${urls.products}`, {
          headers: {
            "Accept-Language": "AZE",
          },
          query: {
            page: 0,
            size: 12,
            sortBy: "createdAt",
            sortDirection: "DESC",
          },
        })
      );
      console.log(data);

      this.mountains = data.value;
      this.status = status.value;
      this.error = error.value;
    },
  },
});
