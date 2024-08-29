// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  pinia: {
    storesDirs: ["./stores/**", "./custom-folder/stores/**"],
  },
  runtimeConfig: {
    public: {
      baseURL:
        process.env.NUXT_PUBLIC_BASE_URL ||
        "https://api-staging.tapagro.az/tapagro/api",
    },
  },
  modules: [
    "@pinia/nuxt",
    "@nuxtjs/i18n",
    "@ant-design-vue/nuxt",
    "@ant-design-vue/nuxt",
  ],
  i18n: {
    lazy: true,
    langDir: "locales/",
    defaultLocale: "az",
    // fallbackLocale: "az",
    detectBrowserLanguage: {
      useCookie: true,
      cookieKey: "lang",
      // secure: true,
    },
    locales: [
      {
        code: "az",
        name: "Azərbaycan",
        iso: "az-AZ",
        file: "az-AZ.js",
      },
      {
        code: "en",
        name: "English",
        iso: "en-US",
        file: "en-US.js",
      },
      {
        code: "ru",
        name: "Rus",
        iso: "ru-RU",
        file: "ru-RU.js",
      },
    ],
    // vueI18n: {
    //   fallbackLocale: "az",
    // },
  },
  compatibilityDate: "2024-04-03",
  devtools: { enabled: true },
  css: ["~/assets/css/main.css"],
  postcss: {
    plugins: {
      tailwindcss: {},
      autoprefixer: {},
    },
  },
});
