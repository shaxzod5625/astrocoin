<template>
  <div>
    <div id="container">
      <div id="login-page">
        <div class="login-header">
          <div class="app-logo"></div>
        </div>
        <div class="login-form">
          <div class="login-desc">Введите E-mail чтобы получить новый пароль для доступа к аккаунту</div>
          <form action="#" method="post" class="form-modal" @submit.prevent="submit">
            <div class="form-control">
              <label for="email">E-mail:</label>
              <input type="email" name="" id="email" v-model="email">
            </div>
            <router-link to="/login" class="forgot-pass">Войти</router-link>
            <router-link to="/register" class="forgot-pass">Регистрация</router-link>
            <div class="form-control submit-btn">
              <input :disabled="success == true" type="submit" value="Сбросить">
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { required, email } from 'vuelidate/src/validators'
export default {
  name: 'Recover',
  data: () => ({
    email: '',
    success: false,
  }),
  validations: {
    email: {
      required,
      email
    },
  },
  methods: {
    async submit () {
      if (this.$v.$invalid) {
        this.$v.$touch()
        if (this.$v.email.$invalid) {
          Toast.fire('Некорректный E-mail', '', 'error')
        }
        return
      }
      try {
        await this.$store.dispatch('resetPassword', {
          email: this.email
        })
        Toast.fire('Ссылка на сброс отправлено вам на почту', '', 'success')
        this.$router.push('/repass')
        this.email = ''
        this.success = true
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