<template>
  <div>
    <div>
      <div v-if="props.products.size == 0">
        <div class="text-base text-gray-600">
          {{ t("no_products_matching_your_search_were_found") }}
        </div>
      </div>
      <div v-else class="w-full min-w-full overflow-hidden scroll">
        <div
          :class="{
            'grid grid-cols-1 md:grid-cols-3 xl:grid-cols-4 gap-6':
              props.classGridSize,
            'grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6':
              !props.classGridSize,
          }"
        >
          <div
            class="flex w-full min-w-full"
            v-for="(product, index) in props.products"
            :key="index"
          >
            <!-- <div class="min-w-full"> -->
            <product
              :link="props.link"
              class="responsiveProductCard w-full min-w-full border-2 border-gray-[#E5E7EB] rounded p-3"
              :product="product"
            >
              <template #favorite>
                <a-tooltip v-if="link == 'mehsullar'" placement="top">
                  <template #title>
                    <span>{{ t("add_to_my_favorites") }}</span>
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
                    <span>{{ t("compare_do") }}</span>
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
                    @click="toggleProductToCompare(product, $event, index,
                    link)"

                    <scale_logo
                      :size="{ width: '24px', height: '24px' }"
                      :color="product.compareIsActive ? '#FFFFFF' : '#334155'"
                    />
                  </div>
                </a-tooltip>
              </template>
            </product>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import type { FarmerProduct } from "~/utils/types/farmer-product";
import type { Product } from "~/utils/types/product";
const { t } = useI18n();

let props = defineProps({
  classGridSize: {
    type: Boolean,
    required: true,
  },
  products: {
    type: Object as PropType<Set<Product | FarmerProduct>>,
    default: [],
  },
  link: {
    type: String,
  },
  farmer: {
    type: Boolean,
  },
});
let compareProductList = reactive<Array<any>>([]);

const toggleProductToCompare = function (
  product: any,
  event: Event | KeyboardEvent,
  index: number,
  link: any
) {
  event.stopPropagation();
  event.preventDefault();
  if (useAuthenticator().getToken) {
    product.addedToComparisonBasket = !product.addedToComparisonBasket;
  }
  if (link == "mehsullar") {
    if (useAuthenticator().getToken) {
      if (!product.addedToComparisonBasket) {
        let index = compareProductList.findIndex(
          (item) => item.id == product.id || item == product.id
        );
        compareProductList.splice(index, 1);
        // this.$store.dispatch("compare/removeProductFromCompare", {
        //   productId: product.id,
        //   farmerProduct: false,
        // });
      } else {
        compareProductList.push({
          id: product.id,
          createdAt: new Date(),
        });
        // this.$store.dispatch("compare/addProductToCompare", {
        //   productId: product.id,
        //   farmerProduct: false,
        //   createdAt: new Date(),
        // });
      }
      this.isActiveCompare(product.id, product.addedToComparisonBasket);
      this.$nuxt.$emit("check", {
        id: product.id,
        product: product,
      });
    } else {
      if (
        this.getCompareProducts.findIndex(
          (item) => item.id == product.id || item == product.id
        ) > -1
      ) {
        let index = this.compareProductList.findIndex(
          (item) => item.id == product.id || item == product.id
        );
        this.compareProductList.splice(index, 1);
      } else {
        this.compareProductList.push({
          id: product.id,
          createdAt: new Date(),
        });
      }
      this.$nuxt.$emit("check", {
        id: product.id,
        product: product,
      });
      this.isActiveCompare(
        product.id,
        this.compareProductList.findIndex(
          (item) => item.id == product.id || item == product.id
        ) > -1
      );
    }
    this.$store.commit("compare/setCompareProductIds", {
      id: product.id,
      createdAt: new Date(),
    });
  } else {
    if (this.loggedIn) {
      if (!product.addedToComparisonBasket) {
        let index = this.compareFarmerProductList.findIndex(
          (item) => item.id == product.id || item == product.id
        );
        this.compareFarmerProductList.splice(index, 1);
        this.$store.dispatch("compare/removeProductFromCompare", {
          productId: product.id,
          farmerProduct: true,
        });
      } else {
        this.compareFarmerProductList.push({
          id: product.id,
          createdAt: new Date(),
        });
        this.$store.dispatch("compare/addProductToCompare", {
          productId: product.id,
          farmerProduct: true,
          createdAt: new Date(),
        });
      }
      this.isActiveCompare(product.id, product.addedToComparisonBasket);
      this.$store.dispatch("compare/fetchCount");
    } else {
      if (
        this.getCompareProducts.findIndex(
          (item) => item.id == product.id || item == product.id
        ) > -1
      ) {
        let index = this.compareFarmerProductList.findIndex(
          (item) => item.id == product.id || item == product.id
        );
        this.compareFarmerProductList.splice(index, 1);
      } else {
        this.compareFarmerProductList.push({
          id: product.id,
          createdAt: new Date(),
        });
      }
      this.isActiveCompare(
        product.id,
        this.compareFarmerProductList.findIndex(
          (item) => item.id == product.id || item == product.id
        ) > -1
      );
    }
    this.$store.commit("compare/setCompareFarmerProductIds", {
      id: product.id,
      createdAt: new Date(),
    });
  }
  // this.checkProduct();
  if (
    this.getCompareProducts.findIndex(
      (item) => item.id == product.id || item == product.id
    ) > -1
  ) {
    this.getNotification({
      message: this.$t("the_product_has_been_to_the_comparison"),
      btnText: this.$t("comparison_section"),
      path: "/mehsullarin-muqayisesi",
    });
  }
};
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
