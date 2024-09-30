<template>
  <div
    class="m-0 p-0 flex flex-col justify-start items-start w-full min-w-full"
  >
    <div class="m-0 p-0 flex flex-col w-full min-w-full h-auto">
      <div class="flex flex-col md:flex-row py-2 w-full">
        <div class="flex flex-row">
          <div
            class="w-8 h-8 p-0.5 flex flex-shrink-0 justify-center items-center rounded-full text-center bg-[#F0FDF4] mr-5"
          >
            <img
              class="w-[18px] h-[18px]"
              :src="`${baseURL}${props.review.store.logoPath}`"
              @error="setDefaultStoreImage"
            />
          </div>
          <div class="inline-flex flex-col w-[272px] max-w-[272px] md:mr-3">
            <h5
              class="m-0 p-0 text-[#4B5563] capitalize text-sm font-medium leading-5 mb-2"
            >
              {{ props.review.reviewer.split(" ").join(" ").toLowerCase() }}
            </h5>
            <span class="text-xs font-medium leading-5 text-[#9CA3AF]"
              >{{ Number(new Date(props.review.publishedAt).getDate()) }}
              {{ date[Number(new Date(props.review.publishedAt).getMonth())] }},
              {{
                Number(new Date(props.review.publishedAt).getFullYear())
              }}</span
            >
          </div>
        </div>
        <div class="inline-flex flex-col w-full">
          <span class="whitespace-nowrap w-auto m-0 mt-2.5 md:-mt-1">
            <a-rate
              disabled
              class="m-0 p-0"
              v-model="props.review.rating"
              allow-half
            />
          </span>
          <p class="m-0 p-0 my-2 text-[#4B5563] text-sm font-normal leading-5">
            {{ props.review.comment }}
          </p>
          <section id="components-upload-demo-pictures-wall" class="code-box">
            <section class="code-box-demo">
              <div class="clearfix">
                <span class="ant-upload-picture-card-wrapper">
                  <div class="ant-upload-list ant-upload-list-picture-card">
                    <div
                      style="width: 44px; height: 44px"
                      class="ant-upload-list-picture-card-container"
                      v-for="(photo, index) in props.review.photos"
                      :key="index"
                    >
                      <span>
                        <div
                          style="width: 44px; height: 44px; padding: 3px"
                          class="ant-upload-list-item ant-upload-list-item-done ant-upload-list-item-list-type-picture-card"
                        >
                          <div class="ant-upload-list-item-info">
                            <span>
                              <img
                                :src="`${baseURL}${photo}`"
                                alt="image.png"
                                class="ant-upload-list-item-thumbnail ant-upload-list-item-image"
                              />
                            </span>
                          </div>
                          <span class="ant-upload-list-item-actions">
                            <span
                              class="cursor-pointer"
                              @click="handlePreview(photo)"
                            >
                              <a-icon
                                style="color: white"
                                type="eye"
                                class="text-lg"
                              />
                            </span>
                          </span>
                          <a-modal
                            :centered="true"
                            :visible="previewVisible"
                            :footer="null"
                            @cancel="handleCancel"
                            width="500px"
                            height="500px"
                          >
                            <img
                              alt="example"
                              style="
                                width: 100%;
                                height: 100%;
                                max-height: 500px;
                              "
                              :src="`${baseURL}${previewImage}`"
                            />
                          </a-modal>
                        </div>
                      </span>
                    </div></div
                ></span>
              </div>
            </section>
          </section>
          <ul
            v-if="props.review.reply"
            class="flex flex-col w-full h-auto m-0 p-0"
          >
            <li class="m-0 p-0 flex justify-start items-start mb-3">
              <button
                @click="showReply"
                class="inline-flex m-0 p-0 text-xs font-semibold text-[#111827]"
              >
                {{ $t("see_the_product_owners_answer") }}
              </button>
            </li>
            <li
              v-if="visibleReply"
              class="m-0 p-0 flex flex-col justify-start items-start w-full h-auto bg-[#F9FAFB] py-[4px] px-4"
            >
              <div
                class="flex flex-col md:flex-row justify-start items-start md:justify-between md:items-center w-full h-auto mb-2.5"
              >
                <div class="flex flex-row justify-start items-center">
                  <div
                    class="w-6 h-6 p-0.5 flex flex-shrink-0 justify-center items-center rounded-full text-center bg-[#F0FDF4] mr-3"
                  >
                    <img
                      class="w-[18px] h-[18px]"
                      :src="`${baseURL}${props.review.store.logoPath}`"
                      @error="setDefaultStoreImage"
                    />
                  </div>
                  <span class="text-[13px] font-medium text-[#374151]">{{
                    props.review.store.name
                  }}</span>
                </div>
                <span
                  v-if="props.review.reply.repliedAt"
                  class="text-xs font-medium leading-5 text-[#9CA3AF]"
                  >{{
                    props.review.reply &&
                    Number(new Date(props.review.reply.repliedAt).getDate())
                  }}
                  {{
                    props.review.reply &&
                    date[
                      Number(new Date(props.review.reply.repliedAt).getMonth())
                    ]
                  }},
                  {{
                    props.review.reply &&
                    Number(new Date(props.review.reply.repliedAt).getFullYear())
                  }}</span
                >
              </div>
              <p
                class="flex w-full h-auto justify-start items-center text-[#4B5563] text-sm p-0 m-0"
              >
                {{ props.review.reply && props.review.reply.reply }}
              </p>
            </li>
          </ul>
        </div>
      </div>
    </div>
    <hr class="w-full min-w-full h-[1px] bg-[#CBD5E1] my-3" />
  </div>
</template>
<script setup lang="ts">
import type { ProductReview } from "~/utils/types/reviews";
const baseURL = useRuntimeConfig().public.baseURL;
const previewVisible = ref(false);
const visibleReply = ref(false);
const previewImage = ref("");
const props = defineProps({
  review: {
    type: Object as PropType<ProductReview>,
    default: {},
  },
});
const date = useI18n().t("months");
const handleCancel = function () {
  previewVisible.value = false;
};
const showReply = function () {
  visibleReply.value = !visibleReply.value;
};
const setDefaultStoreImage = async function (event: Event | any) {
  event.target.src = await require(`@/assets/img/all_logos/store.svg`);
  event.target.className = "p-.5";
};
const handlePreview = async function (file: any) {
  previewImage.value = file;
  previewVisible.value = true;
};
// },
</script>
