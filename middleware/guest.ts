export default defineNuxtRouteMiddleware((to, from) => {
  if (useAuthenticator().getToken) {
    return navigateTo("/");
  }
  // if (store.getters['auth/loggedIn']) {
  //     return redirect('/')
  //   }
});
