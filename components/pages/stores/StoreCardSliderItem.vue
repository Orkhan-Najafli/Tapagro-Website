<template>
  <nuxt-link
    tag="span"
    :to="localePath(`/magazalar/${data.id}`)"
    class="flex flex-col justify-between w-full my-2 shadow-sm hover:shadow-md p-4 rounded-md bg-white border border-gray-200"
  >
    <div
      class="flex flex-col justify-between items-center pt-6 pb-5 w-full h-full"
    >
      <div
        class="w-28 h-28 p-4 flex justify-center items-center rounded-full text-center bg-green-50"
      >
        <img
          class="w-full h-full"
          :src="`${baseURL}${data.logoPath}`"
          @error="setDefaultStoreImage"
          :alt="data.name"
        />
      </div>
      <h4
        class="font-medium text-lg text-center text-gray-600 mt-5 mb-4 md:mt-6 md:mb-8"
      >
        {{ data.name }}
      </h4>

      <div>
        <span class="font-normal text-sm text-center text-gray-400"
          >{{ data.productCount }} {{ $t("product") }}</span
        >
      </div>
    </div>
  </nuxt-link>
</template>

<script>
import urls from "@/configs/urls";

export default {
  data() {
    return {
      baseURL: urls.getParam("API_BASE_URL"),
    };
  },
  methods: {
    setDefaultStoreImage(event) {
      event.target.src = require(`@/assets/img/all_logos/store_logo.svg`);
      event.target.className = "p-1";
    },
  },
  props: {
    data: {
      type: Object,
    },
  },
};
</script>

<style scoped>
.store-preview-card {
  background-color: #fafffd;
}

.img-div {
  background: linear-gradient(
    180deg,
    rgba(214, 252, 236, 0.53) 0%,
    rgba(238, 254, 244, 0.58) 100%
  );
}
</style>
