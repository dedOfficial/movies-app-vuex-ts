<template>
  <div id="movies-list">
    <BContainer>
      <h1 class="movies-list-title">{{ listTitle }}</h1>
      <BRow>
        <template v-if="isExist">
          <BCol cols="3" v-for="(movie, key) in list" :key="key">
            <MovieItem
              :movie="movie"
              @mouseover.native="onMouseOver(movie.Poster)"
              @removeItem="onRemoveItem"
              @showModal="onShowMovieInfo"
            />
          </BCol>
        </template>
        <template v-else>
          <div>Empty list</div>
        </template>
      </BRow>
      <BModal
        body-class="movie-modal-body"
        :id="movieInfoModalId"
        size="xl"
        hide-footer
        hide-header
      >
        <MovieInfoModalContent
          :movie="selectedMovie"
          @closeModal="onCloseModal"
        />
      </BModal>
    </BContainer>
  </div>
</template>

<script lang="ts">
import Vue, { PropType } from "vue";
import { mapActions, mapGetters } from "vuex";
import MovieItem from "@/components/MovieItem.vue";
import MovieInfoModalContent from "@/components/MovieInfoModalContent.vue";
import { TSerializedData } from "@/store/modules/movies";

export default Vue.extend({
  name: "MoviesList",
  components: {
    MovieItem,
    MovieInfoModalContent,
  },
  props: {
    list: {
      type: Object as PropType<TSerializedData>,
      default: () => ({}),
    },
  },
  data: () => ({
    movieInfoModalId: "movie-info",
    selectedMovieID: "",
  }),
  methods: {
    ...mapActions("movies", ["removeMovie"]),
    ...mapActions(["showNotify"]),

    onMouseOver(poster: string) {
      this.$emit("changePoster", poster);
    },
    async onRemoveItem({
      id,
      title,
    }: {
      id: string;
      title: string;
    }): Promise<void> {
      const isConfirmed = await this.$bvModal.msgBoxConfirm(
        "Are you sure delete" + title + "?"
      );

      if (isConfirmed) {
        this.removeMovie(id);
        this.showNotify({
          variant: "success",
          title: "Success",
          msg: "Movie deleted successful",
        });
      }
    },
    onShowMovieInfo(id: string) {
      this.selectedMovieID = id;
      this.$bvModal.show(this.movieInfoModalId);
    },
    onCloseModal() {
      this.selectedMovieID = "";
      this.$bvModal.hide(this.movieInfoModalId);
    },
  },
  computed: {
    ...mapGetters("movies", ["isSearch"]),
    isExist() {
      return !!Object.keys(this.$props.list).length;
    },

    listTitle() {
      return this.isSearch ? "Search result" : "IMDB Top 250";
    },
    selectedMovie() {
      return this.selectedMovieID ? this.list[this.selectedMovieID] : null;
    },
  },
});
</script>

<style scoped>
#movies-list {
  padding-bottom: 100px;
}

.movies-list-title {
  color: #fff;
  margin-bottom: 30px;
}
</style>

<style>
.movie-modal-body {
  padding: 0 !important;
}
</style>
