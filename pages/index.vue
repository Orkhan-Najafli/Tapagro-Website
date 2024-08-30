<template>
  <div class="max-h-screen min-h-screen">
    <div>Home Page {{ useProductsStore().doubleCount }}</div>
    <button @click="increment">Increment</button>
  </div>
</template>
<script setup lang="ts">
const { locale } = useI18n();
// console.log(locale);

useProductsStore().fetchProducts();

function increment() {
  useProductsStore().increment();
  useProductsStore().fetchProducts();
}
// onMounted(() => {
//   increment();
// });
</script>
