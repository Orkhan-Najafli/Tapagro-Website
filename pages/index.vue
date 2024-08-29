<template>
  <div>
    <div>Home Page {{ useCounterStore().doubleCount }}</div>
    <button @click="increment">Increment</button>
    <template>
      <div :style="{ background: 'rgb(190, 200, 200)', padding: '16px 16px' }">
        <a-space>
          <a-button type="primary" ghost>Primary</a-button>
          <a-button ghost>Default</a-button>
          <a-button type="dashed" ghost>Dashed</a-button>
          <a-button type="primary" danger ghost>Danger</a-button>
        </a-space>
      </div>
    </template>
  </div>
</template>
<script setup lang="ts">
const { locale } = useI18n();
console.log(locale);

useCounterStore().fetchMountains();

function increment() {
  useCounterStore().increment();
  useCounterStore().fetchMountains();
}
// onMounted(() => {
//   increment();
// });
</script>
