<template>
  <div class="w-full">
    <h2 class="my-4">Kateqoriyalar</h2>
    <ul class="w-auto h-auto m-0 p-0 max-w-[350px]">
      <li
        class="w-full h-auto m-0 p-0"
        v-for="(category, index) in useCategoriesStore().getCategories"
        :key="index"
      >
        <div
          @click="getProductTypes(4, category.id, index)"
          class="flex flex-row justify-between items-center w-full h-auto min-w-full cursor-pointer hover:bg-[#f9fafb] p-2 rounded"
        >
          <span class="block">
            <input
              class="cursor-pointer outline-none accent-[#16A34A] h-4 w-4 border-[#d9d9d9]"
              @click="setQuery($event, index)"
              type="checkbox"
              :id="`${category.name}-${category.id}`"
              :name="`${category.name}-${category.id}`"
            />
            <label class="cursor-pointer">
              <!-- :for="`${category.name}-${category.id}`" -->
              {{ category.name }} --- {{ category.hide }}</label
            >
          </span>
          <DownOutlined
            class="text-sm transform transition-transform"
            :class="{
              '-rotate-180': category.hide,
              'rotate-0': !category.hide,
            }"
          />
        </div>
        <ul
          class="w-auto overflow-hidden h-0 transition-all duration-500 pl-8 my-0"
          :class="{
            'h-auto my-3': category.hide,
          }"
        >
          <li
            class="flex flex-row justify-between items-center w-full h-auto text-green-500 cursor-pointer hover:bg-[#f9fafb] px-[2px] py-0.5"
            v-for="(productType, index) in category.productTypes"
            :key="index"
          >
            <span>
              <input
                type="checkbox"
                class="h-4 w-4 mr-2.5 accent-[#16A34A]"
                :id="`${productType.name}-${productType.id}`"
                :name="`${productType.name}-${productType.id}`"
                :checked="productType.hide"
              />
              <label
                class="cursor-pointer text-[#6B7280]"
                :for="`${productType.name}-${productType.id}`"
                >{{ productType.name }} ---{{ productType.hide }}</label
              >
            </span>
            <span
              class="bg-[#F3F4F6] text-gray-500 px-[3px] py-[1px] rounded-sm"
              >{{ productType.productCount }}</span
            >
          </li>
        </ul>
      </li>
    </ul>
  </div>
</template>
<script setup lang="ts">
// useCategoriesStore().fetchBaseCategories();
const checkedProductType = ref(false);
const checkedCategory = ref(false);
// methods
useCategoriesStore().fetchCategories(4);

const getProductTypes = function (
  baseCategoryId: number = 4,
  categoryId: number,
  index: number
) {
  useProductTypesStore().fetchProductTypes(baseCategoryId, categoryId, index);
};
const setQuery = function (event: Event | any, index: number) {
  event.stopPropagation();
  if (event.target.checked) {
    useCategoriesStore().setAllProductTypes(index, true);
  }
};
</script>
<style>
input[type="checkbox"]:checked:after {
  content: "";
  display: block;
  width: 4px;
  height: 12px !important;
}
</style>
