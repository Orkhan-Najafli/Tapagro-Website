<template>
  <div class="h-full min-h-screen w-full min-w-full">
    <section
      class="flex flex-row w-full px-6 xl:px-0 max-w-[1224px] container mx-auto mb-6"
    >
      <div class="w-full relative overflow-hidden">
        <categories />
      </div>
    </section>

    <section
      v-if="useDiscountedProductsStore().getProducts.size > 0"
      class="my-9 bg-gray-50 py-6"
    >
      <!-- v-if="useProductsStore().getDiscountedProducts.size > 0 && !checkSearch" -->

      <div
        style="max-width: 1224px"
        class="flex flex-row w-full lg:container mx-auto"
      >
        <div class="flex w-full flex-col px-6">
          <!-- <a-spin
            :spinning="
              useDiscountedProductsStore().getProductsStatus !== 'success'
            "
            size="large"
            wrapper-class-name="text-green-800"
          > -->
          <discountedProducts
            :products="useDiscountedProductsStore().getProducts"
          />
          <products
            :products="useDiscountedProductsStore().getProducts"
            :link="'mehsullar'"
            :classGridSize="true"
          />
          <!-- </a-spin> -->
        </div>
      </div>
    </section>

    <section class="px-6 xl:px-0 max-w-[1224px] container mx-auto">
      <h2
        class="text-gray-500 font-semibold text-base md:font-bold md:text-2xl mb-4 md:mb-6"
      >
        <span v-if="true"> {{ $t("recently_added") }} </span>
        <!-- v-if="!checkSearch" -->
        <span v-else>
          {{ $t("search_results") }}: {{ useProductsStore().getTotalElements }}
        </span>
      </h2>
      <products
        :products="useProductsStore().getProducts"
        :link="'mehsullar'"
        :classGridSize="true"
      />
      <div
        class="block w-full min-w-full rounded text-center my-14"
        v-if="
          useProductsStore().getProducts.size !=
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
    </section>
  </div>
  <!-- <button
    @click="useAuthenticator().fetchRefresh()"
    class="border px-3 py-1 rounded"
  >
    Refresh Token
  </button> -->
</template>
<script setup lang="ts">
const queryParams = reactive({
  page: useRoute().query.page ? Number(useRoute().query.page) : 0,
  size: useRoute().query.page ? (Number(useRoute().query.page) + 1) * 16 : 16,
  sortBy: "createdAt",
  sortDirection: "DESC",
});

// methods
useDiscountedProductsStore().fetchProducts({
  ...queryParams,
  page: 0,
  size: 4,
});
useProductsStore().fetchProducts({ ...queryParams, page: 0 });
const loadMoreProducts = function () {
  console.log(useRoute().query.page);
  queryParams.page++;
  queryParams.size = 16;
  useRouter().replace({ query: { page: queryParams.page } });
};

// watch
watch(queryParams, () => {
  useProductsStore().fetchProducts({ ...queryParams });
});
</script>
<style></style>
