<template>
  <main class="pt-3 min-h-screen pb-5 bg-gray-100">
    <section style="max-width: 1224px" class="px-6 lg:container mx-auto">
      <div class="mt-6 mb-5 md:mb-9">
        <nuxt-link
          tag="div"
          class="text-gray-600 flex flex-row justify-start items-center md:hidden font-medium text-sm cursor-pointer"
          to="/"
        >
          <Arrow_left_icon />
          <span class="ml-3 text-gray-600 font-medium text-sm">
            {{ t("main_page") }}
          </span>
        </nuxt-link>
        <a-breadcrumb class="hidden md:block" separator=">">
          <a-breadcrumb-item class="text-sm leading-5 font-normal" href="">
            <nuxt-link to="/">
              <span class="text-gray-600 font-medium text-sm">
                {{ t("main_page") }}</span
              ></nuxt-link
            >
          </a-breadcrumb-item>
          <a-breadcrumb-item class="text-sm leading-5 font-normal">
            <span class="text-gray-800 font-semibold text-sm">
              {{ t("my_favorite") }}</span
            >
          </a-breadcrumb-item>
        </a-breadcrumb>
      </div>
    </section>
    <section style="max-width: 1224px" class="px-6 lg:container mx-auto">
    <div>Cookie: {{ useCookie<undefined | any>("favoriteProducts") }}</div>

      <div class="mb-6">
        <h1 class="text-2xl font-bold">{{ t("my_favorite") }}</h1>
      </div>
    </section>
    <section
      style="max-width: 1224px"
      class="w-full h-auto px-6 lg:container mx-auto mb-10 relative"
    >
      <div class="flex w-full flex-col">
        <a-spin
          :spinning="
            useMostPurchasedProductsStore().getProductsStatus !== 'success'
          "
          size="large"
          wrapperClassName="text-green-800"
        >
          <Products
            :classGridSize="true"
            @removeFavoriteProduct="removeFavoriteProduct"
            :link="'mehsullar'"
            :products="[{}]"
            v-if="useMostPurchasedProductsStore().getProducts.size > 0"
          />
        </a-spin>
        <!-- <a-spin
          :spinning="$wait.is(FetchingFavoriteProducts)"
          size="large"
          wrapper-class-name="text-green-800"
        >
          <ProductListing
            @removeFavoriteProduct="removeFavoriteProduct"
            :classGridSize="true"
            :link="'mehsullar'"
            :products="productData.list"
            v-if="productData.list.length > 0"
          />
        </a-spin> -->
      </div>
      <div
        class="block w-full min-w-full rounded text-center my-14"
        v-if="
          productData.list.length != productData.totalElements &&
          useAuthenticator().getToken
        "
      >
        <button
          @click="loadMoreFavoriteProducts"
          class="px-8 py-1 rounded text-amber-400 border border-amber-400 hover:text-white bg-white hover:bg-amber-400 text-sm font-semibold"
        >
          {{ t("more_products") }}
        </button>
      </div>

      <section
        v-if="useFavoriteProductsStore().getFavoriteProductIds.length == 0"
        class="mt-24"
      >
        <div>
          <div
            class="flex justify-center items-center w-full min-w-full text-gray-400"
          >
            <a-icon type="heart" class="text-6xl"></a-icon>
          </div>
          <p
            class="m-0 p-0 block w-full text-center text-neutral-800 mt-7 mb-14 text-2xl font-medium"
          >
            {{ t("no_products_have_been_added_to_my_favorites") }}
          </p>
          <div class="flex justify-center items-center">
            <nuxt-link
              class="text-green-600 hover:text-green-600 text-base font-semibold"
              tag="a"
              to="/"
              >{{ t("main_page") }}</nuxt-link
            >
          </div>
        </div>
      </section>
    </section>
  </main>
</template>
<script setup lang="ts">
import type { ProductDetail } from "~/utils/types/product";
const { t } = useI18n();
// import { useCookie } from "#app";
// import { mapGetters } from "vuex";
const favoriteProducts = ref<Set<any>>(new Set());
const cookie = useCookie<undefined | any>("favoriteProducts");
const productIds = reactive<Array<any>>([]);
const queryParams = reactive({
  page: useRoute().query.page ? Number(useRoute().query.page) : 0,
  size: useRoute().query.page ? (Number(useRoute().query.page) + 1) * 15 : 15,
  storeNamePhrase: useRoute().query.storeNamePhrase
    ? String(useRoute().query.storeNamePhrase)
    : undefined,
});
let productData = reactive({
  list: [] as Array<ProductDetail>,
  page: 0,
  totalPages: null,
  totalElements: 0,
});
let favoriteProductsList = reactive([]);

// export default {
//   components: {
//   },
//   data() {
//     return {

//       favoriteProducts: favoriteProducts,
//       more: false,
//     };
//   },
console.log("Cookie value on mount:", cookie);
onMounted(() => {
  setData();
  if (!useAuthenticator().getToken) {
    loadFavoriteProducts();
  }
}),
  //   methods

  useFavoriteProductsStore().resetProducts();
useFavoriteProductsStore().fetchFavoriteProducts({ ...queryParams, page: 0 });
const setData = () => {
  const favoriteProductsCookie = useCookie<string | null>("favoriteProducts");
    useCookie("favoriteProducts").value = JSON.stringify([
        // ...favoriteProductIdList,
      ]);
  // Cookie dəyərini yoxlayırıq və Set-ə çeviririk
  favoriteProducts.value = favoriteProductsCookie.value
    ? new Set(JSON.parse(favoriteProductsCookie.value))
    : new Set();
  useFavoriteProductsStore().setFavoriteProduct([...favoriteProducts.value]);
  // Unikal məhsul ID-lərini reaktiv massivə təyin edirik
  productIds.splice(0, productIds.length, ...favoriteProducts.value);
};
// const setData1 = () => {
//   favoriteProducts = new Set(JSON.parse(useCookie("favoriteProducts")));
//   // this.$store.commit("favorite/setFavoriteProduct", [
//   //   ...this.favoriteProducts,
//   // ]);
//   productIds = [...new Set(JSON.parse(useCookie("favoriteProducts")))];
// };
const loadMoreFavoriteProducts = () => {
  setData();
  queryParams.page++;
  queryParams.size = 15;
  useRouter().push({ query: { ...useRoute().query, page: queryParams.page } });
  // this.productData.page++;
  // let page = 0;
  // if (useRoute().query && useRoute().query.page) {
  //   page = Number(useRoute().query.page) || 0;
  // }
  // useRouter().replace({
  //   query: {
  //     ...useRoute().query,
  //     page: ++page,
  //   },
  // });
  // this.more = true;
};
const removeFavoriteProduct = (val: any) => {
  setData();
  productData.list.splice(val.index, 1);
  if (useAuthenticator().getToken) {
    productData = {
      list: [] as Array<ProductDetail | any>,
      page: 0,
      totalPages: null,
      totalElements: 0,
    };
    useFavoriteProductsStore().fetchFavoriteProducts({
      ...queryParams,
      page: 0,
    });
    // loadFavorites();
  }
};
const getProduct = async (id: number | any) => {
  console.log("getProduct....");

  if (!useAuthenticator().getToken) {
    try {
      // this.$wait.start(FetchingFavoriteProducts);
      await useProductDetailStore().fetchProduct(id);
      // const product = await useProductDetailStore().getProduct  as ProductDetail

      // await this.$store
      //   .dispatch("products/getProductById", id)
      //   .finally(() => {
      //     this.$wait.end(FetchingFavoriteProducts);
      //   });
      console.log("Product: ", useProductDetailStore().getProduct);

      const newProduct = {
        addedToComparisonBasket:
          useProductDetailStore().getProduct.addedToComparisonBasket,
        addedToFavoriteBasket:
          useProductDetailStore().getProduct.addedToFavoriteBasket,
        bargainMethod: useProductDetailStore().getProduct.bargainMethod,
        eligibleToShoppingCart:
          useProductDetailStore().getProduct.eligibleToShoppingCart,
        id: useProductDetailStore().getProduct.id,
        name: useProductDetailStore().getProduct.name,
        price: {
          discount: useProductDetailStore().getProduct.price.discount,
          discountedPrice:
            useProductDetailStore().getProduct.price.discountedPrice,
          initialPrice: useProductDetailStore().getProduct.price.initialPrice,
        },
        productType: {
          id: useProductDetailStore().getProduct.productTypeId,
          name: useProductDetailStore().getProduct.productTypeName,
        },
        reviewSummary: {
          averageRating:
            useProductDetailStore().getProduct.reviewSummary.averageRating,
          reviewCount:
            useProductDetailStore().getProduct.reviewSummary.reviewCount,
        },
        storeId: useProductDetailStore().getProduct.store.id,
        storeName: useProductDetailStore().getProduct.store.name,
        subcategory: {
          id: useProductDetailStore().getProduct.subcategory.id,
          name: useProductDetailStore().getProduct.subcategory.name,
        },
        thumbnailName: useProductDetailStore().getProduct.thumbnailName,
        thumbnailPath: useProductDetailStore().getProduct.thumbnailPath,
        favoriteIsActive: true,
        isActive: useProductDetailStore().getProduct.isActive,
      };
      productData.list.push(newProduct);
      favoriteProductsList.push(newProduct);
    } catch (error) {
      console.error("Məhsulun gətirilməsi zamanı xəta baş verdi:", error);
    }
  } else {
    return;
  }
};
const loadFavoriteProducts = async () => {
  setData();
  try {
    for (const productId of productIds) {
      await getProduct(productId);
    }
  } catch (error) {
    console.error("Xəta baş verdi:", error);
  }
};
const loadFavorites = () => {
  setData();
  // this.$wait.start(FetchingFavoriteProducts);
  useFavoriteProductsStore().fetchFavoriteProducts({
    page: productData.list.length == 0 ? 0 : useRoute().query.page,
    size:
      productData.list.length == 0
        ? (Number(useRoute().query.page || 0) + 1) * 12
        : 12,
  });
  // this.$store
  //   .dispatch("favorite/getFavoriteProducts", {
  //     // page: this.productData.page,
  //     // size: 12,
  //     // ...this.$route.query,
  //     page: this.productData.list.length == 0 ? 0 : useRoute().query.page,
  //     size:
  //       this.productData.list.length == 0
  //         ? (parseInt(this.$route.query.page || 0) + 1) * 12
  //         : 12,
  //   })
  //   .then((res) => {
  //     this.productData.list.push(...res.content);
  //     this.productData.totalElements = res.totalElements;
  //     this.productData.totalPages = res.totalPages;
  //     this.more = false;
  //     this.$nuxt.$emit("checkNewProducts", {});
  //   })
  //   .finally(() => {
  //     this.$wait.end(FetchingFavoriteProducts);
  //   });
};
watch(
  () => useRoute().query,
  (to: any) => {
    if (useAuthenticator().getToken)
      useFavoriteProductsStore().fetchFavoriteProducts({
        ...queryParams,
        ...useRoute().query,
      });
  },
  { deep: true }
);
// },
//   watch: {
//     "$route.query": "$fetch",
//   },
//   async fetch() {
//     !this.more && (this.productData.list = []);
//     if (this.loggedIn) {
//       this.loadFavorites();
//     }
//   },
// };
</script>
