import { defineStore } from "pinia";
import urls from "@/utils/urls.json";
import { useRuntimeConfig } from "#app";

export const useAuthenticator = defineStore("GenerateUrl", {
  state: () => ({
    url: null,
    status: "",
    error: null as any,
  }),
  getters: {
    getURL: (state) => state.url,
  },
  actions: {
    //Generate-url
    async fetchGenerateUrl() {
      const baseURL = useRuntimeConfig().public.baseURL;

      const { data, status, error } = await useAsyncData("GenerateUrl", () =>
        $fetch(`${baseURL}${urls["generate-url"]}`, {
          headers: {
            "Accept-Language": "AZE",
            "Content-Type": "application/json",
          },
          method: "POST",
          body: {
            cabinet: "WEBSITE",
          },
        })
      );
      console.log("url =>", data.value);
      useCookie("generate-url").value = data.value;
      this.url = data.value;
      this.status = status.value;
      this.error = error.value || null;
    },
  },
});
