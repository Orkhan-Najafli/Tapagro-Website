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
                    :src="`${baseURL}/${props.product.thumbnailPath}`"
                    :alt="props.product.name"
                    class="w-[86px] h-[86px] max-w-[86px] max-h-[86px] min-w-[86px] min-h-[86px] object-cover"
                    @error="setDefaultImage"
                  />
                  <img
                    v-else
                    :src="require(`@/assets/img/no-image.svg`)"
                    style="width: 86px; height: 86px"
                    :alt="props.product.name"
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
                    :href="`/mehsullar/${props.product.id}`"
                    target="_blank"
                    class="text-[#374151] text-xl font-semibold"
                  >
                    {{ props.product.name }}</a
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
                    :src="`${baseURL}/${props.product.thumbnailPath}`"
                    :alt="props.product.name"
                    class="w-[86px] h-[86px] max-w-[86px] max-h-[86px] min-w-[86px] min-h-[86px] object-cover"
                    @error="setDefaultImage"
                  />
                  <img
                    v-else
                    :src="require(`@/assets/img/no-image.svg`)"
                    style="width: 86px; height: 86px"
                    :alt="props.product.name"
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
                    :href="`/mehsullar/${props.product.id}`"
                    target="_blank"
                    class="text-[#374151] text-xl font-semibold"
                  >
                    {{ props.product.name }}</a
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
          <button
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
          </button>
        </div>
      </div>
    </template>
  </a-modal>
</template>

<script setup lang="ts">
import moment from "moment";
import type { Product, ProductDetail } from "~/utils/types/product";
const baseURL = useRuntimeConfig().public.baseURL;
function getBase64(img: any, callback: any) {
  const reader = new FileReader();
  reader.addEventListener("load", () => callback(reader.result));
  reader.readAsDataURL(img);
}
const { t } = useI18n();
const props = defineProps({
  product: {
    type: Object as PropType<ProductDetail>,
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
const otherFileList: any = reactive([]);
const photos = reactive<any>([]);
const hasChange = ref(true);
const allowFileTypes = reactive(["image/jpeg", "image/png", "image/jpg"]);
const allowFileSize = ref(5242880); //5 mb (binary)
const rateValueText = ref("");
const descriptionLength = ref(300);
const dateFormat = ref("DD/MM/YYYY HH:mm:ss");
const formData = reactive({
  rating: 0,
  comment: null,
});
const desc = t("desc");

//   mounted() {
// if (props.action.action == "detail") {
//   formData.rating = !Number.isInteger(Number(props.product.rating))
//     ? Number(`${Math.floor(props.product.rating)}.${5}`)
//     : props.product.rating;
// } else if (this.action.action == "edit") {
//   formData.rating = props.product.rating;
// }
// if (props.action.action == "detail" || props.action.action == "edit") {
//   formData.comment = props.product.comment;
//   this.changeRate(this.formData.rating);
//   this.otherFileList = [...this.product.photos];
//   // this.photos = [...this.product.photos];
//   this.photos = this.product.photos.map((photo) => {
//     return {
//       file: null,
//       id: photo.id,
//     };
//   });
//   this.descriptionLength -= this.formData.comment
//     ? this.formData.comment.length
//     : 0;
// }
// },
//   methods: {
const dateModel = function (value: any) {
  let dat = new Date(value).toString();
  return moment(dat).format("DD/MM/yyyy HH:mm:ss");
};
const beforeUploadOther = function (file: any) {
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
        otherFileList.push(obj);
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
    } else {
      // this.$message.error(this.$t("image_size"));
    }
  } else {
    // this.$message.error(this.$t("file_type"));
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
  if (val != props.product.rating) {
    hasChange.value = false;
  }
  if (val <= 1) {
    rateValueText.value = t("descObj", { returnObjects: true }).very_bad;
  } else if (1 < val && val <= 2) {
    rateValueText.value = t("descObj").bad;
  } else if (2 < val && val <= 3) {
    rateValueText.value = t("descObj").average;
  } else if (3 < val && val <= 4) {
    rateValueText.value = t("descObj").good;
  } else if (4 < val && val <= 5) {
    rateValueText.value = t("descObj").very_good;
  } else if (val == undefined) {
    rateValueText.value = "";
  }
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
const hasValidThumbnail = function (product: ProductDetail) {
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
