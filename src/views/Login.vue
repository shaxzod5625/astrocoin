<template>
  <div class="login-page">
    <div id="container">
      <div id="login-page">
        <div class="login-header">
          <div class="app-logo"></div>
        </div>
        <div class="login-form">
          <div class="login-desc">Astrum ID - Один аккаунт для всему сервиса академии</div>
          <form action="#" class="form-modal" @submit.prevent="submit">
            <div class="form-control">
              <label for="email">E-mail:</label>
              <input type="text" name="" id="email" v-model="email">
            </div>
            <div class="form-control">
              <label for="password">Password:</label>
              <input type="password" name="" id="password" v-model="password">
            </div>
            <router-link to="/register" class="forgot-pass">Регистрация</router-link>
            <router-link to="/recover" class="forgot-pass">Забыли пароль?</router-link>
            <div class="form-control submit-btn">
              <input type="submit" value="Войти">
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { required, minLength, email } from 'vuelidate/src/validators'
export default {
  name: "Login",
  data: () => ({
    email: '',
    password: ''
  }),
  mounted() {
    if (localStorage.getItem('token')) {
      this.$router.push('/')
    }
  },
  validations: {
    email: { required, email },
    password: { required, minLength: minLength(6) }
  },
  methods: {
    async submit() {
      if (this.$v.$invalid) {
        this.$v.$touch()
        if (this.$v.email.$invalid) {
          Toast.fire('Поле E-mail обязательно для заполнения', '', 'error')
        } else if (this.$v.password.$invalid) {
          Toast.fire('Поле Password обязательно для заполнения', '', 'error')
        }
        return
      }
      try {
        await this.$store.dispatch('login', {
          email: this.email,
          password: this.password
        })
        this.$router.push('/')
        console.log('sadfaddas');
      } catch (e) {
        if (this.$store.state.errors) {
          for (const key in this.$store.state.errors) {
            Toast.fire(this.$store.state.errors[key][0], '', 'error');
          }
        } else {
          Toast.fire(this.$store.state.error, '', 'error')
        }
      }
    }
  }
}
</script>