<template>
  <div class="h-full min-h-screen w-full min-w-full">
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
</template>
<script setup lang="ts">
// const { locale } = useI18n();

const queryParams = reactive({
  page: 0,
  size: 12,
  sortBy: "createdAt",
  sortDirection: "DESC",
});
useProductsStore().fetchProducts({ ...queryParams });
const loadMoreProducts = function () {};
</script>
