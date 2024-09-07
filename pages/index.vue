<template>
  <div class="h-full min-h-screen w-full min-w-full">
    <div
      class="flex flex-row w-full px-6 xl:px-0 max-w-[1224px] container mx-auto mb-6"
    >
      <div class="w-full relative overflow-hidden">
        <categories />
      </div>
    </div>
    <div class="px-6 xl:px-0 max-w-[1224px] container mx-auto">
      <products
        :products="useProductsStore().getProducts"
        :link="'mehsullar'"
        :classGridSize="true"
      />
      <div
        class="block w-full min-w-full rounded text-center my-14"
        v-if="
          useProductsStore().getProducts.length !=
          useProductsStore().getTotalElements
        "
      >
        <button
          @click="loadMoreProducts"
          class="px-8 py-1 rounded text-amber-400 border border-amber-400 hover:text-white bg-white hover:bg-amber-400 text-sm font-semibold"
        >
          {{ $t("more_products") }}
        </button>
      </div>
    </div>
  </div>
  <button
    @click="useAuthenticator().fetchRefresh()"
    class="border px-3 py-1 rounded"
  >
    Refresh Token
  </button>
</template>
<script setup lang="ts">
const query = useRoute().query;
const queryParams = reactive({
  page: useRoute().query.page ? Number(useRoute().query.page) : 0,
  // page: 0,
  size: useRoute().query.page ? (Number(useRoute().query.page) + 1) * 2 : 2,
  // size: 2,
  sortBy: "createdAt",
  sortDirection: "DESC",
});
useProductsStore().fetchProducts({ ...queryParams });
const loadMoreProducts = function () {
  console.log(useRoute().query.page);
  queryParams.page++;
  useRouter().replace({ query: { ...queryParams } });
};
watch(queryParams, () => {
  useProductsStore().fetchProducts({ ...queryParams });
});
</script>
