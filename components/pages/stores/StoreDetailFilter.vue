<template>
  <div class="w-auto relative">
    <section class="flex flex-col w-full h-auto">
      <div class="flex flex-row justify-between items-center">
        <span class="text-[#374151] text-base font-medium">{{
          $t("filter")
        }}</span>
        <button
          @click="resetFilterFields"
          class="text-gray-800 font-semibold text-sm"
        >
          {{ $t("reset") }}
        </button>
      </div>
      <hr class="mt-6 bg-gray-200" />
    </section>
    <a-form>
      <div>
        <section class="my-6">
          <label
            :class="{
              'bg-gray-50': isDiscount,
            }"
            class="text-gray-200 hover:bg-gray-50 w-full cursor-pointer flex flex-row justify-start items-center"
          >
            <input
              style="
                -webkit-appearance: none;
                -moz-appearance: none;
                appearance: none;
                outline: unset !important;
              "
              class="form-checkbox inline-flex justify-center items-center h-4 w-4 bg-white border border-gray-200 rounded checked:bg-green-600 checked:border-green-600 checked:text-white appearance-none mr-2"
              type="checkbox"
              v-model="isDiscount"
              @change="changeDiscountFilter"
            />
            <span class="font-medium text-base text-gray-800">
              {{ $t("discounted") }}
            </span>
          </label>
        </section>
        <div class="flex flex-col">
          <h4 class="font-bold text-base text-[#374151] mb-6">
            {{ $t("category") }}
          </h4>
          <ul
            class="m-0 p-0 w-full h-auto min-w-full flex flex-col justify-start items-start"
          >
            <li
              @click="changeBaseCategory(category)"
              v-for="(category, index) in useCategoriesStore()
                .getBaseCategories"
              :key="index"
              :class="{
                'bg-gray-50': baseCategoryId == category.id,
              }"
              class="p-0 m-0 w-full h-auto min-w-full flex flex-row hover:bg-gray-50 justify-between items-center mb-4 cursor-pointer"
            >
              <div class="flex flex-row justify-start items-center">
                <span
                  class="inline-flex justify-start items-center font-medium text-base text-[#1F2937]"
                  >{{ category.name }}</span
                >
                <span
                  class="inline-flex items-center justify-center px-0.5 bg-gray-100 ml-2 text-sm font-medium rounded-sm"
                  >{{ category.productCount }}</span
                >
              </div>
              <div
                v-show="baseCategoryId == category.id"
                class="inline-flex justify-start items-center"
              >
                <tick_in_filter_rating />
              </div>
            </li>
          </ul>
        </div>
        <div v-if="baseCategoryId" class="flex flex-col w-full h-auto">
          <hr class="mb-6 mt-2" />
          <button
            class="text-gray-700 text-base font-bold hover:text-gray-700 flex flex-row items-center justify-between mb-3"
            @click="categoriesBoxShow = !categoriesBoxShow"
          >
            <span class="">{{ $t("subcategories") }}</span>
            <a-icon
              class="transform"
              :type="categoriesBoxShow ? 'up' : 'down'"
            />
          </button>
          <Tree
            v-show="categoriesBoxShow"
            :baseCategoryId="baseCategoryId"
            :baseCategoryType="baseCategoryType"
          />
        </div>
      </div>
      <section class="flex flex-col w-full h-auto">
        <hr class="my-6" />

        <button
          class="text-gray-700 text-base font-bold hover:text-gray-700 flex flex-row items-center justify-between mb-3"
          @click="regionBoxShow = !regionBoxShow"
        >
          <span class="">{{ $t("delivery_area") }}</span>
          <a-icon
            :class="{
              'rotate-180': regionBoxShow,
              'rotate-0': !regionBoxShow,
            }"
            class="transform"
            type="down"
          />
        </button>
        <div
          v-show="regionBoxShow"
          class="flex flex-col w-full h-72 overflow-y-scroll scroll-design pb-3 pr-2"
        >
          <div class="">
            <div
              class="flex w-full sticky top-0 flex-row justify-start items-center bg-white"
            >
              <div
                class="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none"
              >
                <search-logo-in-store />
              </div>
              <input
                class="px-4 outline-none h-11 pl-10 w-full border rounded-l-md border-gray-200"
                type="text"
                v-model="regionSearchValue"
                :placeholder="$t('search_the_area')"
              />
            </div>
            <ul class="mt-3">
              <li
                class="mb-3 flex flex-row justify-start items-center cursor-pointer hover:bg-gray-50"
                v-for="(region, index) in filteredRegions"
                :key="index"
                :class="{
                  'bg-gray-50': selectedRegions.includes(region.id),
                }"
              >
                <label
                  class="text-gray-200 w-full cursor-pointer flex flex-row justify-start items-center"
                >
                  <input
                    style="
                      -webkit-appearance: none;
                      -moz-appearance: none;
                      appearance: none;
                      outline: unset !important;
                    "
                    @change="changeUrlCity"
                    class="form-checkbox inline-flex justify-center items-center h-4 w-4 bg-white border border-gray-200 rounded checked:border-green-600 checked:text-white appearance-none mr-2"
                    type="checkbox"
                    v-model="selectedRegions"
                    :value="region.id"
                  />
                  <span class="font-medium text-base text-gray-800">
                    {{ region.name }}
                  </span>
                </label>
              </li>
            </ul>
          </div>
        </div>
      </section>
      <div class="">
        <hr class="my-6" />
        <label class="block mb-2 mt-5 text-gray-800 text-sm font-semibold">
          {{ $t("price") }}
        </label>
        <div class="flex flex-row justify-between">
          <div class="w-1/2 mr-3">
            <label class="w-full min-w-full inline-flex flex-col text-sm">
              <a-input
                v-model="minPrice"
                class="mt-2 w-full min-w-full"
                :placeholder="$t('minimum')"
                allow-clear
                id="num"
                ref="num"
                :maxLength="30"
                @keypress="check"
                @paste="pasteNone"
                @change="changeUrlMinPrice"
              />
            </label>
          </div>
          <div class="w-1/2">
            <label class="w-full min-w-full inline-flex flex-col text-sm">
              <a-input
                v-model="maxPrice"
                class="mt-2 w-full min-w-full"
                :placeholder="$t('maximum')"
                :maxLength="30"
                allow-clear
                id="num"
                @keypress="check"
                @paste="pasteNone"
                @change="changeUrlMaxPrice"
              />
            </label>
          </div>
        </div>
      </div>
      <!-- <div class="flex flex-row justify-start items-center mt-12">
        <button
          @click="submitFilter"
          class="w-1/2 mr-3 py-2 px-3 bg-emerald-600 hover:bg-emerald-700 font-semibold text-sm text-white rounded"
        >
          Tətbiq et
        </button>
        <button
          @click="cleanFilterFields"
          class="w-1/2 ml-3 py-2 px-3 font-semibold text-sm text-stone-500 border border-stone-500 hover:text-emerald-500 hover:border-emerald-500 rounded"
        >
          Təmizlə
        </button>
      </div> -->
    </a-form>
  </div>
</template>

<script setup lang="ts">
let selectedRegions = reactive<any>([]);
const minPrice = ref();
const maxPrice = ref();
const baseCategoryId = ref();
const isDiscount = ref(false);
const regionSearchValue = ref("");
const num = ref();
const categoriesBoxShow = ref(true);
const regionBoxShow = ref(true);
const props = defineProps({
  deliveryCities: {
    type: Array,
    defeault: [],
    required: true,
  },
});
// import CategoriesTree from "../../common/CategoriesTree.vue";
// import { mapGetters } from "vuex";
// import tick_in_filter_rating from "../../inc/svg/tick_in_filter_rating.vue";

// export default {
//   components: {
//     CategoriesTree,
//     tick_in_filter_rating,
//   },
//   props: {
//     deliveryCities: Array,
//   },
//   data() {
//     return {
//       categoriesBoxShow: true,
//       regionBoxShow: true,

//       regions: [],
//       selectedRegions: [],
//       regionSearchValue: "",

//       maxPrice: undefined,
//       minPrice: undefined,
//       baseCategoryId: undefined,
//       isDiscount: false,
//     };
//   },
//   created() {
useCategoriesStore().fetchBaseCategories();
if (useRoute().query) {
  let cityIdsQueryParam = useRoute().query.cityIds || [];
  // let baseCategoryId = Number(queryString.baseCategoryId) || undefined;

  if (!Array.isArray(cityIdsQueryParam)) {
    cityIdsQueryParam = cityIdsQueryParam.split(",");
  }

  // this.baseCategoryId = baseCategoryId;
  selectedRegions = cityIdsQueryParam.map((regionId: any) => Number(regionId));
  minPrice.value = Number(useRoute().query.minPrice) || undefined;
  maxPrice.value = Number(useRoute().query.maxPrice) || undefined;
  isDiscount.value = useRoute().query.endirimli === "beli";
}

//   computed: {
//     ...mapGetters({
//       baseCategories: "productCategories/storeBaseCategories",
//     }),
const baseCategoryType = function () {
  // let item = baseCategories.find((el) => el.id == baseCategoryId.value);
  // return item ? item.label : null;
};
console.log(props.deliveryCities);
console.log(useStoreDetailStore().getStore.deliveryCities);

const filteredRegions = function () {
  return props.deliveryCities?.filter((region: any) => {
    return region.name
      .toLowerCase()
      .includes(regionSearchValue.value.toLowerCase());
  });
};
//   watch: {
//     baseCategories: {
//       handler() {
//         let item = this.baseCategories.find(
//           (el) => el.label == this.$route.query.productBaseCategoryLabel
//         );
//         this.baseCategoryId = item ? item.id : undefined;
//       },
//       immediate: true,
//     },
//   },

//   watchQuery: true,
//   methods
const pasteNone = function (event: Event | ayn) {
  event.preventDefault();
};
const check = function (event: Event | any) {
  var data = num.value;
  if (
    (event.charCode >= 48 && event.charCode <= 57) ||
    event.charCode == 46 ||
    event.charCode == 0
  ) {
    if (data.indexOf(".") > -1) {
      if (event.charCode == 46) {
        event.preventDefault();
      }
    }
  } else event.preventDefault();
};
const changeBaseCategory = function (category: any) {
  if (baseCategoryId.value == category.id) {
    baseCategoryId.value = undefined;
  } else {
    baseCategoryId.value = category.id;
  }

  useRouter().replace({
    query: {
      ...useRoute().query,
      productBaseCategoryLabel: baseCategoryType || undefined,
      productTypeLabels: undefined,
      page: undefined,
    },
  });
};
const changeUrlCity = function () {
  useRouter().replace({
    query: {
      ...useRoute().query,
      cityIds:
        selectedRegions.length > 0 ? selectedRegions.join(",") : undefined,
      page: undefined,
    },
  });
};
const changeUrlMaxPrice = function () {
  useRouter().replace({
    query: {
      ...useRoute().query,
      maxPrice: maxPrice.value || undefined,
      page: undefined,
    },
  });
};
const changeUrlMinPrice = function () {
  useRouter().replace({
    query: {
      ...useRoute().query,
      minPrice: minPrice.value || undefined,
      page: undefined,
    },
  });
};
const changeDiscountFilter = function () {
  useRouter().replace({
    query: {
      ...useRoute().query,
      endirimli: isDiscount.value ? "beli" : undefined,
      page: undefined,
    },
  });
  // this.loadProducts();
};
const resetFilterFields = function () {
  baseCategoryId.value = undefined;
  selectedRegions = [];
  minPrice.value = undefined;
  maxPrice.value = undefined;
  isDiscount.value = false;
  useRouter().replace({
    query: {
      ...useRoute().query,
      minPrice: undefined,
      maxPrice: undefined,
      cityIds: undefined,
      productBaseCategoryLabel: undefined,
      productTypeLabels: undefined,
      endirimli: undefined,
    },
  });
};
//   },
// };
</script>
<style>
.ant-btn:hover,
.ant-btn:focus {
  border-color: #34d399;
  color: #34d399;
  box-shadow: none;
}

div.scroll-design::-webkit-scrollbar {
  width: 4px;
  height: 4px;
}

div.scroll-design::-webkit-scrollbar-track {
  box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);
}

div.scroll-design::-webkit-scrollbar-thumb {
  background-color: darkgrey;
  outline: none;
}
</style>
