<template>
  <div id="app">
    <MoviesList :list="moviesList" />
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import { mapActions, mapGetters } from 'vuex';
import MoviesList from '@/components/MoviesList.vue';

export default Vue.extend({
  name: 'App',
  components: {
    MoviesList,
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
}
</style>
