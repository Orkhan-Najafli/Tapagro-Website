<template>
  <div class="max-h-screen min-h-screen">
    <h1>{{ useAuthenticator().getToken }}</h1>
    <h1>{{ useCookie("token") }}</h1>

    <!-- <productList :products="useProductsStore().getProduct" /> -->
    <ul>
      <li
        v-for="product in useProductsStore().getProduct.content"
        :key="product.id"
      >
        {{ product.name }}
      </li>
    </ul>
  </div>
</template>
<script setup lang="ts">
// import productList from "@/components/common/productList.vue";
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
