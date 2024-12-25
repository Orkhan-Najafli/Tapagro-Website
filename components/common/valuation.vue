<template>
  <a-modal
    :open="true"
    :title="$t('product_evaluation')"
    width="724px"
    :dialog-style="{ top: '20px' }"
    @cancel="handleCancel"
  >
    <a-form-model :label-col="{ span: 24 }" :wrapper-col="{ span: 24 }">
      <div class="overflow-y-auto">
        <ul class="m-0 p-0 flex flex-col justify-start items-start">
          <li class="flex flex-col w-full min-w-full h-auto mb-3">
            <div
              v-if="action.action == 'detail' || action.action == 'edit'"
              class="flex flex-col md:flex-row justify-start items-start md:items-center w-full h-auto mb-3"
            >
              <!-- Detail and Edit -->
              <a :href="`/mehsullar/${props.product.product.id}`" target="_blank">
                <div
                  class="m-0 p-0 mr-6 w-auto overflow-hidden inline-flex relative justify-center items-center"
                >
                  <img
                    :src="`${useRuntimeConfig().public.baseURL}/${props.product.product.thumbnail}`"
                    :alt="props.product.product.name"
                    class="w-[86px] h-[86px] max-w-[86px] max-h-[86px] min-w-[86px] min-h-[86px] object-cover"
                    @error="setDefaultImage"
                  />
              </div>
              </a>
              <div class="flex flex-col items-start justify-start">
                <span class="flex flex-col md:flex-row w-full h-auto mb-3">
                  <span class="text-xl font-medium text-[#6B7280] mr-3"
                    >{{ $t("product") }}:
                  </span>
                  <a
                    :href="`/mehsullar/${props.product.product.id}`"
                    target="_blank"
                    class="text-[#374151] text-xl font-semibold"
                  >
                    {{ props.product.product.name }}</a
                  >
                </span>
                <span class="flex flex-col md:flex-row w-full h-auto">
                  <span class="text-xl font-medium text-[#6B7280] mr-3"
                    >{{ $t("store") }}:
                  </span>
                  <a
                    :href="`/magazalar/${props.product.store.id}`"
                    target="_blank"
                    class="text-[#374151] text-xl font-semibold"
                  >
                    {{ props.product.store.name }}</a
                  >
                </span>
              </div>
            </div>
            <div
              v-else
              class="flex flex-col md:flex-row justify-start items-start md:items-center w-full h-auto mb-3"
            >
              <a :href="`/mehsullar/${product.id}`" target="_blank">
                <picture
                  class="m-0 p-0 mr-6 w-auto overflow-hidden inline-flex relative justify-center items-center"
                >
                  <img
                    v-if="hasValidThumbnail(props.product)"
                    :src="`${useRuntimeConfig().public.baseURL}/${props.product.product.thumbnail}`"
                    :alt="props.product.product.name"
                    class="w-[86px] h-[86px] max-w-[86px] max-h-[86px] min-w-[86px] min-h-[86px] object-cover"
                    @error="setDefaultImage"
                  />
                </picture>
              </a>
              <div class="flex flex-col items-start justify-start">
                <span class="flex flex-col md:flex-row w-full h-auto mb-3">
                  <span class="text-xl font-medium text-[#6B7280] mr-3"
                    >{{ $t("product") }}:
                  </span>
                  <a
                    :href="`/mehsullar/${props.product.product.id}`"
                    target="_blank"
                    class="text-[#374151] text-xl font-semibold"
                  >
                    {{ props.product.product.name }}</a
                  >
                </span>
                <span class="flex flex-col md:flex-row w-full h-auto">
                  <span class="text-xl font-medium text-[#6B7280] mr-3"
                    >{{ $t("store") }}:
                  </span>
                  <a
                    :href="`/magazalar/${props.product.store.id}`"
                    target="_blank"
                    class="text-[#374151] text-xl font-semibold"
                  >
                    {{ props.product.store.name }}</a
                  >
                </span>
              </div>
            </div>
            <hr class="w-full min-w-full h-[1px] bg-[#CBD5E1] my-3" />
          </li>
          <li class="flex flex-col w-full min-w-full h-auto mb-3">
            <div
              class="flex flex-col md:flex-row justify-start items-start md:items-center w-full h-auto mb-3"
            >
              <a-form-model-item class="!m-0">
                <template slot="label">
                  <label
                    class="ant-form-item-required text-[#374151] text-2xl font-semibold"
                    >{{ $t("rating_title") }}</label
                  >
                </template>
                <!-- <div class="flex flex-col whitespace-nowrap w-auto m-0 p-0">
                  <a-rate
                    @change="changeRate(formData.rating)"
                    :allow-clear="false"
                    v-model:value="formData.rating"
                    name="rating"
                    :disabled="action.action == 'detail'"
                    :default-value="formData.rating"
                    v-validate="'required'"
                    :tooltips="desc"
                  />
                  <span class="ant-rate-text">{{ desc[value - 1] }}</span>
                  <span class="text-[#6B7280] text-base font-medium italic">{{
                    rateValueText
                  }}</span>
                </div> -->
              </a-form-model-item>
            </div>
            <hr class="w-full min-w-full h-[1px] bg-[#CBD5E1] my-3" />
          </li>
          <li class="flex flex-col w-full min-w-full h-auto mb-3">
            <div class="flex flex-col justify-start items-start w-full h-auto">
              <a-form-model-item
                class="w-full m-0 p-0"
               
              >
                <template slot="label">
                  <label
                    for="_phone"
                    class="text-[#374151] text-2xl font-semibold m-0 p-0"
                    >{{ $t("product_review") }}</label
                  >
                </template>
                <div
                  v-if="props.action.action == 'detail'"
                  class="flex flex-col justify-start items-start w-full h-auto p-0 m-0"
                >
                  <span
                    class="text-[#374151] text-xl font-semibold leading-7"
                    >{{ props.product.comment }}</span
                  >
                </div>
                <a-textarea
                  v-else
                  @change="calculateTextSymbolCount"
                  class="m-0 p-0"
                  :rows="6"
                  v-model="formData.comment"
                  :maxLength="300"
                  name="comment"
                  v-validate="'max:300'"
                  placeholder=""
                >
                </a-textarea>
              </a-form-model-item>
              <div
                v-if="props.action.action != 'detail'"
                class="text-right w-full min-w-full h-auto text-[#262626] text-xs font-normal"
              >
                {{ descriptionLength }}
                {{ $t("symbol_title") }}
              </div>
            </div>
            <hr class="w-full min-w-full h-[1px] bg-[#CBD5E1] my-3" />
          </li>
          <li class="flex flex-col w-full min-w-full h-auto">
            <div class="flex flex-col justify-start items-start w-full h-auto">

<!-- 
              <div class="relative group w-[102px] h-[102px] rounded-lg overflow-hidden border shadow-md">
                <img
                  src="https://via.placeholder.com/150" 
                  alt="Uploaded Image"
                  class="w-full h-full object-cover"
                />
                <div
                  class="absolute inset-0 bg-gray-900 bg-opacity-50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                >
                  <button class="text-white mx-2 p-2 rounded-full bg-gray-700 hover:bg-gray-600">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                      <path stroke-linecap="round" stroke-linejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.137 21H7.863a2 2 0 01-1.996-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3m-4 0h14" />
                    </svg>
                  </button>
                  <button class="text-white mx-2 p-2 rounded-full bg-gray-700 hover:bg-gray-600">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                      <path stroke-linecap="round" stroke-linejoin="round" d="M15 12m0 0a3 3 0 11-6 0 3 3 0 016 0zm7.489-3.396C20.887 5.149 17.791 3 12 3S3.113 5.149 1.511 8.604a9.812 9.812 0 000 6.792C3.113 18.851 6.209 21 12 21s8.887-2.149 10.489-5.604a9.812 9.812 0 000-6.792z" />
                    </svg>
                  </button>
                </div>
              </div> -->

              <div class="clearfix">
                  <a-upload
                      v-if="photos!.length <= 3"
                      accept="image/png, image/gif, image/jpeg"
                      list-type="picture-card"
                      @preview="handlePreview"
                      name="avatar"
                      class="avatar-uploader"
                      :show-upload-list="true"
                      :before-upload="beforeUpload"
                      @change="handleChangeFile"
                      :showDownloadIcon="false"
                  >
                    <div v-if="photos!.length < 3">
                      <plus-outlined />
                      <div style="margin-top: 8px">{{ t("download") }}</div>
                    </div>
                  </a-upload>
                  <a-modal :open="previewVisible" :title="previewTitle" :footer="null" @cancel="handleCancelPreview">
                    <img alt="example" style="width: 100%" :src="previewImage" />
                  </a-modal>
                </div>
            </div>
            <hr class="w-full min-w-full h-[1px] bg-[#CBD5E1] mb-3" />
          </li>
          <li
            v-if="
              props.action.action == 'detail' || props.action.action == 'edit'
            "
            class="flex flex-col w-full min-w-full h-auto mb-3"
          >
            <ul class="flex flex-col justify-start items-start p-0 m-0">
              <li class="flex flex-row justify-start items-center m-0 p-0 mb-3">
                <span
                  class="text-[#6B7280] font-medium text-base mr-3 leading-5"
                  >{{ $t("status") }}:</span
                >
                <span
                  :style="resolveStatusStyle(product)"
                  class="font-semibold text-base leading-5"
                  >{{ props.product.status?.status }}</span
                >
              </li>
              <li
                v-if="props.product.rejection?.reason"
                class="flex flex-row justify-start items-center m-0 p-0 mb-3"
              >
                <span
                  class="text-[#6B7280] font-medium text-base leading-5 mr-3"
                  >{{ $t("reason_for_refusal") }}:</span
                >
                <span
                  class="text-[#374151] font-semibold text-base leading-5"
                  >{{ props.product.rejection.reason }}</span
                >
              </li>
              <li
                v-if="props.product.status?.label == 'REJECTED'"
                class="flex flex-row justify-start items-center m-0 p-0"
              >
                <span
                  class="text-[#6B7280] font-medium text-base leading-5 mr-3"
                  >{{ $t("date_of_rejection") }}:</span
                >
                <span
                  class="text-[#374151] font-semibold text-base leading-5"
                  >{{
                    props.product.rejection &&
                    dateModel(props.product.rejection.rejectedAt)
                  }}</span
                >
              </li>
              <li
                v-if="props.product.status?.label == 'PUBLISHED'"
                class="flex flex-row justify-start items-center m-0 p-0"
              >
                <span
                  class="text-[#6B7280] font-medium text-base leading-5 mr-3"
                  >{{ $t("publication_date") }}:</span
                >
                <span
                  class="text-[#374151] font-semibold text-base leading-5"
                  >{{
                    props.product.publishedAt &&
                    dateModel(props.product.publishedAt)
                  }}</span
                >
              </li>
              <li
                v-if="props.product.status?.label == 'CREATED'"
                class="flex flex-row justify-start items-center m-0 p-0"
              >
                <span
                  class="text-[#6B7280] font-medium text-base leading-5 mr-3"
                  >{{ $t("date_of_shipment") }}:</span
                >
                <span
                  class="text-[#374151] font-semibold text-base leading-5"
                  >{{
                    props.product.createdAt &&
                    dateModel(props.product.createdAt)
                  }}</span
                >
              </li>
            </ul>
          </li>
        </ul>
      </div>
    </a-form-model>
    <template slot="footer">
      <div
        :class="{
          'justify-end': props.action.action == 'detail',
          'justify-between': props.action.action != 'detail',
        }"
        class="flex"
      >
        <button
          class="border border-[#E5E7EB] text-[#6B7280] px-3 py-1 rounded-md hover:text-[#16A34A] hover:border-[#16A34A]"
          @click="handleCancel"
        >
          {{ $t("close_modal") }}
        </button>
        <div v-if="props.action.action != 'detail'">
          <!-- <button
            v-if="props.action.action == 'edit'"
            :disabled="hasChange"
            :class="{
              'bg-slate-600 text-gray-700':
                errors.items.length > 0 || hasChange,
              'bg-[#16A34A] text-[#fff]': !hasChange,
            }"
            class="disabled:opacity-25 text-sm font-medium hover:bg-green-700 px-3 py-1 border border-gray-300 rounded-md cursor-pointer"
            @click="handleOk"
          >
            <span>{{ $t("save") }}</span>
          </button>
          <button
            v-else
            :disabled="errors.items.length > 0 || formData.rating == 0"
            :class="{
              'bg-slate-600 text-gray-700':
                errors.items.length > 0 || formData.rating == 0,
              'bg-[#16A34A] text-[#fff]': formData.rating != 0,
            }"
            class="disabled:opacity-25 text-sm font-medium hover:bg-green-700 px-3 py-1 border border-gray-300 rounded-md cursor-pointer"
            @click="handleOk"
          >
            <span>{{ $t("add") }}</span>
          </button> -->
        </div>
      </div>
    </template>
  </a-modal>
</template>

<script setup lang="ts">
import moment from "moment";
import type { Product, ProductDetail } from "~/utils/types/product";
// const baseURL = useRuntimeConfig().public.baseURL;
function getBase64(img: Blob, callback: (base64Url: string) => void) {
  const reader = new FileReader();
  reader.addEventListener('load', () => callback(reader.result as string));
  reader.readAsDataURL(img);
}



import { PlusOutlined } from '@ant-design/icons-vue';
import type { UploadProps } from 'ant-design-vue';
import type { ReviewDetail } from "~/utils/types/reviews";

// function getBase64(file: File) {
//   return new Promise((resolve, reject) => {
//     const reader = new FileReader();
//     reader.readAsDataURL(file);
//     reader.onload = () => resolve(reader.result);
//     reader.onerror = error => reject(error);
//   });
// }

const previewVisible = ref(false);
const previewImage = ref('');
const previewTitle = ref('');

// const fileList = ref<UploadProps['fileList']>([])
const handleCancelPreview = () => {    
  previewVisible.value = false;
  previewTitle.value = '';
};
const handlePreview = async (file: any) => {
  if (!file.url && !file.preview) {
    file.preview = (await getBase64(file.originFileObj)) as string;
  }
  previewImage.value = file.url || file.preview;
  previewVisible.value = true;
  previewTitle.value = file.name || file.url.substring(file.url.lastIndexOf('/') + 1);
};


const { t } = useI18n();
const props = defineProps({
  product: {
    type: Object as PropType<ReviewDetail>,
    default: {},
  },
  action: {
    type: Object as PropType<{ action: string }>,
    default: { action: "" },
  },
});
const emit = defineEmits(["handleOk", "close"]);
// const previewVisible = ref(false);
// const previewImage = ref("");
const otherFileList: any = reactive([]);
let photos = reactive<any>([]);
const hasChange = ref(true);
const allowFileTypes = reactive(["image/jpeg", "image/png", "image/jpg"]);
const allowFileSize = ref(5242880); //5 mb (binary)
const rateValueText = ref("");
const descriptionLength = ref(300);
const dateFormat = ref("DD/MM/YYYY HH:mm:ss");
const formData = reactive({
  rating: 0,
  comment: undefined as undefined | any,
});
const desc = t("desc");

//   mounted() {
  const handleChangeFile = function (params:any) {
    console.log(params);
    
  }
// onMounted(async () => {
  if (props.action.action == "detail") {
  // formData.rating = !Number.isInteger(Number(props.product.rating))
  //   ? Number(`${Math.floor(props.product.rating)}.${5}`)
  //   : props.product.rating;
} else if (props.action.action == "edit") {
  // formData.rating = props.product.rating;
}
  if (props.action.action == "detail" || props.action.action == "edit") {
  formData.comment = props.product.comment;
  // changeRate(formData.rating);
  
  photos = props.product.photos.map((photo) => {
    return {
      uid: photo.id,
      name:  "",
      status: 'done',
      url:photo.data
    }
  })

  // this.photos = [...this.product.photos];
  // photos = props.product.photos.map((photo) => {
  //   return {
  //     file: null,
  //     id: photo.id,
  //   };
  // });
   descriptionLength.value -= formData.comment && formData.comment.length
    ? formData.comment.length
    : 0;
}
// })

// },
//   methods: {
const dateModel = function (value: any) {
  let dat = new Date(value).toString();
  return moment(dat).format("DD/MM/yyyy HH:mm:ss");
};

const beforeUpload = function (file: any) {
  if (file && allowFileTypes.includes(file.type)) {
    if (file.size <= allowFileSize.value) {
      const obj = {
        file,
        uid: Date.now(),
        name: file && file.name,
        data: "",
        id: null,
      };
      getBase64(file, (imageUrl: any) => {
        obj.data = imageUrl;
        photos.push(obj);
        if (props.action.action == "edit") {
          photos.push({
            file: { data: imageUrl, name: file.name },
            id: null,
          });
        } else {
          photos.push({ data: imageUrl, name: file.name });
        }
        hasChange.value = false;
      });
    } 
  }
  return false;
};
const removeOtherImage = function (index: number) {
  otherFileList.splice(index, 1);
  photos.splice(index, 1);
  hasChange.value = false;
};
const calculateTextSymbolCount = function (val: any) {
  hasChange.value = false;
  descriptionLength.value = 300;
  descriptionLength.value -= val.srcElement.textLength;
};
const changeRate = function (val: any) {
  // if (val != props.product.rating) {
  //   hasChange.value = false;
  // }
  // if (val <= 1) {
  //   rateValueText.value = t("descObj", { returnObjects: true }).very_bad;
  // } else if (1 < val && val <= 2) {
  //   rateValueText.value = t("descObj").bad;
  // } else if (2 < val && val <= 3) {
  //   rateValueText.value = t("descObj").average;
  // } else if (3 < val && val <= 4) {
  //   rateValueText.value = t("descObj").good;
  // } else if (4 < val && val <= 5) {
  //   rateValueText.value = t("descObj").very_good;
  // } else if (val == undefined) {
  //   rateValueText.value = "";
  // }
};

const resolveStatusStyle = function (record: any) {
  if (record.status?.label == "CREATED") {
    return "color:#1890FF";
  } else if (record.status?.label == "PUBLISHED") {
    return "color:#389E0D";
  } else if (record.status?.label == "REJECTED") {
    return "color:#F5222D";
  } else if (record.status?.label == "DELETED") {
    return "color:#EB2F96";
  } else if (record.status?.label == "IN_INSPECTION") {
    return "color:#FAAD14";
  }
};
const handleOk = function () {
  formData.comment = formData.comment == "" ? null : formData.comment;
  if (props.action.action == "edit") {
    // this.formData.comment =
    //   this.formData.comment == "" ? null : this.formData.comment;
    //   let sendFormData = {
    //     ...formData,
    //     photos: photos,
    //   };
    //   this.$store
    //     .dispatch("review/editReview", {
    //       sendFormData: sendFormData,
    //       productId: this.product.id,
    //     })
    //     .then((res) => {
    //       this.$emit("ok", true);
    //       this.hasChange = true;
    //     })
    //     .catch(() => {
    //       this.hasChange = false;
    //     });
    // } else {
    //   this.$store
    //     .dispatch("review/addReview", {
    //       ...this.formData,
    //       productId: this.product.id,
    //       photos: this.photos,
    //     })
    //     .then((res) => {
    //       this.$emit("ok", true);
    //     });
  }
};
// const handlePreview = function (file: any) {
//   previewImage.value = file;
//   previewVisible.value = true;
// };
// const handleCancelUpload = function () {
//   previewVisible.value = false;
// };
const handleCancel = function () {
  emit("close", false);
};
const defaultImagePath = await import("@/assets/img/no-image.svg");
const setDefaultImage = (event: Event | any) => {
  event.target.src = defaultImagePath.default;
  event.target.className = "p-4 w-[70px] h-[70px] max-w-[70px] max-h-[70px] min-w-[70px] min-h-[70px] ";
};

const hasValidThumbnail = function (product: ReviewDetail) {
  if (props.action.action === "edit" || props.action.action == "detail") {
    return product.thumbnailPath;
  } else {
    return product.thumbnailPath;
  }
};
//   },
// };

</script>
<style scoped>
.ant-form-item-label {
  width: 200px !important;
  min-width: 200px !important;
  max-width: 200px !important;
}
</style>
