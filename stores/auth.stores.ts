import { defineStore } from "pinia";
import urls from "@/utils/urls.json";
import { HeaderConfigs } from "@/utils/configs";
import { useRuntimeConfig } from "#app";
import type { Login } from "~/utils/types/auth";

export const useAuthenticator = defineStore("Authenticator", {
  state: () => ({
    url: "",
    status: "",
    access: {} as Login,
    error: null as any,
    token: useCookie("token"),
    refresh_token: useCookie("refresh_token"),
    baseURL: useRuntimeConfig().public.baseURL,
  }),
  getters: {
    getToken: (state) => state.token,
    getRefreshToken: (state) => state.refresh_token,
  },
  actions: {
    //Generate-url
    async fetchGenerateUrl() {
      const { data, status, error } = await useAsyncData<{ url: string }>(
        "GenerateUrl",
        () =>
          $fetch(`${this.baseURL}${urls["generate-url"]}`, {
            headers: {
              ...HeaderConfigs(),
            },
            method: "POST",
            body: {
              cabinet: "WEBSITE",
            },
          })
      );
      this.url = data.value?.url || "";
      window.location.href = String(data.value?.url) || "";
      this.status = status.value;
      this.error = error.value || null;
    },
    async login() {
      //login
      const { code, state } = useRoute().query;
      const { data, status, error } = await useAsyncData<Login>("Login", () =>
        $fetch(`${this.baseURL}${urls.login}`, {
          headers: {
            ...HeaderConfigs(),
          },
          method: "POST",
          body: {
            code: code,
            state: state,
            cabinet: "WEBSITE",
          },
        })
      );
      this.access = data.value!;
      this.status = status.value;
      this.error = error.value || null;
      this.token = data.value?.access;
      this.refresh_token = data.value?.refresh;
      useCookie("token").value = data.value?.access;
      useCookie("refresh-token").value = data.value?.refresh;
    },
  },
});
