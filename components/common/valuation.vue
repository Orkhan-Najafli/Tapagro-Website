<template>
  <a-modal
    :visible="true"
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
              <a :href="`/mehsullar/${props.product.id}`" target="_blank">
                <picture
                  class="m-0 p-0 mr-6 w-auto overflow-hidden inline-flex relative justify-center items-center"
                >
                  <img
                    v-if="hasValidThumbnail(props.product)"
                    :src="`${baseURL}${props.product.thumbnailPath}`"
                    :alt="props.product.name"
                    class="w-[86px] h-[86px] max-w-[86px] max-h-[86px] min-w-[86px] min-h-[86px] object-cover"
                    @error="setDefaultImage"
                  />
                  <img
                    v-else
                    :src="require(`@/assets/img/no-image.svg`)"
                    style="width: 86px; height: 86px"
                    :alt="product.product.name"
                    class="w-[86px] h-[86px] max-w-[86px] max-h-[86px] min-w-[86px] min-h-[86px] object-cover p-0"
                  />
                </picture>
              </a>
              <div class="flex flex-col items-start justify-start">
                <span class="flex flex-col md:flex-row w-full h-auto mb-3">
                  <span class="text-xl font-medium text-[#6B7280] mr-3"
                    >{{ $t("product") }}:
                  </span>
                  <a
                    :href="`/mehsullar/${product.product.id}`"
                    target="_blank"
                    class="text-[#374151] text-xl font-semibold"
                  >
                    {{ product.product.name }}</a
                  >
                </span>
                <span class="flex flex-col md:flex-row w-full h-auto">
                  <span class="text-xl font-medium text-[#6B7280] mr-3"
                    >{{ $t("store") }}:
                  </span>
                  <a
                    :href="`/magazalar/${product.store.id}`"
                    target="_blank"
                    class="text-[#374151] text-xl font-semibold"
                  >
                    {{ product.store.name }}</a
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
                    v-if="hasValidThumbnail(product)"
                    :src="`${baseURL}${product.thumbnailPath}`"
                    :alt="product.name"
                    class="w-[86px] h-[86px] max-w-[86px] max-h-[86px] min-w-[86px] min-h-[86px] object-cover"
                    @error="setDefaultImage"
                  />
                  <img
                    v-else
                    :src="require(`@/assets/img/no-image.svg`)"
                    style="width: 86px; height: 86px"
                    :alt="product.name"
                    class="w-[86px] h-[86px] max-w-[86px] max-h-[86px] min-w-[86px] min-h-[86px] object-cover p-0"
                  />
                </picture>
              </a>
              <div class="flex flex-col items-start justify-start">
                <span class="flex flex-col md:flex-row w-full h-auto mb-3">
                  <span class="text-xl font-medium text-[#6B7280] mr-3"
                    >{{ $t("product") }}:
                  </span>
                  <a
                    :href="`/mehsullar/${product.id}`"
                    target="_blank"
                    class="text-[#374151] text-xl font-semibold"
                  >
                    {{ product.name }}</a
                  >
                </span>
                <span class="flex flex-col md:flex-row w-full h-auto">
                  <span class="text-xl font-medium text-[#6B7280] mr-3"
                    >{{ $t("store") }}:
                  </span>
                  <a
                    :href="`/magazalar/${product.store.id}`"
                    target="_blank"
                    class="text-[#374151] text-xl font-semibold"
                  >
                    {{ product.store.name }}</a
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
              <a-form-model-item
                class="!m-0"
                :help="errors.first('rating')"
                :validate-status="errors.first('rating') ? 'error' : ''"
              >
                <template slot="label">
                  <label
                    class="ant-form-item-required text-[#374151] text-2xl font-semibold"
                    >{{ $t("rating_title") }}</label
                  >
                </template>
                <div class="flex flex-col whitespace-nowrap w-auto m-0 p-0">
                  <a-rate
                    @change="changeRate(formData.rating)"
                    :allow-clear="false"
                    v-model="formData.rating"
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
                </div>
              </a-form-model-item>
            </div>
            <hr class="w-full min-w-full h-[1px] bg-[#CBD5E1] my-3" />
          </li>
          <li class="flex flex-col w-full min-w-full h-auto mb-3">
            <div class="flex flex-col justify-start items-start w-full h-auto">
              <a-form-model-item
                class="w-full m-0 p-0"
                :help="errors.first('comment')"
                :validate-status="errors.first('comment') ? 'error' : ''"
              >
                <template slot="label">
                  <label
                    for="_phone"
                    class="text-[#374151] text-2xl font-semibold m-0 p-0"
                    >{{ $t("product_review") }}</label
                  >
                </template>
                <div
                  v-if="action.action == 'detail'"
                  class="flex flex-col justify-start items-start w-full h-auto p-0 m-0"
                >
                  <span
                    class="text-[#374151] text-xl font-semibold leading-7"
                    >{{ product.comment }}</span
                  >
                </div>
                <a-textarea
                  v-else
                  @change="calculateTextSymbolCount"
                  class="m-0 p-0"
                  rows="6"
                  v-model="formData.comment"
                  :maxLength="300"
                  name="comment"
                  v-validate="'max:300'"
                  placeholder=""
                >
                </a-textarea>
              </a-form-model-item>
              <div
                v-if="action.action != 'detail'"
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
              <a-form-item>
                <template slot="label">
                  <label
                    for="_phone"
                    class="text-[#374151] w-full text-2xl font-semibold m-0 p-0 pr-40 md:pr-80"
                    >{{ $t("picture_title") }}
                  </label>
                </template>
                <section
                  id="components-upload-demo-pictures-wall"
                  class="code-box"
                >
                  <section class="code-box-demo">
                    <div class="clearfix">
                      <span class="ant-upload-picture-card-wrapper">
                        <div
                          class="ant-upload-list ant-upload-list-picture-card"
                        >
                          <div
                            class="ant-upload-list-picture-card-container"
                            v-for="(item, index) in otherFileList"
                            :key="index"
                          >
                            <span>
                              <div
                                class="ant-upload-list-item ant-upload-list-item-done ant-upload-list-item-list-type-picture-card"
                              >
                                <div class="ant-upload-list-item-info">
                                  <span>
                                    <img
                                      :src="item.data"
                                      alt="image.png"
                                      class="ant-upload-list-item-thumbnail ant-upload-list-item-image"
                                    />
                                  </span>
                                </div>
                                <span class="ant-upload-list-item-actions">
                                  <i
                                    v-if="action.action != 'detail'"
                                    aria-label="icon: delete"
                                    tabindex="-1"
                                    class="anticon anticon-delete"
                                    :title="$t('delete_the_image')"
                                    @click="removeOtherImage(index)"
                                  >
                                    <remove_image_icon />
                                  </i>
                                  <span
                                    class="cursor-pointer"
                                    @click="handlePreview(item.data)"
                                  >
                                    <a-icon
                                      style="color: white"
                                      type="eye"
                                      class="text-lg"
                                    />
                                  </span>
                                </span>
                                <a-modal
                                  :visible="previewVisible"
                                  :footer="null"
                                  @cancel="handleCancelUpload"
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
                                    :src="previewImage"
                                  />
                                </a-modal>
                              </div>
                            </span>
                          </div>
                        </div>
                        <div v-if="action.action != 'detail'">
                          <a-upload
                            accept="image/png, image/gif, image/jpeg"
                            v-if="otherFileList.length < 3"
                            :showUploadList="false"
                            :before-upload="beforeUploadOther"
                          >
                            <div
                              class="ant-upload ant-upload-select ant-upload-select-picture-card"
                              style="background-color: #fafafa"
                            >
                              <span
                                role="button"
                                tabindex="0"
                                class="ant-upload"
                              >
                                <input
                                  type="file"
                                  accept=""
                                  style="display: none"
                                />
                                <div>
                                  <i
                                    aria-label="icon: plus"
                                    class="anticon anticon-plus mb-3"
                                  >
                                    <add_image_icon />
                                  </i>
                                  <div class="ant-upload-text text-[#00000073]">
                                    {{ $t("download") }}
                                  </div>
                                </div>
                              </span>
                            </div>
                          </a-upload>
                        </div>
                      </span>
                    </div>
                  </section>
                </section>
              </a-form-item>
            </div>
            <hr class="w-full min-w-full h-[1px] bg-[#CBD5E1] mb-3" />
          </li>
          <li
            v-if="action.action == 'detail' || action.action == 'edit'"
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
                  >{{ product.status.status }}</span
                >
              </li>
              <li
                v-if="product.rejection.reason"
                class="flex flex-row justify-start items-center m-0 p-0 mb-3"
              >
                <span
                  class="text-[#6B7280] font-medium text-base leading-5 mr-3"
                  >{{ $t("reason_for_refusal") }}:</span
                >
                <span
                  class="text-[#374151] font-semibold text-base leading-5"
                  >{{ product.rejection.reason }}</span
                >
              </li>
              <li
                v-if="product.status.label == 'REJECTED'"
                class="flex flex-row justify-start items-center m-0 p-0"
              >
                <span
                  class="text-[#6B7280] font-medium text-base leading-5 mr-3"
                  >{{ $t("date_of_rejection") }}:</span
                >
                <span
                  class="text-[#374151] font-semibold text-base leading-5"
                  >{{
                    product.rejection && dateModel(product.rejection.rejectedAt)
                  }}</span
                >
              </li>
              <li
                v-if="product.status.label == 'PUBLISHED'"
                class="flex flex-row justify-start items-center m-0 p-0"
              >
                <span
                  class="text-[#6B7280] font-medium text-base leading-5 mr-3"
                  >{{ $t("publication_date") }}:</span
                >
                <span
                  class="text-[#374151] font-semibold text-base leading-5"
                  >{{
                    product.publishedAt && dateModel(product.publishedAt)
                  }}</span
                >
              </li>
              <li
                v-if="product.status.label == 'CREATED'"
                class="flex flex-row justify-start items-center m-0 p-0"
              >
                <span
                  class="text-[#6B7280] font-medium text-base leading-5 mr-3"
                  >{{ $t("date_of_shipment") }}:</span
                >
                <span
                  class="text-[#374151] font-semibold text-base leading-5"
                  >{{ product.createdAt && dateModel(product.createdAt) }}</span
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
          'justify-end': action.action == 'detail',
          'justify-between': action.action != 'detail',
        }"
        class="flex"
      >
        <button
          class="border border-[#E5E7EB] text-[#6B7280] px-3 py-1 rounded-md hover:text-[#16A34A] hover:border-[#16A34A]"
          @click="handleCancel"
        >
          {{ $t("close_modal") }}
        </button>
        <div v-if="action.action != 'detail'">
          <button
            v-if="action.action == 'edit'"
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
          </button>
        </div>
      </div>
    </template>
  </a-modal>
</template>

<script setup lang="ts">
import moment from "moment";
import type { Product } from "~/utils/types/product";
const baseURL = useRuntimeConfig().public.baseURL;
function getBase64(img: any, callback: any) {
  const reader = new FileReader();
  reader.addEventListener("load", () => callback(reader.result));
  reader.readAsDataURL(img);
}
const props = defineProps({
  product: {
    type: Object as PropType<Product>,
    default: {},
  },
  action: {
    type: Object as PropType<{ action: string }>,
    default: { action: "" },
  },
});
const emit = defineEmits(["handleOk", "close"]);
const previewVisible = ref(false);
const previewImage = ref("");
const otherFileList = reactive([]);
const photos = reactive([]);
const hasChange = ref(true);
const allowFileTypes = reactive(["image/jpeg", "image/png", "image/jpg"]);
const allowFileSize = ref(5242880); //5 mb (binary)
const rateValueText = ref("");
const descriptionLength = ref(300);
const dateFormat = ref("DD/MM/YYYY HH:mm:ss");
// export default {

//   data() {
//     return {
//       baseURL: urls.getParam("API_BASE_URL"),
//       previewVisible: false,
//       previewImage: "",
//       formData: {
//         rating: 0,
//         comment: null,
//       },
//       otherFileList: [],
//       photos: [],
//       allowFileTypes: ["image/jpeg", "image/png", "image/jpg"],
//       desc: this.$t("desc"),
//       allowFileSize: 5242880, //5 mb (binary)
//       rateValueText: "",
//       descriptionLength: 300,
//       dateFormat: "DD/MM/YYYY HH:mm:ss",
//       hasChange: true,
//     };
//   },

//   mounted() {
//     if (this.action.action == "detail") {
//       this.formData.rating = !Number.isInteger(Number(this.product.rating))
//         ? Number(`${Math.floor(this.product.rating)}.${5}`)
//         : this.product.rating;
//     } else if (this.action.action == "edit") {
//       this.formData.rating = this.product.rating;
//     }
//     if (this.action.action == "detail" || this.action.action == "edit") {
//       this.formData.comment = this.product.comment;
//       this.changeRate(this.formData.rating);
//       this.otherFileList = [...this.product.photos];
//       // this.photos = [...this.product.photos];
//       this.photos = this.product.photos.map((photo) => {
//         return {
//           file: null,
//           id: photo.id,
//         };
//       });
//       this.descriptionLength -= this.formData.comment
//         ? this.formData.comment.length
//         : 0;
//     }
//   },
//   methods: {
//     dateModel(value) {
//       let dat = new Date(value).toString();
//       return moment(dat).format("DD/MM/yyyy HH:mm:ss");
//     },
//     beforeUploadOther(file) {
//       if (file && this.allowFileTypes.includes(file.type)) {
//         if (file.size <= this.allowFileSize) {
//           const obj = {
//             file,
//             uid: Date.now(),
//             name: file && file.name,
//             data: "",
//             id: null,
//           };
//           getBase64(file, (imageUrl) => {
//             obj.data = imageUrl;
//             this.otherFileList.push(obj);
//             if (this.action.action == "edit") {
//               this.photos.push({
//                 file: { data: imageUrl, name: file.name },
//                 id: null,
//               });
//             } else {
//               this.photos.push({ data: imageUrl, name: file.name });
//             }
//             this.hasChange = false;
//           });
//         } else {
//           this.$message.error(this.$t("image_size"));
//         }
//       } else {
//         this.$message.error(this.$t("file_type"));
//       }
//       return false;
//     },
const removeOtherImage = function (index: number) {
  otherFileList.splice(index, 1);
  photos.splice(index, 1);
  hasChange.value = false;
};
//     calculateTextSymbolCount(val) {
//       this.hasChange = false;
//       this.descriptionLength = 300;
//       this.descriptionLength -= val.srcElement.textLength;
//     },
//     changeRate(val) {
//       if (val != this.product.rating) {
//         this.hasChange = false;
//       }
//       if (val <= 1) {
//         this.rateValueText = this.$t("descObj").very_bad;
//       } else if (1 < val && val <= 2) {
//         this.rateValueText = this.$t("descObj").bad;
//       } else if (2 < val && val <= 3) {
//         this.rateValueText = this.$t("descObj").average;
//       } else if (3 < val && val <= 4) {
//         this.rateValueText = this.$t("descObj").good;
//       } else if (4 < val && val <= 5) {
//         this.rateValueText = this.$t("descObj").very_good;
//       } else if (val == undefined) {
//         this.rateValueText = "";
//       }
//     },

//     resolveStatusStyle(record) {
//       if (record.status?.label == "CREATED") {
//         return "color:#1890FF";
//       } else if (record.status?.label == "PUBLISHED") {
//         return "color:#389E0D";
//       } else if (record.status?.label == "REJECTED") {
//         return "color:#F5222D";
//       } else if (record.status?.label == "DELETED") {
//         return "color:#EB2F96";
//       } else if (record.status?.label == "IN_INSPECTION") {
//         return "color:#FAAD14";
//       }
//     },
//     handleOk() {
//       this.formData.comment =
//         this.formData.comment == "" ? null : this.formData.comment;
//       if (this.action.action == "edit") {
//         // this.formData.comment =
//         //   this.formData.comment == "" ? null : this.formData.comment;
//         let sendFormData = {
//           ...this.formData,
//           photos: this.photos,
//         };
//         this.$store
//           .dispatch("review/editReview", {
//             sendFormData: sendFormData,
//             productId: this.product.id,
//           })
//           .then((res) => {
//             this.$emit("ok", true);
//             this.hasChange = true;
//           })
//           .catch(() => {
//             this.hasChange = false;
//           });
//       } else {
//         this.$store
//           .dispatch("review/addReview", {
//             ...this.formData,
//             productId: this.product.id,
//             photos: this.photos,
//           })
//           .then((res) => {
//             this.$emit("ok", true);
//           });
//       }
//     },
const handlePreview = function (file: any) {
  previewImage.value = file;
  previewVisible.value = true;
};
const handleCancelUpload = function () {
  previewVisible.value = false;
};
const handleCancel = function () {
  emit("close", false);
};
const setDefaultImage = async function (event: Event | any) {
  event.target.src = await require(`@/assets/img/no-image.svg`);
  event.target.className = "p-16";
};
const hasValidThumbnail = function (product: Product) {
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
