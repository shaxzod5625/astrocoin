<template>
  <div class="home">
    <div id="container">
      <div id="header">
        <div class="left-content">
          <div class="app-logo main"></div>
        </div>
        <div class="center-content"></div>
        <div class="right-content">
          <div class="user-menu" @click="openUser">
            <img src="../assets/default-user-pic.png" class="user-pic" alt="">
          </div>
        </div>
      </div>
      <div id="main">
        <div class="coin-header">
          <div class="coin-logo">
            <svg
              version="1.1"
              id="Слой_1"
              xmlns="http://www.w3.org/2000/svg"
              x="0px"
              y="0px"
              viewBox="0 0 512 512"
            >
              <g>
                <linearGradient
                  id="SVGID_1_"
                  gradientUnits="userSpaceOnUse"
                  x1="40.838"
                  y1="256"
                  x2="471.162"
                  y2="256"
                >
                  <stop offset="0" style="stop-color: #a46b23" />
                  <stop offset="0.5146" style="stop-color: #ffe485" />
                  <stop offset="1" style="stop-color: #945612" />
                </linearGradient>
                <circle
                  fill="url(#SVGID_1_)"
                  stroke="#8C5111"
                  stroke-width="3"
                  stroke-miterlimit="10"
                  cx="256"
                  cy="256"
                  r="215.2"
                />

                <linearGradient
                  id="SVGID_00000136407052634840633370000012429590637297124744_"
                  gradientUnits="userSpaceOnUse"
                  x1="128.4444"
                  y1="128.4444"
                  x2="393.0446"
                  y2="393.0446"
                >
                  <stop offset="0" style="stop-color: #a46b23" />
                  <stop offset="0.5146" style="stop-color: #ffe485" />
                  <stop offset="1" style="stop-color: #945612" />
                </linearGradient>

                <circle
                  fill="url(#SVGID_00000136407052634840633370000012429590637297124744_)"
                  stroke="#8C5111"
                  stroke-width="3"
                  stroke-miterlimit="10"
                  cx="256"
                  cy="256"
                  r="187.1"
                />
                <path
                  fill="#965E16"
                  d="M313.9,257.1v-46.7H199.1v46.7H228v66.3c0,23.6,6.5,40.3,19.2,49.7c9.3,6.8,23,10.2,41.5,10.2
                            c6.9,0,14.4-0.5,22.7-1.4l2.4-0.3v-44.2l-2.9,0.2c-8,0.4-14.9,0.5-20.3,0.2c-4.9-0.3-8.5-1.6-10.9-3.8c-2.3-2.1-3.4-5.7-3.4-10.6
                            v-66.3H313.9z"
                />
                <path
                  fill="#965E16"
                  d="M253.6,193.1c-8.7,0-16.3-3.2-22.7-9.6c-6.4-6.4-9.6-14-9.6-22.7c0-8.7,3.2-16.4,9.6-22.9
                            c6.4-6.5,14-9.8,22.7-9.8c9,0,16.7,3.3,23.1,9.8c6.4,6.6,9.6,14.2,9.6,22.9c0,8.7-3.2,16.3-9.6,22.7
                            C270.4,189.9,262.7,193.1,253.6,193.1z"
                />
              </g>
            </svg>
          </div>
          <div class="coin-currency">{{ user.balance }} ASC</div>
          <div class="coin-buttons" :style="this.$store.state.receiveModal || this.$store.state.sendModal ? 'z-index: 1' : ''">
            <a href="#" class="coin-btn" @click.prevent="submitModal">
              <svg
                width="25"
                viewBox="0 0 500 500"
                xml:space="preserve"
                style="stroke-width: 22px"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M400,240H272V112c0-8.8-7.2-16-16-16c-8.8,0-16,7.2-16,16v128H112c-8.8,0-16,7.2-16,16c0,8.8,7.2,16,16,16h128v128
	c0,8.8,7.2,16,16,16c8.8,0,16-7.2,16-16V272h128c8.8,0,16-7.2,16-16C416,247.2,408.8,240,400,240z"
                />
              </svg>
            </a>
            <a href="#" class="coin-btn" @click.prevent="sendModal">
              <svg
                width="25"
                viewBox="0 0 500 500"
                xml:space="preserve"
                style="stroke-width: 10px"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M417,227L273,83c-9.4-9.4-24.6-9.4-33.9,0L95,227c-9.4,9.4-9.4,24.6,0,33.9c9.4,9.4,24.6,9.4,33.9,0l103-103V412c0,13.3,10.7,24,24,24s24-10.7,24-24V157.9l103,103c4.7,4.7,10.8,7,17,7s12.3-2.3,17-7C426.3,251.6,426.3,236.4,417,227z"
                />
              </svg>
            </a>
            <a href="#" class="coin-btn" @click.prevent="">
              <svg
                width="25"
                viewBox="0 0 500 500"
                xml:space="preserve"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M454.65,169.4A31.82,31.82,0,0,0,432,160H368V144a112,112,0,0,0-224,0v16H80a32,32,0,0,0-32,32V408c0,39,33,72,72,72H392a72.22,72.22,0,0,0,50.48-20.55A69.48,69.48,0,0,0,464,409.25V192A31.75,31.75,0,0,0,454.65,169.4ZM176,144a80,80,0,0,1,160,0v16H176Zm192,96a112,112,0,0,1-224,0V224a16,16,0,0,1,32,0v16a80,80,0,0,0,160,0V224a16,16,0,0,1,32,0Z"
                />
              </svg>
            </a>
          </div>
        </div>
        <div class="coin-body">
          <div class="main-tools" :class="{'left': activeItem == 'story-transfers', 'right': activeItem == 'story-buy'}">
            <div class="story-transfers story-btn" @click="setActive('story-transfers')" :class="{ active: isActive('story-transfers') }">Транзакции</div>
            <div class="story-buy story-btn" @click="setActive('story-buy')" :class="{ active: isActive('story-buy') }">Покупки</div>
          </div>
          <div class="story" :class="{'transfer': activeItem == 'story-transfers', 'buy': activeItem == 'story-buy'}">
            <div id="story-transfers">
              <div style="display: flex; justify-content: center;">
                <bounce-loader :loading="loading" :color="'#5733d1'"></bounce-loader>
              </div>
              <div class="card" v-for="(history, date) in walletHistory" :key="history.id">
                <div class="transfers-date">
                  {{ date }}
                </div>
                <div v-for="item in history" :key="item.id" :class="item.status == 'failed' ? 'failed-coin' : item.status == 'returned' ? 'receive-coin' : 'remove-coin'">
                  <div class="status-icon">
                    <i :class="item.wallet_to == user.wallet ? 'ai ai-add' : 'ai ai-remove'"></i>
                  </div>
                  <div class="status-content">
                    <div class="status-name">{{ item.title }}</div>
                    <div class="status-coin">{{ item.wallet_to == user.wallet ? '+' : '-' }}{{ item.amount }} ASC</div>
                    <!-- <div class="css">{{ sortDate(item.date) }}</div> -->
                  </div>
                </div>
              </div>
              <div style="display: flex; justify-content: center;">
                <bounce-loader :loading="loadHistory" :color="'#5733d1'"></bounce-loader>
              </div>
            </div>
            <div id="story-buy">
              <div class="icon">Test</div>
            </div>
          </div>
        </div>
      </div>
      <Modals
        :user="user"
        @sendCoin="sendCoin"
      />
    </div>
  </div>
</template>
<script>
import Modals from '../components/Modals.vue'
import axios from 'axios'
export default {
  name: 'HomeView',
  components: { Modals },
  async mounted() {
    this.loading = true
    if (!this.$store.state.user) {
      await this.$store.dispatch('getUser')
    }
    if (!this.$store.state.walletHistory) {
      await this.$store.dispatch('getHistory')
    }
    this.user = this.$store.state.user
    this.walletHistory = this.$store.state.walletHistory
    this.loading = false
    window.addEventListener('scroll', this.scroll)
  },
  data: () => ({
    activeItem: 'story-transfers',
    user: {},
    walletHistory: {},
    loading: false,
    loadHistory: false,
    page: 1,
    count: 10,
    delay: 0
  }),
  methods: {
    async scroll() {
      if (this.delay == 1) return
        this.delay = 1
        if (window.scrollY + window.innerHeight >= document.documentElement.scrollHeight && this.count >= 10) {
          this.loadHistory = true
          this.page++
          const res = await axios.get(`http://astrum.uubek.com/api/transfers?page=${this.page}`, {
            headers: {
              'Authorization': `Bearer ${localStorage.getItem('token')}`
            }
          })
          this.count = 0
          for (const [key, value] of Object.entries(res.data)) {
            if (key in this.walletHistory) {
              this.walletHistory[key] = this.walletHistory[key].concat(res.data[key])
              delete res.data[key]
            } else {
              this.walletHistory = { ...this.walletHistory, ...res.data }
            }
            this.count += value.length;
          };
        } else {
          this.loadHistory = false
        }
        this.delay = 0
    },
    async sendCoin(data) {
      try {
        await this.$store.dispatch('transfer', data)
        Toast.fire('Отправлено', '', 'success');
        await this.$store.dispatch('getUser')
        await this.$store.dispatch('getHistory')
        this.user = this.$store.state.user
        this.walletHistory = this.$store.state.walletHistory
      } catch (e) {
        Toast.fire(this.$store.state.error, '', 'error')
      }
    },
    sortDate(date) {
      let time = new Date(date)
      let hour = time.getHours() <= 9 ? '0' + time.getHours() : time.getHours()
      let minute = time.getMinutes() <= 9 ? '0' + time.getMinutes() : time.getMinutes()
      let second = time.getSeconds() <= 9 ? '0' + time.getSeconds() : time.getSeconds()
      return `${hour}:${minute}:${second}`
    },
    isActive (menuItem) {
      return this.activeItem === menuItem
    },
    setActive (menuItem) {
      this.activeItem = menuItem
    },
    //
    openUser() {
      this.$store.state.userModal = !this.$store.state.userModal
    },
    submitModal() {
      this.$store.state.receiveModal = !this.$store.state.receiveModal
      this.$store.state.userModal = false
      document.querySelector('#modal-back').style.background = '';
      document.querySelector('.main-tools').style.zIndex = '1';
    },
    sendModal() {
      this.$store.state.sendModal = !this.$store.state.sendModal
      this.$store.state.userModal = false
      document.querySelector('#modal-back').style.background = '';
      document.querySelector('.main-tools').style.zIndex = '1';
    },
  }
}
</script>