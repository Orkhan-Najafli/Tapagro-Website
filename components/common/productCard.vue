<template>
  <div v-if="product != {}">
    <nuxt-link
      v-if="link == 'mehsullar'"
      tag="a"
      :to="`/mehsullar/${product.id}`"
      class="flex flex-col group overflow-hidden relative cursor-pointer z-10 align-baseline h-full"
    >
      <div class="flex w-full h-auto relative">
        <div>
          <template>
            <slot name="compare"></slot>
          </template>
          <template>
            <slot name="favorite"></slot>
          </template>
        </div>
        <picture
          class="w-full overflow-hidden flex relative justify-center items-center rounded"
        >
          <img
            v-if="hasValidThumbnail(product)"
            :src="`${baseURL}${product.thumbnailPath}`"
            :alt="product.name"
            :title="product.name"
            @load="setheight"
            :style="{ height: imageHeight + 'px' }"
            style="
              width: 100%;
              min-width: 100%;
              max-width: 100%;
              /*height: 145px;*/
              /*max-height: 145px;*/
            "
            class="object-cover duration-500 max-h-[264px] transform group-hover:scale-125"
            @error="setDefaultImage"
          />
          <img
            v-else
            :src="require(`@/assets/img/no-image.svg`)"
            style="
              width: 100%;
              max-width: 100%;
              height: 264px !important;
              max-height: 264px !important;
            "
            class="p-16 duration-300 max-h-[264px] transform group-hover:scale-125"
            alt="Image not available"
          />
        </picture>

        <div
          v-if="!product.isActive"
          class="absolute flex flex-row justify-center items-center bottom-3 left-3 bg-white px-2 py-1 rounded-md"
        >
          <cancel_icon />
          <span class="inline-flex text-[#DC2626] font-normal text-sm ml-2">
            {{ $t("the_product_is_not_active") }} {{ product.isActive }}</span
          >
        </div>
      </div>
      <div class="pt-3 border-t border-gray-100 grow">
        <p
          class="text-gray-500 p-0 m-0 mb-2 text-sm font-medium truncate"
          :title="product.name"
        >
          {{ product.name }}
        </p>
        <h4
          class="text-xs font-normal text-gray-400 line-clamp-1 m-0 p-0"
          :title="product.storeName"
        >
          {{ product.storeName }}
        </h4>
      </div>
      <div class="flex flex-col justify-start items-start mt-3">
        <span
          class="text-base leading-6 font-semibold text-gray-600"
          v-if="product.bargainMethod"
        >
          {{ product.bargainMethod.status }}
        </span>

        <div v-else class="flex flex-col text-lg font-semibold text-gray-600">
          <div
            v-if="product.price && product.price.discount > 0"
            class="flex flex-col"
          >
            <div
              class="relative flex flex-row items-center font-normal text-xs text-[#6B7280]"
            >
              <svg
                class="absolute z-40 top-1.5 w-auto"
                xmlns="http://www.w3.org/2000/svg"
                height="2"
                viewBox="0 0 50 2"
                fill="none"
              >
                <path d="M0 1H59" stroke="#4B5563" />
              </svg>

              <span class="mr-0.5">
                {{ product.price && product.price.initialPrice }}</span
              >
              <monetary_unit_logo
                :styleSVG="{ widht: 13, height: 10, color: '#6B7280' }"
              />
            </div>
            <div class="flex flex-row items-center">
              <div v-if="product.price" class="flex flex-row items-center mr-3">
                <span v-if="fixed" class="mr-0.5 text-[#EF4444]"
                  >{{ product.price && product.price.discountedPrice }}
                </span>
                <span
                  @mouseenter="tofixed = false"
                  @mouseleave="tofixed = true"
                  v-else
                  class="mr-0.5 text-[#EF4444]"
                  >{{
                    tofixed
                      ? `${Math.floor(product.price.discountedPrice)}.${
                          product.price.discountedPrice
                            .toString()
                            .split(".")[1][0]
                        }${
                          product.price.discountedPrice
                            .toString()
                            .split(".")[1][1] || ""
                        }`
                      : product.price.discountedPrice
                  }}
                </span>
                <monetary_unit_logo
                  :styleSVG="{ widht: 16, height: 13, color: '#EF4444' }"
                />
              </div>
              <span
                class="text-[#EF4444] bg-[#FEF2F2] text-xs font-medium p-0 py-0.5 px-1"
              >
                -{{ product.price.discount }} %</span
              >
            </div>
          </div>
          <div v-else class="flex flex-row justify-start items-center">
            <span class="mr-1 text-base font-medium text-[#374151]">{{
              product.price && product.price.initialPrice
            }}</span>
            <monetary_unit_logo
              :styleSVG="{ widht: 16, height: 13, color: '#374151' }"
            />
          </div>
        </div>
        <nuxt-link
          @click="$event.stopPropagation()"
          tag="a"
          :to="localePath(`/mehsullar/${product.id}#rating`)"
          class="flex flex-row items-center justify-start mb-5 mt-3"
        >
          <span class="text-[#1F2937] text-xs md:text-sm font-medium">{{
            product.reviewSummary &&
            Number(product.reviewSummary.averageRating).toFixed(1)
          }}</span>
          <span class="inline-flex justify-between items-center mx-1 md:mx-2.5">
            <a-rate
              :default-value="
                rateSet(
                  product.reviewSummary && product.reviewSummary.averageRating
                )
              "
              disabled
              class="m-0 p-0"
              allow-half
            >
              <template slot="character">
                <rate_icon
                  class="inline-block md:hidden -mt-[5px]"
                  :size="{ widht: 15, height: 15 }"
                />
                <rate_icon
                  class="hidden md:inline-block -mt-[5px]"
                  :size="{ widht: 20, height: 20 }"
                />
              </template>
            </a-rate>
          </span>
          <span class="text-[#1F2937] text-xs md:text-sm font-medium">
            ({{ product.reviewSummary && product.reviewSummary.reviewCount }})
          </span>
        </nuxt-link>
        <a
          @click="stopPropagationProduct($event)"
          class="text-white z-30 block w-full h-auto"
        >
          <a-tooltip
            v-if="!product.eligibleToShoppingCart || !product.isActive"
            placement="bottom"
          >
            <template #title>
              <span v-if="!product.isActive"
                >{{ $t("the_product_is_not_active") }} <br
              /></span>
              <template v-if="!product.eligibleToShoppingCart">
                <span v-if="product.price">{{
                  $t("product_is_out_of_stock")
                }}</span>
                <span v-else> {{ $t("contact_the_store_to_order") }} </span>
              </template>
            </template>
            <button
              class="flex flex-row justify-center items-center w-full h-auto font-semibold text-sm bg-opacity-40 bg-green-600 rounded-md m-0 p-0 px-3 py-2 text-white cursor-default"
            >
              <basket_logo />
              <span class="ml-2"> {{ $t("add_to_cart") }}</span>
            </button>
          </a-tooltip>
          <button
            v-else
            @click="showBasketModal(product.id)"
            class="flex flex-row justify-center items-center w-full h-auto font-semibold text-sm bg-green-600 hover:bg-green-700 rounded-md m-0 p-0 px-3 py-2 text-white"
          >
            <basket_logo />
            <span class="ml-2"> {{ $t("add_to_cart") }}</span>
          </button>
        </a>
      </div>
    </nuxt-link>
    <nuxt-link
      v-if="link == 'fermer-mehsullari'"
      tag="a"
      :to="localePath(`/fermer-mehsullari/${product.id}`)"
      class="flex flex-col group overflow-hidden relative cursor-pointer z-10"
    >
      <div class="flex w-full h-auto relative">
        <template>
          <nuxt-link
            tag="div"
            :to="localePath(``)"
            @click="$event.stopPropagation()"
          >
            <slot name="compare"></slot>
          </nuxt-link>
        </template>
        <picture
          class="w-full overflow-hidden flex relative justify-center items-center"
        >
          <img
            v-if="hasValidThumbnail(product)"
            :src="`${baseURL}${product.thumbnailPath}`"
            :alt="product.name"
            :title="product.name"
            style="width: 100%; min-width: 100%; max-width: 100%"
            @load="setheight"
            :style="{ height: imageHeight + 'px' }"
            class="object-cover duration-500 max-h-[264px] transform group-hover:scale-125"
            @error="setDefaultImage"
          />
          <img
            v-else
            :src="require(`@/assets/img/no-image.svg`)"
            style="width: 100%; max-width: 100%"
            @load="setheight"
            :style="{ height: imageHeight + 'px' }"
            class="p-16 duration-300 max-h-[264px] transform group-hover:scale-125"
            alt="Image not available"
          />
        </picture>

        <div
          v-if="product.vipAt"
          class="absolute left-2 top-2 md:left-5 md:top-5 z-40 w-[30px] h-[30px] py-2 px-1 flex justify-center items-center shadow-lg bg-black rounded-md"
        >
          <vip_icon2 />
        </div>
      </div>
      <div class="pt-3 border-t border-gray-100 grow">
        <p
          class="text-gray-500 mb-4 line-clamp-2 text-sm font-medium"
          :title="product.name"
        >
          {{ product.name }}
        </p>
      </div>
      <div class="flex flex-col justify-start items-start mt-2">
        <h4
          class="text-xs font-normal text-gray-400 mb-4 line-clamp-1"
          :title="product.fullName"
        >
          {{ product.fullName }}
        </h4>
        <div
          class="flex flex-row justify-start items-center text-lg leading-6 font-semibold text-[#374151]"
        >
          <span class="mr-1"> {{ product.price }}</span>
          <monetary_unit_logo
            :styleSVG="{ widht: 16, height: 13, color: '#374151' }"
          />
        </div>
      </div>
    </nuxt-link>
  </div>
</template>
<script setup lang="ts">
defineProps({
  link: {
    type: String,
  },
  product: {
    type: Object,
    // defautl:()=>{}
  },
});
const baseURL = useRuntimeConfig().public.baseURL;
</script>
<script>
import basket_logo from "@/components/svg/basket_logo.vue";
import monetary_unit_logo from "@/components/svg/monetary_unit_logo.vue";
import scale_logo from "@/components/inc/svg/scale_logo.vue";
import rate_icon from "@/components/inc/svg/rate_icon.vue";
import { mapGetters, mapActions } from "vuex";
import { isEmpty } from "lodash";
import cancel_icon from "@/components/inc/svg/cancel_icon.vue";
import Vip_icon2 from "../inc/svg/vip_icon2.vue";

export default {
  components: {
    Vip_icon2,
    basket_logo,
    scale_logo,
    monetary_unit_logo,
    rate_icon,
    cancel_icon,
  },
  //   props: {
  //     link: {
  //       type: String,
  //     },
  //     product: {
  //       type: Object,
  //       default: () => {
  //         return {};
  //       },
  //     },
  //   },
  data() {
    return {
      //   baseURL: urls.getParam("API_BASE_URL"),
      imageHeight: 145,
      half: true,
      fixed: false,
      tofixed: true,
    };
  },

  computed: {
    addLocaleStorageProductCompare() {
      return;
    },
    ...mapGetters({
      loggedIn: "auth/loggedIn",
    }),
  },
  created() {
    if (this.product) {
      this.priceFixed();
    }
  },
  methods: {
    stopPropagationProduct(event) {
      event.stopPropagation();
      event.preventDefault();
    },
    priceFixed() {
      if (
        this.product.price &&
        !Number.isInteger(Number(this.product.price.discountedPrice))
      ) {
        this.fixed = false;
      } else {
        this.fixed = true;
      }
    },
    rateSet(val) {
      if (!Number.isInteger(Number(val))) {
        return Number(`${Math.floor(val)}.${5}`);
      } else {
        return val;
      }
    },
    setheight(event) {
      let image = event.target;
      this.imageHeight = image.clientWidth;
    },

    showBasketModal(id) {
      this.loggedIn
        ? this.$store
            .dispatch("basket/addBasketIncrease", { productId: id, count: 1 })
            .then(() => {
              this.$store.commit("setBasketModalShow", true);
              this.$store.commit("setBasketModalHide", true);
            })
        : this.$store.commit("setLoginRequiredModal", true);
    },
    setDefaultImage(event) {
      event.target.src = require(`@/assets/img/no-image.svg`);
      event.target.className = "p-16";
    },
    hasValidThumbnail(product) {
      return product.thumbnailPath;
    },
  },
};
</script>
<style>
/* @media only screen and (max-width: 768px) {
    pictuer img{
      width: 160px;
    }
  }
  @media only screen and (min-width: 769px) {
    pictuer img{
      width: 100%;
    }
  } */
</style>
