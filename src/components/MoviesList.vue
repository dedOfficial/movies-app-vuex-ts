<template>
  <div id="movies-list">
    <BContainer>
      <h1 class="movies-list-title">IMDB Top 250</h1>
      <BRow>
        <template v-if="isExist">
          <BCol cols="3" v-for="(movie, key) in list" :key="key">
            <MovieItem :movie="movie" />
          </BCol>
        </template>
        <template v-else>
          <div>Empty list</div>
        </template>
      </BRow>
    </BContainer>
  </div>
</template>

<script lang="ts">
import Vue, { PropType } from 'vue';
import MovieItem from '@/components/MovieItem.vue';
import { TSerializedData } from '@/store/modules/movies';

export default Vue.extend({
  name: 'MoviesList',
  components: {
    MovieItem,
  },
  props: {
    list: {
      type: Object as PropType<TSerializedData>,
      default: () => ({}),
    },
  },
  computed: {
    isExist() {
      return !!Object.keys(this.$props.list).length;
    },
  },
});
</script>

<style scoped></style>
