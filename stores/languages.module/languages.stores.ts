// import { defineStore } from "@pinia/nuxt";
import { defineStore } from "pinia";
import urls from "@/utils/urls.json";
import { useRuntimeConfig } from "#app";

export const useLanguagesStore = defineStore("languages", {
  state: () => ({
    languages: [] as Array<{ countryCode: string; flagPath: string }>,
    status: null,
    error: null,
  }),
  getters: {
    getLanguages: (state) => state.languages,
  },
  actions: {
    async fetchLanguages() {
      const config = useRuntimeConfig();
      const baseURL = config.public.baseURL;

      const { data, status, error } = await useAsyncData("languages", () =>
        $fetch(
          `${baseURL}${urls.languages}`,

          {
            headers: {
              "Accept-Language": "AZE",
            },
            //   query: {
            //     page: 0,
            //     size: 12,
            //     sortBy: "createdAt",
            //     sortDirection: "DESC",
            //   },
            method: "GET",
          }
        )
      );
      console.log("languages =>", data.value);
      this.languages = data.value;
      this.status = status.value;
      this.error = error.value;
    },
  },
});
