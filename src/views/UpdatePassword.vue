<template>
  <div id="repass">
    <div class="login-page">
      <div id="container">
        <div id="login-page">
          <div class="login-header">
            <div class="app-logo"></div>
          </div>
          <div class="login-form">
            <div class="login-desc">Введите новый пароль для аккаунта. Минималная длина 8 символов.</div>
            <form action="#" method="post" class="form-modal" @submit.prevent="submit">
              <div class="form-control">
                <label for="old_password">Старый пароль:</label>
                <input type="password" name="pass_two" id="old_password" v-model="oldPassword">
              </div>
              <div class="form-control">
                <label for="password">Новый пароль:</label>
                <input type="password" name="password" id="password" v-model="password">
              </div>
              <div class="form-control">
                <label for="verify_pass">Подтвердите пароль:</label>
                <input type="password" name="pass_two" id="verify_pass" v-model="confirmation">
              </div>
              <div class="form-control submit-btn">
                <input type="submit" value="Сохранить">
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { minLength, required, sameAs } from 'vuelidate/src/validators'
export default {
  name: 'UpdatePassword',
  data: () => ({
    password: '',
    confirmation: '',
    oldPassword: ''
  }),
  validations: {
    password: {
      required,
      minLength: minLength(8),
    },
    confirmation: {
      required,
      minLength: minLength(8),
      sameAs: sameAs('password'),
    },
    oldPassword: {
      required,
      minLength: minLength(8),
    }
  },
  methods: {
    async submit() {
      if (this.$v.$invalid) {
        this.$v.$touch()
        if (this.$v.password.$invalid) {
          Toast.fire('Пароль должен быть не менее 8 символов.', 'error')
        } else if (this.$v.password.$invalid) {
          Toast.fire('Поле Пароль обязательно для заполнения', '', 'error')
        } else if (this.$v.confirmation.$invalid) {
          Toast.fire('Поле Подтверждение пароля обязательно для заполнения', '', 'error')
        } else if (this.$v.confirmation.$error.sameAs) {
          Toast.fire('Пароли не совпадают', '', 'error')
        }
        return
      }
      try {
        await this.$store.dispatch('updatePassword', {
          password: this.password,
          password_confirmation: this.confirmation,
          old_password: this.oldPassword,
        })
        Toast.fire('Пароль успешно изменен', '', 'success')
        this.$router.push('/user-page')
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