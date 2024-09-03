// import { defineStore } from "@pinia/nuxt";
import { defineStore } from "pinia";
import urls from "@/utils/urls.json";
import { useRuntimeConfig } from "#app";
import type { Language } from "~/utils/types/language";

export const useLanguagesStore = defineStore("languages", {
  state: () => ({
    languages: [] as Array<Language>,
    status: "",
    error: null,
  }),
  getters: {
    getLanguages: (state) => state.languages,
  },
  actions: {
    async fetchLanguages() {
      const config = useRuntimeConfig();
      const baseURL = config.public.baseURL;

      const { data, status, error } = await useAsyncData<Language[]>(
        "languages",
        () =>
          $fetch(
            `${baseURL}${urls.languages}`,

            {
              headers: {
                "Accept-Language": "AZE",
              },
              method: "GET",
            }
          )
      );
      this.languages = data.value;
      this.status = status.value;
      this.error = error.value;
    },
  },
});
