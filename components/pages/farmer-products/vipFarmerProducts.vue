<template>
  <section class="flex flex-col">
    <p
      v-if="classGridSize"
      class="text-gray-500 font-semibold text-base md:font-bold md:text-2xl mb-4 md:mb-6"
    >
      <span> {{ $t("VIP_farmer_products") }} </span>
    </p>
    <p
      v-else
      class="text-gray-500 font-semibold text-bold text-base mb-4 md:mb-6"
    >
      <span> {{ $t("VIP_farmer_products") }}</span>
    </p>
    <div class="flex w-full flex-col">
      <a-spin
        :spinning="
          useVipFarmerProductsStore().getVipProductsProductsStatus !== 'success'
        "
        size="large"
        wrapper-class-name="text-green-800"
      >
        <products
          :classGridSize="classGridSize"
          :link="'fermer-mehsullari'"
          :products="useVipFarmerProductsStore().getVipProducts"
          v-if="useVipFarmerProductsStore().getVipProducts.size > 0"
        />
      </a-spin>
    </div>
    <div
      class="block w-full min-w-full rounded text-center my-14"
      v-if="
        useVipFarmerProductsStore().getVipProducts.size !=
        useVipFarmerProductsStore().getVipProductsTotalElements
      "
    >
      <button
        @click="loadMoreVipFarmerProducts"
        class="px-8 py-1 rounded text-amber-400 border border-amber-400 hover:text-white bg-white hover:bg-amber-400 text-sm font-semibold"
      >
        {{ $t("more_products") }}
      </button>
    </div>
    <div v-else class="block w-full min-w-full rounded text-center my-14"></div>
  </section>
</template>

<script setup lang="ts">
const props = defineProps({
  classGridSize: {
    type: Boolean,
    default: function () {
      return true;
    },
  },
  size: {
    type: Number,
    default: function () {
      return 16;
    },
  },
});
const more = ref(false);
const queryParams = reactive({
  page: useRoute().query.vipPage ? Number(useRoute().query.vipPage) : 0,
  size: useRoute().query.vipPage
    ? (Number(useRoute().query.vipPage) + 1) * props.size
    : props.size,
  // sortBy: "createdAt",
  // sortDirection: "DESC",
});
const sortList = reactive([
  {
    sortBy: "vipAt",
    sortDirection: "DESC",
  },
]);
const convertSortByForFarmer = function (direction: boolean) {
  console.log("item: ", direction);

  if (useRoute().query && useRoute().query.sortBy) {
    let item = useRoute().query.sortBy!.split("-");
    if (direction) {
      return item[1] || sortList[0].sortDirection;
    } else {
      return item[0] || sortList[0].sortBy;
    }
  } else {
    if (direction) {
      return sortList[0].sortDirection;
    } else {
      return sortList[0].sortBy;
    }
  }
};
useVipFarmerProductsStore().fetchVipProducts({
  ...queryParams,
  sortList: [
    {
      sortBy: convertSortByForFarmer(false),
      sortDirection: convertSortByForFarmer(true),
    },
  ],
});
const loadMoreVipFarmerProducts = function () {
  queryParams.page++;
  queryParams.size = 4;
  useRouter().push({
    query: { ...useRoute().query, vipPage: queryParams.page },
  });
};
</script>
