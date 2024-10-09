<template>
  <div class="tapagro overflow-hidden">
    <slot />
  </div>
</template>

<script setup lang="ts">
definePageMeta({
  middleware: ["guest"],
  // or middleware: 'auth'
});
defineComponent({
  errorCaptured(err) {
    return false; // Xətanı gizlətmək üçün false qaytarın
  },
});
</script>

<style>
* {
  font-family: "Inter", sans-serif;
  font-style: normal;
}
</style>
