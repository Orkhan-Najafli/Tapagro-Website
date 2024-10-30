export default defineNuxtPlugin((nuxtApp) => {
  // const authStore = useAuthStore() // Auth storuna uyğun olaraq daxil edin.
  //   nuxtApp.$fetch.onResponseError(async ({ response, request, options }) => {
  //     // Əgər xəta 403-dürsə
  //     if (response.status === 403) {
  //       try {
  //         // Tokeni yenilə
  //         //   await authStore.refreshToken()
  //         // Yenidən eyni sorğunu göndər
  //         options.headers["Authorization"] = `Bearer ${authStore.token}`;
  //         return $fetch(request, options);
  //       } catch (refreshError) {
  //         // Refresh token işləmir və ya müddəti bitibsə, çıxış et
  //         //   authStore.logout()
  //         throw refreshError;
  //       }
  //     }
  //   });
});
