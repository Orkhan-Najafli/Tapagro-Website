<template>
  <div class="flex flex-col w-full">
    <section class="flex flex-col w-full h-auto">
      <div class="flex flex-row justify-between items-center">
        <span class="text-gray-700 text-base font-medium">{{
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
    <section
      class="my-6"
      v-if="
        $route.path === '/mehsullar' ||
        $route.params.category !== 'fermer-mehsullari'
      "
    >
      <label
        :class="{
          'bg-gray-50': isDiscount,
        }"
        class="text-gray-200 w-full cursor-pointer flex flex-row justify-start items-center hover:bg-gray-50"
      >
        <input
          style="
            -webkit-appearance: none;
            -moz-appearance: none;
            appearance: none;
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
    <section
      v-if="$route.params && $route.params.category"
      class="flex flex-col w-full h-auto"
    >
      <hr class="mb-6 bg-gray-200" />
      <button
        class="text-gray-700 text-base font-bold hover:text-gray-700 flex flex-row items-center justify-between mb-3"
        @click="categoriesBoxShow = !categoriesBoxShow"
      >
        <span class="">{{ $t("subcategories") }}</span>
        <a-icon
          :class="{
            'rotate-180': categoriesBoxShow,
            'rotate-0': !categoriesBoxShow,
          }"
          class="transform"
          type="down"
        />
      </button>
      <categories-tree
        v-show="categoriesBoxShow"
        :baseCategoryId="baseCategory ? baseCategory.id : undefined"
        :reset="resetFilter"
        :baseCategoryType="baseCategory ? baseCategory.label : undefined"
      />
      <hr class="my-6" />
    </section>
    <section class="flex flex-col w-full h-auto">
      <button
        class="text-gray-700 text-base font-bold hover:text-gray-700 flex flex-row items-center justify-between mb-3"
        @click="regionBoxShow = !regionBoxShow"
      >
        <span class="">{{ $t("district") }}</span>
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
              <svg
                width="16"
                height="16"
                viewBox="0 0 16 16"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                class="w-4 h-4"
              >
                <path
                  fill-rule="evenodd"
                  clip-rule="evenodd"
                  d="M6 2C3.79086 2 2 3.79086 2 6C2 8.20914 3.79086 10 6 10C8.20914 10 10 8.20914 10 6C10 3.79086 8.20914 2 6 2ZM0 6C0 2.68629 2.68629 0 6 0C9.31371 0 12 2.68629 12 6C12 7.29583 11.5892 8.49572 10.8907 9.47653L15.7071 14.2929C16.0976 14.6834 16.0976 15.3166 15.7071 15.7071C15.3166 16.0976 14.6834 16.0976 14.2929 15.7071L9.47653 10.8907C8.49572 11.5892 7.29583 12 6 12C2.68629 12 0 9.31371 0 6Z"
                  fill="#111827"
                />
              </svg>
            </div>
            <input
              class="px-4 outline-none h-11 pl-10 w-full border rounded-l-md border-gray-200"
              type="text"
              v-model="regionSearchValue"
              :placeholder="$t('search_the_region')"
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
                  "
                  @change="changeUrlCity"
                  class="form-checkbox inline-flex justify-center items-center h-4 w-4 bg-white border border-gray-200 rounded checked:bg-green-600 checked:border-green-600 checked:text-white appearance-none mr-2"
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
      <hr class="my-6" />
    </section>
    <!-- Magaza -->
    <Store @changeUrlStore="changeUrlStore" />
    <!-- Magaza -->
    <section>
      <button
        class="w-full text-gray-700 text-base font-bold hover:text-gray-700 flex flex-row items-center justify-between mb-3"
        @click="priceBoxShow = !priceBoxShow"
      >
        <span class="">{{ $t("price") }}</span>
        <a-icon
          :class="{
            'rotate-180': priceBoxShow,
            'rotate-0': !priceBoxShow,
          }"
          class="transform"
          type="down"
        />
      </button>
      <div v-show="priceBoxShow" class="flex flex-row justify-between">
        <label class="w-1/2 mr-3 inline-flex flex-col text-sm">
          <input
            v-model="minPrice"
            class="mt-2 w-full min-w-full h-8 border border-gray-200 outline-none px-3 rounded-sm focus:border-green-500 hover:border-green-500"
            :placeholder="$t('minimum')"
            allow-clear
            id="num"
            :maxLength="30"
            @keypress="check"
            @paste="pasteNone"
            @change="changeUrlMinPrice"
          />
        </label>
        <label class="w-1/2 inline-flex flex-col text-sm">
          <input
            v-model="maxPrice"
            class="mt-2 w-full min-w-full h-8 border border-gray-200 outline-none px-3 rounded-sm focus:border-green-500 hover:border-green-500"
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
    </section>
    <section
      v-if="
        $route.path == '/mehsullar' ||
        $route.params.category != 'fermer-mehsullari'
      "
      class="flex flex-col w-full h-auto"
    >
      <hr class="my-6" />
      <button
        class="text-gray-700 text-base font-bold hover:text-gray-700 flex flex-row items-center justify-between mb-3"
        @click="raitingBoxShow = !raitingBoxShow"
      >
        <span class="">{{ $t("rating_title") }}</span>
        <a-icon
          :class="{
            'rotate-180': raitingBoxShow,
            'rotate-0': !raitingBoxShow,
          }"
          class="transform"
          type="down"
        />
      </button>
      <div
        v-show="raitingBoxShow"
        class="flex flex-col w-full h-auto overflow-y-scroll scroll-design pb-3 pr-2"
      >
        <ul class="m-0 p-0 flex flex-col justify-start items-start h-[132px]">
          <li
            @click="changeUrlRating(rating)"
            v-for="(rating, index) in ratings"
            :key="index"
            :class="{
              'bg-gray-100 rounded': minAverageRating == rating.rating,
              'bg-white': minAverageRating == rating.rating,
            }"
            class="flex hover:bg-gray-100 hover:rounded flex-row justify-between items-center mb-3 w-full min-w-full h-auto cursor-pointer"
          >
            <div class="flex flex-row justify-start items-center">
              <span
                class="whitespace-nowrap w-auto mx-2.5 -mt-1 -ml-[1px] cursor-pointer"
              >
                <a-rate
                  disabled
                  class="m-0 p-0 cursor-pointer"
                  v-model="rating.rating"
                />
              </span>
              <span class="text-xs font-medium text-[#1F2937]"
                >{{ rating.rating }} {{ $t("and_more_than_four") }}</span
              >
            </div>
            <div
              :class="{
                'inline-block mr-1 ': minAverageRating == rating.rating,
                hidden: minAverageRating != rating.rating,
              }"
            >
              <tick_in_filter_rating />
            </div>
          </li>
        </ul>
      </div>
    </section>
  </div>
</template>
<script>
import { mapGetters } from "vuex";
import CategoriesTree from "../../common/CategoriesTree.vue";
import Store from "../store.vue";
import tick_in_filter_rating from "../../inc/svg/tick_in_filter_rating.vue";

export default {
  components: {
    Store,
    CategoriesTree,
    tick_in_filter_rating,
  },
  data() {
    return {
      categoriesBoxShow: true,
      regionBoxShow: true,
      storeBoxShow: true,
      priceBoxShow: true,
      raitingBoxShow: true,

      minPrice: undefined,
      maxPrice: undefined,
      minAverageRating: undefined,
      isDiscount: false,

      regions: [],
      selectedRegions: [],
      regionSearchValue: "",
      ratings: [{ rating: 4 }, { rating: 3 }, { rating: 2 }, { rating: 1 }],
      resetFilter: false,
    };
  },
  mounted() {
    this.loadCities();
  },
  computed: {
    ...mapGetters({
      subCategories: "productCategories/categories",
      baseCategory: "productCategories/baseCategory",
    }),
    filteredRegions() {
      return this.regions.filter((region) => {
        return region.name
          .toLowerCase()
          .includes(this.regionSearchValue.toLowerCase());
      });
    },
  },
  created() {
    let categoryName = this.$route.params.category;
    if (this.$route.query) {
      let queryString = this.$route.query;
      let cityIdsQueryParam = queryString.cityIds || [];
      if (!Array.isArray(cityIdsQueryParam)) {
        cityIdsQueryParam = cityIdsQueryParam.split(",");
      }
      this.selectedRegions = cityIdsQueryParam.map((regionId) =>
        Number(regionId)
      );
      this.minPrice = Number(queryString.minPrice) || undefined;
      this.maxPrice = Number(queryString.maxPrice) || undefined;
      this.minAverageRating = Number(queryString.minAverageRating) || undefined;
      if (categoryName !== "fermer-mehsullari") {
        this.isDiscount = queryString.endirimli === "beli";
      }
    }
  },
  methods: {
    pasteNone(event) {
      event.preventDefault();
    },
    check(evt) {
      var data = process.browser && document.getElementById("num").value;
      if (
        (evt.charCode >= 48 && evt.charCode <= 57) ||
        evt.charCode == 46 ||
        evt.charCode == 0
      ) {
        if (data.indexOf(".") > -1) {
          if (evt.charCode == 46) {
            evt.preventDefault();
          }
        }
      } else evt.preventDefault();
    },
    loadCities(cityName) {
      this.$store
        .dispatch("advertisement/getCities", {
          cityNamePhrase: cityName,
        })
        .then((response) => {
          this.regions = response;
        });
    },

    changeUrlStore(selectedStores) {
      this.$router.replace({
        query: {
          ...this.$route.query,
          storeIds:
            selectedStores.length > 0 ? selectedStores.join(",") : undefined,
          page: undefined,
          page_vip: undefined,
        },
      });
    },
    changeUrlCity() {
      this.$router.replace({
        query: {
          ...this.$route.query,
          cityIds:
            this.selectedRegions.length > 0
              ? this.selectedRegions.join(",")
              : undefined,
          page: undefined,
          page_vip: undefined,
        },
      });
    },
    changeUrlMaxPrice() {
      this.$router.replace({
        query: {
          ...this.$route.query,
          maxPrice: this.maxPrice || undefined,
          page: undefined,
          page_vip: undefined,
        },
      });
    },
    changeUrlMinPrice() {
      this.$router.replace({
        query: {
          ...this.$route.query,
          minPrice: this.minPrice || undefined,
          page: undefined,
          page_vip: undefined,
        },
      });
    },
    changeDiscountFilter() {
      this.$router.replace({
        query: {
          ...this.$route.query,
          endirimli: this.isDiscount ? "beli" : undefined,
          page: undefined,
          page_vip: undefined,
        },
      });
    },
    changeUrlRating(rating) {
      this.minAverageRating = rating.rating;
      this.$router.replace({
        query: {
          ...this.$route.query,
          minAverageRating: rating.rating || undefined,
          page: undefined,
          page_vip: undefined,
        },
      });
    },
    resetFilterFields() {
      this.selectedRegions = [];
      this.minPrice = undefined;
      this.maxPrice = undefined;
      this.minAverageRating = undefined;
      this.isDiscount = false;
      this.resetFilter = !this.resetFilter;
      this.$router.replace({
        query: {
          ...this.$route.query,
          minPrice: undefined,
          maxPrice: undefined,
          cityIds: undefined,
          storeIds: undefined,
          productTypeLabels: undefined,
          endirimli: undefined,
          minAverageRating: undefined,
        },
      });
    },
  },
};
</script>
<style>
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

input[type="checkbox"]:checked {
  background-color: #16a34a;
}

input[type="checkbox"]:checked:after {
  content: "";
  display: block;
  width: 4px;
  height: 8px;
  border: solid white;
  border-width: 0 1.5px 1.5px 0;
  transform: rotate(45deg);
  margin: auto;
}
</style>
