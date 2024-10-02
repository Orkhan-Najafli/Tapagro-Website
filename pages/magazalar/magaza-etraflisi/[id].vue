<template>
  <main class="pt-3 min-h-screen px-6">
    <section style="max-width: 1224px" class="lg:px-6 lg:container mx-auto">
      <div class="mt-6 mb-5 md:mb-9 hidden md:block">
        <a-breadcrumb class="font-medium text-sm text-gray-500" separator=">">
          <a-breadcrumb-item>
            <span class="text-[#4B5563] text-sm font-medium">
              <nuxt-link tag="a" to="/">{{ $t("main_page") }}</nuxt-link></span
            >
          </a-breadcrumb-item>
          <a-breadcrumb-item>
            <span class="text-[#4B5563] text-sm font-medium">
              <nuxt-link tag="a" to="/magazalar">
                {{ $t("stores") }}</nuxt-link
              ></span
            >
          </a-breadcrumb-item>
          <span class="text-[#1F2937] font-semibold text-sm">
            <a-breadcrumb-item>
              {{ $t("detailed_view_of_the_store") }}</a-breadcrumb-item
            >
          </span>
        </a-breadcrumb>
      </div>
    </section>
    <template>
      <section
        class="flex max-w-[1224px] w-full px-6 xl:px-0 container mx-auto"
      >
        <div class="flex flex-row w-full mb-6 md:mb-10 pt-4 md:pt-0">
          <!-- <Advertising /> -->
          <div class="w-full relative lg:px-6">
            <section
              class="w-full h-auto bg-[#F9FAFBCC] pt-3 px-3 pb-5 mb-5 rounded-xl"
            >
              <a-skeleton
                :paragraph="false"
                :loading="useStoreDetailStore().getStatus !== 'success'"
                active
                class="text-2xl md:text-4xl lg:text-5xl"
              />

              <div
                v-if="useStoreDetailStore().getStatus === 'success'"
                class="flex flex-col justify-start"
              >
                <div class="flex justify-start items-center">
                  <span
                    class="w-14 h-14 p-2 bg-[#F0FDF4] rounded-full flex justify-center items-center"
                  >
                    <img
                      :src="`${baseURL}${
                        useStoreDetailStore().getStore.logoPath
                      }`"
                      @error="setDefaultStoreImage"
                      :alt="useStoreDetailStore().getStore.name"
                    />
                  </span>

                  <h2 class="text-[#374151] font-medium text-lg m-0 p-0 ml-2">
                    {{ useStoreDetailStore().getStore.name }}
                  </h2>
                </div>
                <ul
                  class="flex flex-col lg:flex-row justify-start items-start lg:items-center m-0 p-0 pl-3 mt-6 lg:mt-3"
                >
                  <li
                    class="flex flex-row justify-start items-center font-normal text-base text-[#6B7280] p-0 m-0 mb-4 lg:mb-0 lg:mr-11"
                  >
                    <email-icon />
                    <span class="ml-2.5">{{
                      useStoreDetailStore().getStore.email
                    }}</span>
                  </li>
                  <li
                    class="flex flex-row flex-shrink-0 justify-start items-center font-normal text-base text-[#6B7280] p-0 m-0 mb-4 lg:mb-0 lg:mr-11"
                  >
                    <phone-in-store-detail-icon />
                    <span class="ml-2.5">{{
                      formatPhoneNumber(
                        useStoreDetailStore().getStore.phoneNumber
                      )
                    }}</span>
                  </li>
                  <li
                    v-if="useStoreDetailStore().getStore.website"
                    class="flex flex-row justify-start font-normal text-base text-[#6B7280] items-center p-0 m-0 mb-4 lg:mb-0 lg:mr-11"
                  >
                    <a-icon type="global" class="" />
                    <a
                      class="text-[#6B7280] ml-2.5"
                      :href="`http://${useStoreDetailStore().getStore.website}`"
                      target="_blank"
                      rel="noopener noreferrer"
                      >{{ useStoreDetailStore().getStore.website }}</a
                    >
                  </li>
                  <li
                    class="flex flex-row justify-start font-normal text-base text-[#6B7280] items-center p-0 m-0 lg:mr-11"
                  >
                    <a-icon type="environment" class="" />
                    <span class="ml-2.5">{{
                      useStoreDetailStore().getStore.legalAddress
                    }}</span>
                  </li>
                </ul>
              </div>
            </section>
            <section class="mt-0.5">
              <a-config-provider
                :theme="{
                  token: {
                    colorPrimary: '#16a34a',
                  },
                }"
              >
                <a-input-search
                  :placeholder="$t('product_name')"
                  size="large"
                  class="w-full min-w-full h-auto mb-6 md:mb-11"
                  :maxLength="255"
                  v-model:value="searchText"
                  :allowClear="true"
                  enter-button
                  @search="searchName"
                  @keyup.enter="searchName"
                >
                </a-input-search>
              </a-config-provider>
            </section>
            <section class="mb-6 md:mb-10">
              <div class="flex flex-col md:flex-row justify-between">
                <div class="w-auto pb-8 pr-6 hidden md:flex">
                  <!-- <div class=""> -->
                  <div style="min-width: 292px; max-width: 292px">
                    <StoreDetailFilter
                      style="height: fit-content"
                      class="sticky top-28"
                      :deliveryCities="deliveryCities"
                    />
                  </div>
                  <!-- </div> -->
                </div>
                <div class="flex w-full flex-col m-0">
                  <div class="flex flex-col mb-6">
                    <div class="flex flex-row justify-between w-full">
                      <div class="flex font-bold text-base text-gray-600">
                        {{ $t("products") }}
                        {{
                          !$wait.is(FetchingProducts) &&
                          productData.totalElements
                            ? `: ${productData.totalElements}`
                            : ""
                        }}
                      </div>
                      <div class="flex flex-row justify-end items-center">
                        <a-tooltip placement="bottom">
                          <template #title>
                            <span>Filtr</span>
                          </template>
                          <div
                            @click="showFilterModal"
                            class="inline-flex items-center h-9 lg:hidden cursor-pointer mr-7"
                          >
                            <filter_logo class="" />
                          </div>
                        </a-tooltip>

                        <div class="flex flex-row justify-end">
                          <sorting />
                        </div>
                      </div>
                    </div>
                  </div>
                  <a-spin
                    :spinning="$wait.is(FetchingProducts)"
                    size="large"
                    wrapper-class-name="text-green-800"
                  >
                    <products
                      :link="'mehsullar'"
                      :classGridSize="false"
                      :products="productData.list"
                      v-if="productData.list.length > 0"
                    />
                  </a-spin>

                  <div
                    class="block w-full min-w-full rounded text-center my-14"
                    v-if="productData.list.length != productData.totalElements"
                  >
                    <button
                      @click="loadMoreProducts"
                      class="px-8 py-1 rounded text-amber-400 border border-amber-400 hover:text-white bg-white hover:bg-amber-400 text-sm font-semibold"
                    >
                      {{ $t("more_products") }}
                    </button>
                  </div>
                  <div
                    v-else
                    class="block w-full min-w-full rounded text-center my-14"
                  ></div>
                </div>
              </div>
            </section>
          </div>
        </div>
      </section>
      <keep-alive>
        <StoreDetailFilterMobile
          :visible="visible"
          @handleCancel="visible = false"
          :deliveryCities="deliveryCities"
        />
      </keep-alive>
    </template>
    <!-- <Page404
      v-else
      title="404"
      :subTitle="$t('no_store_matching_your_search_was_found')"
    /> -->
  </main>
</template>

<script setup lang="ts">
const baseURL = useRuntimeConfig().public.baseURL;
const searchText = ref();
const showOrderMenu = ref(false);
const visible = ref(false);
//   import StoreDetailFilter from "@/components/filters/filterForLargeScreens/StoreDetailFilter.vue";
//   import StoreDetailFilterMobile from "@/components/filters/filterForSmallScreens/StoreDetailFilterMobile.vue";
//   import ProductCard from "@/components/common/ProductCard.vue";
//   import ProductListing from "@/components/common/ProductListing";
//   import { FetchingProducts } from "@/app/product/waiting-types";
//   import { FetchingStoreDetails } from "@/app/store/waiting-types";
//   import { formatPhoneNumber } from "@/utils/helpers";
//   import filter_logo from "@/components/inc/svg/filter_logo.vue";
//   import _ from "lodash";
//   import urls from "@/configs/urls";
//   import Sorting from "@/components/common/Sorting.vue";
//   import Page404 from "@/components/common/404.vue";

//   export default {
//     components: {
//       ProductListing,
//       ProductCard,
//       Sorting,
//       filter_logo,
//       StoreDetailFilter,
//       StoreDetailFilterMobile,
//       Page404,
//     },

//     data() {
//       return {
//         baseURL: urls.getParam("API_BASE_URL"),
//         FetchingProducts: FetchingProducts,
//         FetchingStoreDetails: FetchingStoreDetails,
//         currentPageNumber: 1,
//         store: undefined,
//         deliveryCities: [],
//         searchText: undefined,
//         productData: {
//           list: [],
//           page: 0,
//           totalPages: null,
//           totalElements: null,
//         },
//         searchParams: {
//           sortBy: "createdAt",
//           sortDirection: "DESC",
//         },
//         showOrderMenu: false,

//         visible: false,
//         more: false,
//       };
//     },

//     created() {
//       this.$store.commit("setAppHeroShowAndHide", false);

//       if (this.$route.query) {
//         let queryString = this.$route.query;
//         this.searchText = queryString.searchText || undefined;
//       }
//     },
//     async asyncData(context) {
//       await context.store.dispatch(
//         "productCategories/getBaseCategoryListByStoreId",
//         {
//           storeId: Number(context.route.params.storeAboutDetail),
//         }
//       );
//     },
//     mounted() {
//       this.loadStoreDetails();
//     },
//     computed: {
//       storeDetailsLoaded: function () {
//         return this.store !== undefined;
//       },
//     },
//     methods: {
//       showFilterModal() {
//         this.visible = true;
//       },
//   mobileMenu(event) {
//     let box =
//       process.browser && document.getElementsByClassName("mobile-box")[0];
//     if (!event.composedPath().includes(box)) {
//       this.showOrderMenu = !this.showOrderMenu;
//     }
//   },
//       formatPhoneNumber,
//       loadMoreProducts() {
//         let page = 0;
//         if (this.$route.query && this.$route.query.page) {
//           page = parseInt(this.$route.query.page);
//         }
//         this.$router.replace({
//           query: {
//             ...this.$route.query,
//             page: ++page,
//           },
//         });
//         this.more = true;
//       },
//       searchName: _.debounce(function () {
//         this.$router.replace({
//           query: {
//             ...this.$route.query,
//             searchText: this.searchText || undefined,
//             page: undefined,
//           },
//         });
//       }, 600),
//       loadStoreDetails() {
//         this.$wait.start(FetchingStoreDetails);
//         this.$stores
//           .getStore(Number(this.$route.params.storeAboutDetail))
//           .then((storeDetails) => {
//             this.store = storeDetails;
//             this.deliveryCities = storeDetails.deliveryCities;
//           })
//           .finally(() => {
//             this.$wait.end(FetchingStoreDetails);
//           });
//       },
//       convertSortBy(direction) {
//         if (this.$route.query && this.$route.query.sortBy) {
//           let item = this.$route.query.sortBy.split("-");
//           if (direction) {
//             return item[1] || this.searchParams.sortDirection;
//           } else {
//             return item[0] || this.searchParams.sortBy;
//           }
//         } else {
//           if (direction) {
//             return this.searchParams.sortDirection;
//           } else {
//             return this.searchParams.sortBy;
//           }
//         }
//       },
//       loadProducts() {
//         this.visible = false;
//         this.$wait.start(FetchingProducts);

//         this.$product
//           .getProductList({
//             ...this.$route.query,
//             sortBy: this.convertSortBy(false),
//             sortDirection: this.convertSortBy(true),
//             page: this.productData.list.length == 0 ? 0 : this.$route.query.page,
//             size:
//               this.productData.list.length == 0
//                 ? (parseInt(this.$route.query.page || 0) + 1) * 12
//                 : 12,
//             isDiscounted: !!this.$route.query.endirimli || undefined,
//             storeIds: [Number(this.$route.params.storeAboutDetail)],
//           })
//           .then((response) => {
//             this.productData.list.push(...response.products);
//             this.productData.totalElements = response.metadata.totalElements;
//             this.productData.totalPages = response.metadata.totalPages;
//             this.more = false;
//             this.$nuxt.$emit("checkNewProducts", {});
//           })
//           .finally(() => {
//             this.$wait.end(FetchingProducts);
//           });
//       },
const setDefaultStoreImage = async function (event: Event | any) {
  event.target.src = await require(`@/assets/img/store_logo.svg`);
  event.target.className = "p-1";
};
//     },
//     watch: {
//       "$route.query": "$fetch",
//     },
//     async fetch() {
//       !this.more && (this.productData.list = []);
//       this.loadProducts();
//     },
//   };
</script>

<style>
.fs-13 {
  font-size: 13px;
}
</style>
