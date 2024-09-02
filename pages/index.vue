<template>
  <div class="max-h-screen min-h-screen">
    <button @click="increment">Increment</button>
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
