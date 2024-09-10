<template>
  <div class="flex w-full flex-col">
    <div class="flex flex-row justify-between items-center mb-6">
      <div
        class="flex flex-row items-center justify-start text-[#16A34A] text-2xl font-bold"
      >
        <span class="mr-4">{{ $t("discounted_products") }}</span>
        <span>%</span>
      </div>
      <h3
        class="inline-flex flex-row justify-center items-center w-auto text-gray-800 font-semibold text-base cursor-pointer"
        @click="allDiscountProducts"
      >
        <span class="hidden md:block mr-2">
          {{ $t("all_discounted_products") }}</span
        >
        <svg
          width="14"
          height="14"
          viewBox="0 0 14 14"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M8.16667 2.91663L12.25 6.99996M12.25 6.99996L8.16667 11.0833M12.25 6.99996L1.75 6.99996"
            stroke="#111827"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
        </svg>
      </h3>
    </div>
    <products
      :classGridSize="true"
      :link="'mehsullar'"
      :products="useDiscountedProductsStore().getProducts"
    />
  </div>
</template>
<script setup lang="ts">
// import products from "@/components/common/products.vue";
// import type { Product } from "~/utils/types/product";

const allDiscountProducts = function () {
  useRouter().push({
    path: `mehsullar`,
    query: { endirimli: "beli", sortBy: "ecommerceDiscount" },
  });
};
</script>
