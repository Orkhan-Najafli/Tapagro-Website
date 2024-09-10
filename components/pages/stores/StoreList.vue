<template>
  <div class="flex flex-row w-full justify-between">
    <div
      style="min-height: 270px"
      class="flex items-center justify-center w-9 h-full mr-9"
    >
      <button
        @click="scroll(-1)"
        :disabled="!canScrollLeft"
        class="text-white bg-green-600 hover:bg-green-700 focus:outline-none w-8 h-8 rounded-full flex justify-center items-center"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="h-6 w-6"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M15 19l-7-7 7-7"
          />
        </svg>
      </button>
    </div>

    <div
      class="flex flex-col w-auto h-auto overflow-x-scroll overflow-hidden scroll-hide"
      ref="storeContainer"
    >
      <div
        class="flex flex-row justify-between w-full min-w-full h-auto items-center"
      >
        <div class="flex flex-row w-full min-w-full">
          <StoreCardSliderItem
            style="min-width: 240px; min-height: 270px"
            class="w-60 h-auto cursor-pointer mr-6"
            v-for="(store, index) in stores"
            :key="index"
            :data="store"
          />
        </div>
      </div>
    </div>

    <div
      style="min-height: 270px"
      class="flex items-center justify-center w-9 h-full ml-9"
    >
      <button
        @click="scroll(1)"
        :disabled="!canScrollRight"
        class="text-white bg-green-600 hover:bg-green-700 focus:outline-none w-8 h-8 rounded-full flex justify-center items-center"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="h-6 w-6"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M9 5l7 7-7 7"
          />
        </svg>
      </button>
    </div>
  </div>
</template>

<script>
import StoreCardSliderItem from "./StoreCardSliderItem.vue";
import { FetchingStores } from "../../../app/store/waiting-types";

export default {
  components: {
    StoreCardSliderItem,
  },
  props: {
    // stores: {
    //   type: Array,
    // },
  },
  data() {
    return {
      FetchingStores: FetchingStores,
      stores: [],
      scrollPosition: 0,
      maxScrollPosition: 0,
      page: 0,

      totalElements: 0,
      totalPages: 0,
    };
  },
  computed: {
    canScrollLeft() {
      return this.scrollPosition > 0;
    },
    canScrollRight() {
      return this.scrollPosition < this.maxScrollPosition - 1;
    },
  },
  mounted() {
    this.loadStores();
    this.maxScrollPosition =
      this.$refs.storeContainer.scrollWidth -
      this.$refs.storeContainer.offsetWidth;
  },
  watch: {
    stores() {
      this.$nextTick(() => {
        this.maxScrollPosition =
          this.$refs.storeContainer.scrollWidth -
          this.$refs.storeContainer.offsetWidth;
      });
    },
  },
  methods: {
    loadStores(page = 0) {
      this.$wait.start(FetchingStores);
      this.$stores
        .getStoreList({
          page: this.page,
          size: 12,
        })
        .then((response) => {
          this.totalElements = response.metadata.totalElements;
          this.stores.push(...response.stores);
        })
        .finally(() => {
          this.$wait.end(FetchingStores);
        });
    },
    scroll(direction) {
      if (direction === 1 && this.stores.length != this.totalElements) {
        this.page++;
        this.loadStores();
      }
      const container = this.$refs.storeContainer;
      const delta = direction * container.offsetWidth;
      const duration = 500;
      const startTime = Date.now();

      const animateScroll = () => {
        const elapsedTime = Date.now() - startTime;
        const progress = Math.min(elapsedTime / duration, 1);
        const displacement = delta * progress;

        container.scrollLeft = this.scrollPosition + displacement;

        if (progress < 1) {
          requestAnimationFrame(animateScroll);
        } else {
          this.scrollPosition = container.scrollLeft;
        }
      };

      requestAnimationFrame(animateScroll);
    },
  },
};
</script>

<style>
button[disabled] {
  cursor: not-allowed;
  opacity: 0.5;
  background-color: #e5e7eb;
}
.scroll-hide::-webkit-scrollbar {
  display: none;
}
.scroll-hide {
  -ms-overflow-style: none; /* IE and Edge */
  scrollbar-width: none; /* Firefox */
}
</style>
