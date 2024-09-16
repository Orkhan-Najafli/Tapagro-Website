<template>
  <section
    v-if="
      useRoute().path == '/mehsullar' ||
      useRoute().params.category != 'fermer-mehsullari'
    "
    class="flex flex-col w-full h-auto"
  >
    <button
      class="text-gray-700 text-base font-bold hover:text-gray-700 flex flex-row items-center justify-between mb-3"
      @click="storeBoxShow = !storeBoxShow"
    >
      <span class="">{{ $t("store") }}</span>
      <DownOutlined
        :class="{
          'rotate-180': storeBoxShow,
          'rotate-0': !storeBoxShow,
        }"
        class="transform"
      />
    </button>
    <div
      v-show="storeBoxShow"
      @scroll="scroll"
      class="flex flex-col w-full h-72 overflow-hidden overflow-y-scroll scroll-design pb-3 pr-2"
    >
      <div
        class="z-30 flex w-full sticky top-0 flex-row justify-start items-center bg-white"
      >
        <div
          class="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none"
        >
          <search_logo_in_store />
        </div>
        <input
          class="px-4 outline-none h-11 pl-10 w-full border rounded-l-md border-gray-200"
          type="text"
          @input="loadStores"
          :placeholder="$t('search_the_store')"
        />
      </div>
      <ul class="w-full mt-3 flex place-content-center" id="scroll-style">
        <a-spin
          size="large"
          class="mt-20"
          :spinning="useStoresStore().getStoresStatus !== 'success'"
        >
          <li
            class="w-full h-auto min-w-full hover:bg-gray-50 mb-3 flex flex-row justify-start items-center"
            v-for="(store, index) in useStoresStore().getStores"
            :key="index"
            :class="{
              'bg-gray-50': selectedStores.includes(store.id),
            }"
          >
            <label
              class="w-full cursor-pointer flex flex-row justify-start items-center"
            >
              <input
                style="
                  -webkit-appearance: none;
                  -moz-appearance: none;
                  appearance: none;
                "
                :checked="selectedStores.includes(store.id)"
                @change="changeUrlStore"
                class="form-checkbox inline-flex justify-center items-center min-w-4 min-h-4 h-4 w-4 bg-white border border-gray-200 rounded checked:bg-green-600 checked:border-green-600 checked:text-white appearance-none mr-2"
                type="checkbox"
                :value="store.id"
              />
              <span class="font-medium text-base text-gray-800">
                {{ store.name }}
              </span>
            </label>
          </li>
        </a-spin>
      </ul>
    </div>

    <hr class="my-6" />
  </section>
</template>
<script setup lang="ts">
const storeBoxShow = ref(true);
const isApiCalled = ref(true);
let selectedStores = reactive<Array<number>>([]);
const queryParams = reactive({
  page: 0,
  size: 12,
});

if (useRoute().query) {
  let storeIdsQueryParam = useRoute().query.storeIds || [];
  if (!Array.isArray(storeIdsQueryParam)) {
    storeIdsQueryParam = storeIdsQueryParam.split(",");
  }
  selectedStores = storeIdsQueryParam.map((storeId: any) => Number(storeId));
}
const loadStores = function (event?: Event | undefined | any) {
  useStoresStore().resetStores();
  useStoresStore().fetchStores({
    ...queryParams,
    storeNamePhrase: event?.target && event.target.value!,
  });
};
loadStores();

const changeUrlStore = function (event: Event | any) {
  console.log(event.target.checked);
  if (event.target.checked) {
    selectedStores.push(event.target.value);
  } else {
    const index = selectedStores.indexOf(event.target.value);
    if (index > -1) {
      selectedStores.splice(index, 1);
    }
  }
  console.log("changeUrlStore", selectedStores);
  useRouter().push({
    query: {
      ...useRoute().query,
      storeIds:
        selectedStores.length > 0 ? selectedStores.join(",") : undefined,
      page: undefined,
      page_vip: undefined,
    },
  });
};
const scroll = function (event: Event | any) {
  if (
    useStoresStore().getStores.size < useStoresStore().getTotalElements &&
    Math.ceil(event.target.scrollTop) ==
      Math.ceil(event.target.scrollHeight) -
        Math.ceil(event.target.clientHeight)
  ) {
    console.log("scroll isleyir.....");

    queryParams.page++;
    useStoresStore().fetchStores({
      ...queryParams,
    });
  }
};

//   };
</script>
