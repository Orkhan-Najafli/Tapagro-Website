<template>
  <a-modal
    @cancel="handleClose"
    :open="visibleModal"
    width="350px"
    centered
    :footer="null"
    :title="null"
  >
    <div class="flex flex-col justify-center items-center">
      <detail_icon />
      <p
        class="text-center m-0 p-0 mt-4 mb-6 text-xl font-semibold text-[#4B5563]"
      >
        {{ $t("are_you_sure_you_want_to_remove_the_product") }}
      </p>
      <button
        class="w-full h-auto text-[#16A34A] text-[15px] font-semibold rounded-md border border-[#16A34A] p-2.5 text-center"
        key="back"
        @click="addFavorite"
      >
        {{ $t("delete_and_add_to_my_favorites") }}
      </button>
      <button
        class="w-full h-auto text-[#EF4444] text-[15px] font-semibold rounded-md border border-[#EF4444] p-2.5 text-center my-3"
        key="back"
        @click="remove"
      >
        {{ $t("delete") }}
      </button>
      <button
        class="w-full h-auto text-[#6B7280] text-[15px] font-semibold rounded-md border border-[#6B7280B] p-2.5 text-center"
        key="back"
        @click="handleClose"
      >
        {{ $t("close_modal") }}
      </button>
    </div>
  </a-modal>
</template>
<script setup lang="ts">
const props = defineProps({
  visibleModal: {},
});
// import { mapGetters } from "vuex";
// import detail_icon from "@/components/inc/svg/detail_icon_in_basket.vue";
// import moment from "moment";

// export default {
//   components: {
//     detail_icon,
//   },
//   props: {
//     // visibleModal: Boolean,
//   },
//   data() {
//     return {
//       visibleModal: true,
//     };
//   },

//   methods: {
//     remove() {
//       this.$emit("remove");
//     },
//     addFavorite() {
//       this.$emit("addFavorite");
//     },
//     handleClose() {
//       this.$emit("close");
//       //   this.$store.commit("setOrderDetailModal", false);
//     },
//   },
// };
</script>
