import { HeaderConfigs } from "@/utils/configs";
import { defineStore, type Store } from "pinia";
import urls from "@/utils/urls.json";
import { useRuntimeConfig } from "#app";
import type { StoreDetail } from "~/utils/types/stores";

export const useStoreDetailStore = defineStore("Store-detail", {
  state: () => ({
    store: {} as StoreDetail,
    status: "" as string,
    error: null as null | Error,
    baseURL: useRuntimeConfig().public.baseURL,
  }),
  getters: {
    getStore: (state) => state.store,
    getStatus: (state) => state.status,
  },
  actions: {
    resetStore() {
      this.store = {} as StoreDetail;
      this.status = "";
      this.error = null;
    },
    async fetchStore(id: number) {
      const { data, status, error } = await useAsyncData<StoreDetail>(
        "store",
        () =>
          $fetch(`${this.baseURL}${urls.stores}/${id}`, {
            headers: {
              ...HeaderConfigs(useCookie("token").value || ""),
            },
            // query: queryData,
          })
      );

      this.store = data.value!;
      this.status = status.value;
      this.error = error.value;
    },
  },
});
