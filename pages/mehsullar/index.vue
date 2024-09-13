<template>
  <div class="pt-3 md:px-0 overflow-y-auto">
    <section class="flex flex-row max-w-[1224px] w-full lg:container mx-auto">
      <div class="flex flex-row w-full relative mb-6 md:mb-10">
        <div class="w-full relative px-6">
          <categories />
          <section class="mt-10 mb-11">
            <div class="flex w-full flex-row justify-between items-center">
              <div
                class="flex flex-col w-full justify-center items-start h-9 relative"
              >
                <div v-if="true">
                  <!-- v-if="checkSearch && !$wait.is(FetchingProducts)" -->

                  <h2
                    class="text-gray-600 font-medium text-sm md:text-2xl p-0 m-0 mr-2"
                  >
                    <span class="whitespace-nowrap"
                      >{{ $t("search_results") }}:
                      {{ this.productData.totalElements }}</span
                    >
                  </h2>
                </div>
                <div class="text-gray-600 font-medium text-2xl p-0 m-0 mr-2">
                  <!-- v-if="!checkSearch && !$wait.is(FetchingProducts)" -->

                  <h2
                    class="text-gray-600 font-medium text-sm md:text-2xl p-0 m-0 mr-2"
                  >
                    <span>{{ $t("products") }} : </span>
                    <span class="whitespace-nowrap">
                      {{ this.productData.totalElements }}</span
                    >
                  </h2>
                </div>
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
          </section>
          <section class="flex flex-row justify-between">
            <div
              style="width: 294px; min-width: 294px"
              class="h-auto hidden lg:flex mr-6"
            >
              <!-- <MainProductFilter
                style="height: fit-content"
                class="sticky top-28"
              /> -->
            </div>
            <div class="flex flex-col justify-start w-full">
              <div class="flex w-full flex-col">
                <a-spin
                  :spinning="$wait.is(FetchingProducts)"
                  size="large"
                  wrapper-class-name="text-green-800"
                >
                  <products
                    :classGridSize="false"
                    :link="'mehsullar'"
                    :products="useProductsStore().getProducts"
                    v-if="useProductsStore().getProducts.size > 0"
                  />
                </a-spin>
              </div>
              <div
                v-if="
                  useProductsStore().getProducts.size !=
                  useProductsStore().getTotalElements
                "
                class="block w-full min-w-full rounded text-center my-14"
              >
                <button
                  @click="loadMoreProducts"
                  class="px-8 py-1 rounded text-amber-400 border border-amber-400 hover:text-white bg-white hover:bg-amber-400 text-sm font-semibold"
                >
                  {{ $t("more_products") }}
                </button>
              </div>
            </div>
          </section>
        </div>
      </div>
    </section>
    <!-- <MainProductFilterMobile
      :visible="visible"
      @handleCancel="visible = false"
    /> -->
  </div>
</template>
<script setup lang="ts">
// variables
const searchParams = reactive({
  sortBy: "createdAt",
  sortDirection: "DESC",
});
const filterShowOrHide = ref(false);
const visible = ref(false);
// methods
const showFilterModal = function () {
  visible.value = true;
};
const loadMoreProducts = function () {};

// export default {

//   created() {
//     this.currentPageNumber = Number(this.$route.query.page) || 1;
//     this.$store.commit("setAppHeroShowAndHide", true);
//     this.$fetch();
//   },
//   methods: {

// loadMoreProducts() {
//   let page = 0;
//   if (this.$route.query && this.$route.query.page) {
//     page = parseInt(this.$route.query.page);
//   }
//   this.$router.replace({
//     query: {
//       ...this.$route.query,
//       page: ++page,
//     },
//   });
//   this.more = true;
// },

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
//       this.$product
//         .getProductList({
//           ...this.$route.query,
//           sortBy: this.convertSortBy(false),
//           sortDirection: this.convertSortBy(true),
//           page: this.productData.list.length == 0 ? 0 : this.$route.query.page,
//           size:
//             this.productData.list.length == 0
//               ? (parseInt(this.$route.query.page || 0) + 1) * 12
//               : 12,
//           isDiscounted: !!this.$route.query.endirimli || undefined,
//           minAverageRating: this.$route.query.minAverageRating || undefined,
//         })
//         .then((response) => {
//           this.productData.list.push(...response.products);
//           this.productData.totalElements = response.metadata.totalElements;
//           this.productData.totalPages = response.metadata.totalPages;
//           this.more = false;
//           this.$nuxt.$emit("checkNewProducts", {});
//         });
//     },
//   },
//   computed: {
//     checkSearch() {
//       if (this.$route.query) {
//         let queryString = this.$route.query;

//         return (
//           queryString.maxPrice ||
//           queryString.minPrice ||
//           queryString.productTypeIds ||
//           queryString.searchText ||
//           queryString.minAverageRating ||
//           (queryString.storeIds && queryString.storeIds.length > 0) ||
//           (queryString.cityIds && queryString.cityIds.length > 0)
//         );
//       }
//       return false;
//     },
//   },
//   watch: {
//     "$route.query": "$fetch",
//   },

//   async fetch() {
//     !this.more && (this.productData.list = []);
//     await this.$store.dispatch("productCategories/getBaseCategoryList");
//     await this.loadProducts();
//   },
// };
</script>
<style>
.ant-select-selection,
.ant-select-selection:focus,
.ant-select-selection:hover,
.ant-select-selection:active {
  border: 1px solid #d9d9d9;
  outline: none;
  box-shadow: none;
}

@media only screen and (max-width: 600px) {
  #sort {
    width: 150px;
  }
}

@media only screen and (min-width: 601px) {
  #sort {
    width: 180px;
  }
}
</style>
