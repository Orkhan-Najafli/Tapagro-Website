<template>
  <main class="overflow-hidden pt-3 min-h-screen">
    <section
      class="flex flex-row max-w-[1224px] w-full px-6 xl:px-0 container mx-auto"
    >
      <div class="mt-6 mb-5 md:mb-9">
        <nuxt-link
          tag="div"
          class="text-gray-600 flex flex-row justify-start items-center md:hidden font-medium text-sm cursor-pointer"
          to="/mehsullar"
        >
          <arrow_left_icon />

          <span class="ml-3 text-gray-600 font-medium text-sm">
            {{ $t("products") }}
          </span>
        </nuxt-link>
        <!-- <a-breadcrumb separator=">" class="hidden md:block">
          <a-breadcrumb-item class="text-sm leading-5 font-normal" href="">
            <nuxt-link
              tag="span"
              to="/"
              class="text-gray-600 font-medium text-sm"
              >{{ $t("main_page") }}
            </nuxt-link>
          </a-breadcrumb-item>
          <a-breadcrumb-item class="text-sm leading-5 font-normal" href="">
            <nuxt-link
              tag="span"
              class="text-gray-600 font-medium text-sm"
              to="/mehsullar"
            >
              {{ $t("products") }}
            </nuxt-link>
          </a-breadcrumb-item>
          <a-breadcrumb-item class="">
            <span class="text-sm leading-5 font-semibold text-gray-800">
              {{ $t("see_product_in_details") }}
            </span>
          </a-breadcrumb-item>
        </a-breadcrumb> -->
      </div>
    </section>
    <section
      class="flex flex-col max-w-[1224px] w-full px-6 xl:px-0 container mx-auto"
    >
      <div class="flex flex-row w-full mb-6 md:mb-10">
        <div class="w-full relative overflow-hidden">
          <section class="flex flex-col w-full min-w-full">
            <div
              class="flex flex-col w-full min-w-full xl:flex-row mb-6 lg:mb-10"
            >
              <div class="flex w-full xl:max-w-[704px] relative xl:mr-[104px]">
                <a-tooltip placement="bottom">
                  <template #title>
                    <span>{{ $t("add_to_my_favorites") }}</span>
                  </template>
                  <div
                    v-if="useProductDetailStore().getProduct?.isActive"
                    @click="
                      toggleProductToFavorite(
                        useProductDetailStore().getProduct,
                        $event
                      )
                    "
                    :class="{
                      'bg-[#16A34A]': favoriteIsActive,
                      'bg-white': !favoriteIsActive,
                    }"
                    class="absolute right-2 top-2 md:right-5 md:top-5 z-40 w-10 h-10 md:w-14 md:h-14 flex justify-center items-center shadow-lg rounded-full cursor-pointer"
                  >
                    <favorite_icon
                      :size="{ width: '28px', height: '28px' }"
                      :color="favoriteIsActive ? '#FFFFFF' : '#334155'"
                    />
                  </div>
                </a-tooltip>
                <a-tooltip placement="bottom">
                  <template #title>
                    <span>{{ $t("compare_do") }}</span>
                  </template>
                  <div
                    v-if="useProductDetailStore().getProduct?.isActive"
                    @click="
                      toggleProductToCompare(
                        useProductDetailStore().getProduct,
                        $event
                      )
                    "
                    :class="{
                      'bg-[#16A34A]': isActive,
                      'bg-white': !isActive,
                    }"
                    class="absolute right-2 top-16 md:right-5 md:top-[90px] z-40 w-10 h-10 md:w-14 md:h-14 flex justify-center items-center shadow-lg rounded-full cursor-pointer"
                  >
                    <scale_logo
                      :size="{ width: '28px', height: '28px' }"
                      :color="isActive ? '#FFFFFF' : '#334155'"
                    />
                  </div>
                </a-tooltip>
                <ClientOnly fallback-tag="div" fallback="Şəkil yüklənir...">
                  <a-carousel
                    class="w-full max-w-full min-w-full"
                    :dots="false"
                    arrows
                  >
                    <template #prevArrow>
                      <div
                        class="custom-slick-arrow px-3 py-2.5 bg-white/70"
                        style="left: 10px; z-index: 1"
                      >
                        <LeftOutlined
                          class="text-lg p-1 text-green-500 rounded z-40 left-0"
                        />
                      </div>
                    </template>
                    <template #nextArrow>
                      <div class="custom-slick-arrow" style="right: 10px">
                        <RightOutlined
                          class="text-lg p-1 text-green-500 rounded z-40 right-0"
                        />
                      </div>
                    </template>

                    <div
                      v-if="useProductDetailStore().getProduct!.thumbnailPath"
                      v-for="(image, index) in useProductDetailStore()
                        .getProduct && [
                        {
                          path: useProductDetailStore().getProduct
                            ?.thumbnailPath,
                        },
                        ...new Array(
                          ...useProductDetailStore().getProduct?.productPhotos
                        ),
                      ]"
                      :key="index"
                    >
                      <img
                        v-if="isValidImage(image)"
                        :src="`${baseURL}${image.path}`"
                        :alt="useProductDetailStore().getProduct.name"
                        :title="useProductDetailStore().getProduct.name"
                        class="rounded-md object-contain mx-auto responsive-class"
                        @error="setDefaultImage"
                      />
                      <img
                        v-else
                        :src="require(`@/assets/img/no-image.svg`)"
                        class="rounded-md p-16 mx-auto min-h-[292px] max-h-[673px]"
                        :alt="useProductDetailStore().getProduct.name"
                        :title="useProductDetailStore().getProduct.name"
                      />
                    </div>
                  </a-carousel>
                </ClientOnly>
                <div
                  v-if="!useProductDetailStore().getProduct?.isActive"
                  class="absolute flex flex-row justify-center items-center bottom-6 left-14 bg-white px-2 py-1 rounded-md z-50"
                >
                  <cancel_icon />
                  <span
                    class="inline-flex text-[#DC2626] font-normal text-xl ml-2"
                  >
                    {{ $t("the_product_is_not_active") }}
                  </span>
                </div>
              </div>
              <div
                class="flex w-full min-w-full xl:w-[416px] xl:min-w-[416px] xl:max-w-[416px] flex-col h-auto"
              >
                <div class="flex flex-col w-full">
                  <div class="mt-9 xl:mt-0">
                    <span
                      class="w-auto h-auto font-semibold text-xl text-gray-700"
                    >
                      {{ useProductDetailStore().getProduct?.name }}
                    </span>
                  </div>
                  <a
                    href="#rating"
                    v-if="useProductDetailStore().getProduct?.reviewSummary"
                    class="inline-flex flex-row w-full h-auto justify-start items-center my-3 max-w-[200px]"
                  >
                    <span class="text-sm font-medium text-[#1F2937]">{{
                      useProductDetailStore().getProduct &&
                      Number(
                        useProductDetailStore().getProduct?.reviewSummary
                          .averageRating
                      ).toFixed(1)
                    }}</span>
                    <span>
                      <a-rate
                        disabled
                        class="m-0 p-0"
                        v-model:value="averageRating"
                        allow-half
                      />
                    </span>
                    <span
                      class="w-auto text-[#1F2937] text-sm font-normal underline"
                    >
                      ({{
                        useProductDetailStore().getProduct?.reviewSummary &&
                        useProductDetailStore().getProduct?.reviewSummary
                          ?.reviewCount
                      }})
                    </span>
                  </a>

                  <div
                    class="flex flex-row justify-between items-center w-full h-auto mb-4"
                  >
                    <span class="text-gray-500 font-normal text-base"
                      >{{ $t("price") }}:</span
                    >
                    <span
                      class="text-gray-700 font-semibold text-xl"
                      v-if="useProductDetailStore().getProduct?.bargainMethod"
                      >{{
                        useProductDetailStore().getProduct?.bargainMethod
                          ?.status
                      }}</span
                    >
                    <div
                      v-else
                      class="flex flex-col text-lg font-semibold text-gray-600"
                    >
                      <div
                        v-if="
                          useProductDetailStore().getProduct?.price?.discount >
                          0
                        "
                        class="flex flex-col"
                      >
                        <div
                          class="relative flex flex-row items-center justify-end font-normal text-xs text-[#6B7280]"
                        >
                          <div class="relative flex flex-row items-center">
                            <svg
                              class="absolute z-40 top-1.5 w-auto"
                              xmlns="http://www.w3.org/2000/svg"
                              height="2"
                              viewBox="0 0 50 2"
                              fill="none"
                            >
                              <path d="M0 1H59" stroke="#4B5563" />
                            </svg>

                            <span class="mr-0.5">
                              {{
                                useProductDetailStore().getProduct?.price
                                  ?.initialPrice
                              }}</span
                            >
                            <monetary_unit_logo
                              :styleSVG="{
                                widht: 13,
                                height: 10,
                                color: '#6B7280',
                              }"
                            />
                          </div>
                        </div>
                        <div class="flex flex-row items-center">
                          <span
                            class="text-[#EF4444] bg-[#FEF2F2] text-xs font-medium p-0 py-0.5 px-1 mr-1"
                          >
                            -{{
                              useProductDetailStore().getProduct?.price
                                ?.discount
                            }}
                            %</span
                          >
                          <div class="flex flex-row items-center">
                            <span class="mr-0.5 text-[#EF4444]">{{
                              useProductDetailStore().getProduct?.price
                                ?.discountedPrice
                            }}</span>
                            <monetary_unit_logo
                              :widht="16"
                              :height="13"
                              color="#EF4444"
                            />
                          </div>
                        </div>
                      </div>
                      <div
                        v-else
                        class="flex flex-row justify-start items-center"
                      >
                        <span
                          class="mr-1 text-base font-medium text-[#374151]"
                          >{{
                            useProductDetailStore().getProduct?.price
                              ?.initialPrice
                          }}</span
                        >
                        <monetary_unit_logo
                          :widht="16"
                          :height="13"
                          color="#374151"
                        />
                      </div>
                    </div>
                  </div>

                  <div class="flex flex-row justify-between items-center mb-4">
                    <span
                      class="text-gray-500 font-normal text-base w-[115px] min-w-[115px]"
                      >{{ $t("product_type") }}:</span
                    >
                    <div>
                      <span
                        v-if="
                          useProductDetailStore().getProduct?.productTypeName &&
                          useProductDetailStore().getProduct?.productTypeName
                            .length < 30
                        "
                        class="text-gray-700 text-right font-semibold text-base w-full max-w-[255px] overflow-hidden text-ellipsis"
                        >{{
                          useProductDetailStore().getProduct?.productTypeName
                        }}</span
                      >
                      <a-tooltip v-else placement="bottom">
                        <template #title>
                          <span class="text-gray-700 font-semibold text-base">{{
                            useProductDetailStore().getProduct?.productTypeName
                          }}</span>
                        </template>
                        <span
                          class="text-gray-700 text-right font-semibold text-base w-full max-w-[255px] overflow-hidden text-ellipsis"
                          >{{
                            useProductDetailStore().getProduct
                              ?.productTypeName &&
                            useProductDetailStore().getProduct!.productTypeName!.slice(
                              0,
                              28
                            )
                          }}...</span
                        >
                      </a-tooltip>
                    </div>
                  </div>
                  <div
                    v-if="
                      useProductDetailStore().getProduct &&
                      useProductDetailStore().getProduct.attributeValues &&
                      useProductDetailStore().getProduct.attributeValues
                        .length > 0
                    "
                    class="flex flex-row justify-between items-center mb-4"
                  >
                    <span class="text-gray-500 font-normal text-base">
                      {{
                        useProductDetailStore().getProduct
                          ?.productBaseCategoryLabel === "damazliq-heyvanlar"
                          ? "Cins:"
                          : "Marka:"
                      }}</span
                    >
                    <span class="text-gray-700 font-semibold text-base">
                      {{ useProductDetailStore().getProduct?.marka }}</span
                    >
                  </div>
                  <div class="flex flex-row justify-between items-center mb-4">
                    <span class="text-gray-500 font-normal text-base"
                      >{{ $t("unit_quantity_and_size") }}:</span
                    >
                    <span class="text-gray-700 font-semibold text-base"
                      >{{
                        useProductDetailStore().getProduct?.measurementValue
                      }}
                      {{
                        useProductDetailStore().getProduct?.measurementUnitName
                      }}</span
                    >
                  </div>
                  <div class="flex flex-row justify-between items-center mb-4">
                    <span class="text-gray-500 font-normal text-base"
                      >{{ $t("service_type") }}:</span
                    >
                    <span class="text-gray-700 font-semibold text-base">
                      {{
                        useProductDetailStore().getProduct?.serviceType
                          ? useProductDetailStore().getProduct?.serviceType
                              ?.status
                          : ""
                      }}
                    </span>
                  </div>
                  <div
                    v-for="(attributeValue, index) in useProductDetailStore()
                      .getProduct?.attributeValues"
                    :key="index"
                    class="flex flex-row justify-between items-center mb-4"
                  >
                    <span class="text-gray-500 font-normal text-base"
                      >{{ attributeValue.attributeLabel }}:</span
                    >
                    <span class="text-gray-700 font-semibold text-base">
                      {{ attributeValue.value }}

                      <template
                        v-if="attributeValue.attributeName == 'MILEAGE'"
                      >
                        {{
                          useProductDetailStore().getProduct
                            ?.productTypeName === "Traktor"
                            ? "km"
                            : "saat"
                        }}
                      </template>
                    </span>
                  </div>
                </div>
                <hr class="mt-2 mb-10" />
                <div class="flex flex-row w-auto">
                  <div class="flex flex-col w-full">
                    <div class="mb-7">
                      <ClientOnly fallback-tag="div" fallback="">
                        <a-tooltip placement="topRight">
                          <template #title>
                            <span
                              class="font-normal text-gray-900 text-sm"
                              v-if="
                                useProductDetailStore().getProduct?.store
                                  ?.status?.label === 'ACTIVE'
                              "
                            >
                              {{ $t("seller_other_products") }}
                            </span>
                            <span
                              class="font-normal text-gray-900 text-sm"
                              v-else
                            >
                              {{ $t("store_is_not_active") }}
                            </span>
                          </template>
                          <nuxt-link
                            tag="div"
                            :to="
                              useProductDetailStore().getProduct?.store?.status
                                ?.label == 'ACTIVE'
                                ? `/magazalar/${
                                    useProductDetailStore().getProduct?.store
                                      ?.id
                                  }`
                                : ``
                            "
                            class="inline-flex flex-row items-center justify-start cursor-pointer w-auto"
                          >
                            <span
                              class="w-14 h-14 p-2 rounded-full bg-green-50 flex justify-center items-center"
                            >
                              <img
                                :src="`${baseURL}${
                                  useProductDetailStore().getProduct?.store
                                    ?.logoPath
                                }`"
                                @error="setDefaultStoreImage"
                              />
                            </span>
                            <div
                              class="inline-block font-medium text-lg text-gray-700 ml-2 mr-4 whitespace-normal"
                            >
                              <span class="block">{{
                                useProductDetailStore().getProduct?.store?.name
                              }}</span>
                            </div>
                            <share_icon
                              class="w-9 h-9"
                              v-if="
                                useProductDetailStore().getProduct?.store
                                  ?.status.label === 'ACTIVE'
                              "
                            />
                          </nuxt-link>
                        </a-tooltip>
                      </ClientOnly>
                    </div>
                    <template
                      v-if="
                        useProductDetailStore().getProduct?.store?.status
                          ?.label == 'ACTIVE'
                      "
                    >
                      <div class="flex flex-row">
                        <phone_icon />
                        <a
                          :href="`tel:+${
                            useProductDetailStore().getProduct?.store
                              ?.phoneNumber
                          }`"
                          class="font-normal text-base text-gray-500 ml-6 whitespace-normal"
                          >{{
                            formatPhoneNumber(
                              useProductDetailStore().getProduct?.store
                                ?.phoneNumber
                            )
                          }}</a
                        >
                      </div>

                      <div class="flex flex-row mt-3">
                        <location_icon />
                        <span
                          class="font-normal text-base text-gray-500 ml-6 whitespace-normal"
                          >{{
                            useProductDetailStore().getProduct?.store
                              ?.physicalAddress
                          }}</span
                        >
                      </div>
                    </template>
                    <div class="mt-4">
                      <a-popover
                        :title="$t('delivery_areas')"
                        trigger="click"
                        placement="right"
                      >
                        <template #content>
                          <p
                            v-for="(item, index) in useProductDetailStore()
                              .getProduct?.store?.deliveryCities"
                            :key="index"
                          >
                            {{ item.name }}
                          </p>
                        </template>
                        <a
                          class="font-normal text-sm text-green-600 hover:text-green-700"
                          >{{ $t("see_the_delivery_areas") }}</a
                        >
                      </a-popover>
                    </div>
                    <hr class="mb-5 mt-9" />
                    <div class="flex flex-col w-full h-auto">
                      <div class="flex flex-row w-full h-auto">
                        <div
                          class="flex flex-row items-center justify-between w-28"
                        >
                          <div
                            class="w-6 h-6 rounded-full flex items-center justify-center cursor-pointer"
                          >
                            <span
                              class="w-auto h-auto text-3xl"
                              @click="removeProductInBasket"
                            >
                              -
                            </span>
                          </div>
                          <div>
                            <input
                              v-model="basketProductCount"
                              :disabled="
                                !useProductDetailStore().getProduct
                                  ?.eligibleToShoppingCart ||
                                !useProductDetailStore().getProduct?.isActive
                              "
                              placeholder="0"
                              :min="1"
                              class="outline-none hover:outline-none border-none w-16 text-center"
                              type="number"
                              name=""
                              id=""
                            />
                          </div>
                          <div
                            class="bg-gray-100 w-6 h-6 rounded-full flex items-center justify-center cursor-pointer"
                          >
                            <span
                              class="w-auto h-auto text-2xl"
                              @click="
                                addProductInBasket(
                                  useProductDetailStore().getProduct?.id
                                )
                              "
                            >
                              +
                            </span>
                          </div>
                        </div>
                        <ClientOnly fallback-tag="div" fallback="">
                          <div class="ml-6 w-48 xl:w-full">
                            <a-tooltip
                              v-if="
                                !useProductDetailStore().getProduct
                                  ?.eligibleToShoppingCart ||
                                !useProductDetailStore().getProduct?.isActive
                              "
                              placement="bottom"
                            >
                              <template #title>
                                <span
                                  v-if="
                                    !useProductDetailStore().getProduct
                                      ?.isActive
                                  "
                                  >{{ $t("the_product_is_not_active") }}<br
                                /></span>
                                <template
                                  v-if="
                                    !useProductDetailStore().getProduct
                                      ?.eligibleToShoppingCart
                                  "
                                >
                                  <span
                                    v-if="
                                      useProductDetailStore().getProduct.price
                                    "
                                    >{{ $t("product_is_out_of_stock") }}</span
                                  >
                                  <span v-else>
                                    {{ $t("contact_the_store_to_order") }}
                                  </span>
                                </template>
                              </template>
                              <button
                                class="flex flex-row items-center justify-center w-[223px] max-w-[223px] h-auto font-semibold text-sm bg-opacity-40 bg-green-600 rounded-md m-0 p-0 px-3 py-2 text-white cursor-default"
                              >
                                <basket_icon />
                                <span class="ml-2">
                                  {{ $t("add_to_cart") }}
                                </span>
                              </button>
                            </a-tooltip>
                            <button
                              v-else
                              @click="
                                productAddBasket(
                                  useProductDetailStore().getProduct?.id
                                )
                              "
                              class="flex flex-row items-center justify-center w-[223px] max-w-[223px] h-auto font-semibold text-sm bg-green-600 rounded-md m-0 p-0 px-3 py-2 text-white"
                            >
                              <basket_icon />
                              <span class="w-auto ml-2">
                                {{ $t("add_to_cart") }}
                              </span>
                            </button>
                          </div>
                        </ClientOnly>
                      </div>
                      <div
                        v-if="errorMessage"
                        class="flex flex-row mt-2 justify-start items-center"
                      >
                        <info_icon />
                        <span
                          class="inline-flex text-[#DC2626] font-normal text-sm ml-2"
                        >
                          {{ errorMessage }}</span
                        >
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
          <div class="flex flex-col my-12 xl:my-20">
            <div class="mb-4">
              <ClientOnly fallback-tag="div" fallback="">
                <a-collapse :bordered="false">
                  <a-collapse-panel
                    style="border: 0; overflow: hidden"
                    key="1"
                    class="mb-5"
                    :header="$t('product_description_title')"
                  >
                    <p
                      style="overflow-wrap: anywhere"
                      class="font-medium m-0 p-0 ml-6"
                      v-html="useProductDetailStore().getProduct!.description"
                    ></p>
                  </a-collapse-panel>
                </a-collapse>
              </ClientOnly>
            </div>
            <div>
              <ClientOnly fallback-tag="div" fallback="">
                <a-collapse :bordered="false">
                  <a-collapse-panel
                    style="border: 0; overflow: hidden"
                    v-if="
                    useProductDetailStore().getProduct!.productBaseCategoryLabel !== 'aqro-xidm-tl-r'
                  "
                    key="2"
                    :header="$t('return_conditions')"
                  >
                    <p class="font-medium m-0 p-0 ml-6">
                      {{ $t("product_description") }}
                    </p>
                  </a-collapse-panel>
                </a-collapse>
              </ClientOnly>
            </div>
          </div>
          <div class="flex flex-col mb-16 min-h-[625px]">
            <!-- v-if="showSameProduct" -->
            <div class="text-gray-600 font-medium text-2xl mb-6">
              {{ $t("similar_products") }}
            </div>
            <!-- <div class="w-full xl:w-4/5 mx-auto"> -->
            <section
              class="flex flex-col max-w-[1224px] w-full px-6 xl:px-0 container mx-auto"
            >
              <div class="flex w-full flex-col">
                <a-spin
                  :spinning="useProductsStore().getProductsStatus !== 'success'"
                  size="large"
                  wrapper-class-name="text-green-800"
                >
                  <products
                    :link="'mehsullar'"
                    :products="useProductsStore().getProducts"
                    :classGridSize="false"
                    v-if="useProductsStore().getProducts"
                  />
                </a-spin>
              </div>
              <div
                class="block w-full min-w-full rounded text-center mt-14"
                v-if="
                  useProductsStore().getProducts.size !==
                  useProductsStore().getTotalElements
                "
              >
                <button
                  @click="loadMoreProducts"
                  class="px-8 py-1 rounded text-amber-400 border border-amber-400 hover:text-white bg-white hover:bg-amber-400 text-sm font-semibold"
                >
                  {{ $t("more_products") }}
                </button>
              </div>
            </section>
          </div>
        </div>
      </div>

      <!--///////////////////////////////////// Məhsulun qiymətləndirilməsi //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////-->

      <div
        id="rating"
        class="flex min-w-full w-full h-auto mt-16 pb-10"
        v-if="useProductDetailStore().getProduct.isActive"
      >
        <section class="w-full min-w-full h-auto">
          <h3
            class="m-0 p-0 w-full h-auto block mb-6 text-left text-[#374151] text-2xl font-bold"
          >
            {{ $t("product_rating") }}
          </h3>
          <div
            class="flex justify-start flex-col md:flex-row md:justify-between md:items-center w-full h-auto mb-6"
          >
            <div
              v-if="useProductDetailStore().getProduct.reviewSummary"
              @click="resetFilter"
              class="flex flex-row cursor-pointer p-0.5 items-center order-2 md:order-1 justify-start hover:bg-[#F3F4F6]"
            >
              <span class="text-[#1F2937] text-sm font-medium">{{
                useProductDetailStore().getProduct.reviewSummary &&
                Number(
                  useProductDetailStore().getProduct.reviewSummary.averageRating
                ).toFixed(1)
              }}</span>
              <span class="mx-2.5 -mt-1">
                <a-rate
                  disabled
                  class="m-0 p-0 cursor-pointer"
                  v-model="averageRating"
                  allow-half
                />
              </span>
              <span class="text-[#1F2937] text-sm font-medium">
                ({{
                  useProductDetailStore().getProduct?.reviewSummary!
                    .reviewCount
                }})
              </span>
            </div>
            <div
              class="inline-flex justify-start items-center order-1 md:order-2 w-auto h-auto"
            >
              <div
                v-if="reviewed"
                class="inline-flex justify-center items-center w-auto h-auto"
              >
                <a-tooltip placement="bottom">
                  <template #title>
                    <span class="">{{
                      $t("you_have_already_rated_this_product")
                    }}</span>
                  </template>
                  <button
                    :class="{
                      'text-[#22C55E] border-2 border-[#22C55E] hover:bg-[#22C55E] hover:text-[#fff]':
                        !reviewed,
                      'text-gray-700 border-2 bg-white border-[#E5E7EB] cursor-not-allowed':
                        reviewed,
                    }"
                    class="p-0 m-0 px-3 py-2 mb-6 md:mb-0 inline-flex justify-center items-center max-w-[200px] font-semibold text-sm rounded-md transition-all duration-100 ease-in-out"
                  >
                    {{ $t("rate_product") }}
                  </button>
                </a-tooltip>
              </div>
              <div
                v-else
                class="inline-flex justify-center items-center w-auto h-auto"
              >
                <button
                  :disabled="reviewed"
                  :class="{
                    'text-[#22C55E] border-2 border-[#22C55E] hover:bg-[#22C55E] hover:text-[#fff]':
                      !reviewed,
                    'text-gray-700 border-2 bg-white border-[#E5E7EB]':
                      reviewed,
                  }"
                  @click="showValuationRateModal"
                  class="p-0 m-0 px-3 py-2 mb-6 md:mb-0 inline-flex justify-center items-center max-w-[200px] font-semibold text-sm rounded-md transition-all duration-100 ease-in-out"
                >
                  {{ $t("rate_product") }}
                </button>
              </div>
            </div>
          </div>
          <ul class="flex flex-col justify-start items-start m-0 p-0">
            <li
              v-for="(raiting, index) in raitings"
              :key="index"
              @click="loadFilter(raiting, index)"
              :class="{ 'bg-[#F3F4F6]': selectIndex == index }"
              class="m-0 p-0 flex flex-row hover:bg-[#F3F4F6] w-full min-w-full justify-start items-center cursor-pointer"
            >
              <div
                class="flex flex-row justify-start items-center cursor-pointer"
              >
                <span
                  class="whitespace-nowrap w-auto mx-2.5 -mt-1 -ml-1 cursor-pointer"
                >
                  <ClientOnly fallback-tag="div" fallback="Şəkil yüklənir...">
                    <a-rate
                      disabled
                      class="m-0 p-0 cursor-pointer"
                      v-model:value="raiting.rating"
                    />
                  </ClientOnly>
                </span>
                <span class="w-auto text-[#1F2937] text-xs font-normal">
                  {{ `(${raiting.count})` }}
                </span>
              </div>
              <div
                class="w-full h-[5px] overflow-hidden mx-2.5 rounded-sm bg-[#F3F4F6]"
              >
                <span
                  class="block h-[5px] bg-[#6B7280]"
                  :style="{
                    width: `${raiting.percentage}%`,
                  }"
                ></span>
              </div>
              <span
                class="text-xs w-11 whitespace-nowrap text-[#1F2937] font-normal"
                >{{ raiting.percentage }} %</span
              >
            </li>
          </ul>
          <hr class="w-full min-w-full h-[1px] bg-[#CBD5E1] mt-12 mb-3" />
        </section>
        <!-- <section class="w-full min-w-full h-auto">
          <div class="m-0 p-0 flex flex-col justify-start items-start">
            <Raiting
              v-for="(review, index) in productReview.list"
              :key="index"
              :review="review"
            />
          </div>

          <div
            v-if="productReview.list.length != productReview.totalElements"
            class="flex justify-center items-center mt-9"
          >
            <a-pagination
              size="small"
              :current="productReview.current"
              v-model="productReview.current"
              :total="productReview.totalElements"
              @change="onChangePage"
              :defaultPageSize="5"
              show-less-items
            />
          </div>
        </section> -->
      </div>
    </section>
    <!-- <Page404
        v-else
        title="404"
        :subTitle="$t('no_products_matching_your_search_were_found')"
      /> -->

    <!-- <Valuation
        v-if="isValuationRateModal"
        :product="product"
        @close="hideValuationRateModal"
        @ok="onSuccessOperation"
      />  -->
    <!-- <review_is_succes
        :data="isSuccesData"
        @handleCancel="closeSuccesMessageModal"
        v-if="reviewIsSucces"
      /> -->
  </main>
</template>

<script setup lang="ts">
import type { VueNode } from "ant-design-vue/es/_util/type";
import type { ProductDetail } from "~/utils/types/product";

//variables
const basketProductCount = ref(1);
const favoriteIsActive = ref(false);
let compareFarmerProductList = new Set();
let compareProductList = new Set();
let favoriteProductList = new Set();
const isActive = ref(false);
const averageRating = ref(null);
const errorMessage = ref(undefined);
const { t } = useI18n();
const baseURL = useRuntimeConfig().public.baseURL;
const selectIndex = ref();
const reviewed = ref(true);
const isValuationRateModal = ref(false);
const raitings = reactive([
  { count: 0, percentage: 0, rating: 5 },
  { count: 0, percentage: 0, rating: 4 },
  { count: 0, percentage: 0, rating: 3 },
  { count: 0, percentage: 0, rating: 2 },
  { count: 0, percentage: 0, rating: 1 },
]);
const queryParams = reactive({
  page: useRoute().query.page ? Number(useRoute().query.page) : 0,
  size: useRoute().query.page ? (Number(useRoute().query.page) + 1) * 3 : 3,
  productTypeId: useProductDetailStore().getProduct?.productTypeId,
  sortBy: "id",
  sortDirection: "DESC",
  productTypeLabels: [
    `${useProductDetailStore().getProduct?.productTypeLabel}`,
  ],
  excludedProductId: useProductDetailStore().getProduct?.id,
  productBaseCategoryLabel:
    useProductDetailStore().getProduct?.productBaseCategoryLabel,
});

// methods
useProductDetailStore().fetchProduct(Number(useRoute().params.productdetail));

const handleProducts = async () => {
  if (useProductDetailStore().getProductStatus === "success") {
    try {
      await useProductsStore().resetProducts();
      await useProductsStore().fetchProducts({ ...queryParams, page: 0 });
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  }
};
onMounted(async () => {
  await handleProducts();
});

const loadMoreProducts = function () {
  queryParams.page++;
  queryParams.size = 3;
  useRouter().push({ query: { ...useRoute().query, page: queryParams.page } });
};
const setDefaultImage = async function (event: Event | any) {
  const noImage = await import("@/assets/img/no-image.svg");
  event.target.src = noImage.default;
  event.target.className = "p-16";
};
// watch
watch(
  () => useRoute().query,
  (to: any) => {
    useProductsStore().fetchProducts({ ...queryParams, ...useRoute().query });
  }
  // { flush: "pre", deep: true }
);

// export default {
//   components: {
//     // Page404,
//     basket_icon,
//     scale_logo,
//     monetary_unit_logo,
//     Valuation,
//     Raiting,
//     review_is_succes,
//     favorite_icon,
//     info_icon,
//   },
//   // layout: "landing-page-layout",
//   data() {
//     return {
//       baseURL: urls.getParam("API_BASE_URL"),
//       FetchingProducts: FetchingProducts,
//       addCount: 1,
//       metaData: {},
//       selectIndex: undefined,
//       pagination: {
//         page: 0,
//         current: 1,
//         totalPages: null,
//         totalElements: null,
//       },
//       showSameProduct: true,
//       products: [],
//       basketProductCount: 1,
//       productViewShowButton: false,
//       compareProductList: compareProductListInSet,
//       compareFarmerProductList: compareFarmerProductListInSet,
//       favoriteProductList: favoriteProductList,
// favoriteIsActive: false,
//       reviewIsSucces: false,

//       productReview: {
//         list: [],
//         page: 1,
//         current: 1,
//         totalPages: null,
//         totalElements: null,
//       },
//       averageRating: null,
//       filterData: {
//         rating: undefined,
//       },

//       isValuationRateModal: false,
//       reviewed: true,
//       isSuccesData: {
//         title: this.$t("review_title"),
//         link: this.$t("review_link"),
//         description: this.$t("review_description"),
//         section: "addreview",
//       },
// errorMessage: undefined,
//     };
//   },

//   async asyncData({ $product, route, store }) {
//     const product = await $product.getProduct(
//       Number(route.params.productDetails)
//     );

//     return { product };
//   },
//   computed: {
//     ...mapGetters({
//       loggedIn: "auth/loggedIn",
//     }),
//     images() {
//       if (this.product) {
//         return [
//           this.product.thumbnailPath,
//           ...this.product.productPhotos.map((i) => i.path),
//         ];
//       }
//       return [];
//     },
//   },
//   mounted() {
//     this.$store.commit("setAppHeroShowAndHide", false);
//     this.$store.commit("setBasketModalShow", false);

//     if (this.product) {
//       this.loadProducts();
//       this.setCompare();
//     }
//   },
//   created() {
//     this.product && this.product.isActive && this.reviewInit();
//   },
//   methods: {
const setCompare = function () {
  compareFarmerProductList = new Set();
  // JSON.parse(String(useCookie("compareFarmerProducts").value))
  compareProductList = new Set();
  // JSON.parse(String(useCookie("compareProducts").value) || "")
  favoriteProductList = new Set();
  // JSON.parse(String(useCookie("favoriteProducts").value) || "")
  // this.$store.commit("favorite/setFavoriteProduct", [
  //   ...this.favoriteProductList,
  // ]);
  // this.$store.commit("compare/setCompareFarmerIds", [
  //   ...this.compareFarmerProductList,
  // ]);
  // this.$store.commit("compare/setCompareIds", [...this.compareProductList]);
  if (useAuthenticator().getToken) {
    isActive.value = useProductDetailStore().getProduct.addedToComparisonBasket;
    favoriteIsActive.value =
      useProductDetailStore().getProduct.addedToFavoriteBasket;
  } else {
    if (compareProductList.has(useProductDetailStore().getProduct.id)) {
      isActive.value = true;
    } else {
      isActive.value = false;
    }
    if (favoriteProductList.has(useProductDetailStore().getProduct.id)) {
      favoriteIsActive.value = true;
    } else {
      favoriteIsActive.value = false;
    }
  }
};
setCompare();
//     reviewInit() {
//       this.loadRaitings();
//       if (this.loggedIn) {
//         this.controlReview();
//         if (this.$route.query && this.$route.query.reviewId) {
//           this.isValuationRateModal = true;
//         }
//       } else {
//         this.reviewed = false;
//       }
//       this.loadReviews();
//       this.averageRating = !Number.isInteger(
//         Number(this.product.reviewSummary.averageRating)
//       )
//         ? Number(`${Math.floor(this.product.reviewSummary.averageRating)}.${5}`)
//         : this.product.reviewSummary.averageRating;

//       setTimeout(() => {
//         this.products.length > 0
//           ? (this.showSameProduct = false)
//           : (this.showSameProduct = true);
//       }, 100);
//     },
const loadFilter = function (raiting, index: number) {
  if (selectIndex.value == index) {
    selectIndex.value = undefined;
    // this.filterData.rating = undefined;
  } else {
    selectIndex.value = index;
    // this.filterData.rating = raiting.rating;
  }
  // this.productReview.page = 1;
  // this.loadReviews(this.filterData);
};
const resetFilter = function () {
  selectIndex.value = undefined;
  // this.filterData.rating = undefined;
  // this.productReview.page = 1;
  // this.loadReviews(this.filterData);
};
//     onChangePage(current) {
//       this.productReview.page = current;
//       this.loadReviews(this.filterData);
//     },
//     controlReview() {
//       let ID = Number(this.$route.params.productDetails);
//       this.$store.dispatch("review/controlProductReview", ID).then((res) => {
//         this.reviewed = res.reviewed;
//       });
//     },
//     loadRaitings() {
//       let ID = Number(this.$route.params.productDetails);
//       this.$store.dispatch("review/getRaitings", ID).then((res) => {
//         this.raitings = this.raitings.map((el) => {
//           res.reviews.filter((rating) => {
//             if (el.rating == rating.rating) {
//               el = rating;
//             }
//           });
//           return el;
//         });
//       });
//     },
//     loadReviews(filter) {
//       let filterData = {
//         page: this.productReview.page - 1,
//         size: 5,
//         productId: Number(this.$route.params.productDetails),
//       };
//       this.$store
//         .dispatch("review/getReviews", { ...filterData, ...filter })
//         .then((response) => {
//           this.productReview.list = response.content.map((item) => {
//             return {
//               ...item,
//               store: this.product.store,
//             };
//           });
//           this.productReview.totalElements = response.totalElements;
//           this.productReview.totalPages = response.totalPages;
//         });
//     },
//     closeSuccesMessageModal() {
//       this.reviewIsSucces = false;
//     },
//     hideValuationRateModal(val) {
//       this.isValuationRateModal = false;
//       this.$router.push({
//         path: this.$route.fullPath,
//         query: { reviewId: undefined },
//       });
//       if (val) {
//         setTimeout(() => {
//           this.reviewIsSucces = true;
//         }, 100);
//         this.controlReview();
//         this.$product
//           .getProduct(Number(this.$route.params.productDetails))
//           .then((res) => {
//             this.product = res;
//             this.loadReviews(this.filterData);
//           });
//       }
//     },
const showValuationRateModal = function (id: number) {
  useRouter().push({
    path: useRouter().currentRoute.value.fullPath,
    query: { reviewId: id },
  });
  // useAuthenticator().getToken
  //   ? (isValuationRateModal.value = true)
  //   : this.$store.commit("setLoginRequiredModal", true);
};
//     onSuccessOperation(val) {
//       this.hideValuationRateModal(val);
//     },
const toggleProductToFavorite = function (
  productDetail: ProductDetail,
  event: Event | any
) {
  event.stopPropagation();
  if (useAuthenticator().getToken) {
    productDetail.addedToFavoriteBasket = !productDetail.addedToFavoriteBasket;
    favoriteIsActive.value = productDetail.addedToFavoriteBasket;
    if (!productDetail.addedToFavoriteBasket) {
      favoriteProductList.delete(productDetail.id);
      // this.$store.dispatch("favorite/removeProductFromFavorite", {
      //   productId: productDetail.id,
      // });
      favoriteIsActive.value = false;
    } else {
      favoriteProductList.add(productDetail.id);
      // this.$store.dispatch("favorite/addProductToFavorite", {
      //   productId: productDetail.id,
      // });
      favoriteIsActive.value = true;
    }
  } else {
    if (favoriteProductList.has(productDetail.id)) {
      favoriteProductList.delete(productDetail.id);
      favoriteIsActive.value = false;
    } else {
      favoriteProductList.add(productDetail.id);
      favoriteIsActive.value = true;
    }
  }
  // this.$store.commit("favorite/setFavoriteProductIds", productDetail.id);
};
const toggleProductToCompare = function (
  productDetail: ProductDetail,
  event: Event | any
) {
  event.stopPropagation();
  if (useAuthenticator().getToken) {
    productDetail.addedToComparisonBasket =
      !productDetail.addedToComparisonBasket;
    if (!productDetail.addedToComparisonBasket) {
      compareProductList.delete(productDetail.id);
      // this.$store.dispatch("compare/removeProductFromCompare", {
      //   productId: productDetail.id,
      //   farmerProduct: false,
      // });
      isActive.value = false;
    } else {
      compareProductList.add(productDetail.id);
      // this.$store.dispatch("compare/addProductToCompare", {
      //   productId: productDetail.id,
      //   farmerProduct: false,
      // });
      isActive.value = true;
    }
  } else {
    if (compareProductList.has(productDetail.id)) {
      compareProductList.delete(productDetail.id);
      isActive.value = false;
    } else {
      compareProductList.add(productDetail.id);
      isActive.value = true;
    }
  }
  if (isActive.value) {
    notification["success"]({
      message: t("the_product_has_been_to_the_comparison"),
      placement: "bottomRight",
      duration: 3,
      btn: (h: VueNode) => {
        return h(
          "a-button",
          {
            props: {
              type: "primary",
              size: "small",
            },
            on: {
              click: () => {
                notification["close"];
                useRouter().push({
                  path: "/mehsullarin-muqayisesi",
                });
              },
            },
          },
          `${t("comparison_section")}`
        );
      },
    });
  }
  // this.$store.commit("compare/setCompareProductIds", productDetail.id);
};
//     formatPhoneNumber,
const productAddBasket = function (id: number) {
  errorMessage.value = undefined;
  // useAuthenticator().getToken
  //   ? this.$store
  //       .dispatch("basket/addBasketIncrease", {
  //         productId: id,
  //         count: this.basketProductCount,
  //       })
  //       .then((response) => {
  //         console.log("Status: ", response);
  //         this.basketProductCount = 1;
  //         notification["success"]({
  //           message: this.$t("succes"),
  //           description: this.$t("the_product_has_been_added_to_the_cart"),
  //         });
  //       })
  //       .catch((err) => {
  //         this.errorMessage = err.response.data.message;
  //       })
  //   : this.$store.commit("setLoginRequiredModal", true);
};

const removeProductInBasket = function (event: Event) {
  if (
    !useProductDetailStore().getProduct.eligibleToShoppingCart ||
    !useProductDetailStore().getProduct.isActive
  ) {
    return false;
  }
  if (basketProductCount.value < 2) {
    basketProductCount.value = 1;
  } else {
    basketProductCount.value--;
  }
};
const addProductInBasket = function (id: number) {
  if (
    !useProductDetailStore().getProduct.eligibleToShoppingCart ||
    !useProductDetailStore().getProduct.isActive
  ) {
    return false;
  }
  basketProductCount.value++;
};
//     loadMoreProducts() {
//       this.pagination.page++;
//       this.loadProducts();
//     },
//     loadProducts() {
//       this.$wait.start(FetchingProducts);
//       this.$product
//         .getProductList({
//           page: this.pagination.page,
//           size: 3,
//           productTypeId: this.product.productTypeId,
//           // sortList: ["id", "DESC"],
//           sortBy: "id",
//           sortDirection: "DESC",
//           productTypeLabels: [`${this.product.productTypeLabel}`],
//           excludedProductId: this.product.id,
//           productBaseCategoryLabel: this.product.productBaseCategoryLabel,
//           // cityIds: this.loggedUser?.city.id,
//         })
//         .then((response) => {
//           this.products.push(...response.products);
//           this.pagination.totalElements = response.metadata.totalElements;
//           this.pagination.totalPages = response.metadata.totalPages;
//           this.$nuxt.$emit("checkNewProducts", {});
//         })
//         .finally(() => {
//           this.$wait.end(FetchingProducts);
//         });
//     },
//     // changeData(index) {
//     //   this.selectIndex = index;
//     // },

const setDefaultStoreImage = function (event: Event | any) {
  event.target.src = require(`@/assets/img/all_logos/store.svg`);
  event.target.className = "p-1";
};
const isValidImage = function (image: any) {
  return image;
};
// },
// };
</script>

<style scoped>
.ant-pagination.mini .ant-pagination-prev .ant-pagination-item-link,
.ant-pagination.mini .ant-pagination-next .ant-pagination-item-link {
  display: flex;
  justify-content: center;
  align-items: center;
}

.ant-popover-inner-content {
  height: 320px;
  overflow: hidden;
  overflow-y: scroll;
}

.ant-btn-primary,
.ant-btn-primary:active,
.ant-btn-primary:focus,
.ant-btn-primary:hover {
  color: #fff;
  background-color: #10b981;
  border-color: #10b981;
}

.ant-modal-confirm-info .ant-modal-confirm-body > .anticon {
  color: #10b981;
}

:deep(.slick-slide) {
  max-height: 673px !important;
  overflow: hidden;
}

:deep(.slick-arrow.custom-slick-arrow) {
  width: 25px;
  height: 25px;
  font-size: 25px;
  color: #fff;
  background-color: rgba(255, 255, 255, 0.7);
  transition: ease all 0.3s;
  /* opacity: 0.3; */
  border-radius: 6px;
  z-index: 1;
}
:deep(.slick-arrow.custom-slick-arrow:before) {
  display: none;
}
:deep(.slick-arrow.custom-slick-arrow:hover) {
  color: #fff;
  /* opacity: 0.5; */
}

:deep(.slick-slide h3) {
  color: #fff;
}

.ant-modal-body >>> p {
  font-size: 14px;
  line-height: 22px;
  font-weight: 400;
  color: #262626;
}

.ant-modal-body >>> .ant-modal-confirm-title {
  font-size: 16px;
  line-height: 22px;
  font-weight: 500;
  color: #262626;
}

div.scroll::-webkit-scrollbar {
  display: none;
}

div.scroll {
  -ms-overflow-style: none; /* IE and Edge */
  scrollbar-width: none; /* Firefox */
}
/* 
.responsive-class {
  max-height: 624px;
} */

/* @media only screen and (max-width: 1280px) {
  .responsive-class {
    width: 100%;
    min-width: 100%;
    min-height: auto;
  }
}

@media only screen and (min-width: 1280px) {
  .responsive-class {
    width: 100%;
    min-width: 704px;
    max-width: 704px;
    max-height: 624px;
    min-height: 624px;
    height: 624px;
  }
} */

img {
  margin-left: auto;
  margin-right: auto;
}

.ant-tooltip-inner {
  background-color: white !important;
  color: black;
}

.ant-tooltip-arrow:before {
  background-color: white !important;
}

.ant-collapse > .ant-collapse-item > .ant-collapse-header {
  color: #374151;
}
</style>
