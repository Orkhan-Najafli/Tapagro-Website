<template>
  <div>
    <ValidationObserver ref="form">
      <h2>Integrating i18n with VeeValidate: vue-i18n</h2>
      <ValidationProvider name="email" rules="required|email" v-slot="{ errors }">
        <input type="text" v-model="email" placeholder="type some email">
        <span>{{ errors[0] }}</span>
      </ValidationProvider>

      <ValidationProvider name="password" rules="required|min:6" v-slot="{ errors }">
        <input type="password" v-model="password" placeholder="type something">
        <span>{{ errors[0] }}</span>
      </ValidationProvider>
    </ValidationObserver>

    <button @click="switchLoc">Switch Locale</button>
  </div>
</template>

<script>
import { ValidationProvider, ValidationObserver } from "vee-validate";

export default {
  name: "Example",
  components: {
    ValidationProvider,
    ValidationObserver
  },
  data: () => ({
    email: "",
    password: ""
  }),
  methods: {
    async submit() {
      console.log("email submitted!");
    },
    switchLoc() {
      // switch the locale.
      this.locale = this.locale === "en" ? "ar" : "en";
      // you could also import 'localize' and call it.
      // localize('ar');

      // re-validate to re-generate the messages.
      this.$refs.form.validate();
    }
  }
};
</script>


<style>
span {
  display: block;
  margin-top: 20px;
}

input + span {
  margin-top: 3px;
}
</style>
