<template>
  <div
    style="max-width: 1224px"
    class="container mx-auto mt-24 px-6 md:p-0 m-0"
  ></div>
</template>

<script setup lang="ts">
console.log("gettoken: ", useAuthenticator().getToken.access);
ref(useCookie("token")).value = useAuthenticator().getToken.access;
useAuthenticator().login();
definePageMeta({
  middleware: ["guest"],
});

// export default {
// layout: "blank",
// created() {
// const {
//   query: { code, state },
// } = this.$route;

// if (code && state) {
//   this.login({ code, state });
// }
// },
// methods: {
// login(data) {
//   process.browser &&
//     this.$store
//       .dispatch("auth/login", data)
//       .then((res) => {
//         this.$store.dispatch("auth/getUserDetail").then((response) => {
//           const redirect = Cookies.get("redirect");
//           if (redirect) {
//             Cookies.remove("redirect");
//             location.href = redirect;
//           } else {
//             this.$router.push("/");
//           }
//         });
//       })
//       .catch(() => {
//         this.$router.push("/");
//       });
// },
// },
// };
</script>
