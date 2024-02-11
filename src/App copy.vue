<script>
import {
  collection,
  addDoc,
  updateDoc,
  doc,
  getDocs,
  getDoc,
  deleteDoc,
} from "firebase/firestore";
import db from "./firebase/init";
import LoginForm from "./components/LoginForm.vue";

export default {
  components: { LoginForm },
  data() {
    return {
      users: [],
    };
  },
  created() {
    // this.createUser();
    // this.updateUser();
    this.getUsers();
    this.getUser();
  },

  methods: {
    // async createUser() {
    //   const collectionRef = collection(db, "users");

    //   const userData = {
    //     name: "kazi Hasin",
    //     email: "akashkazi012gmail.com",
    //     password: "123456",
    //   };

    //   const docRef = await addDoc(collectionRef, userData);

    //   console.log("New user has created", docRef.id);
    // },

    // async updateUser() {
    //   const collectionRef = collection(db, "users");
    //   const documentId = "2KsQEUVrKKoUIW71dGU9";
    //   const documentRef = doc(collectionRef, documentId);
    //   const userDataToUpdate = {
    //     name: "Kazi ds Hasin",
    //     email: "kazi@12.com",
    //     password: "123456",
    //   };
    //   // Update the document with the new data
    //   await updateDoc(documentRef, userDataToUpdate);
    //   console.log("Document was updated with ID:", documentId);
    // },

    async getUsers() {
      const collectionRef = collection(db, "users");

      const querySnapshot = await getDocs(collectionRef);

      querySnapshot.forEach((doc) => {
        this.users.push({ id: doc.id, ...doc.data() });
      });

      // console.log(this.users);
    },

    async getUser() {
      const collectionRef = collection(db, "users");

      const userId = "2KsQEUVrKKoUIW71dGU9";
      const documentRef = doc(collectionRef, userId);
      const userDataSnapshot = await getDoc(documentRef);

      if (userDataSnapshot.exists()) {
        const user = { id: userDataSnapshot.id, ...userDataSnapshot.data() };
        console.log("user data", user);
      } else {
        console.log("User not found");
      }
    },

    async deleteUser(userId) {
      const collectionRef = collection(db, "users");

      const documentRef = doc(collectionRef, userId);

      try {
        await deleteDoc(documentRef);
        console.log("user deleted");
        this.users = [];
        this.getUsers();
      } catch (error) {
        console.log(error);
      }
    },
  },
};
</script>

<template>
  <div>firebase auth</div>

  <table border>
    <tr>
      <th>Id</th>
      <th>Name</th>
      <th>Email</th>
      <th>Password</th>
      <th>Action</th>
    </tr>
    <tr v-for="user in users" :key="user.id">
      <td>
        <strong>{{ user.id }}</strong>
      </td>
      <td>
        <strong>{{ user.name }}</strong>
      </td>
      <td>
        <strong>{{ user.email }}</strong>
      </td>
      <td>
        <strong>{{ user.password }}</strong>
      </td>
      <td>
        <button @click="deleteUser(user.id)">Delete</button>
      </td>
    </tr>
  </table>

  <login-form />
</template>

<style scoped></style>
