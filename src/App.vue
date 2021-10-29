<template>
  <div id="app">
    <PosterBg :poster="posterBg" />
    <MoviesList :list="moviesList" @changePoster="onChangePoster" />
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import { mapActions, mapGetters } from 'vuex';
import MoviesList from '@/components/MoviesList.vue';
import PosterBg from '@/components/PosterBg.vue';

export default Vue.extend({
  name: 'App',
  components: {
    MoviesList,
    PosterBg,
  },
  data: () => ({
    posterBg: '',
  }),
  methods: {
    onChangePoster(poster: string) {
      this.posterBg = poster;
    },
  },
  computed: {
    ...mapGetters('movies', ['moviesList']),
  },
});
</script>

<style>
#app {
  font-family: Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  position: relative;
}
</style>
