<template lang="html">
  <div class="main">
    <div class="main-header">
      <h1>Gal</h1>    
    </div>
    <div
      class="image-container"
      v-for="galleryImage in galleryImages">
        {{ galleryImage.title }} + {{ getUrl(galleryImage)}}
        <nuxt-img 
          :src="getUrl(galleryImage)"
          image-style="small"
          :alt="title"          
        />
        <div
          class="body" 
          v-html="$md.render(body)"
        />    
    </div>
  </div>
</template>

<script>
export default {
  methods: {
    getUrl(galleryImage) {
      console.log(galleryImage.url.replace('content/',''))
      return galleryImage.url.replace('content/','')
    }
  },
  computed: {
    galleryImages() {      
      return this.$store.state.galleryImages;
    }
  }
}
</script>

<style lang="css" scoped>
.main {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-around;
}
.main-header {
  text-align: center;
}
.image-container {
  border: 1px solid gray;
  display: flex;
  flex-direction: column
}
</style>
