<template>
  <main class=" block overflow-hidden px-6 h-full min-h-full max-h-full">
    <ClientOnly>
      <section class="max-w-[1224px] container mx-auto px-6 xl:px-0">
        <div class="mt-6 mb-5 md:mb-9">
          <nuxt-link
              tag="div"
              class="text-gray-600 flex flex-row justify-start items-center md:hidden font-medium text-sm cursor-pointer"
              to="/public"
          >
            <ArrowLeftIcon/>
            <span class="ml-3 text-gray-600 font-medium text-sm">
            {{ t("main_page") }}</span
            >
          </nuxt-link>
          <a-breadcrumb class="hidden md:block" separator=">">
            <a-breadcrumb-item class="text-sm leading-5 font-normal" href="">
              <nuxt-link to="/public">
              <span class="text-gray-600 font-medium text-sm">
                {{ t("main_page") }}</span
              ></nuxt-link
              >
            </a-breadcrumb-item>
            <a-breadcrumb-item class="text-sm leading-5 font-normal">
            <span class="text-gray-800 font-semibold text-sm">
              {{ t("ad_placement") }}</span
            >
            </a-breadcrumb-item>
          </a-breadcrumb>
        </div>
      </section>
      <section class="max-w-[1224px] container mx-auto px-6 xl:px-0">
        <div class="flex flex-row w-full mb-6 md:mb-10">
          <div class="w-full relative">
            <p class="text-3xl font-bold text-gray-700">
              {{ t("ad_placement_rules") }}
            </p>
            <ul class="space-y-2">
              <li
                  v-for="item in [t('advertisement_texts.item0'),t('advertisement_texts.item1'),t('advertisement_texts.item2'),t('advertisement_texts.item3')]"
                  key=""
                  class="flex flex-row justify-start items-center mb-3"
              >
                <div
                    class="flex justify-center items-center w-1.5 h-auto text-2xl text-gray-400 mr-6"
                >
                  &#8226;
                </div>
                <span class="text-gray-500 text-xl font-medium">
                              {{ item }}
                            </span>
              </li>
            </ul>
            <p class="text-[#16A34A] mb-11 text-base">
              {{ t("see_the_full_rules_for_posting_an_ad") }}
            </p>
            <div
                style="
              box-shadow: 0px 10px 15px -3px rgba(0, 0, 0, 0.1),
                0px 4px 6px -4px rgba(0, 0, 0, 0.1);
              border-radius: 16px !important;
            "
                class="w-full border border-t-white border-gray-100 shadow-lg px-11 py-6 mb-6"
            >
              <a-form class="block">
                <div class="flex flex-col md:flex-row">
                  <div class="md:mr-6 w-full leading-none">
                    <a-form-item v-bind="validateInfos.subcategoryId" class="w-full leading-none">
                      <template #label>
                        <label>{{
                            t("product")
                          }}</label>
                      </template>
                      <a-tree-select
                          class="w-full leading-none"
                          v-model="formData.typeId"
                          :showSearch="true"
                          :dropdown-style="{ maxHeight: '400px', overflow: 'auto' }"
                          :placeholder="t('select_the_product')"
                          allow-clear
                          name="subcategoryId"
                          :treeDefaultExpandAll="false"
                          @select="selectSubCategory"
                          @change="selectSubCategoryChange"
                          @click="clickCategory"
                      >
                        <a-tree-select-node
                            :selectable="false"
                            v-for="(subcategory, index) in subcategories"
                            :key="index"
                            :value="subcategory.id"
                            :title="subcategory.name"
                        >
                          <a-tree-select-node
                              v-for="(subcategoryType, typeIndex) in subcategories[
                            index
                          ].types"
                              :key="`${index}-${typeIndex}`"
                              :value="subcategoryType.id"
                              :title="subcategoryType.name"
                          >
                          </a-tree-select-node>
                        </a-tree-select-node>
                      </a-tree-select>
                    </a-form-item>

                  </div>
                  <div class="w-full mr-6">
                    <a-form-item v-bind="validateInfos.advertisementName" class="w-full leading-none">
                      <template #label>
                        <label for="_phone">{{
                            t("ad_name")
                          }}</label>
                      </template>
                      <a-tooltip
                          trigger="click"
                          placement="top"
                          :title="
                        t(
                          'price_and_contact_information_should_not_be_listed_in_the_ad_title_space'
                        )
                      "
                          arrow-point-at-center
                      >
                        <a-input
                            class="w-full mt-1"
                            :maxLength="64"
                            v-model="formData.name"
                            id="_phone"
                            :placeholder="t('insert')"
                            allow-clear
                            name="advertisementName"
                        >
                        </a-input>
                      </a-tooltip>
                    </a-form-item>
                  </div>
                  <div class="w-full">
                    <a-form-item v-bind="validateInfos.price" class="w-full leading-none">
                      <template #label>
                        <label>{{
                            t("price")
                          }}</label>
                      </template>
                      <a-input
                          class="w-full"
                          suffix="AZN"
                          id="_price"
                          allow-clear
                          :maxLength="255"
                          v-model="formData.price"
                          placeholder="0.00"
                          name="price"
                      />
                    </a-form-item>
                  </div>
                </div>
                <div class="flex flex-col md:flex-row">
                  <div class="w-full mr-6">
                    <a-form-item v-bind="validateInfos.measurementValue" class="w-full leading-none">
                      <template #label>
                        <label for="_measurementValue">{{
                            t("unit_quantity_and_size")
                          }}</label>
                      </template>
                      <a-tooltip
                          trigger="click"
                          placement="top"
                          allow-clear
                          :title="t('insert_quantity')"
                          arrow-point-at-center
                      >
                        <a-input
                            class="w-full mt-1"
                            id="_measurementValue"
                            allow-clear
                            v-model="formData.measurementValue"
                            :placeholder="t('insert')"
                            name="measurementValue"
                        >
                          <a-select
                              :disabled="measurementUnits.length == 0"
                              slot="addonAfter"
                              default-value="kq"
                              allow-clear
                              placeholder="kq"
                              style="width: 90px"
                              v-model="formData.measurementUnitId"
                              @change="measurementUnitIdChange"
                          >
                            <a-select-option
                                v-for="(measurementUnit, index) in measurementUnits"
                                :key="index"
                                :value="measurementUnit.id"
                            >
                              {{ measurementUnit.name }}
                            </a-select-option>
                          </a-select>
                        </a-input>
                      </a-tooltip>
                    </a-form-item>
                    <span v-if="visibleMeasurementUnit" class="text-red-500 text-sm"
                    >{{ t("you_must_select_a_unit_of_measure") }}.</span
                    >
                  </div>
                  <div class="w-full md:mr-6">
                    <a-form-item v-bind="validateInfos.cityId" class="w-full leading-none">
                      <template #label>
                        <label for="_cityId">{{
                            t("region_title")
                          }}</label>
                      </template>
                      <a-select
                          name="cityId"
                          allow-clear
                          class="w-full"
                          id="_cityId"
                          show-search
                          v-model="formData.cityId"
                          :placeholder="t('region')"
                          option-filter-prop="children"
                          :filter-option="filterOption"
                      >
                        <a-select-option
                            v-for="(cityName, index) in cities"
                            :key="index"
                            :value="cityName.id"
                        >
                          {{ cityName.name }}
                        </a-select-option>
                      </a-select>
                    </a-form-item>
                  </div>
                  <div class="w-full">
                    <a-form-item v-bind="validateInfos.phoneNumber" class="w-full leading-none">
                      <template #label>
                        <label for="_phone">{{
                            t("phone_number")
                          }}</label>
                      </template>
                      <a-input
                          addon-before="+994"
                          class="w-full mt-1"
                          allow-clear
                          id="_phone"
                          name="phoneNumber"

                          v-model="formData.phoneNumber"
                          placeholder="55 111 11 11"
                      >
                      </a-input>
                    </a-form-item>
                  </div>
                </div>
                <div class="flex w-full h-auto">
                  <a-form-item v-bind="validateInfos.description" class="w-full leading-none">
                    <template #label>
                      <label for="_phone">{{
                          t("general_description")
                        }}</label>
                    </template>
                    <a-tooltip
                        trigger="focus"
                        placement="top"
                        :title="t('product_more_description')"
                        arrow-point-at-center
                    >
                      <a-textarea
                          v-model="formData.description"
                          :maxLength="1024"
                          :rows="4"
                          name="description"
                          :placeholder="t('product_description_title')"
                      >
                      </a-textarea>
                    </a-tooltip>
                  </a-form-item>

                </div>
                <div class="flex flex-col md:flex-row">
                  <div class="w-full">
                    <!--                    <a-form-item class="">-->
                    <!--                      <label-->
                    <!--                          class="ant-form-item-required"-->
                    <!--                          style="color: rgba(0, 0, 0, 0.85)"-->
                    <!--                      >{{ t("catalog_photo") }}</label-->
                    <!--                      >-->

                    <!--                      <section-->
                    <!--                          id="components-upload-demo-pictures-wall"-->
                    <!--                          class="code-box"-->
                    <!--                      >-->
                    <!--                        <section class="code-box-demo">-->
                    <!--                          <div class="clearfix">-->
                    <!--                          <span class="ant-upload-picture-card-wrapper">-->
                    <!--                            <div-->
                    <!--                                class="ant-upload-list ant-upload-list-picture-card"-->
                    <!--                            >-->
                    <!--                              <div-->
                    <!--                                  class="ant-upload-list-picture-card-container"-->
                    <!--                                  style="height: 264px; width: 264px"-->
                    <!--                                  v-for="(item, index) in catalogFileList"-->
                    <!--                                  :key="item.uid"-->
                    <!--                              >-->
                    <!--                                <span>-->
                    <!--                                  <div-->
                    <!--                                      class="ant-upload-list-item ant-upload-list-item-done ant-upload-list-item-list-type-picture-card"-->
                    <!--                                      style="-->
                    <!--                                      height: 264px;-->
                    <!--                                      width: 264px;-->
                    <!--                                      padding: 0 !important;-->
                    <!--                                    "-->
                    <!--                                  >-->
                    <!--                                    <div class="ant-upload-list-item-info">-->
                    <!--                                      <span>-->
                    <!--                                        <img-->
                    <!--                                            :src="item.data"-->
                    <!--                                            alt="image.png"-->
                    <!--                                            class="ant-upload-list-item-thumbnail ant-upload-list-item-image"-->
                    <!--                                        />-->
                    <!--                                      </span>-->
                    <!--                                    </div>-->
                    <!--                                    <span class="ant-upload-list-item-actions">-->
                    <!--                                      <i-->
                    <!--                                          aria-label="icon: delete"-->
                    <!--                                          tabindex="-1"-->
                    <!--                                          class="anticon anticon-delete"-->
                    <!--                                          :title="t('delete_the_image')"-->
                    <!--                                          @click="removeCatalogImage(index)"-->
                    <!--                                      >-->
                    <!--                                        <svg-->
                    <!--                                            viewBox="64 64 896 896"-->
                    <!--                                            data-icon="delete"-->
                    <!--                                            width="1em"-->
                    <!--                                            height="1em"-->
                    <!--                                            fill="currentColor"-->
                    <!--                                            aria-hidden="true"-->
                    <!--                                            focusable="false"-->
                    <!--                                            class=""-->
                    <!--                                        >-->
                    <!--                                          <path-->
                    <!--                                              d="M360 184h-8c4.4 0 8-3.6 8-8v8h304v-8c0 4.4 3.6 8 8 8h-8v72h72v-80c0-35.3-28.7-64-64-64H352c-35.3 0-64 28.7-64 64v80h72v-72zm504 72H160c-17.7 0-32 14.3-32 32v32c0 4.4 3.6 8 8 8h60.4l24.7 523c1.6 34.1 29.8 61 63.9 61h454c34.2 0 62.3-26.8 63.9-61l24.7-523H888c4.4 0 8-3.6 8-8v-32c0-17.7-14.3-32-32-32zM731.3 840H292.7l-24.2-512h487l-24.2 512z"-->
                    <!--                                          ></path>-->
                    <!--                                        </svg>-->
                    <!--                                      </i>-->
                    <!--                                    </span>-->
                    <!--                                    &lt;!&ndash;&ndash;&gt;-->
                    <!--                                  </div>-->
                    <!--                                </span>-->
                    <!--                              </div>-->
                    <!--                            </div>-->
                    <!--                            <a-upload-->
                    <!--                                accept="image/png, image/gif, image/jpeg"-->
                    <!--                                v-if="catalogFileList.length < 1"-->
                    <!--                                :showUploadList="false"-->
                    <!--                                :before-upload="beforeUploadCatalog"-->
                    <!--                            >-->
                    <!--                              <div-->
                    <!--                                  class="ant-upload ant-upload-select ant-upload-select-picture-card"-->
                    <!--                                  style="-->
                    <!--                                  height: 264px;-->
                    <!--                                  width: 264px;-->
                    <!--                                  background-color: #fafafa;-->
                    <!--                                "-->
                    <!--                              >-->
                    <!--                                <span-->
                    <!--                                    role="button"-->
                    <!--                                    tabindex="0"-->
                    <!--                                    class="ant-upload"-->
                    <!--                                >-->
                    <!--                                  <input-->
                    <!--                                      type="file"-->
                    <!--                                      accept=""-->
                    <!--                                      style="display: none"-->
                    <!--                                  />-->
                    <!--                                  <div>-->
                    <!--                                    <i-->
                    <!--                                        aria-label="icon: plus"-->
                    <!--                                        class="anticon anticon-plus mb-3"-->
                    <!--                                    >-->
                    <!--                                      <svg-->
                    <!--                                          viewBox="64 64 896 896"-->
                    <!--                                          data-icon="plus"-->
                    <!--                                          width="26"-->
                    <!--                                          height="26"-->
                    <!--                                          fill="currentColor"-->
                    <!--                                          aria-hidden="true"-->
                    <!--                                          focusable="false"-->
                    <!--                                          class=""-->
                    <!--                                      >-->
                    <!--                                        <path-->
                    <!--                                            d="M482 152h60q8 0 8 8v704q0 8-8 8h-60q-8 0-8-8V160q0-8 8-8z"-->
                    <!--                                        ></path>-->
                    <!--                                        <path-->
                    <!--                                            d="M176 474h672q8 0 8 8v60q0 8-8 8H176q-8 0-8-8v-60q0-8 8-8z"-->
                    <!--                                        ></path>-->
                    <!--                                      </svg>-->
                    <!--                                    </i>-->
                    <!--                                    <div-->
                    <!--                                        class="ant-upload-text text-[#00000073] text-xl font-medium"-->
                    <!--                                    >-->
                    <!--                                      {{ t("download") }}-->
                    <!--                                    </div>-->
                    <!--                                  </div>-->
                    <!--                                </span>-->
                    <!--                              </div>-->
                    <!--                            </a-upload>-->
                    <!--                          </span>-->
                    <!--                          </div>-->
                    <!--                        </section>-->
                    <!--                      </section>-->
                    <!--                    </a-form-item>-->
                    <a-form-item v-bind="validateInfos.description" class="w-full leading-none">
                      <template #label>
                        <label for="_catalog_photo">{{
                            t("catalog_photo")
                          }}</label>
                      </template>
                      <div class="block w-full h-auto my-3">
                        <div v-for="(photo,index) in catalogFileList"
                             class=" float-left relative group w-[264px] h-[264px] rounded-lg overflow-hidden border shadow-md mr-2 p-1">
                          <img
                              :src="`${photo.data}`"
                              :alt="photo.name"
                              class="w-full h-full object-cover"
                          />
                          <div
                              class="absolute inset-0 bg-gray-900 bg-opacity-50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                          >
                            <!--                            <button-->
                            <!--                                @click="handlePreview(photo.data,photo.name)"-->
                            <!--                                class="hover:text-white text-gray-300 p-2 rounded-full">-->
                            <!--                              <eye_icon/>-->
                            <!--                            </button>-->
                            <button
                                @click="removeOtherImage(index)"
                                class="text-gray-300 hover:text-white p-2 rounded-full ">
                              <remove_image_icon/>
                            </button>
                          </div>
                        </div>
                        <div class="clearfix float-left">
                          <a-upload
                              style="height: 264px; width: 264px"
                              v-if="showUploadButton"
                              accept="image/png, image/gif, image/jpeg"
                              list-type="picture-card"
                              name="avatar"
                              class="avatar-uploader"
                              :show-upload-list="false"
                              :before-upload="beforeUpload"
                              @change="handleChangeFile"
                              :showDownloadIcon="false"
                          >
                            <div>
                              <plus-outlined/>
                              <div style="margin-top: 8px">{{ t("download") }}</div>
                            </div>
                          </a-upload>
                        </div>
                        <a-modal :open="previewVisible" :title="previewTitle" :footer="null"
                                 @cancel="handleCancelPreview">
                          <img alt="example" style="width: 100%" :src="previewImage"/>
                        </a-modal>
                      </div>
                    </a-form-item>
                    <div>
                      <p class="leading-7 text-sm">
                        {{ t("catalog_photo_message_1") }}
                        <br/>
                        {{ t("catalog_photo_message_2") }}
                        <span class="bg-gray-100 p-1">1:1</span> ({{
                          t("square")
                        }})
                      </p>
                    </div>
                  </div>
                  <!--                  <div class="w-full">-->
                  <!--                    <a-form-item :label="t('other_images_maximum_number')">-->
                  <!--                      <section-->
                  <!--                          id="components-upload-demo-pictures-wall"-->
                  <!--                          class="code-box"-->
                  <!--                      >-->
                  <!--                        <section class="code-box-demo">-->
                  <!--                          <div class="clearfix">-->
                  <!--                          <span class="ant-upload-picture-card-wrapper">-->
                  <!--                            <div-->
                  <!--                                class="ant-upload-list ant-upload-list-picture-card"-->
                  <!--                            >-->
                  <!--                              <div-->
                  <!--                                  class="ant-upload-list-picture-card-container"-->
                  <!--                                  v-for="(item, index) in otherFileList"-->
                  <!--                                  :key="item.uid"-->
                  <!--                              >-->
                  <!--                                <span>-->
                  <!--                                  <div-->
                  <!--                                      class="ant-upload-list-item ant-upload-list-item-done ant-upload-list-item-list-type-picture-card"-->
                  <!--                                  >-->
                  <!--                                    <div class="ant-upload-list-item-info">-->
                  <!--                                      <span>-->
                  <!--                                        <img-->
                  <!--                                            :src="item.data"-->
                  <!--                                            alt="image.png"-->
                  <!--                                            class="ant-upload-list-item-thumbnail ant-upload-list-item-image"-->
                  <!--                                        />-->
                  <!--                                      </span>-->
                  <!--                                    </div>-->
                  <!--                                    <span class="ant-upload-list-item-actions">-->
                  <!--                                      <i-->
                  <!--                                          aria-label="icon: delete"-->
                  <!--                                          tabindex="-1"-->
                  <!--                                          class="anticon anticon-delete"-->
                  <!--                                          title="şəkli sil"-->
                  <!--                                          @click="removeOtherImage(index)"-->
                  <!--                                      >-->
                  <!--                                    <RemoveImageIcon/>-->
                  <!--                                      </i>-->
                  <!--                                    </span>-->
                  <!--                                    &lt;!&ndash;&ndash;&gt;-->
                  <!--                                  </div>-->
                  <!--                                </span>-->
                  <!--                              </div>-->
                  <!--                            </div>-->
                  <!--                            <a-upload-->
                  <!--                                accept="image/png, image/gif, image/jpeg"-->
                  <!--                                v-if="otherFileList.length < 5"-->
                  <!--                                :showUploadList="false"-->
                  <!--                                :before-upload="beforeUploadOther"-->
                  <!--                            >-->
                  <!--                              <div-->
                  <!--                                  class="ant-upload ant-upload-select ant-upload-select-picture-card"-->
                  <!--                                  style="background-color: #fafafa"-->
                  <!--                              >-->
                  <!--                                <span-->
                  <!--                                    role="button"-->
                  <!--                                    tabindex="0"-->
                  <!--                                    class="ant-upload"-->
                  <!--                                >-->
                  <!--                                  <input-->
                  <!--                                      type="file"-->
                  <!--                                      accept=""-->
                  <!--                                      style="display: none"-->
                  <!--                                  />-->
                  <!--                                  <div>-->
                  <!--                                    <i-->
                  <!--                                        aria-label="icon: plus"-->
                  <!--                                        class="anticon anticon-plus mb-3"-->
                  <!--                                    >-->
                  <!--                                     <AddImageIcon/>-->
                  <!--                                    </i>-->
                  <!--                                    <div-->
                  <!--                                        class="ant-upload-text text-[#00000073]"-->
                  <!--                                    >-->
                  <!--                                      {{ t("download") }}-->
                  <!--                                    </div>-->
                  <!--                                  </div>-->
                  <!--                                </span>-->
                  <!--                              </div>-->
                  <!--                            </a-upload>-->
                  <!--                          </span>-->
                  <!--                          </div>-->
                  <!--                        </section>-->
                  <!--                      </section>-->
                  <!--                    </a-form-item>-->
                  <!--                  </div>-->
                </div>
                <div class="w-full mb-6 md:w-1/2 order-1 md:order-2">
                  <a-form-item class="w-full leading-none">
                    <!--                    <template #label>-->
                    <!--                      <label for="">{{-->
                    <!--                          t("i_am_delivering")-->
                    <!--                        }}</label>-->
                    <!--                    </template>-->
                    <span class="mr-4"> {{ t("i_am_delivering") }} </span>

                    <a-switch
                        :checked-children="t('yes_switch')"
                        :un-checked-children="t('no_switch')"
                        :default-checked="formData.isDelivered"
                        v-model:checked="formData.isDelivered"
                    />
                  </a-form-item>

                </div>
                <!--              <div-->
                <!--                  class="inline-flex flex-col justify-start items-start"-->
                <!--                  :class="{-->
                <!--                  'border-2 border-[#f5222d]': checkRecaptcha == 'error',-->
                <!--                  'border-0 border-transparent': checkRecaptcha == 'success',-->
                <!--                }"-->
                <!--              >-->
                <!--                <recaptcha @error="onError" @success="onSuccess" />-->
                <!--              </div>-->
                <div class="w-full mb-4 mt-11 text-center">
                  <p v-html="adUseRules"></p>
                </div>
              </a-form>
              <button
                  :disabled="waitResponse"
                  @click="handleOk"
                  class="flex justify-center items-center w-full text-base font-semibold text-white bg-green-600 hover:bg-green-700 px-20 py-2 rounded"
              >
                {{ t("create_an_ad") }}
              </button>
            </div>
          </div>
        </div>
      </section>
    </ClientOnly>
  </main>
</template>
<script setup lang="ts">
import useGoogleRecaptcha, {
  RecaptchaAction,
} from "~/composables/useGoogleRecaptcha";

const {locale, t} = useI18n({useScope: "global"});
import {Form} from "ant-design-vue";

const {$recaptcha} = useNuxtApp();
const useForm = Form.useForm;
const subcategories = reactive([])
let measurementUnits = reactive([])
const cities = reactive([])
let catalogFileList = reactive([])
const visibleMeasurementUnit = ref(false)
const formData = reactive({
  cityId: ref(),
  description: ref(),
  isDelivered: ref(false),
  measurementUnitId: ref(),
  measurementValue: ref(),
  name: ref(),
  phoneNumber: ref(),
  price: ref(),
  productPhotos: [
    {
      data: ref(),
      id: ref(),
    },
  ],
  subcategoryId: ref(),
  thumbnail: ref(),
  thumbnailName: ref(),
  typeId: ref(),
})
const allowFileTypes = ref(["image/jpeg", "image/png", "image/jpg"])
const allowFileSize = ref(5242880)
const rulesRef = reactive({
  subcategoryId: [
    {
      required: true,
      message: t("required"),
    },
  ],
  price: [
    {
      required: true,
      message: t("required"),
    },
    {
      pattern: /^[0-9]+(\.[0-9]{1,6})?$/,
      message: t("decimal"),
      trigger: "change",
    },
  ],
  measurementValue: [
    {
      required: true,
      message: t("required"),
    },
    {
      pattern: /^[0-9]+(\.[0-9]{1,6})?$/,
      message: t("decimal"),
      trigger: "change",
    },
  ],
  cityId: [
    {
      required: true,
      message: t("required"),
    },
  ],
  phoneNumber: [
    {
      required: true,
      message: t("required"), // Tərcümə edilmiş mesaj
    },
    {
      pattern: /^(55|51|99|77|70|12)\d{7}$/,
      message: t("invalid_phone_number"), // "Telefon nömrəsi yanlışdır" tərcümə edilmiş mesaj
      trigger: "blur",
    },
  ],
  description: [
    {
      required: true,
      message: t("required"),
    },
    {
      min: 3,
      message: t("min", {min: 9}),
      trigger: "change",
    },
    {
      max: 1024,
      message: t("max", {max: 9}),
      trigger: "change",
    },
  ],
  // companyName: [
  //   {
  //     required: true,
  //     message: t("required"),
  //   },
  // ],
  // emailAddress: [
  //   {
  //     required: true,
  //     message: t("required"),
  //   },
  //   {
  //     email: true,
  //     message: "Email olmalidir",
  //   },
  // ],
})
const adUseRules = computed(() => t('ad_use_rules'));
const getBase64 = function (img: any, callback: any) {
  const reader = new FileReader();
  reader.addEventListener("load", () => callback(reader.result));
  reader.readAsDataURL(img);
}
const {resetFields, validate, validateInfos} = useForm(formData, rulesRef);

//
// export default {
//   middleware: "auth",
//   data() {
//     return {
//       verified: false,
//       waitResponse: false,
//       checkRecaptcha: undefined,
//       otherFileList: [],
//       rules: {
//         phoneNumber: [
//           {
//             pattern: new RegExp("^[0-9]{9}$"),
//             message: this.t("enter_a_valid_phone_number"),
//             trigger: "change",
//           },
//         ],
//       },
//       clickCategoryData: false,
//     };
//   },
//   mounted() {
//     this.loadCities();
//     this.loadProductCategories();
//     this.$store.commit("setAppHeroShowAndHide", false);
//   },

//   computed: {
//     formattedProducts() {
//       return this.t("ad_use_rules");
//     },
//   },
//   methods: {
//     onError(error) {
//       this.$recaptcha.reset();
//     },
//     onSuccess(token) {
//       this.$store
//           .dispatch("auth/checkChaptchaToken", {
//             response: token,
//           })
//           .then((response) => {
//             this.verified = true;
//             this.checkRecaptcha = "success";
//           })
//           .catch((err) => {
//             this.$recaptcha.reset();
//             this.verified = true;
//             this.checkRecaptcha = "error";
//           });
//     },
const measurementUnitIdChange = function (value: any) {
  value != null
      ? (visibleMeasurementUnit.value = false)
      : (visibleMeasurementUnit.value = true);
}
const selectSubCategory = function () {
  let key = extra.selectedNodes[0].key.at(0);
  measurementUnits.concat(...subcategories[key].measurementUnits);
  formData.subcategoryId.value = subcategories[key].id;
}
const selectSubCategoryChange = function (value: any) {
  if (value == null) {
    measurementUnits.length = [];
    formData.measurementUnitId.value = undefined;
  }
}
//     beforeUploadCatalog(file) {
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
//             this.thumbnailName = file.name;
//             this.catalogFileList.push(obj);
//           });
//         } else {
//           this.$message.error("Faylın ölçüsü 5 mb-dən çox ola bilməz");
//         }
//       } else {
//         this.$message.error("Fayl tipi düzgün deyil");
//       }
//       return false;
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
//           });
//         } else {
//           this.$message.error("Faylın ölçüsü 5 mb-dən çox ola bilməz");
//         }
//       } else {
//         this.$message.error("Fayl tipi düzgün deyil");
//       }
//       return false;
//     },
//     removeCatalogImage(index) {
//       this.catalogFileList.splice(index, 1);
//     },
//     removeOtherImage(index) {
//       this.otherFileList.splice(index, 1);
//     },
//     handleOk() {
//       this.$validator.validateAll().then((result) => {
//         if (!this.formData.measurementUnitId) {
//           this.visibleMeasurementUnit = true;
//           return;
//         } else {
//           this.visibleMeasurementUnit = false;
//         }
//         if (this.verified == false) this.checkRecaptcha = "error";
//         if (!result || !this.verified) return;
//         this.$confirm({
//           title: this.t("are_you_sure_you_want_to_create_a_new_ad"),
//           content: "",
//           okText: this.t("yes"),
//           cancelText: this.t("no"),
//           onOk: () => {
//             this.waitResponse = true;
//             let sendFormData = {
//               cityId: this.formData.cityId,
//               description: this.formData.description,
//               measurementUnitId: this.formData.measurementUnitId,
//               measurementValue: Number(this.formData.measurementValue),
//               name: this.formData.name,
//               price: Number(this.formData.price),
//               phoneNumber: this.formData.phoneNumber,
//               typeId: this.formData.typeId,
//               subcategoryId: this.formData.subcategoryId,
//               isDelivered: this.formData.isDelivered,
//             };
//             this.$store
//                 .dispatch("advertisement/addAdvertisement", sendFormData)
//                 .then((response) => {
//                   let formData = new FormData();
//                   formData.append(
//                       "thumbnail",
//                       this.catalogFileList[0] && this.catalogFileList[0].file
//                   );
//                   this.otherFileList.forEach((item, index) => {
//                     formData.append(`productPhotos[${index}]`, item.file);
//                   });
//                   this.$store
//                       .dispatch("advertisement/addAdvertisementPhotos", {
//                         data: formData,
//                         id: response.id,
//                       })
//                       .then((response) => {
//                         this.$router.push("/kabinet/elanlarim");
//                         this.$message.success(
//                             this.t("operation_was_successful"),
//                             1.5
//                         );
//                       })
//                       .catch(() => {
//                         this.$router.push("/fermer-mehsullari/yeni-elan");
//                         this.waitResponse = false;
//                       });
//                 });
//           },
//         });
//       });
//     },
//     filterOption(input, option) {
//       return (
//           option.componentOptions.children[0].text
//               .toLowerCase()
//               .indexOf(input.toLowerCase()) >= 0
//       );
//     },
//     loadCities(cityName) {
//       this.$store
//           .dispatch("advertisement/getCities", {
//             cityNamePhrase: cityName,
//           })
//           .then((response) => {
//             this.cities = response;
//           });
//     },
//     loadProductCategories() {
//       this.$store
//           .dispatch("advertisement/getProductCategories")
//           .then((response) => {
//             if (response.subcategories.length) {
//               for (
//                   let index = 0;
//                   index < response.subcategories.length;
//                   index++
//               ) {
//                 response.subcategories[index] = Object.assign(
//                     response.subcategories[index],
//                     { subIndex: index }
//                 );
//               }
//               this.subcategories = response.subcategories;
//             }
//           });
//     },
//     clickCategory() {
//       !this.clickCategoryData &&
//       setTimeout(() => {
//         this.addClickEvent();
//       }, 500);
//     },
//     addClickEvent() {
//       const buttons = document.querySelectorAll(
//           ".ant-select-tree-node-content-wrapper"
//       );
//       buttons.forEach(function (button) {
//         button.addEventListener("click", function () {
//           this.previousSibling.click();
//         });
//       });
//       this.clickCategoryData = true;
//     },
//   },
// };
</script>
<style>
.ant-switch-checked {
  background-color: #16a34a !important;
}

.ant-form-item-label > label::after {
  content: "" !important;
}
</style>
