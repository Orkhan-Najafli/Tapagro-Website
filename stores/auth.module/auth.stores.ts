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
    token: null,
    refresh_token: null,
    baseURL: useRuntimeConfig().public.baseURL,
  }),
  getters: {
    getToken: (state) => state.access,
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
      // .then((request) => {
      //   this.acces = request.data.value!;
      //   this.token = request.data.value?.access;
      //   this.refresh_token = request.data.value?.refresh;
      //   this.status = request.status.value;
      //   this.error = request.error.value || null;
      //   console.log(request.data.value);
      //   useCookie("token").value = request.data.value?.access;
      //   useCookie("refresh-token").value = request.data.value?.refresh;
      // });
      this.access = data.value!;
      this.status = status.value;
      this.error = error.value || null;
      console.log(data);
      console.log(data.value?.access);
      useCookie("testCookie").value = "test edirem";
      useCookie("token").value = data.value?.access;
      useCookie("refresh-token").value = data.value?.refresh;
    },
  },
});
