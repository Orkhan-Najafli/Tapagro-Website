<template>
  <div>
    <AppHeader />
    <hero-section />
    <slot />
    <AppFooter />
  </div>
</template>
<script setup lang="ts">
defineComponent({
  errorCaptured(err) {
    return false; // Xətanı gizlətmək üçün false qaytarın
  },
});
</script>
