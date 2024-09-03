<template>
  <div class="max-h-screen min-h-screen">
    <!-- <h1>{{ useAuthenticator().getToken }}</h1>
    <h1>{{ useCookie("token") }}</h1> -->

    <!-- <productList
      :classGridSize="true"
      link="/product"
      :products="useProductsStore().getProducts"
    /> -->
    <products
      prop1="this is manual prop without typescript..."
      :products="useProductsStore().getProducts"
    />
    <!-- <ul>
      <li v-for="product in useProductsStore().getProducts" :key="product.id">
        {{ product.name }}
      </li>
    </ul> -->
  </div>
</template>
<script setup lang="ts">
// import productList from "@/components/common/productList.vue";
// import productList from "@/components/common/productList.vue";
import products from "@/components/common/products";
// const { locale } = useI18n();
// console.log(locale);

useProductsStore().fetchProducts();

function increment() {
  useProductsStore().fetchProducts();
}
// onMounted(() => {
//   increment();
// });
</script>
