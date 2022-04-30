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
          <router-link tag="li" to="/repass"><i class="ai ai-key-outline"></i>Изменить пароль</router-link>
        </ul>
      </div>
    </div>
    <div class="">
      <Cropper
        ref="cropper"
        :src="image"
        stencil-component="circle-stencil"
      />
      <button @click="reset">Reset</button>
      <button @click="uploadImage">Upload</button>
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
    reset() {
      this.$refs.cropper.reset();
      this.image = null;
    },
    onFileChange(e) {
      const file = e.target.files[0]
      this.image = URL.createObjectURL(file)
    },
    uploadImage() {
			const { canvas } = this.$refs.cropper.getResult();
			if (canvas) {
				const form = new FormData();
				canvas.toBlob(blob => {
					form.append('file', blob);
					// You can use axios, superagent and other libraries instead here
					fetch('https://astrum.uubek.com/api/user/photo', {
						method: 'POST',
						body: {
              photo: form
            },
					});
					// Perhaps you should add the setting appropriate file format here
				}, 'image/jpeg');
			}
		},
  }
}
</script>
<style scoped>
</style>