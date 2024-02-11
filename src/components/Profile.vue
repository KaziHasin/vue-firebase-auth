<template>
  <main>
    <div class="card" v-if="currentUser">
      <h2>Profile</h2>

      <div>
        Name: <span>{{ currentUser.displayName }}</span>
      </div>
      <div>
        Email: <span>{{ currentUser.email }}</span>
      </div>
      <div></div>
    </div>
    <div v-else>Loading...</div>
  </main>
</template>

<script>
export default {
  props: {
    currentUser: Object,
  },
};
</script>

<style scoped>
main {
  margin-top: 1.4rem;
  display: flex;
  justify-content: center;
  align-items: center;
}

main .card {
  width: 360px;
  background: white;
  border-radius: 5px;
  box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
  padding: 14px;
}

main .card h2 {
  text-align: center;
  font-size: 1.8rem;
  font-weight: 600;
}

main .card div {
  display: flex;
  justify-content: space-between;
  margin: 20px 0;
}
</style>
