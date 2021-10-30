<template>
  <div id="app">
    <Loader />
    <PosterBg :poster="posterBg" />
    <MoviesList :list="moviesList" @changePoster="onChangePoster" />
    <MoviesPagination
      :current-page="currentPage"
      :per-page="moviesPerPage"
      :total="moviesTotal"
      @pageChanged="onPageChanged"
    />
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import { mapActions, mapGetters } from 'vuex';
import MoviesList from '@/components/MoviesList.vue';
import PosterBg from '@/components/PosterBg.vue';
import MoviesPagination from '@/components/MoviesPagination.vue';
import Loader from '@/components/Loader.vue';
import { Dictionary } from 'vue-router/types/router';

export default Vue.extend({
  name: 'App',
  components: {
    MoviesList,
    PosterBg,
    MoviesPagination,
    Loader,
  },
  data: () => ({
    posterBg: '',
  }),
  watch: {
    '$route.query': {
      handler: 'onPageQueryChange',
      immediate: true,
      deep: true,
    },
  },
  methods: {
    ...mapActions('movies', ['changeCurrentPage']),
    onChangePoster(poster: string) {
      this.posterBg = poster;
    },
    onPageQueryChange({ page = 1 }: Dictionary<string | number>) {
      this.changeCurrentPage(Number(page));
    },
    onPageChanged(page: number) {
      this.$router.push({ query: { page: page + '' } });
    },
    created() {
      if (this.$route.query.page) {
        this.changeCurrentPage(Number(this.$route.query.page));
      }
    },
  },
  computed: {
    ...mapGetters('movies', [
      'moviesList',
      'currentPage',
      'moviesPerPage',
      'moviesTotal',
    ]),
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
