<template>
  <div id="modals" class="modal">
    <div id="modal-back" @click="closeModals" :class="{active: this.$store.state.receiveModal || this.$store.state.sendModal || this.$store.state.confirmLogout || this.$store.state.openCheque || this.openLogOut }"></div>
    <div id="user-menu" :class="{ active: this.$store.state.userModal }">
      <router-link class="user-person" tag="div" to="/user-page">
        <div class="user-person-pic">
          <img :src="user.photo ? this.$store.state.url + user.photo : require(`../assets/default-user-pic.png`)" class="user-pic" alt="">
        </div>
        <div class="user-info">
          <div class="user-name">{{ user.name }}</div>
          <div class="user-id">{{ user.email }}</div>
        </div>
      </router-link>
      <div class="hr"></div>
      <ul class="other-user-menu">
        <li class="menu-item"><a @click.prevent="openConfirm" href="#" class="log-out-btn">Log Out</a></li>
      </ul>
    </div>
    <div id="receive-coin" :class="{ active: this.$store.state.receiveModal }">
      <div class="modal-header">
        <div class="modal-title">Receive</div>
        <div class="modal-tools">
          <div class="modal-close" @click="closeModals">
            <i class="ai ai-close"></i>
          </div>
        </div>
      </div>
      <div class="modal-body">
        <div class="receive-qrcode">
          <qrcode-vue :value="user.wallet" :size="220" level="H"></qrcode-vue>
        </div>
        <div class="receive-hash">
          <div class="receiver-label">Hash</div>
          <input type="text" :value="user.wallet" disabled>
          <i class="ai ai-copy-outline" @click="copy(user.wallet)"></i>
        </div>
        <div class="receive-share">
          <button class="share-btn" @click="share">Share <i class="ai ai-share-outline"></i></button>
        </div>
      </div>
    </div>
    <div id="send-coin" :class="{ active: this.$store.state.sendModal }">
      <div class="modal-header">
        <div class="modal-title">Send</div>
        <div class="modal-tools">
          <div class="modal-close" @click="closeModals">
            <i class="ai ai-close"></i>
          </div>
        </div>
      </div>
      <div class="modal-body">
        <div class="send-hash">
          <div class="send-label">Wallet ID</div>
          <input type="text" v-model="wallet_to">
          <i class="ai ai-scan" @click="openScan"></i>
          <p class="user-info">{{ fio }}</p>
        </div>
        <div v-if="scanOpen" class="qr-view">
          <qrcode-stream @decode="onDecode" :track="paintOutline" @init="onInit"/>
          <button class="close-modal" @click="scanOpen = false">Cancel</button>
        </div>
        <div class="send-coin">
          <div class="send-label">Amount</div>
          <input type="number" v-model="amount">
        </div>
        <div class="send-comment">
          <div class="send-label">Comment</div>
          <textarea type="text" v-model="comment"></textarea>
        </div>
        <div class="receive-share">
          <button class="share-btn" @click="sendCoin">Send <i class="ai ai-send-outline"></i></button>
        </div>
      </div>
    </div>
    <div id="cheque-coin" :class="{ active: this.$store.state.openCheque }">
      <div class="top-brand">
        <div class="corp-logo"></div>
      </div>
      <div class="modal-body">
        <div class="cheque-header">
          <div class="cheque-status-icon" :class="cheque.status == 'failed' ? 'bg-failed' : cheque.wallet_to == user.wallet ? 'bg-success' : 'bg-remove' ">
            <i :class="cheque.status == 'failed' ? 'ai ai-warning-outline' : cheque.wallet_to == user.wallet ? 'ai ai-add' : 'ai ai-remove'"></i>
          </div>
          <div class="cheque-date">
            <div class="cheque-title">{{ cheque.title }}</div>
            <div class="cheque-price">{{ cheque.amount }} ASC</div>
          </div>
        </div>
        <div class="cheque-block">
          <div class="cheque-title">Service</div>
          <div class="cheque-content">{{ capitalizeFirstLetter(cheque.type) }}</div>
        </div>
        <div class="cheque-block">
          <div class="cheque-title">Date and time</div>
          <div class="cheque-content">{{ sortDate(cheque.date) }}</div>
        </div>
        <div class="cheque-block">
          <div class="cheque-title">{{ cheque.wallet_from == user.wallet ? 'Receiver\'s name' : 'Sender\'s name' }}</div>
          <div class="cheque-content">{{ cheque.fio }}</div>
        </div>
        <div class="cheque-block">
          <div class="cheque-title">{{ cheque.wallet_from == user.wallet ? 'Receiver\'s wallet' : 'Sender\'s wallet' }}</div>
          <div class="cheque-content">{{ cheque.wallet_from == user.wallet ? cheque.wallet_to : cheque.wallet_from }}</div>
        </div>
        <div class="cheque-block">
          <div class="cheque-title">Comment</div>
          <div class="cheque-content">{{ cheque.comment || 'Empty' }}</div>
        </div>
        <div class="cheque-block">
          <div class="cheque-title">Status</div>
          <div class="cheque-content text-success">{{ capitalizeFirstLetter(cheque.status) }}</div>
        </div>
      </div>
    </div>
    <div id="log-out" :class="{ active: openLogOut }">
      <div class="modal-content">
        <div class="modal-header">
          <div class="modal-title">Log Out</div>
        </div>
        <div class="modal-body">
          <div class="log-out-query">Do you want to log out of the account and end the session?</div>
        </div>
      </div>
      <div class="modal-tools">
        <div class="btn modal-close" @click="closeModals">Cancel</div>
        <div class="btn log-out-verify" @click="logout">Log Out</div>
      </div>
    </div>

  </div>
</template>
<script>
import { Cropper, CircleStencil } from 'vue-advanced-cropper'
import 'vue-advanced-cropper/dist/style.css';
import { QrcodeStream } from 'vue-qrcode-reader'
import moment from 'moment'
export default {
  name: "Modals",
  props: ['user', 'cheque'],
  components: {
    QrcodeStream,
    CircleStencil,
    Cropper
  },
  data: () => ({
    wallet_to: '',
    fio: '',
    amount: null,
    comment: '',
    scanResult: '',
    scanOpen: false,
    fullscreen: true,
    openLogOut: false,
  }),
  methods: {
    capitalizeFirstLetter(s) {
      if (s) {
        return s[0].toUpperCase() + s.slice(1);
      }
    },
    sortDate(date) {
      return moment(date).format('DD/MM/YYYY HH:mm')
    },
    share() {
      if (navigator.hare) {
        navigator.share({
          title: 'Получите бонусы в подарок',
          text: 'Получите бонусы в подарок при покупке курсов от нашего партнера',
          url: 'https://google.com/',
        }).then(e => {
          alert('success')
        }).catch(e => {
          console.log(e);
        })
      } else {
        alert('asdfasdf')
      }
    },
    sendCoin() {
      this.$emit('sendCoin', {
        wallet_to: this.wallet_to,
        amount: this.amount,
        comment: this.comment
      })
      this.amount = null
      this.comment = ''
      this.scanResult = ''
      this.closeModals()
    },
    closeModals() {
      this.openLogOut = false
      this.$store.state.sendModal = false
      this.$store.state.receiveModal = false
      this.$store.state.userModal = false
      this.$store.state.openCheque = false
      document.querySelector('#modal-back').style.background = ''
      document.querySelector('.main-tools').style.zIndex = '1'
    },
    async copy(text) {
      try {
        await navigator.clipboard.writeText(text)
        Toast.fire('Copied', '', 'success')
      } catch (e) {
        console.log(e);
        throw e
      }
    },
    openScan() {
      this.scanOpen = true;
    },
    onDecode (result) {
      this.scanResult = result
    },
    openConfirm() {
      this.openLogOut = true
      this.$store.state.userModal = false
    },
    async logout() {
      await this.$store.dispatch('logout')
      this.$router.push('/login')
    },
    async onInit(promise) {
      try {
        await promise
      } catch (error) {
        this.scanOpen = false
        if (error.name === 'NotAllowedError') {
          Toast.fire("ERROR: you need to grant camera access permission", '', 'error')
        } else if (error.name === 'NotFoundError') {
          Toast.fire("ERROR: No camera found on your device!", '', 'error')
        } else if (error.name === 'NotSupportedError') {
          Toast.fire("ERROR: secure context required (HTTPS, localhost)", '', 'error')
        } else if (error.name === 'NotReadableError') {
          Toast.fire("ERROR: is the camera already in use?", '', 'error')
        } else if (error.name === 'OverconstrainedError') {
          Toast.fire("ERROR: installed cameras are not suitable", '', 'error')
        } else if (error.name === 'StreamApiNotSupportedError') {
          Toast.fire("ERROR: Stream API is not supported in this browser", '', 'error')
        } else if (error.name === 'InsecureContextError') {
          Toast.fire('ERROR: Camera access is only permitted in secure context. Use HTTPS or localhost rather than HTTP.', '', 'error')
        } else {
          Toast.fire(`ERROR: Camera error (${error.name})`, '', 'error')
        }
      }
    },
    paintOutline (detectedCodes, ctx) {
      for (const detectedCode of detectedCodes) {
        const [ firstPoint, ...otherPoints ] = detectedCode.cornerPoints

        ctx.strokeStyle = "red";

        ctx.beginPath();
        ctx.moveTo(firstPoint.x, firstPoint.y);
        for (const { x, y } of otherPoints) {
          ctx.lineTo(x, y);
        }
        ctx.lineTo(firstPoint.x, firstPoint.y);
        ctx.closePath();
        ctx.stroke();
      }
    },
  },
  watch: {
    scanResult(value) {
      this.wallet_to = value;
      this.scanOpen = false;
    },
    wallet_to(value) {
      this.scanResult = value;
      if (value.length == 32) {
        this.$store.dispatch('checkWallet', value).then(e => {
          this.fio = this.$store.state.fio;
        }).catch(e => {
          Toast.fire('Неверный кошелек', '', 'error')
        })
      } else {
        this.fio = ''
      }
    },
    '$route'() {

    }
  },
}
</script>