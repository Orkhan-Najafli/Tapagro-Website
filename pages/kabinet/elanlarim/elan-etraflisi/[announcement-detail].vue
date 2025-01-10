<template>
  <main class="mt-6 xl:mt-0">
    <div class="flex flex-row justify-between items-center mb-3">
      <nuxt-link
          tag="button"
          to="kabinet/elanlarim/"
          class="flex flex-row justify-center items-center py-2.5 px-3 w-[77px] md:w-[127px] border-2 border-[#E5E7EB] rounded h-[46px] max-h-[46px]"
      >
        <arrow_left_icon/>
        <span
            class="text-[15px] font-semibold text-[#6B7280] ml-2 hidden md:inline-block"
        >
          {{ t("back") }}</span
        >
      </nuxt-link>
      <div class="flex flex-row justify-end items-center">
        <button
            v-if="
            announcementsStore.getAnnouncement.status &&
            announcementsStore.getAnnouncement.status.label != 'EXPIRED' &&
            announcementsStore.getAnnouncement.status.label != 'DEACTIVATED'
          "
            @click="showDeactiveConfirm(announcementsStore.getAnnouncement.id)"
            class="flex flex-row justify-center items-center py-2.5 px-3 w-auto border-2 border-[#EF4444] mr-2 rounded h-[46px] max-h-[46px]"
        >
          <x_icon/>
          <span
              class="text-[15px] font-semibold text-[#EF4444] ml-2 hidden md:inline-block"
          >{{ t("deactivate") }}</span
          >
        </button>
        <button
            v-if="
            announcementsStore.getAnnouncement.status && announcementsStore.getAnnouncement.status.label == 'DEACTIVATED'
          "
            @click="showActiveConfirm(announcementsStore.getAnnouncement.id)"
            class="flex flex-row justify-center items-center py-2.5 px-3 w-auto border-2 border-[#22C55E] mr-2 rounded h-[46px] max-h-[46px]"
        >
          <active_repair_icon/>
          <span
              class="text-[15px] font-semibold text-[#16A34A] ml-2 hidden md:inline-block"
          >{{ t("activate") }}</span
          >
        </button>
        <button
            v-if="announcementsStore.getAnnouncement.status && announcementsStore.getAnnouncement.status.label != 'EXPIRED'"
            @click="showEditModal(announcementsStore.getAnnouncement.id)"
            class="flex flex-row justify-center items-center py-2.5 px-3 w-auto border-2 border-[#22C55E] rounded h-[46px] max-h-[46px]"
        >
          <pen_icon/>
          <span
              class="text-[15px] font-semibold text-[#16A34A] ml-2 hidden md:inline-block"
          >{{ t("edit") }}</span
          >
        </button>
      </div>
    </div>
    <div class="bg-white p-6 rounded-md">
      <section class="flex flex-col">
        <div>
          <h4 class="text-gray-800 font-medium text-sm p-0 m-0 mb-3">
            {{ t("user_data") }}
          </h4>
        </div>
        <div
            class="bg-gray-50 py-1.5 px-6 flex flex-row justify-between md:justify-start items-center"
        >
          <div class="flex flex-col md:flex-row w-full h-auto">
            <h5
                class="w-auto h-auto font-normal text-xs text-[#888888] p-0 m-0 mr-1 mb-1 md:mb-0"
            >
              {{ t("phone_number") }}:
            </h5>
            <p class="font-medium text-xs text-gray-800 m-0 p-0">
              {{ announcementsStore.getAnnouncement.phoneNumber }}
            </p>
          </div>
          <div class="flex flex-col md:flex-row w-full h-auto">
            <h5
                class="w-auto h-auto font-normal text-xs text-[#888888] m-0 p-0 mr-1 mb-1 md:mb-0"
            >
              {{ t("delivery") }}:
            </h5>
            <p class="font-medium text-xs text-green-500 m-0 p-0">
              {{
                announcementsStore.getAnnouncement.isDelivered ? t("it_does") : t("it_does_not")
              }}
            </p>
          </div>
        </div>
      </section>
      <section class="flex flex-col">
        <div class="flex flex-col md:flex-row mt-6 mb-7">
          <div class="flex flex-col w-full md:w-2/5 h-auto">
            <div class="flex flex-col">
              <h3 class="text-gray-900 text-sm font-bold m-0 p-0 mb-3">
                {{ t("catalog_photo") }}
              </h3>
              <div>
                <img
                    id="img_id"
                    class="cursor-pointer ml-0 w-[280px] h-[280px] md:w-[270px] md:h-[270px]"
                    :src="`${useRuntimeConfig().public.baseURL}/${announcementsStore.getAnnouncement.thumbnailPath}`"
                    :alt="t('catalog_photo')"
                    @click="
                    handlePreview(`${useRuntimeConfig().public.baseURL}/${announcementsStore.getAnnouncement.thumbnailPath}`)
                  "
                />
              </div>
            </div>
            <div
                v-if="
                announcementsStore.getAnnouncement.productPhotos &&
                announcementsStore.getAnnouncement.productPhotos.length > 0
              "
            >
              <h3 class="text-gray-900 text-sm font-bold m-0 p-0 mt-6 mb-3">
                {{ t("other_pictures") }}
              </h3>
              <div class="flex flex-row">
                <div
                    v-for="(productPhoto, index) in announcementsStore.getAnnouncement.productPhotos"
                    :key="index"
                    class="mr-2"
                >
                  <img
                      style="width: 44px; height: 44px"
                      id="img_id"
                      class="cursor-pointer"
                      :src="`${useRuntimeConfig().public.baseURL}/${productPhoto.path}`"
                      alt="xxx.png"
                      @click="handlePreview(`${baseURL}${productPhoto.path}`)"
                  />
                </div>
              </div>
            </div>
          </div>
          <div
              class="flex flex-col justify-start items-start w-full md:w-3/5 h-auto mt-11 md:mt-0 md:ml-9"
          >
            <h4 class="text-gray-800 font-medium text-sm mb-3">
              {{ t("ad_data") }}
            </h4>
            <div class="w-full h-auto">
              <div class="flex flex-col w-full h-auto">
                <div class="flex flex-row w-full h-auto mb-2">
                  <h5
                      class="w-auto h-auto font-normal text-xs text-gray-500 m-0 p-0 mr-1.5"
                  >
                    {{ t("ad_number") }}:
                  </h5>
                  <p class="font-bold text-xs text-gray-800 m-0 p-0">
                    {{ announcementsStore.getAnnouncement.id }}
                  </p>
                </div>
                <div class="flex flex-row w-full h-auto mb-2">
                  <h5
                      class="w-auto h-auto font-normal text-xs text-gray-500 m-0 p-0 mr-1.5"
                  >
                    {{ t("ad_name") }}:
                  </h5>
                  <p class="font-bold text-xs text-gray-800 m-0 p-0">
                    {{ announcementsStore.getAnnouncement.name }}
                  </p>
                </div>
                <div class="flex flex-row w-full h-auto mb-2">
                  <h5
                      class="w-auto h-auto font-normal text-xs text-gray-500 m-0 p-0 mr-1.5"
                  >
                    {{ t("region_title") }}:
                  </h5>
                  <p class="font-bold text-xs text-gray-800 m-0 p-0">
                    {{ announcementsStore.getAnnouncement.city && announcementsStore.getAnnouncement.city.name }}
                  </p>
                </div>
                <div class="flex flex-row w-full h-auto mb-2">
                  <h5
                      class="w-auto h-auto font-normal text-xs text-gray-500 m-0 p-0 mr-1.5"
                  >
                    {{ t("subcategory") }}:
                  </h5>
                  <p class="font-bold text-xs text-gray-800 m-0 p-0">
                    {{
                      announcementsStore.getAnnouncement.subcategory &&
                      announcementsStore.getAnnouncement.subcategory.name
                    }}
                  </p>
                </div>
                <div class="flex flex-row w-full h-auto mb-2">
                  <h5
                      class="w-auto h-auto font-normal text-xs text-gray-500 m-0 p-0 mr-1.5"
                  >
                    {{ t("product_type") }}:
                  </h5>
                  <p class="text-xs text-gray-800 font-bold m-0 p-0">
                    {{ announcementsStore.getAnnouncement.type }}
                  </p>
                </div>
                <div class="flex flex-row w-full h-auto mb-2">
                  <h5
                      class="w-auto h-auto font-normal text-xs text-gray-500 m-0 p-0 mr-1.5"
                  >
                    {{ t("unit_quantity_and_size") }}:
                  </h5>
                  <p class="text-xs text-gray-800 font-bold m-0 p-0">
                    {{ announcementsStore.getAnnouncement.measurementValue }}
                    {{ announcementsStore.getAnnouncement.measurementUnit }}
                  </p>
                </div>

                <div class="flex flex-row w-full h-auto mb-2">
                  <h5
                      class="w-auto h-auto font-normal text-xs text-gray-500 m-0 mr-1.5"
                  >
                    {{ t("price") }}:
                  </h5>
                  <div
                      class="flex flex-row justify-start items-center text-xs text-gray-800 font-bold"
                  >
                    <span class="mr-1"> {{ announcementsStore.getAnnouncement.price }}</span>
                    <monetary_unit_logo
                        :styleSVG="{ widht: 14, height: 11, color: '#374151' }"
                    />
                  </div>
                </div>

                <div class="flex flex-col w-full h-auto mb-2">
                  <h5
                      class="h-auto w-24 font-normal text-xs text-gray-500 m-0 p-0 mr-1.5"
                  >
                    {{ t("general_description") }}:
                  </h5>
                  <p
                      class="text-xs text-gray-800 font-bold m-0 p-0 break-words text-balance"
                  >
                    {{ announcementsStore.getAnnouncement.description }}
                  </p>
                </div>
                <div
                    v-if="announcementsStore.getAnnouncement.createdAt"
                    class="flex flex-row w-full h-auto mb-2"
                >
                  <h5
                      class="w-auto h-auto font-normal text-xs text-gray-500 m-0 p-0 mr-1.5"
                  >
                    {{ t("ad_creation_date") }}:
                  </h5>
                  <p class="font-bold text-xs text-gray-800 m-0 p-0">
                    {{
                      announcementsStore.getAnnouncement.createdAt &&
                      dateModel(announcementsStore.getAnnouncement.createdAt)
                    }}
                  </p>
                </div>
                <div
                    v-if="announcementsStore.getAnnouncement.publishedAt"
                    class="flex flex-row w-full h-auto mb-2"
                >
                  <h5
                      class="w-auto h-auto font-normal text-xs text-gray-500 m-0 p-0 mr-1.5"
                  >
                    {{ t("ad_publication_date") }}:
                  </h5>
                  <p class="font-bold text-xs text-gray-800 m-0 p-0">
                    {{
                      announcementsStore.getAnnouncement.publishedAt &&
                      dateModel(announcementsStore.getAnnouncement.publishedAt)
                    }}
                  </p>
                </div>
                <div
                    v-if="announcementsStore.getAnnouncement.promotedAt"
                    class="flex flex-row w-full h-auto mb-2"
                >
                  <h5
                      class="w-auto h-auto font-normal text-xs text-gray-500 m-0 p-0 mr-1.5"
                  >
                    {{ t("ad_update_date") }}:
                  </h5>
                  <p class="font-bold text-xs text-gray-800 m-0 p-0">
                    {{
                      announcementsStore.getAnnouncement.promotedAt &&
                      dateModel(announcementsStore.getAnnouncement.promotedAt)
                    }}
                  </p>
                </div>
                <div
                    v-if="announcementsStore.getAnnouncement.vipAt"
                    class="flex flex-row w-full h-auto mb-2"
                >
                  <h5
                      class="w-auto h-auto font-normal text-xs text-gray-500 m-0 p-0 mr-1.5"
                  >
                    {{ t("date_of_making_the_ad_VIP") }}:
                  </h5>
                  <p class="font-bold text-xs text-gray-800 m-0 p-0">
                    {{
                      announcementsStore.getAnnouncement.vipAt && dateModel(announcementsStore.getAnnouncement.vipAt)
                    }}
                  </p>
                </div>
              </div>
              <div
                  v-if="announcementsStore.getAnnouncement.status"
                  class="flex flex-col md:flex-row justify-start md:items-center w-full h-auto mt-4"
              >
                <a-tooltip placement="top">
                  <template
                      v-if="
                      announcementsStore.getAnnouncement.status &&
                      announcementsStore.getAnnouncement.status.label != 'PUBLISHED'
                    "
                      #title
                  >
                    <span>{{ t("only_published_ads_can_be_forwarded") }}</span>
                  </template>
                  <div
                      v-if="announcementsStore.getAnnouncement.status"
                      class="w-full max-w-[300px] h-auto mb-3 md:mb-0 md:mr-3"
                  >
                    <button
                        @click="promoteAnnouncement"
                        :disabled="announcementsStore.getAnnouncement.status.label != 'PUBLISHED'"
                        :class="{
                        'hover:border-[#ACB7B0]':
                          announcementsStore.getAnnouncement.status &&
                          announcementsStore.getAnnouncement.status.label != 'PUBLISHED',
                        'hover:hover:border-[#16A34A]':
                          announcementsStore.getAnnouncement.status &&
                          announcementsStore.getAnnouncement.status.label == 'PUBLISHED',
                      }"
                        class="flex flex-row justify-center items-center bg-[#DCFCE7] max-w-[300px] px-6 py-2.5 w-full hover:rounded hover:border-2 h-11"
                    >
                      <sort_ascending_icon/>
                      <span class="ml-2.5 font-medium text-sm text-[#14532D]">{{
                          t("forward_the_ad")
                        }}</span>
                    </button>
                  </div>
                </a-tooltip>
                <a-tooltip placement="top">
                  <template
                      v-if="
                      announcementsStore.getAnnouncement.status &&
                      announcementsStore.getAnnouncement.status.label != 'PUBLISHED'
                    "
                      #title
                  >
                    <span>{{ t("only_published_ads_can_be_made_VIP") }}</span>
                  </template>
                  <div
                      v-if="announcementsStore.getAnnouncement.status"
                      class="w-full max-w-[300px] h-auto mb-3 md:mb-0 md:mr-3"
                  >
                    <button
                        @click="vipDoAnnouncement"
                        :disabled="announcementsStore.getAnnouncement.status.label != 'PUBLISHED'"
                        :class="{
                        'hover:border-[#ACB7B0]':
                          announcementsStore.getAnnouncement.status &&
                          announcementsStore.getAnnouncement.status.label != 'PUBLISHED',
                        'hover:hover:border-[#16A34A]':
                          announcementsStore.getAnnouncement.status &&
                          announcementsStore.getAnnouncement.status.label == 'PUBLISHED',
                      }"
                        class="flex flex-row justify-center items-center bg-[#DCFCE7] max-w-[300px] px-6 py-2.5 w-full hover:rounded hover:border-2 h-11"
                    >
                      <vip_icon/>
                      <span class="ml-2.5 font-medium text-sm text-[#14532D]">{{
                          t("make_an_ad_VIP")
                        }}</span>
                    </button>
                  </div>
                </a-tooltip>
              </div>
            </div>
            <!-- </a-row> -->
          </div>
        </div>

        <div class="mt-5">
          <div class="bg-gray-200 p-3 rounded-md flex justify-between">
            <div class="text-sm text-black">
              {{ t("status") }}:
              <span
                  v-if="announcementsStore.getAnnouncement.status"
                  :class="resolveStatusClass(announcementsStore.getAnnouncement.status)"
              >
                {{ announcementsStore.getAnnouncement.status.status }}
              </span>
            </div>
            <div
                style="color: #1890ff"
                class="flex items-center cursor-pointer"
                @click="statusDetail"
            >
              <span class="mr-1">{{ t("more") }}</span>
              <ArrowRightOutlined/>
            </div>
          </div>
        </div>
        <a-modal
            :centered="true"
            :title="t('product_image')"
            :visible="previewVisible"
            @cancel="closePreviewImageModal"
        >
          <img
              style="width: 500px; height: 400px"
              :alt="t('product_image')"
              :src="previewPath"
          />
          <template slot="footer">
            <a-button @click="closePreviewImageModal">{{
                t("close_modal")
              }}
            </a-button>
            <a-button
                type="primary"
                @click="downloadImage(previewPath, t('product_image'))"
            >
              <DownloadOutlined/>
              <span class="ml-3">{{ t("download") }}</span>
            </a-button>
          </template>
        </a-modal>

        <a-modal
            v-model="visibleDeactiveConfirm"
            width="450px"
            :closable="false"
            :maskClosable="false"
            :footer="null"
            centered
        >
          <div class="flex flex-col">
            <div class="flex justify-center items-center">
              <span
                  class="h-16 rounded-full flex justify-center items-center text-yellow-500"
              >
                <QuestionCircleOutlined class="text-xl"/>
              </span>
            </div>
            <div class="flex flex-col justify-center items-center text-center">
              <p class="p-0 m-0 text-neutral-800 font-medium text-xl mb-1">
                {{ t("are_you_sure_you_want_to_disable_the_ad") }}
              </p>
              <span class="font-normal text-sm text-gray-400 m-0 p-0 mb-4">
                {{ t("your_ad_will_not_appear_on_the_web_page") }}
              </span>
            </div>
            <div class="flex flex-row justify-center items-center">
              <button
                  @click="visibleDeactiveConfirm = false"
                  class="text-sm border border-gray-300 font-medium py-2 px-6 rounded-md mr-2"
              >
                {{ t("no") }}
              </button>
              <button
                  @click="submitDeactive"
                  class="text-sm font-medium text-white bg-emerald-600 py-2 px-6 rounded-md"
              >
                {{ t("yes") }}
              </button>
            </div>
          </div>
        </a-modal>
        <a-modal
            v-model="visibleActiveConfirm"
            width="450px"
            :closable="false"
            :maskClosable="false"
            :footer="null"
            centered
        >
          <div class="flex flex-col">
            <div class="flex justify-center items-center">
              <span
                  class="h-16 rounded-full flex justify-center items-center text-yellow-500"
              >
                <QuestionCircleOutlined class="text-xl"/>
              </span>
            </div>
            <div class="flex flex-col justify-center items-center text-center">
              <p class="p-0 m-0 text-neutral-800 font-medium text-xl mb-1">
                {{ t("are_you_sure_you_want_to_enable_the_ad") }}
              </p>
            </div>
            <div class="flex flex-row justify-center items-center">
              <button
                  @click="visibleActiveConfirm = false"
                  class="text-sm border border-gray-300 font-medium py-2 px-6 rounded-md mr-2"
              >
                {{ t("no") }}
              </button>
              <button
                  @click="submitActive"
                  class="text-sm font-medium text-white bg-emerald-600 py-2 px-6 rounded-md"
              >
                {{ t("yes") }}
              </button>
            </div>
          </div>
        </a-modal>

<!--        <announcementsStore.getAnnouncementUpdateModal-->
<!--            v-if="updateModalVisible"-->
<!--            @close="closeEditModal"-->
<!--            @ok="onSuccessUpdate"-->
<!--        />-->
        <PromoteListing
            v-if="visiblePromoteListing"
            :data="textData"
            @close="onClose"
            @ok="onSucces"
        />
        <AnnouncementStatusDetail
            v-if="visibleStatusDetail"
            :statusData="statusData"
            @closeStatusDetail="closeStatusDetail"
        />
      </section>
    </div>
  </main>
</template>
<script setup lang="ts">
import {use} from "h3";

const {t} = useI18n()
const announcementsStore = useAnnouncementsStore()
const type = ref()
const visibleDeactiveConfirm = ref(false)
const visiblePromoteListing = ref(false)
import moment from "moment";

const visibleStatusDetail = ref(false)
let textData = reactive({})
const statusData = reactive({
  published: [],
  rejected: [],
  registered: [],
  expired: [],
  unPublished: [],
})

onUnmounted(()=>{
  announcementsStore.resetAnnouncement()
})
watch(
    () => useRoute().params.announcementdetail,
    (newId) => {
      if (newId && announcementsStore.getAnnouncementStatus!=='success') {
        announcementsStore.fetchAnnouncementDetail(newId);
      }
    },
    {immediate: true, deep: true}
);// import announcementsStore.getAnnouncementUpdateModal from "@/components/common/announcementsStore.getAnnouncement/announcementsStore.getAnnouncementUpdateModal.vue";
// import promoteAnnouncement from "@/components/common/announcement/promoteAnnouncement.vue";
//
// import urls from "@/configs/urls";
//
// export default {
//   components: {
//     monetary_unit_logo,
//     vip_icon,
//     sort_ascending_icon,
//     arrow_left_icon,
//     pen_icon,
//     x_icon,
//     announcementsStore.getAnnouncementUpdateModal,
//     promoteAnnouncement,
//     active_repair_icon,
//   },
//   data() {
//     return {
//       baseURL: urls.getParam("API_BASE_URL"),
//       statusDetailBool: false,
//       published: [],
//       rejected: [],
//       registered: [],
//       expired: [],
//       unPublished: [],
//       previewVisible: false,
//       previewPath: "",
//       announcementsStore.getAnnouncement: {},
//       selectedId: null,
//       updateModalVisible: false,
//       visibleAnnouncementModal: false,
//       visibleDeactiveConfirm: false,
//       visibleActiveConfirm: false,
//       textData: {},
//     };
//   },
//   computed: {
//     ...mapGetters({
//       //   announcementsStore.getAnnouncement: "advertisement/announcementsStore.getAnnouncement",
//     }),
//   },
//   created() {
//     this.loadAnnouncementDetail();
//   },
//   methods: {
    const onClose = function () {
      visiblePromoteListing.value = false;
    }
    const onSucces = function (type:any) {
      console.log(type)
      // if (type.type == "promote") {
      //   this.$store
      //       .dispatch("advertisement/promoteAnnouncement", {
      //         id: this.announcementsStore.getAnnouncement.id,
      //       })
      //       .then((res) => {
      //         this.visibleAnnouncementModal = false;
      //         this.$message.success("Elanınız irəli çəkildi");
      //         this.loadAnnouncementDetail();
      //       });
      // } else {
      //   this.$store
      //       .dispatch("advertisement/vipDoAnnouncement", {
      //         id: this.announcementsStore.getAnnouncement.id,
      //       })
      //       .then((res) => {
      //         this.visibleAnnouncementModal = false;
      //         this.$message.success("Elanınız VIP edilmişdir");
      //         this.loadAnnouncementDetail();
      //       });
      // }
    }
//     promoteAnnouncement(id) {
//       this.visibleAnnouncementModal = true;
//       this.textData = {
//         title: "Elanı irəli çəkmək istədiyinizdən əminsinizmi? ",
//         description:
//             'Elanınız "Fermer məhsulları" kataloqunda daha irəlidə təsvir olunacaq ',
//         type: "promote",
//       };
//     },
    const vipDoAnnouncement = function (id:number) {
      visiblePromoteListing.value = true;
      textData = {
        title: t('are_you_sure_you_want_to_make_the_announcement_VIP'),
        description:
            t('your_listing_will_be_featured_in_the_VIP_Farmer_Products_catalog_for_30_days'),
        type: "vip",
      };
    }
const showDeactiveConfirm = function (id: number, type = null) {
  selectedId.value = id;
  type.value = type;
  visibleDeactiveConfirm.value = true;
}
//     submitDeactive() {
//       this.$store
//           .dispatch("advertisement/deactiveannouncementsStore.getAnnouncement", this.selectedId)
//           .then(() => {
//             this.loadAnnouncementDetail();
//             this.visibleDeactiveConfirm = false;
//
//             if (this.type) {
//               this.$store.dispatch(
//                   "advertisement/getannouncementsStore.getAnnouncementById",
//                   this.selectedId
//               );
//             }
//           });
//     },
//     showActiveConfirm(id, type = null) {
//       this.selectedId = id;
//       this.type = type;
//       this.visibleActiveConfirm = true;
//     },
//     submitActive() {
//       this.$store
//           .dispatch("advertisement/activeannouncementsStore.getAnnouncement", this.selectedId)
//           .then(() => {
//             this.loadAnnouncementDetail();
//             this.visibleActiveConfirm = false;
//             if (this.type) {
//               this.$store.dispatch(
//                   "advertisement/getannouncementsStore.getAnnouncementById",
//                   this.selectedId
//               );
//             }
//           });
//     },
//     showEditModal(id) {
//       this.selectedId = id;
//       this.$store
//           .dispatch("advertisement/getannouncementsStore.getAnnouncementById", id)
//           .then(() => {
//             this.updateModalVisible = true;
//           });
//     },
//     closeEditModal() {
//       this.updateModalVisible = false;
//       this.$store.commit("setannouncementsStore.getAnnouncementDetailModal", true);
//     },
//     onSuccessUpdate() {
//       this.$store.dispatch(
//           "advertisement/getannouncementsStore.getAnnouncementById",
//           this.selectedId
//       );
//       this.$store.commit("setannouncementsStore.getAnnouncementDetailModal", true);
//       this.loadAnnouncementDetail();
//       this.updateModalVisible = false;
//     },
//     loadAnnouncementDetail() {
//       this.$store
//           .dispatch(
//               "advertisement/getannouncementsStore.getAnnouncementByIdInDetail",
//               this.$route.params.announcementDetail
//           )
//           .then((res) => {
//             this.announcementsStore.getAnnouncement = res;
//             this.$store.commit("advertisement/setannouncementsStore.getAnnouncement", res);
//           });
//     },
//     async downloadImage(imageSrc, nameOfDownload = "my-image.png") {
//       const response = await fetch(imageSrc);
//
//       const blobImage = await response.blob();
//
//       const href = URL.createObjectURL(blobImage);
//
//       const anchorElement = document.createElement("a");
//       anchorElement.href = href;
//       anchorElement.download = nameOfDownload;
//
//       document.body.appendChild(anchorElement);
//       anchorElement.click();
//
//       document.body.removeChild(anchorElement);
//       window.URL.revokeObjectURL(href);
//     },
//     closePreviewImageModal() {
//       this.previewVisible = false;
//     },
//     async handlePreview(path) {
//       this.previewPath = path;
//       this.previewVisible = true;
//     },
const resolveStatusClass = function (status: any) {
  if (status.label == "PUBLISHED") {
    return "text-green-600";
  } else if (status.label == "REJECTED") {
    return "text-red-600";
  } else if (status.label == "REGISTERED") {
    return "text-yellow-600";
  } else if (status.label == "EXPIRED") {
    return "text-gray-400";
  } else if (status.label == "UNPUBLISHED") {
    return "text-orange-400";
  }
}
const dateModel = function (value: Date | string) {
  let dat = new Date(value).toString();
  return moment(dat).format("DD/MM/yyyy HH:mm:ss");
}
//     handleClose() {
//       this.$router.push({
//         path: this.$route.fullPath,
//         query: { id: undefined, status: undefined },
//       });
//       this.$store.commit("setannouncementsStore.getAnnouncementDetailModal", false);
//     },
//     handleEdit() {
//       this.$emit("edit", this.announcementsStore.getAnnouncement.id, true);
//       this.$store.commit("setannouncementsStore.getAnnouncementDetailModal", false);
//     },
const statusDetail = function () {
  statusData.rejected = announcementsStore.getAnnouncement.farmerProductHistories.filter((el) => {
    return el.status.label == "REJECTED";
  });
  statusData.published = announcementsStore.getAnnouncement.farmerProductHistories.filter(
      (el) => {
        return el.status.label == "PUBLISHED";
      }
  );
  statusData.registered = announcementsStore.getAnnouncement.farmerProductHistories.filter(
      (el) => {
        return el.status.label == "REGISTERED";
      }
  );
  statusData.expired = announcementsStore.getAnnouncement.farmerProductHistories.filter((el) => {
    return el.status.label == "EXPIRED";
  });
  statusData.unPublished = announcementsStore.getAnnouncement.farmerProductHistories.filter(
      (el) => {
        return el.status.label == "UNPUBLISHED";
      }
  );
  console.log(statusData.published);
  visibleStatusDetail.value = true;
}
const closeStatusDetail = function () {
  visibleStatusDetail.value = false;
}
// },
//   async asyncData({ store, query }) {
//     if (query && query.id) {
//       store
//         .dispatch("advertisement/getannouncementsStore.getAnnouncementById", query.id)
//         .then(() => {
//           store.commit("setannouncementsStore.getAnnouncementDetailModal", true);
//         });
//     }
//   },
//   watchQuery: ["id"],
// };
</script>
