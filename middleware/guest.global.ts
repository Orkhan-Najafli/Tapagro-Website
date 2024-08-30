export default defineNuxtRouteMiddleware((to, from) => {
  if (to.path !== "/") {
    return navigateTo("/");
  }
  // if (store.getters['auth/loggedIn']) {
  //     return redirect('/')
  //   }
});
