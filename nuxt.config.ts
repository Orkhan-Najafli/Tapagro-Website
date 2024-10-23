// https://nuxt.com/docs/api/configuration/nuxt-config

const envFile = `.env.${process.env.NODE_NUXT_PUBLIC_BASE_URL || "staging"}`;
require("dotenv").config({ path: envFile });
export default defineNuxtConfig({
  pinia: {
    storesDirs: ["./stores/**", "./custom-folder/stores/**"],
  },
  runtimeConfig: {
    public: {
      baseURL:
        process.env.NUXT_PUBLIC_BASE_URL ||
        "https://api-staging.tapagro.az/tapagro/api",
      RECAPTCHA_SITE_KEY: process.env.RECAPTCHA_SITE_KEY,
    },
  },
  modules: [
    "@pinia/nuxt",
    "@nuxtjs/i18n",
    "@ant-design-vue/nuxt",
    "@ant-design-vue/nuxt",
    "@vee-validate/nuxt",
    "@nuxtjs/sitemap",
    "@nuxtjs/seo",
  ],

  compatibilityDate: "2024-04-03",
  devtools: {
    enabled: true,

    timeline: {
      enabled: true,
    },
  },
  css: ["~/assets/css/main.css"],
  postcss: {
    plugins: {
      tailwindcss: {},
      autoprefixer: {},
    },
  },
  components: [
    {
      path: "@/components",
      pathPrefix: false,
    },
  ],
  devServer: {
    host: "127.0.0.1", // or '0.0.0.0' for external access
    port: 4572, // specify the port you want to use
  },
  site: {
    url: "https://tapagro.az",
    name: "Tapagro",
    trailingSlash: false,
    i18n: true,
    // cacheMaxAgeSeconds: 14400, // 4 hour
    // description: "Welcome to Tapagro site!",
    // defaultLocale: "az",
  },
});