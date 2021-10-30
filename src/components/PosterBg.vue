<template>
  <div id="poster-bg" :style="posterStyle"></div>
</template>

<script lang="ts">
import Vue from "vue";
export default Vue.extend({
  name: "PosterBg",
  props: {
    poster: {
      type: String,
      default: "",
    },
  },
  data: () => ({
    defaultPosterBg:
      "linear-gradient(45deg, rgb(0, 3, 38) 0%, rgb(82, 15, 117) 100%)",
  }),
  computed: {
    posterStyle() {
      const bg = this.poster ? `url(${this.poster})` : this.defaultPosterBg;
      return {
        "background-image": bg,
      };
    },
  },
});
</script>

<style scoped>
#poster-bg {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  height: 100%;
  background-size: cover;
  background-position: center;
  transition: all 0.2s ease;
  z-index: -1;
}

#poster-bg::before {
  content: "";
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  opacity: 0.7;
  background-image: linear-gradient(
    45deg,
    rgb(0, 3, 38) 0%,
    rgb(82, 15, 117) 100%
  );
}
</style>
