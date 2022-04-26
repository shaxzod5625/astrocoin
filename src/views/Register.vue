<template>
  <div id="container">
    <div id="signup-page">
      <div class="signup-header">
        <div class="app-logo"></div>
      </div>
      <form action="#" method="post" class="form-modal" @submit.prevent="submit">
        <div class="signup-form">
          <div class="signup-desc">Astrum ID - Один аккаунт для всему сервиса академии</div>
          <div class="double-input">
            <div class="form-control">
              <label for="first_name">First Name:</label>
              <input type="text" name="name" id="first_name" v-model="name">
            </div>
            <div class="form-control">
              <label for="last_name">Last Name:</label>
              <input type="text" name="last_name" id="last_name" v-model="lastName">
            </div>
          </div>
          <div class="form-control">
            <label for="email">E-mail:</label>
            <input type="email" name="email" id="email" v-model="email">
          </div>
          <div class="form-control">
            <label for="qlogin">Qwasar Login:</label>
            <input type="text" name="qlogin" id="qlogin" v-model="qwasarLogin">
          </div>
          <div class="form-control">
            <label for="phone">Phone:</label>
            <input type="number" name="phone" id="phone" v-model="number">
          </div>
          <div class="form-control">
            <label for="stack">Stack:</label>
            <select name="stack" id="stack" v-model="stack">
              <option :value="item.id" v-for="item in stacks" :key="item.id">{{ item.title }}</option>
            </select>
          </div>
          <div class="double-input">
            <div class="form-control">
              <label for="password">Password:</label>
              <input type="password" name="name" id="password" v-model="password">
            </div>
            <div class="form-control">
              <label for="last_name">Confirm:</label>
              <input type="password" name="last_name" id="password_confirm" v-model="confirm">
            </div>
          </div>
          <div class="form-control submit-btn">
            <input type="submit" value="Зарегистрировать">
          </div>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import { required, sameAs, minLength, email } from 'vuelidate/src/validators'
export default {
  name: "Register",
  data: () => ({
    name: '',
    lastName: '',
    email: '',
    qwasarLogin: '',
    number: '',
    stack: '',
    stacks: null,
    password: '',
    confirm: ''
  }),
  async mounted() {
    if (localStorage.getItem('token')) {
      this.$router.push('/')
    }
    await this.$store.dispatch('getStack')
    this.stacks = this.$store.state.stacks
  },
  validations: {
    name: { required },
    lastName: { required },
    email: { required, email },
    qwasarLogin: { required },
    number: { required },
    stack: { required },
    password: { required, minLength: minLength(8) },
    confirm: { required, sameAsPassword: sameAs('password') }
  },
  methods: {
    async submit() {
      if (this.$v.$invalid) {
        this.$v.$touch()
        if (this.$v.name.$invalid) {
          Toast.fire('Поле Имя обязательно для заполнения', '', 'error')
        } else if (this.$v.lastName.$invalid) {
          Toast.fire('Поле Фамилия обязательно для заполнения', '', 'error')
        } else if (this.$v.email.$invalid) {
          Toast.fire('Поле E-mail обязательно для заполнения', '', 'error')
        } else if (this.$v.qwasarLogin.$invalid) {
          Toast.fire('Поле Qwasar Login обязательно для заполнения', '', 'error')
        } else if (this.$v.number.$invalid) {
          Toast.fire('Поле Номер телефона обязательно для заполнения', '', 'error')
        } else if (this.$v.stack.$invalid) {
          Toast.fire('Поле Стек обязательно для заполнения', '', 'error')
        } else if (this.$v.password.$invalid) {
          Toast.fire('Поле Пароль обязательно для заполнения', '', 'error')
        } else if (this.$v.confirm.$invalid) {
          Toast.fire('Поле Подтверждение пароля обязательно для заполнения', '', 'error')
        }
        return
      }
      try {
        await this.$store.dispatch('register', {
          name: this.name,
          last_name: this.lastName,
          email: this.email,
          qwasar: this.qwasarLogin,
          number: this.number,
          stack: this.stack,
          password: this.password,
          password_confirmation: this.confirm
        })
        this.$router.push('/')
      } catch (e) {
        if (this.$store.state.errors) {
          for (const key in this.$store.state.errors) {
            Toast.fire(this.$store.state.errors[key][0], '', 'error');
          }
        }
        else {
          Toast.fire(this.$store.state.error, '', 'error')
        }
      }
    }
  }
}
</script>