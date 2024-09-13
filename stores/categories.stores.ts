import { HeaderConfigs } from "@/utils/configs";
import { defineStore } from "pinia";
import urls from "@/utils/urls.json";
import { useRuntimeConfig } from "#app";
import type { Categories } from "~/utils/types/categories";

export const useCategoriesStore = defineStore("categories", {
  state: () => ({
    baseCategories: [] as Array<Categories>,
    status: "" as string,
    error: null as null | Error,
    baseURL: useRuntimeConfig().public.baseURL,
  }),
  getters: {
    getBaseCategories: (state) => state.baseCategories,
  },
  actions: {
    async fetchBaseCategories() {
      const { data, status, error } = await useAsyncData<Categories[]>(
        "base-categories",
        () =>
          $fetch(
            `${this.baseURL}${urls["base-categories"]}`,

            {
              headers: {
                ...HeaderConfigs(useCookie("token") || ""),
              },
              method: "GET",
            }
          )
      );
      this.baseCategories = data!.value!;
      this.status = status.value;
      this.error = error?.value;
    },
  },
});
