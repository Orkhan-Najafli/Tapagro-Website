<template>
  <div class="mt-9 xl:mt-0">
    <a-form ref="formRef" :model="userData" :rules="rules as any">
      <!-- <a-form-model class="flex flex-col w-full min-w-full" @submit="handleSubmit"> -->
      <div class="block text-left mb-3.5">
        <h3 class="text-emerald-600 font-semibold text-xl">
          {{ t("my_information") }}
        </h3>
      </div>
      <div class="block">
        <!-- <ClientOnly> -->
        <div class="bg-white rounded-xl border border-gray-200">
          <div
            class="flex flex-row items-center bordered border-b-2 py-5 px-6 text-emerald-900"
          >
            <span
              class="w-14 h-14 bg-[#F0FDF4] rounded-full flex justify-center items-center mr-5"
            >
              <UserOutlined class="text-lg" />
            </span>

            <p class="p-0 m-0 font-medium text-lg">
              {{ t("my_personal_information") }}
            </p>
          </div>
          <div class="flex flex-col md:flex-row mt-6 px-6">
            <div class="flex flex-col mr-32">
              <h5 class="text-gray-400 font-medium text-base p-0 m-0 mb-2">
                {{ t("surname_first_name_patronymic") }}
              </h5>
              <p class="text-zinc-900 font-medium text-lg p-0 m-0">
                {{
                  `${useUsersStore().getUserData.firstName} ${
                    useUsersStore().getUserData.lastName
                  }
                ${useUsersStore().getUserData.fatherName}`
                }}
              </p>
            </div>
          </div>
          <div class="flex flex-col md:flex-row px-6">
            <div
              class="flex flex-col text-left w-full md:w-[382px] md:max-w-[382px]"
            >
              <a-form-item class="text-left" ref="storeName" name="storeName">
                <label
                  class="text-gray-400 font-medium text-base"
                  for="_storeName"
                  >{{ t("seller_name") }}</label
                >
                <a-config-provider
                  :theme="{
                    token: {
                      colorPrimary: '#16a34a',
                    },
                  }"
                >
                  <a-input
                    size="large"
                    id="_storeName"
                    class="text-left"
                    v-model:value="userData.storeName"
                  />
                </a-config-provider>
              </a-form-item>
            </div>
          </div>
          <div class="flex flex-col md:flex-row px-6">
            <div
              class="flex flex-col w-full md:w-[382px] md:max-w-[382px] mr-16 justify-start items-start"
            >
              <a-form-item
                class="text-left w-full"
                ref="phoneNumber"
                name="phoneNumber"
              >
                <label
                  class="text-gray-400 font-medium text-base"
                  for="_phone"
                  >{{ t("mobile_number") }}</label
                >
                <a-config-provider
                  :theme="{
                    token: {
                      colorPrimary: '#16a34a',
                    },
                  }"
                >
                  <a-input
                    size="large"
                    id="_phone"
                    placeholder="55 111 11 11"
                    class="text-left w-full"
                    v-model:value="userData.phoneNumber"
                  />
                </a-config-provider>
              </a-form-item>
            </div>
            <div
              class="flex flex-col text-left w-full md:w-[382px] md:max-w-[382px]"
            >
              <a-form-item
                class="text-left w-full"
                ref="emailAddress"
                name="emailAddress"
              >
                <label
                  class="text-gray-400 font-medium text-base"
                  for="_email"
                  >{{ t("e_mail") }}</label
                >
                <a-config-provider
                  :theme="{
                    token: {
                      colorPrimary: '#16a34a',
                    },
                  }"
                >
                  <a-input
                    size="large"
                    id="_email"
                    placeholder="email@gmail.com"
                    class="text-left w-full"
                    v-model:value="userData.emailAddress"
                  />
                </a-config-provider>
              </a-form-item>
            </div>
          </div>
        </div>
        <!-- </ClientOnly> -->
      </div>
      <div class="block mt-6 h-auto">
        <div class="bg-white rounded-xl border border-gray-200">
          <div
            class="flex flex-row items-center bordered border-b-2 py-5 px-3 md:px-6 text-emerald-900"
          >
            <span
              class="w-14 h-14 bg-[#F0FDF4] rounded-full flex justify-center items-center mr-5"
            >
              <img
                width="20px"
                height="26px"
                src="../../../assets/img/areas.svg"
                alt=""
              />
            </span>

            <p class="p-0 m-0 font-medium text-lg">
              {{ t("my_shopping_area") }}
            </p>
          </div>
          <div class="flex flex-row mt-5 px-3 md:px-6">
            <div class="flex flex-col w-full">
              <a-form-item class="w-full md:max-w-xs h-10" name="cityId">
                <label class="text-gray-400 font-medium text-base" for="_area">
                  {{ t("region_title") }}
                </label>
                <!-- <select-custom name="city" class="h-10" v-validate="''" v-model="userData.cityId"
                  :url="`public/ecommerce/cities`" placeholder="Rayonu seçin" :isMultiple="false"
                  searchFieldName="cityNamePhrase">
                  <template v-if="userData.city && userData.city.id">
                    <option :value="userData.city.id" selected>
                      {{ userData.city.name }}
                    </option>
                  </template>
</select-custom> -->
              </a-form-item>
            </div>
          </div>
          <div
            class="inline-flex flex-col justify-start items-start mb-6 mx-3 md:mx-6"
            :class="{
              'border-2 border-[#f5222d]': checkRecaptcha == 'error',
              'border-0 border-transparent': checkRecaptcha == 'success',
            }"
          >
            <!-- <recaptcha @error="onError" @success="onSuccess" /> -->
          </div>
        </div>
      </div>
      <div class="flex justify-end mt-6">
        <button
          @click="handleSubmit"
          class="bg-[#16A34A] h-[38px] px-10 py-2 rounded-md font-semibold text-base text-white"
        >
          {{ t("save") }}
        </button>
      </div>
    </a-form>
  </div>
</template>
<script setup lang="ts">
const { t, locale } = useI18n();
useUsersStore().fetchUserData();
const formRef = ref();
interface FormState {
  emailAddress: string | undefined;
  phoneNumber: string | undefined;
  city: {
    name: string | null;
    id: number | null;
  };
  storeName: string | undefined;
}
const userData = reactive<FormState>({
  // cityId: useUsersStore().getUserData?.city?.id || undefined,
  emailAddress: undefined,
  phoneNumber: undefined,
  city: {
    name: null,
    id: null,
  },
  storeName: undefined,
});
const verified = ref(false);
const checkRecaptcha = ref(undefined);
const rules = computed(() => ({
  storeName: [
    // { required: true, message: t("required"), trigger: ["change", "blur"] },
    { min: 3, message: t("min", 3), trigger: ["change", "blur"] },
    { max: 255, message: t("max", 255), trigger: ["change", "blur"] },
    {
      pattern: /^[a-zA-Z\s]+$/, // Ancaq hərflər və boşluqlar
      message: t("alpha_spaces"),
      trigger: ["change", "blur"],
    },
  ],
  phoneNumber: [
    {
      pattern: /^\d{9}$/, // Tam olaraq 9 rəqəm olmalıdır
      message: t("digits", { length: 9 }),
      trigger: ["change", "blur"],
    },
  ],
  emailAddress: [
    {
      pattern: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
      message: t("email", { email: "Email adres" }),
      trigger: ["change", "blur"],
    },
  ],
}));
watch(locale, () => {
  formRef.value?.clearValidate();
});

// export default {
//   components: {
//     SelectCustom,
//   },

//   methods: {
//     onError(error) {
//       this.$recaptcha.reset();
//     },
//     onSuccess(token) {
//       this.$store
//         .dispatch("auth/checkChaptchaToken", {
//           response: token,
//         })
//         .then((response) => {
//           this.verified = true;
//           this.checkRecaptcha = "success";
//         })
//         .catch((err) => {
//           this.$recaptcha.reset();
//           this.verified = true;
//           this.checkRecaptcha = "error";
//         });
//     },
const handleSubmit = function (event: Event) {
  event.preventDefault();

  // this.$validator.validateAll().then((result) => {
  //   if (this.verified == false) this.checkRecaptcha = "error";
  //   if (!result || !this.verified) return;

  //   this.$store
  //     .dispatch("auth/editUser", {
  //       cityId: this.userData.cityId || this.userData.city.id,
  //       emailAddress: this.userData.emailAddress || null,
  //       phoneNumber: this.userData.phoneNumber || null,
  //       storeName: this.userData.storeName || null,
  //     })
  //     .then(() => {
  //       notification["success"]({
  //         message: this.t("attention"),
  //         description: this.t("your_changes_have_been_successfully_saved"),
  //       });
  //     });
  // });
};
//     setUserData() {
//       this.userData.emailAddress = this.loggedUser
//         ? this.loggedUser.contactDetails.emailAddress
//         : null;
//       this.userData.phoneNumber = this.loggedUser
//         ? this.loggedUser.contactDetails.phoneNumber
//         : null;
//       this.userData.city = this.loggedUser?.city;
//       this.userData.cityId = this.loggedUser?.city.id;
//       this.userData.storeName = this.loggedUser?.storeName;
//     },
//   },
//   computed: {
//     ...mapGetters({
//       loggedUser: "auth/loggedUser",
//     }),
//   },
//   watch: {
//     loggedUser: {
//       deep: true,
//       handler(newValue) {
//         this.setUserData();
//       },
//     },
//   },

//   mounted() {
//     this.$store.commit("setAppHeroShowAndHide", false);
//     this.setUserData();
//   },
// };
</script>
<style>
.select2-container--default .select2-selection--single {
  height: 44px;
  display: flex;
  align-items: center;
  padding-left: 13px;
  padding-right: 13px;
}

.select2-container--default
  .select2-selection--single
  .select2-selection__arrow {
  top: 10px;
  right: 13px;
}
</style>
