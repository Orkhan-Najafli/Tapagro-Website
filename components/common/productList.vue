<template>
  <div>
    <div v-if="products.length">
      <div class="text-base text-gray-600">
        {{ $t("no_products_matching_your_search_were_found") }}
      </div>
    </div>
    <div v-else class="w-full min-w-full overflow-hidden scroll">
      <div
        :class="{
          'grid grid-cols-1 md:grid-cols-3 xl:grid-cols-4 gap-6': classGridSize,
          'grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6':
            !classGridSize,
        }"
      >
        <div
          class="flex w-full min-w-full"
          v-for="(product, index) in products"
          :key="index"
        >
          <!-- <div class="min-w-full"> -->
          <ProductCard
            :link="link"
            class="responsiveProductCard w-full min-w-full border-2 border-gray-[#E5E7EB] rounded p-3"
            :product="product"
          >
            <template #title>
              <a-tooltip v-if="link == 'mehsullar'" placement="top">
                <template #title>
                  <span>{{ $t("add_to_my_favorites") }}</span>
                </template>
                <div
                  v-if="useAuthenticator().getToken"
                  :class="{
                    'bg-[#16A34A]': product.addedToFavoriteBasket,
                    'bg-white': !product.addedToFavoriteBasket,
                  }"
                  class="absolute right-2 top-2 md:right-5 md:top-5 z-40 w-9 h-9 flex justify-center items-center shadow-lg rounded-full"
                >
                  <!-- @click="toggleProductToFavorite(product, $event, index, link)" -->

                  <favorite_icon
                    :size="{ width: '24px', height: '24px' }"
                    :color="
                      product.addedToFavoriteBasket ? '#FFFFFF' : '#334155'
                    "
                  />
                </div>
                <div
                  v-else
                  :class="{
                    'bg-[#16A34A]': product.favoriteIsActive,
                    'bg-white': !product.favoriteIsActive,
                  }"
                  class="absolute right-2 top-2 md:right-5 md:top-5 z-40 w-9 h-9 flex justify-center items-center shadow-lg rounded-full"
                >
                  <!-- @click="toggleProductToFavorite(product, $event, index, link)" -->

                  <favorite_icon
                    :size="{ width: '24px', height: '24px' }"
                    :color="product.favoriteIsActive ? '#FFFFFF' : '#334155'"
                  />
                </div>
              </a-tooltip>
            </template>
            <template #compare>
              <a-tooltip placement="bottom">
                <template #title>
                  <span>{{ $t("compare_do") }}</span>
                </template>
                <div
                  :class="{
                    'bg-[#16A34A]': product.compareIsActive,
                    'bg-white': !product.compareIsActive,
                    'top-12 md:top-[62px]': link == 'mehsullar',
                    'top-3 md:top-4': link != 'mehsullar',
                  }"
                  class="absolute right-2 md:right-5 z-40 w-9 h-9 flex justify-center items-center shadow-lg rounded-full"
                >
                  <!-- @click="toggleProductToCompare(product, $event, index, link)" -->

                  <scale_logo
                    :size="{ width: '24px', height: '24px' }"
                    :color="product.compareIsActive ? '#FFFFFF' : '#334155'"
                  />
                </div>
              </a-tooltip>
            </template>
          </ProductCard>
          <!-- </div> -->
        </div>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import ProductCard from "@/components/common/ProductCard";
import scale_logo from "@/components/svg/scale_logo.vue";
import favorite_icon from "@/components/svg/favorite_icon";
import type { Product } from "~/utils/types/product";

const farmerProductDetailInSet = new Set();
const favoriteProductList = new Set();
const compareFarmerProductList = reactive({ compareFarmerProductList: [] });
const compareProductList = reactive({
  compareProductList: [],
});
const color = ref("#334155");

const { link, products, classGridSize } = defineProps({
  link: {
    type: String,
  },
  products: {
    type: Array as PropType<Array<Product>>,
    default: [],
  },
  classGridSize: {
    type: Boolean,
    default: true,
  },
});

const setCompare = function () {
  compareProductList.compareProductList =
    useCookie("compareProducts").value || [];
  compareFarmerProductList.compareFarmerProductList =
    useCookie("compareFarmerProducts").value || [];
  favoriteProductList = new Set(useCookie("favoriteProducts").value);
  // this.$store.commit("favorite/setFavoriteProduct", [
  //   ...this.favoriteProductList,
  // ]);
  // this.$store.commit("compare/setCompareFarmerIds", [
  //   ...this.compareFarmerProductList,
  // ]);
  // this.$store.commit("compare/setCompareIds", [...this.compareProductList]);
};
setCompare();
</script>

<style>
.scroll::-webkit-scrollbar {
  display: none;
}

.scroll {
  -ms-overflow-style: none; /* IE and Edge */
  scrollbar-width: none; /* Firefox */
}

@media only screen and (max-width: 470px) {
  .responsiveProductCard {
    min-width: 100%;
    max-width: 100%;
  }
}

@media only screen and (min-width: 769px) {
  .responsiveProductCard {
    max-width: 212px;
    min-width: 100%;
  }
}

@media only screen and (min-width: 1290px) {
  .responsiveProductCard {
    min-width: 100%;
    max-width: 250px;
  }
}
</style>
