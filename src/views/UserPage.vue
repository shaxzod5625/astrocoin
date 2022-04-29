<template>
  <div id="user-app">
    <div class="user-page">
      <router-link to="/" class="close-page">
        <i class="ai ai-arrow-back"></i>
        <div class="close-title">Back</div>
      </router-link>
      <div class="user-photo">
        <img :src="this.$store.state.url+user.photo || require(`../assets/default-user-pic.png`)" alt="" class="user-pic">
        <input 
          type="file"
          @change="onFileChange"
          ref="fileInput"
          style="display: none"
        >
        <div class="edit-user-pic" @click="$refs.fileInput.click()">
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
          <router-link tag="li" to="/repass"><i class="ai ai-key-outline"></i> Изменить пароль</router-link>
        </ul>
      </div>
    </div>
    <div class="modal">
      <div class="modal-back" @click="closeModals" :class="{ active: modalActive }"></div>
      <div class="modal-header">
        <div class="modal-title">Отправить</div>
        <div class="modal-tools">
          <div class="modal-close" @click="closeModals">
            <i class="ai ai-close"></i>
          </div>
        </div>
      </div>
      <div class="modal-body">
        <cropper
          v-if="selectedFile"
          class="cropper"
          :src="selectedFile"
          stencil-component="circle-stencil"
          :stencil-props="{
            aspectRatio: 10/12
          }"
          @change="change"
        />
      </div>
    </div>
  </div>
</template>

<script>
import { Cropper, CircleStencil } from 'vue-advanced-cropper'
import 'vue-advanced-cropper/dist/style.css';

export default {
  name: "UserPage",
  data: () => ({
    user: {},
    selectedFile: null,
    modalActive: false
  }),
  components: {
    CircleStencil,
    Cropper
  },
  async mounted() {
    if (!this.$store.state.user) {
      await this.$store.dispatch('getUser')
    }
    this.user = this.$store.state.user
  },
  methods: {
    closeModals() {
      this.modalActive = false
    },
    change({ coordinates, canvas }) {
      console.log(coordinates, canvas)
    },
    onFileChange(e) {
      const file = e.target.files[0]
      this.selectedFile = URL.createObjectURL(file)
      this.modalActive = true
    },
    onUpload() {
      const fd = new FormData()
      fd.append('image', this.selectedFile, this.selectedFile.name)
    }
  }
}
</script>
<style scoped>
.cropper {
  height: 600px;
  background: #DDD;
}
#user-app .modal {
  display: flex;
  justify-content: center;
  padding: 10px;
  position: absolute;
  width: 55vw;
}
#user-app .modal-back.active {
  background: rgba(0,0,0,.25);
  position: fixed;
  top: 0;
  right: 0;
  left: 0;
  bottom: 0;
  z-index: 5;
}

</style>