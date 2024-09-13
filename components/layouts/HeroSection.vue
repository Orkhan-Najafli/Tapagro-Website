<template>
  <div class="md:sticky overflow-hidden w-full z-40 my-0 lg:-mt-1">
    <div
      :class="{
        'h-28': scroll,
        'h-48': !scroll,
      }"
      class="block relative w-full bg-photo max-w-[1224px] transition-all duration-200 container mx-auto px-6 xl:px-0"
    >
      <div
        :class="{
          'bg-opacity-100 bg-white': scroll,
          'bg-white bg-opacity-40': !scroll,
        }"
        class="absolute inset-0 duration-150 z-10"
      ></div>
      <div
        class="flex relative flex-col justify-center items-center h-full min-h-full w-full z-20"
      >
        <div
          :class="{
            flex: !scroll,
            hidden: scroll,
          }"
          class="flex justify-center"
        >
          <h1
            class="hidden md:flex justify-center items-center text-slate-600 text-center font-medium z-30 text-3xl duration-100 m-0 mb-6"
          >
            {{ $t("website_title") }}
          </h1>
        </div>
        <div
          style=""
          class="bg-white w-full rounded-md flex flex-row min-w-full"
          id="responsive-mobile"
        >
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
              class="w-full min-w-full h-auto"
              :maxLength="64"
              v-model:value="searchText"
              :allowClear="true"
              enter-button
              @search="submitFilter"
              @keyup.enter="submitFilter"
            >
            </a-input-search>
          </a-config-provider>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
const searchText = ref(useRoute().query.searchText);
const scroll = ref(false);

const resizeListener = function () {
  if (window.innerWidth < 768) {
    scroll.value = true;
  } else if (window.innerWidth < 768 || window.scrollY < 50) {
    scroll.value = false;
  }
};
const handleScroll = function () {
  if (window.innerWidth > 768) {
    window.scrollY > 50 ? (scroll.value = true) : (scroll.value = false);
  }
};
onBeforeMount(() => {
  window.addEventListener("scroll", resizeListener);
});

onMounted(() => {
  if (window.innerWidth < 768) {
    scroll.value = true;
  } else if (window.innerWidth < 768 || window.scrollY < 50) {
    scroll.value = false;
  }
  resizeListener();
  window.addEventListener("scroll", handleScroll);
});

onBeforeUnmount(() => {
  window.removeEventListener("scroll", resizeListener);
  window.removeEventListener("scroll", handleScroll);
});
const submitFilter = function () {
  useRouter().push({
    query: { ...useRoute().query, searchText: searchText.value },
  });
};
</script>
<style>
div.bg-photo {
  background-image: url("../../assets/img/fermer_hero_photo.jpg");
  background-clip: content-box;
  background-origin: content-box;
  background-size: cover;
  background-position-y: 65%;
  background-repeat: no-repeat;
  /* height: 188px; */
}
/* @media only screen and (min-width: 640px) and (max-width: 1280px) {} */
@media only screen and (min-width: 992px) {
  #responsive-mobile {
    width: 920px;
    max-width: 920px;
  }
}
@media only screen and (max-width: 992px) {
  #responsive-mobile {
    width: 700px;
    max-width: 700px;
    min-width: 100%;
  }
}
@media only screen and (max-width: 768px) {
  #responsive-mobile {
    width: 100%;
    max-width: 100%;
    min-width: 100%;
  }
}
</style>
