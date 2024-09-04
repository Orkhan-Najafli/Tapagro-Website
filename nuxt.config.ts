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
    "@vee-validate/nuxt",
  ],

  compatibilityDate: "2024-04-03",
  devtools: { enabled: true },
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
});
