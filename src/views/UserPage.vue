<template>
  <div id="user-app">
    <div class="user-page">
      <router-link to="/" class="close-page">
        <i class="ai ai-arrow-back"></i>
        <div class="close-title">Back</div>
      </router-link>
      <div class="user-photo">
        <img :src="require(`../assets/${user.photo || 'default-user-pic.png'}`)" alt="" class="user-pic">
        <div class="edit-user-pic">
          <i class="ai ai-camera-outline"></i>
          <input type="file">
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