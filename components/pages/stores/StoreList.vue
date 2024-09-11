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
            v-for="(store, index) in useStoresStore().getStores"
            :key="index"
            :store="store"
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
<script setup lang="ts">
const scrollPosition = ref(0);
const maxScrollPosition = ref(0);
const storeContainer = ref<HTMLElement>();
const queryParams = reactive({
  page: 0,
  size: 12,
});
useStoresStore().fetchStores({ ...queryParams });
maxScrollPosition.value =
  storeContainer.value?.scrollWidth! - storeContainer.value?.offsetWidth!;
watch(useStoresStore().getStores, () => {
  nextTick(() => {
    maxScrollPosition.value =
      storeContainer.value?.scrollWidth! - storeContainer.value?.offsetWidth!;
  });
});
// methods
const scroll = function (direction: number) {
  if (
    direction === 1 &&
    useStoresStore().getStores.size != useStoresStore().getTotalElements
  ) {
    queryParams.page++;
    useStoresStore().fetchStores({ ...queryParams });
  }
  const delta = direction * storeContainer.value?.offsetWidth!;
  const duration = 500;
  const startTime = Date.now();

  const animateScroll = () => {
    const elapsedTime = Date.now() - startTime;
    const progress = Math.min(elapsedTime / duration, 1);
    const displacement = delta * progress;

    storeContainer.value?.scrollBy({
      top: undefined,
      left: -(scrollPosition.value + displacement),
      behavior: "smooth",
    });

    if (progress < 1) {
      requestAnimationFrame(animateScroll);
    } else {
      scrollPosition.value = storeContainer.value?.scrollLeft!;
    }
  };

  requestAnimationFrame(animateScroll);
};
//computed
const canScrollLeft = computed(() => {
  return scrollPosition.value > 0;
});
const canScrollRight = computed(() => {
  return scrollPosition.value < maxScrollPosition.value - 1;
});
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
