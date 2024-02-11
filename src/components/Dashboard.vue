<template>
  <div class="main">
    <div class="navbar bg-blue-800 p-4">
      <nav class="grid grid-cols-2 text-white container">
        <h2 class="ms-4">Dashboard</h2>
        <ul class="flex justify-end">
          <li class="mx-6 profile cursor-pointer">
            <router-link to="/dashboard/profile">
              {{ displayName ? displayName : "Profile" }}
            </router-link>
          </li>
          <li @click="logout" class="cursor-pointer">Logout</li>
        </ul>
      </nav>
    </div>

    <h1 class="mt-4 text-center text-4xl font-bold">
      Welcome {{ displayName }}!
    </h1>

    <router-view :currentUser="currentUser"></router-view>
  </div>
</template>

<script>
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../firebase/init.js";
import { signOut } from "firebase/auth";
export default {
  data() {
    return {
      displayName: null,
      currentUser: null,
    };
  },

  mounted() {
    // Listen for changes in the authentication state
    onAuthStateChanged(auth, (user) => {
      this.currentUser = user;
      this.displayName = user.displayName;
      console.log(this.displayName);
    });
  },
  methods: {
    logout() {
      const logoutConfirm = window.confirm("Are you sure want to logout?");

      if (logoutConfirm) {
        signOut(auth).then(() => {
          this.$router.replace("/");
        });
      }
    },
  },
};
</script>

<style></style>
