<template>
  <svg
    xmlns="http://www.w3.org/2000/svg"
    :width="styleSVG.width"
    :height="styleSVG.height"
    viewBox="0 0 16 13"
    fill="none"
  >
    <path
      fill-rule="evenodd"
      clip-rule="evenodd"
      d="M9.10491 2.88872C12.867 3.42192 15.7647 6.64535 15.7647 10.5353C15.7647 11.0867 15.7038 11.6259 15.5943 12.147H13.488C13.6402 11.638 13.7193 11.0927 13.7193 10.5353C13.7193 7.76628 11.7347 5.46383 9.10491 4.94881V10.3232L7.01078 11.3714V4.93063C4.32616 5.39718 2.28073 7.72993 2.28073 10.5353C2.28073 11.0927 2.35987 11.638 2.51206 12.147H0.405757C0.296181 11.6259 0.235306 11.0867 0.235306 10.5353C0.235306 6.60294 3.18778 3.35527 7.01078 2.87055V1.90109L9.10491 0.852875V2.88872Z"
      :fill="styleSVG.color"
    />
  </svg>
</template>
<script setup lang="ts">
defineProps<{ styleSVG: any }>({
  styleSVG: {
    type: Object,
    default: () => {
      return { height: 13, width: 16, color: "#EF4444" };
    },
    required: false,
  },
});
</script>
