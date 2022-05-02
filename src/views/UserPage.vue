<template>
  <div id="user-app">
    <div class="user-page">
      <router-link to="/" class="close-page">
        <i class="ai ai-arrow-back"></i>
        <div class="close-title">Back</div>
      </router-link>
      <div class="user-photo">
        <div class="user-pic-block">
          <img :src="user.photo ? this.$store.state.url + user.photo : require(`../assets/default-user-pic.png`)" alt="" class="user-pic">
        </div>
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
        </ul>
        <ul class="tools-items">
          <router-link tag="li" to="/update-password"><i class="ai ai-key-outline"></i>Change password</router-link>
        </ul>
        <ul class="tools-items">
          <li @click="logout" class="btn-log-out"><i class="ai ai-log-out-outline"></i>Log Out</li>
        </ul>
      </div>
    </div>
    <img v-if="croppedImage" :src="croppedImage" alt="">
    <div id="modals" class="modals">
      <div id="upload-avatar" :class="{ active: openUpload }">
        <div class="modal-header">
          <div class="modal-title">Upload</div>
          <div class="modal-tools">
            <div class="modal-close" @click="closeModals">
              <i class="ai ai-close"></i>
            </div>
          </div>
        </div>
        <div class="modal-body">
          <Cropper
              ref="cropper"
              :src="image"
              stencil-component="circle-stencil"
          />
        </div>
        <div class="upload-tools">
          <button @click="reset">Reset</button>
          <button @click="uploadImage">Upload</button>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { Cropper } from "vue-advanced-cropper";
import "vue-advanced-cropper/dist/style.css";
export default {
  name: "UserPage",
  data: () => ({
    user: {},
    image: null,
    openUpload: false,
    croppedImage: null,
  }),
  components: {
    Cropper,
  },
  async mounted() {
    if (!this.$store.state.user) {
      await this.$store.dispatch('getUser')
    }
    this.user = this.$store.state.user
  },
  methods: {
    closeModals() {
      this.openUpload = false
    },
    async logout() {
      await this.$store.dispatch('logout')
      this.$router.push('/login')
    },
    reset() {
      this.$refs.cropper.reset();
      this.image = null;
      this.openUpload = false
    },
    onFileChange(e) {
      const file = e.target.files[0]
      this.image = URL.createObjectURL(file)
      this.openUpload = true
    },
    async uploadImage() {
      const { canvas } = this.$refs.cropper.getResult();
			if (canvas) {
				const form = new FormData();
				canvas.toBlob(blob => {
          console.log(blob);
					form.append('photo', blob);
					// You can use axios, superagent and other libraries instead here
					// fetch('https://astrum.uubek.com/api/user/photo', {
					// 	method: 'POST',
          //   headers: {
          //     'Authorization': `Bearer ${localStorage.getItem('token')}`
          //   },
					// 	body: form,
					// });
          this.$store.dispatch('setPhoto', form)
					// Perhaps you should add the setting appropriate file format here
				}, 'image/jpeg');
			}
      this.openUpload = false
      Toast.fire('Success', 'Photo uploaded', 'success')
		},
  }
}
</script>
<style scoped>

#upload-avatar {
  background-color: rgba(255, 255, 255, 0.7);
  backdrop-filter: blur(10px);
  padding: 20px;
  border-radius: 12px;
  visibility: hidden;
  opacity: 0;
  overflow: hidden;
  transform: scale(0.9);
  box-shadow: 0 0 15px #c2c2c2;
  position: fixed;
  top: 155px;
  z-index: 8;
}

#upload-avatar.active {
  visibility: visible;
  opacity: 1;
  transform: scale(1.1);
}

#upload-avatar .vue-advanced-cropper {
  width: 350px;
  height: 350px;
  overflow: hidden;
  border-radius: 10px;
}

#upload-avatar .upload-tools {
  display: flex;
  justify-content: center;
}

#upload-avatar .upload-tools button {
  border: none;
  width: 100%;
  padding: 12px;
  font-size: 16px;
  margin: 5px;
  border-radius: 10px;
  cursor: pointer;
}

#upload-avatar .upload-tools button:hover {
  background: #5733d1;
  color: #fff;
}

</style>