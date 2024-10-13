<template>
  <main class="w-full pt-3 min-h-screen px-6">
    <section class="flex max-w-[1224px] w-full px-6 xl:px-0 container mx-auto">
      <div class="mt-6 mb-5 md:mb-9 hidden md:block">
        <a-breadcrumb class="font-medium text-sm text-gray-500" separator=">">
          <a-breadcrumb-item>
            <nuxt-link tag="a" to="/">
              <span class="text-[#4B5563] text-sm font-medium">
                {{ $t("main_page") }}</span
              ></nuxt-link
            >
          </a-breadcrumb-item>
          <a-breadcrumb-item>
            <nuxt-link tag="a" to="/fermerler">
              <span class="text-[#4B5563] text-sm font-medium">
                {{ $t("farmers") }}</span
              ></nuxt-link
            >
          </a-breadcrumb-item>
          <a-breadcrumb-item>
            <span class="text-[#1F2937] font-semibold text-sm">
              {{ $t("other_ads_from_the_farmer") }}</span
            >
          </a-breadcrumb-item>
        </a-breadcrumb>
      </div>
    </section>
    <section class="flex max-w-[1224px] w-full px-6 xl:px-0 container mx-auto">
      <div class="flex flex-row w-full mb-6 md:mb-10">
        <div class="w-full relative">
          <section
            class="mb-6 md:mb-10 w-full h-auto px-3 pt-3 pb-4 bg-[#F9FAFBCC]"
          >
            <a-skeleton
              :paragraph="false"
              :loading="useFarmersStore().getFarmerStatus !== 'success'"
              active
              class="text-2xl md:text-4xl lg:text-5xl"
            />

            <div
              v-if="useFarmersStore().getFarmerStatus === 'success'"
              class="flex flex-row justify-start items-center mb-6"
            >
              <div
                class="rounded-full bg-[#F0FDF4] mr-2 w-11 h-11 flex items-center justify-center"
              >
                <farmer_logo />
              </div>

              <h2 class="text-lg font-medium capitalize text-gray-700 m-0 p-0">
                {{ useFarmersStore().getFarmer.name }}
              </h2>
            </div>
            <div
              style="word-break: break-word; background-color: #f9fafb"
              class="ml-3.5"
            >
              <div
                v-if="useFarmersStore().getFarmerStatus === 'success'"
                class="flex flex-col md:flex-row md:items-center justify-start"
              >
                <div
                  class="flex flex-row justify-start items-center text-gray-500 mb-6 md:mb-0 md:mr-11"
                >
                  <farmer_profile_icon />
                  <span class="text-gray-500 font-medium text-base">{{
                    useFarmersStore().getFarmer.name
                  }}</span>
                </div>
                <div
                  @click="
                    useFarmersStore().fetchFarmerContact(
                      useRoute().params.farmerdetail
                    )
                  "
                  class="inline-flex flex-row items-center cursor-pointer"
                >
                  <phone_farmer_icon />
                  <div
                    class="font-normal text-base text-[#16A34A] whitespace-normal cursor-pointer"
                  >
                    <a
                      v-if="useFarmersStore().getFarmerContact.phoneNumber"
                      class="text-emerald-600 hover:text-emerald-600"
                      :href="`tel:+${
                        994 + useFarmersStore().getFarmerContact.phoneNumber
                      }`"
                      v-show="
                        useFarmersStore().getFarmerContactStatus === 'success'
                      "
                    >
                      {{
                        formatPhoneNumber(
                          useFarmersStore().getFarmerContact.phoneNumber
                        )
                      }}
                    </a>
                    <span
                      v-if="
                        !useFarmersStore().getFarmerContact.phoneNumber &&
                        useFarmersStore().getFarmerContactStatus === 'success'
                      "
                    >
                      <no_phone_icon />
                    </span>
                    <span
                      v-show="
                        useFarmersStore().getFarmerContactStatus !== 'success'
                      "
                      >{{ $t("contact_the_farmer") }}</span
                    >
                  </div>
                </div>
              </div>
            </div>
          </section>
          <a-config-provider
            :theme="{
              token: {
                colorPrimary: '#16a34a',
              },
            }"
          >
            <a-input-search
              size="large"
              class="w-full min-w-full h-auto mb-6 md:mb-11"
              :maxLength="255"
              :placeholder="$t('ad_name')"
              v-model:value="productNamePhrase"
              :allowClear="true"
              enter-button
              @change="onSearch"
              @keyup.enter="onSearch"
            >
            </a-input-search>
          </a-config-provider>
          <!-- <section class="mb-5">
            <a-input-search
              v-model="productNamePhrase"
              allow-clear
              :placeholder="$t('ad_name')"
              :maxLength="255"
              class="w-auto h-11"
              @keyup.enter="searchName"
              @change="searchName"
            >
              <a-button class="text-emerald-500" slot="enterButton">
                <a-icon class="text-emerald-600" type="search" />
              </a-button>
            </a-input-search>
          </section> -->
          <!-- <section class="mb-6 md:mb-10">
            <div class="flex flex-col md:flex-row justify-between">
              <div
                style="min-width: 292px; max-width: 292px"
                class="pb-8 md:pr-6 hidden lg:block"
              >
                <FarmerDetailFilter
                  style="height: fit-content"
                  class="sticky top-28"
                />
              </div>
              <div class="flex w-full flex-col">
                <div class="flex flex-col mb-6">
                  <div class="flex flex-row justify-between w-full">
                    <div class="flex font-bold text-base text-gray-600">
                      {{ $t("products") }}
                      {{
                        !$wait.is(FetchingProducts) && productData.totalElements
                          ? `: ${productData.totalElements}`
                          : ""
                      }}
                    </div>
                    <div class="flex flex-row justify-end items-center">
                      <a-tooltip placement="bottom">
                        <template #title>
                          <span>{{ $t("filter") }}</span>
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
                  <ProductListing
                    :farmer="true"
                    :classGridSize="false"
                    :link="'fermer-mehsullari'"
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
                    {{ $t("show_more") }}
                  </button>
                </div>
                <div
                  v-else
                  class="block w-full min-w-full rounded text-center my-14"
                ></div>
              </div>
            </div>
          </section> -->
        </div>
      </div>
      <!-- </section> -->
    </section>
    <!-- <keep-alive>
      <FarmerDetailFilterMobile
        :visible="visible"
        @handleCancel="visible = false"
      />
    </keep-alive> -->
    <!-- <Page404
      v-else
      title="404"
      :subTitle="$t('no_farmer_matching_the_search_was_found')"
    /> -->
  </main>
</template>

<script setup lang="ts">
import { formatPhoneNumber } from "@/utils/helpers";

const productNamePhrase = ref();
const queryParams = reactive({
  page: useRoute().query.page ? Number(useRoute().query.page) : 0,
  size: useRoute().query.page ? (Number(useRoute().query.page) + 1) * 15 : 15,
  productNamePhrase: useRoute().query.productNamePhrase
    ? String(useRoute().query.productNamePhrase)
    : undefined,
});

useFarmersStore().resetFarmerContact();
useFarmersStore().fetchFarmer(useRoute().params.farmerdetail);

const onSearch = function () {
  useFarmersStore().resetFarmers();
  useRouter().push({
    query: {
      ...useRoute().query,
      page: 0,
      size: 12,
      productNamePhrase: productNamePhrase.value || undefined,
    },
  });
};
const loadMoreFarmers = function () {
  queryParams.page++;
  queryParams.size = 15;
  useRouter().push({ query: { ...useRoute().query, page: queryParams.page } });
};
// import _ from "lodash";
// import ProductListing from "@/components/common/ProductListing";
// import { FetchingProducts } from "@/app/product/waiting-types";
// import { FetchingFarmerDetails } from "@/app/farmer/waiting-types";
// import { ContactWaiting } from "@/app/contacts/waiting-types";
// import filter_logo from "@/components/inc/svg/filter_logo.vue";
// import { formatPhoneNumber } from "@/utils/helpers";
// import Sorting from "@/components/common/Sorting.vue";
// import FarmerDetailFilter from "@/components/filters/filterForLargeScreens/FarmerDetailFilter.vue";
// import FarmerDetailFilterMobile from "@/components/filters/filterForSmallScreens/FarmerDetailFilterMobile.vue";
// import Page404 from "@/components/common/404.vue";

// export default {
//   components: {
//     ProductListing,
//     FarmerDetailFilter,
//     FarmerDetailFilterMobile,
//     Sorting,
//     filter_logo,
//     Page404,
//   },
//   data() {
//     return {
//       contactShow: false,
//       ContactWaiting: ContactWaiting,
//       contact: {},
//       FetchingProducts: FetchingProducts,
//       FetchingFarmerDetails: FetchingFarmerDetails,
//       farmerId: undefined,
//       farmer: undefined,
//       productNamePhrase: undefined,
//       productData: {
//         list: [],
//         page: 0,
//         totalPages: null,
//         totalElements: null,
//       },
//       searchParams: {
//         sortBy: "createdAt",
//         sortDirection: "DESC",
//       },
//       showOrderMenu: false,

//       visible: false,
//       more: false,
//     };
//   },
//   created() {
//     if (this.$route.query) {
//       let queryString = this.$route.query;
//       this.productNamePhrase = queryString.productNamePhrase || undefined;
//     }
//   },
//   mounted() {
//     this.farmerId = this.$route.params.farmerAboutDetail;
//     this.$store.commit("setAppHeroShowAndHide", false);

//     this.loadFarmerDetails();
//   },
//   computed: {
//     farmerDetailsLoaded: function () {
//       return this.farmer !== undefined;
//     },
//   },

//   methods: {
//     showFilterModal() {
//       this.visible = true;
//     },
//     formatPhoneNumber,
//     loadContact() {
//       this.$wait.start(ContactWaiting);
//       this.$contact
//         .getContactFarmer(this.farmerId)
//         .then((response) => {
//           this.contact = response || {};
//           this.contactShow = true;
//         })
//         .finally(() => {
//           this.$wait.end(ContactWaiting);
//         });
//     },
//     loadMoreProducts() {
//       let page = 0;
//       if (this.$route.query && this.$route.query.page) {
//         page = parseInt(this.$route.query.page);
//       }
//       this.$router.replace({
//         query: {
//           ...this.$route.query,
//           page: ++page,
//         },
//       });
//       this.more = true;
//     },
//     searchName: _.debounce(function () {
//       this.$router.replace({
//         query: {
//           ...this.$route.query,
//           productNamePhrase: this.productNamePhrase || undefined,
//           page: undefined,
//         },
//       });
//     }, 600),
//     loadFarmerDetails() {
//       this.visible = false;
//       this.$wait.start(FetchingFarmerDetails);
//       this.$farmers
//         .getFarmer(this.farmerId)
//         .then((farmerDetails) => {
//           this.farmer = farmerDetails;
//         })
//         .finally(() => {
//           this.$wait.end(FetchingFarmerDetails);
//         });
//     },
//     convertSortBy(direction) {
//       if (this.$route.query && this.$route.query.sortBy) {
//         let item = this.$route.query.sortBy.split("-");

//         if (direction) {
//           return item[1] || this.searchParams.sortDirection;
//         } else {
//           return item[0] || this.searchParams.sortBy;
//         }
//       } else {
//         if (direction) {
//           return this.searchParams.sortDirection;
//         } else {
//           return this.searchParams.sortBy;
//         }
//       }
//     },
//     loadProducts() {
//       this.visible = false;
//       this.$wait.start(FetchingProducts);

//       this.$farmerProduct
//         .getFarmerProducts({
//           ...this.$route.query,
//           sortBy: this.convertSortBy(false),
//           sortDirection: this.convertSortBy(true),
//           page: this.productData.list.length == 0 ? 0 : this.$route.query.page,
//           size:
//             this.productData.list.length == 0
//               ? (parseInt(this.$route.query.page || 0) + 1) * 12
//               : 12,
//           createdBy: this.$route.params.farmerAboutDetail,
//         })
//         .then((response) => {
//           // this.productData.list = response.fermer_products;
//           this.productData.list.push(...response.fermer_products);
//           this.productData.totalElements = response.metadata.totalElements;
//           this.productData.totalPages = response.metadata.totalPages;
//           this.more = false;
//           this.$nuxt.$emit("checkNewProducts", {});
//         })
//         .finally(() => {
//           this.$wait.end(FetchingProducts);
//         });
//     },
//   },
//   watch: {
//     "$route.query": "$fetch",
//   },
//   async fetch() {
//     !this.more && (this.productData.list = []);
//     this.loadProducts();
//   },
// };
</script>

<style>
.fs-13 {
  font-size: 13px;
}
</style>
