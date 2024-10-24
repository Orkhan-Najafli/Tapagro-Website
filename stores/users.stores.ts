import { defineStore } from "pinia";
import urls from "@/utils/urls.json";
import { HeaderConfigs } from "@/utils/configs";
import { useRuntimeConfig } from "#app";
import type { User } from "~/utils/types/users";

export const useUsersStore = defineStore("Users", {
  state: () => ({
    userData: {} as User,
    userError: null as any,
    userStatus: "",
    baseURL: useRuntimeConfig().public.baseURL,
  }),
  getters: {
    getUserData: (state) => state.userData,
  },
  actions: {
    //userData
    async fetchUserData() {
      // navigateTo("/");
      const { data, status, error } = await useAsyncData<User>("Users", () =>
        $fetch(`${this.baseURL}${urls.users}`, {
          headers: {
            ...HeaderConfigs({ Authorization: useCookie("token").value || "" }),
          },
          method: "GET",
        })
      );
      console.log(data.value);

      this.userStatus = status.value;
      this.userError = error.value || null;
      this.userData = data.value!;
    },
  },
});
