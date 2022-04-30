<template>
  <div id="app">
    <router-view/>
  </div>
</template>
<script>
export default {
  name: 'App',
  mounted() {
    if (!this.$store.state.user) {
      this.$router.push('/login')
    }
  },
}
</script>
