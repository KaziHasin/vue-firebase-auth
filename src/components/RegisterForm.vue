<template>
  <form-layout title="Sign up to your account">
    <div class="mt-10 sm:mx-auto sm:w-full sm:max-w-sm shadow-lg p-4 rounded">
      <form
        class="space-y-6"
        action="#"
        method="POST"
        @submit.prevent="handleRegister">
        <div>
          <label
            for="email"
            class="block text-sm font-medium leading-6 text-gray-900"
            >User Name</label
          >
          <div class="mt-2">
            <input
              id="username"
              name="username"
              type="text"
              autocomplete="text"
              v-model="username"
              required
              class="block w-full rounded-md border-0 ps-1 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
          </div>
        </div>
        <div>
          <label
            for="email"
            class="block text-sm font-medium leading-6 text-gray-900"
            >Email address</label
          >
          <div class="mt-2">
            <input
              id="email"
              name="email"
              type="email"
              autocomplete="email"
              v-model="email"
              required
              class="block w-full rounded-md border-0 ps-1 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
          </div>
        </div>
        <div>
          <label
            for="phone"
            class="block text-sm font-medium leading-6 text-gray-900"
            >Phone</label
          >
          <div class="mt-2">
            <input
              id="phone"
              name="phone"
              type="number"
              autocomplete="phone"
              v-model="phone"
              required
              class="block w-full rounded-md border-0 ps-1 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
          </div>
        </div>

        <div>
          <div class="flex items-center justify-between">
            <label
              for="password"
              class="block text-sm font-medium leading-6 text-gray-900"
              >Password</label
            >
          </div>
          <div class="mt-2">
            <input
              id="password"
              name="password"
              type="password"
              autocomplete="current-password"
              v-model="password"
              required
              class="block w-full rounded-md border-0 ps-1 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
          </div>
        </div>

        <div>
          <button
            type="submit"
            class="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
            Sign in
          </button>
        </div>
      </form>

      <p class="mt-10 text-center text-sm text-gray-500">
        Have already account?
        <router-link
          to="/"
          class="font-semibold leading-6 text-indigo-600 hover:text-indigo-500"
          >Sign In</router-link
        >
      </p>
    </div>
  </form-layout>
</template>

<script>
import FormLayout from "./FormLayout.vue";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth } from "../firebase/init.js";
export default {
  components: {
    FormLayout,
  },

  data() {
    return {
      username: "",
      email: "",
      phone: "",
      password: "",
    };
  },

  methods: {
    handleRegister() {
      createUserWithEmailAndPassword(auth, this.email, this.password)
        .then(() => {
          updateProfile(auth.currentUser, {
            displayName: this.username,
            phoneNumber: this.phone,
          }).then(() => {
            console.log(auth.currentUser.displayName);
            console.log(auth.currentUser.phoneNumber);
            this.username = "";
            this.email = "";
            this.phone = "";
            this.password = "";
            this.$router.replace("/dashboard");
          });
        })
        .catch((error) => {
          console.log(error.message);
        });
    },
  },
};
</script>

<style></style>
