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
            />
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
import { mapActions, mapGetters } from 'vuex';
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
  methods: {
    ...mapActions('movies', ['removeMovie']),

    onMouseOver(poster: string) {
      this.$emit('changePoster', poster);
    },
    async onRemoveItem({ id, title }: { id: string; title: string }) {
      const isConfirmed = await this.$bvModal.msgBoxConfirm(
        'Are you sure delete' + title + '?'
      );

      if (isConfirmed) {
        this.removeMovie(id);
      }
    },
  },
  computed: {
    ...mapGetters('movies', ['isSearch']),
    isExist() {
      return !!Object.keys(this.$props.list).length;
    },

    listTitle() {
      return this.isSearch ? 'Search result' : 'IMDB Top 250';
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
