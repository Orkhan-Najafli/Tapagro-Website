<template>
  <p class="p-0 flex flex-row justify-start items-center -mb-1">
    <i class="text-[#F5222D] text-base font-normal leading-snug mr-0.5 pt-2"
      >*</i
    >
    <span> {{ props.labelText }} </span>
    <a-tooltip placement="top">
      <template slot="title">
        <span>
          {{ props.explanation }}
        </span>
      </template>
      <div class="flex flex-row items-center cursor-pointer ml-1">
        <Question_in_circle_icon />
      </div>
    </a-tooltip>
  </p>
</template>
<script setup lang="ts">
const props = defineProps({
  labelText: String,
  explanation: String,
});
</script>
