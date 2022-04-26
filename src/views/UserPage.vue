<template>
  <div id="user-app">
    <div class="user-page">
      <div class="user-photo">
        <img src="../assets/default-user-pic.png" alt="" class="user-pic">
        <div class="edit-user-pic">
          <i class="ai ai-camera-outline"></i>
        </div>
      </div>
      <div class="user-fullname">{{ user.name }} {{ user.last_name }}</div>
      <div class="user-email">{{ user.email }}</div>
      <div class="user-tools">
        <ul class="tools-items">
          <li><i class="ai ai-person-outline"></i>{{ user.qwasar }}</li>
          <li><i class="ai ai-school-outline"></i>{{ user.stack }}</li>
          <li><i class="ai ai-wallet-outline"></i>{{ user.wallet }}</li>
          <li><i class="ai ai-key-outline"></i> Изменить пароль</li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "UserPage",
  data: () => ({
    user: {}
  }),
  async mounted() {
    if (!this.$store.state.user) {
      await this.$store.dispatch('getUser')
    }
    this.user = this.$store.state.user
  },
  methods: {

  }
}
</script>