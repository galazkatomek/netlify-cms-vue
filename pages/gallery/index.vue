<template lang="html">
  <div class="main">
    <div class="main-header">
      <h1>Gal</h1>
    </div>
    <div class="image-wraper">
      <div
        class="image-container"
        v-for="(image, index) in galleryImages"
        :key="index"
        @click="imageClick(image)"
      >
        <a href="#lightbox">
          <nuxt-img
            class="pure-img-responsive"
            :src="image.url"
            responsive-style="galleryThumbnailResponsive"
            :alt="image.title"
            width="480"
          />
        </a>
        <div class="body" v-html="$md.render(image.title)"></div>
      </div>
      <a href="#" class="lightbox" id="lightbox">
        <img :src="bigURL" />
      </a>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      bigURL: ''
    };
  },
  computed: {
    galleryImages() {
      return this.$store.state.galleryImages;
    }
  },
  methods: {
    imageClick(image) {
      this.bigURL = image.url;
      this.$router.push({ query: { image: image.url } });
    }
  },
  mounted() {
    this.bigURL = this.$route.query.image;
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
.image-wraper {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  align-items: center;
  justify-content: center;
}
@media (min-width: 1200px) {
  .image-wraper {
    margin: 8rem 2rem 2rem 2rem;
  }
}
.image-container {
  z-index: 10;
  border: 1px solid gray;
  margin: 0.5rem;
  display: flex;
  flex-direction: column;
  background-color: black;
  text-align: center;
  color: #999999;
}

/** LIGHTBOX MARKUP **/

.lightbox {
  /** Default lightbox to hidden */
  display: none;

  /** Position and style */
  position: fixed;
  z-index: 999;
  width: 100%;
  height: 100%;
  text-align: center;
  top: 0;
  left: 0;
  background: rgba(0, 0, 0, 0.8);
}

.lightbox img {
  /** Pad the lightbox image */
  max-width: 90%;
  max-height: 80%;
  margin-top: 2%;
}
@media (max-width: 600px) {
  .lightbox img {
    /** Pad the lightbox image */
    max-width: 98%;
    max-height: 98%;
    margin-top: 50%;
  }
}


.lightbox:target {
  /** Remove default browser outline */
  outline: none;

  /** Unhide lightbox **/
  display: block;
}
</style>
