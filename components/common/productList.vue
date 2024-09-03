<template>
  <div>
    <div v-if="productListEmpty">
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
            <a-tooltip
              v-if="link == 'mehsullar'"
              slot="favorite"
              placement="top"
            >
              <template slot="title">
                <span>{{ $t("add_to_my_favorites") }}</span>
              </template>
              <div
                v-if="loggedIn"
                @click="toggleProductToFavorite(product, $event, index, link)"
                :class="{
                  'bg-[#16A34A]': product.addedToFavoriteBasket,
                  'bg-white': !product.addedToFavoriteBasket,
                }"
                class="absolute right-2 top-2 md:right-5 md:top-5 z-40 w-9 h-9 flex justify-center items-center shadow-lg rounded-full"
              >
                <favorite_icon
                  :size="{ width: '24px', height: '24px' }"
                  :color="product.addedToFavoriteBasket ? '#FFFFFF' : '#334155'"
                />
              </div>
              <div
                v-else
                @click="toggleProductToFavorite(product, $event, index, link)"
                :class="{
                  'bg-[#16A34A]': product.favoriteIsActive,
                  'bg-white': !product.favoriteIsActive,
                }"
                class="absolute right-2 top-2 md:right-5 md:top-5 z-40 w-9 h-9 flex justify-center items-center shadow-lg rounded-full"
              >
                <favorite_icon
                  :size="{ width: '24px', height: '24px' }"
                  :color="product.favoriteIsActive ? '#FFFFFF' : '#334155'"
                />
              </div>
            </a-tooltip>
            <a-tooltip slot="compare" placement="bottom">
              <template slot="title">
                <span>{{ $t("compare_do") }}</span>
              </template>
              <div
                @click="toggleProductToCompare(product, $event, index, link)"
                :class="{
                  'bg-[#16A34A]': product.compareIsActive,
                  'bg-white': !product.compareIsActive,
                  'top-12 md:top-[62px]': link == 'mehsullar',
                  'top-3 md:top-4': link != 'mehsullar',
                }"
                class="absolute right-2 md:right-5 z-40 w-9 h-9 flex justify-center items-center shadow-lg rounded-full"
              >
                <scale_logo
                  :size="{ width: '24px', height: '24px' }"
                  :color="product.compareIsActive ? '#FFFFFF' : '#334155'"
                />
              </div>
            </a-tooltip>
          </ProductCard>
          <!-- </div> -->
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import ProductCard from "@/components/common/ProductCard";
import scale_logo from "@/components/svg/scale_logo.vue";
import favorite_icon from "@/components/svg/favorite_icon";
import { notification } from "ant-design-vue";
import { mapGetters, mapMutations } from "vuex";

const farmerProductDetailInSet = new Set();
const favoriteProductList = new Set();
export default {
  name: "ProductListing",

  components: {
    ProductCard,
    scale_logo,
    favorite_icon,
  },

  props: {
    link: {
      type: String,
    },
    products: {
      type: Array,
      default: () => {
        return [];
      },
    },
    classGridSize: {
      type: Boolean,
      default: function () {
        return true;
      },
    },
  },
  data() {
    return {
      compareFarmerProductList: [],
      compareProductList: [],
      farmerProductDetail: farmerProductDetailInSet,
      favoriteProductList: favoriteProductList,
      color: "#334155",
    };
  },

  mounted() {
    this.setCompare();
    this.checkProduct();
    this.$nuxt.$on("checkNewProducts", ($event) => this.checkProducts($event));
  },
  destroyed() {
    notification["close"];
  },
  methods: {
    checkProducts() {
      this.products.forEach((product) => {
        if (
          this.compareProductList.findIndex(
            (item) => item.id == product.id || item == product.id
          ) > -1 ||
          product.addedToComparisonBasket
        ) {
          this.isActiveCompare(product.id, true);
        }
        if (
          this.compareFarmerProductList.findIndex(
            (item) => item.id == product.id || item == product.id
          ) > -1 ||
          product.addedToComparisonBasket
        ) {
          this.isActiveCompare(product.id, true);
        }
        if (
          this.favoriteProductList.has(product.id) ||
          product.addedToFavoriteBasket
        ) {
          this.isActiveCompare(product.id, true, "favorite");
        }
      });
    },
    setCompare() {
      this.compareProductList =
        JSON.parse(localStorage.getItem("compareProducts")) || [];
      this.compareFarmerProductList =
        JSON.parse(localStorage.getItem("compareFarmerProducts")) || [];
      this.favoriteProductList = new Set(
        JSON.parse(localStorage.getItem("favoriteProducts"))
      );
      this.$store.commit("favorite/setFavoriteProduct", [
        ...this.favoriteProductList,
      ]);
      this.$store.commit("compare/setCompareFarmerIds", [
        ...this.compareFarmerProductList,
      ]);
      this.$store.commit("compare/setCompareIds", [...this.compareProductList]);
    },
    toggleProductToFavorite(product, event, index) {
      event.stopPropagation();
      event.preventDefault();
      if (this.loggedIn) {
        product.addedToFavoriteBasket = !product.addedToFavoriteBasket;
        if (!product.addedToFavoriteBasket) {
          this.favoriteProductList.delete(product.id);
          this.$store
            .dispatch("favorite/removeProductFromFavorite", {
              productId: product.id,
            })
            .finally(() => {
              this.$emit("removeFavoriteProduct", {
                id: product.id,
                index: index,
                favoriteProductList: [...this.favoriteProductList],
              });
            });
        } else {
          this.favoriteProductList.add(product.id);
          this.$store.dispatch("favorite/addProductToFavorite", {
            productId: product.id,
          });
        }
        this.isActiveCompare(
          product.id,
          product.addedToFavoriteBasket,
          "favorite"
        );
        this.$nuxt.$emit("check", {
          id: product.id,
          product: product,
        });
        this.$store.dispatch("favorite/fetchCount");
      } else {
        //without login
        if (this.getFavoriteProductIds.includes(product.id)) {
          this.$emit("removeFavoriteProduct", {
            id: product.id,
            index: index,
            favoriteProductList: [...this.favoriteProductList],
          });
          this.favoriteProductList.delete(product.id);
        } else {
          this.favoriteProductList.add(product.id);
          if (this.favoriteProductList.size > 12) {
            if (this.getFavoriteProductIds.includes(product.id)) {
              this.favoriteProductList.delete(product.id);
              this.$store.commit("setLoginRequiredModal", true);
            }
          }
        }
        this.isActiveCompare(
          product.id,
          this.favoriteProductList.has(product.id),
          "favorite"
        );
        this.$nuxt.$emit("check", {
          id: product.id,
          product: product,
        });
        //without login
      }
      this.$store.commit("favorite/setFavoriteProductIds", product.id);
      if (this.getFavoriteProductIds.includes(product.id)) {
        this.getNotification({
          message: this.$t("the_product_has_been_added_to_my_favorites"),
          btnText: this.$t("my_favorites_section"),
          path: "/beyenilmis-mehsullar",
        });
      }
      // this.checkProduct();
    },
    toggleProductToCompare(product, event, index, link) {
      event.stopPropagation();
      event.preventDefault();
      if (this.loggedIn) {
        product.addedToComparisonBasket = !product.addedToComparisonBasket;
      }
      if (link == "mehsullar") {
        if (this.loggedIn) {
          if (!product.addedToComparisonBasket) {
            let index = this.compareProductList.findIndex(
              (item) => item.id == product.id || item == product.id
            );
            this.compareProductList.splice(index, 1);
            this.$store.dispatch("compare/removeProductFromCompare", {
              productId: product.id,
              farmerProduct: false,
            });
          } else {
            this.compareProductList.push({
              id: product.id,
              createdAt: new Date(),
            });
            this.$store.dispatch("compare/addProductToCompare", {
              productId: product.id,
              farmerProduct: false,
              createdAt: new Date(),
            });
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
    },
    getNotification(param) {
      notification["success"]({
        message: param.message,
        // description: "Məhsul müqayisəyə əlavə olundu",
        placement: "bottomRight",
        duration: 1,
        btn: (h) => {
          return h(
            "a-button",
            {
              props: {
                type: "primary",
                size: "small",
              },
              on: {
                click: () => {
                  notification["close"];
                  this.$router.push({
                    path: param.path,
                  });
                },
              },
            },
            param.btnText
          );
        },
      });
    },
    isActiveCompare(productId, compareIsActive, check = "compare") {
      if (check == "compare") {
        this.products.filter((product, i) => {
          if (product.id === productId) {
            this.$set(this.products[i], "compareIsActive", compareIsActive);
          }
        });
      } else {
        // const favoriteProductIndex = this.products.findIndex(
        //   (product) => product.id === productId
        // );
        this.products.filter((item, i) => {
          if (item.id === productId) {
            this.$set(this.products[i], "favoriteIsActive", compareIsActive);
          }
        });
      }
    },
    checkProduct() {
      if (this.products) {
        if (this.loggedIn) {
          this.products.forEach((product) => {
            this.isActiveCompare(product.id, product.addedToComparisonBasket);
            this.isActiveCompare(
              product.id,
              product.addedToFavoriteBasket,
              "favorite"
            );
          });
        } else {
          this.products.forEach((product) => {
            if (
              this.compareFarmerProductList.findIndex(
                (item) => item.id == product.id || item == product.id
              ) > -1 ||
              this.compareProductList.findIndex(
                (item) => item.id == product.id || item == product.id
              ) > -1
            ) {
              this.isActiveCompare(product.id, true);
            }
            if (this.favoriteProductList.has(product.id)) {
              this.isActiveCompare(product.id, true, "favorite");
            }
          });
        }
      }
    },
  },

  computed: {
    productListEmpty() {
      return !this.products.length;
    },
    ...mapGetters({
      loggedIn: "auth/loggedIn",
      getFavoriteProducts: "favorite/getFavoriteProducts",
      getFavoriteProductIds: "favorite/getFavoriteProductIds",
      getCompareProducts: "compare/getCompareProducts",
    }),
  },
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
