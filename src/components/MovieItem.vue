<template>
  <div id="movie-item" class="mb-3">
    <div class="movie-item-poster">
      <img
        :src="movie.Poster"
        :alt="movie.Title"
        class="movie-item-poster-image"
      />
    </div>
    <div class="movie-info-wrap d-flex flex-column justify-content-between">
      <div class="movie-item-info">
        <h3 class="movie-title">{{ movie.Title }}</h3>
        <span class="movie-year">{{ movie.Year }}</span>
      </div>
      <div class="movie-item-controls row no-gutter">
        <div class="col">
          <BButton
            size="md"
            block
            variant="outline-light"
            @click="showInfoModalEvent"
            >Info</BButton
          >
        </div>
        <div class="col">
          <BButton
            size="md"
            block
            variant="outline-light"
            @click="emitRemoveEvent"
            >Remove</BButton
          >
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { TData } from "@/store/modules/movies";
import Vue, { PropType } from "vue";
export default Vue.extend({
  name: "MovieItem",
  props: {
    movie: {
      type: Object as PropType<TData>,
      required: true,
    },
  },
  methods: {
    emitRemoveEvent() {
      this.$emit("removeItem", {
        id: this.movie.imdbID,
        title: this.movie.Title,
      });
    },
    showInfoModalEvent() {
      this.$emit("showModal", this.movie.imdbID);
    },
  },
});
</script>

<style scoped>
#movie-item {
  position: relative;
  cursor: pointer;
  border-radius: 5px;
  overflow: hidden;
  transition: all 0.2s ease-in;
  height: 435px;
}

#movie-item:hover {
  box-shadow: 0px 5px 30px rgba(0, 0, 0, 0.7);
  transform: scale(1.02);
}

.movie-item-poster {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: -1;
}

.movie-item-poster-image {
  width: 100%;
  object-fit: cover;
}

.movie-info-wrap {
  padding: 20px 10px;
  height: 100%;
  opacity: 0;
  transition: all 0.2s ease;
}

#movie-item:hover .movie-info-wrap {
  opacity: 1;
  background-color: rgba(0, 0, 0, 0.6);
}

.movie-title {
  font-size: 21px;
  color: #fff;
}

.movie-year {
  font-size: 16px;
  color: #fff;
}

#movie-item .movie-item-controls button.btn-block {
  width: 100%;
}
</style>
