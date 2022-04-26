<template>
  <div id="modals" class="modal">
    <div id="modal-back" @click="closeModals" :class="{active: this.$store.state.receiveModal || this.$store.state.sendModal}"></div>
    <div id="user-menu" :class="{active: this.$store.state.userModal}">
      <div class="user-person">
        <div class="user-person-pic">
          <img src="../assets/default-user-pic.png" class="user-pic" alt="">
        </div>
        <router-link class="user-info" tag="div" to="/user-page">
          <div class="user-name">{{ user.name }}</div>
          <div class="user-id">{{ user.email }}</div>
        </router-link>
      </div>
      <div class="hr"></div>
      <ul class="other-user-menu">
        <li class="menu-item"><a @click.prevent="logout" href="#" class="log-out-btn">Выйти</a></li>
      </ul>
    </div>
    <div id="receive-coin" :class="{active: this.$store.state.receiveModal}">
      <div class="modal-header">
        <div class="modal-title">Получить</div>
        <div class="modal-tools">
          <div class="modal-close" @click="closeModals">
            <i class="ai ai-close"></i>
          </div>
        </div>
      </div>
      <div class="modal-body">
        <div class="receive-qrcode">
          <qrcode-vue :value="user.wallet" :size="240" level="H"></qrcode-vue>
        </div>
        <div class="receive-hash">
          <div class="receiver-label">Hash</div>
          <input type="text" :value="user.wallet" disabled>
          <i class="ai ai-copy-outline" @click="copy(user.wallet)"></i>
        </div>
        <div class="receive-share">
          <div class="share-btn"><i class="ai ai-share-outline"></i> Поделиться</div>
        </div>
      </div>
    </div>
    <div id="send-coin" :class="this.$store.state.sendModal ? 'active' : ''">
      <div class="modal-header">
        <div class="modal-title">Отправить</div>
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
          <p>{{ fio }}</p>
        </div>
        <div v-if="scanOpen">
          <qrcode-stream @decode="onDecode" :track="paintOutline" @init="onInit"/>
        </div>
        <div class="send-coin">
          <div class="send-label">Сумма</div>
          <input type="text" v-model="amount">
        </div>
        <div class="send-comment">
          <div class="send-label">Коментария</div>
          <textarea type="text" v-model="comment"></textarea>
        </div>
        <div class="receive-share">
          <button class="share-btn" @click="sendCoin">Отправить <i class="ai ai-send-outline"></i></button>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { QrcodeStream } from 'vue-qrcode-reader'
export default {
  name: "Modals",
  props: ['user'],
  components: {
    QrcodeStream
  },
  data: () => ({
    wallet_to: '',
    fio: '',
    amount: null,
    comment: '',
    scanResult: '',
    scanOpen: false,
    fullscreen: true
  }),
  methods: {
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
      this.$store.state.sendModal = false
      this.$store.state.receiveModal = false
      this.$store.state.userModal = false
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
    async logout() {
      await this.$store.dispatch('logout');
      this.$router.push('/login');
    },
    switchCamera () {
      switch (this.camera) {
        case 'front':
          this.camera = 'rear'
          break
        case 'rear':
          this.camera = 'front'
          break
      }
    },
    async onInit(promise) {
      try {
        await promise
      } catch (error) {
        this.scanOpen = false
        if (error.name === 'NotAllowedError') {
          Toast.fire("ERROR: you need to grant camera access permission", '', 'error')
        } else if (error.name === 'NotFoundError') {
          Toast.fire("ERROR: no camera on this device", '', 'error')
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
    }
  }
}
</script>