<template>
  <header id="header">
    <BNavbar type="dark" variant="dark" class="navbar">
      <BContainer>
        <BNavbarBrand href="#">MovieDB</BNavbarBrand>
        <BForm @submit.prevent>
          <BFormInput
            class="mr-sm-2 search-input"
            placeholder="Search"
            v-model="searchValue"
            debounce="500"
          />
        </BForm>
      </BContainer>
    </BNavbar>
  </header>
</template>

<script lang="ts">
import Vue from "vue";
import { mapActions } from "vuex";

export default Vue.extend({
  name: "Header",
  data: () => ({
    searchValue: "",
  }),
  watch: {
    searchValue: "onSearchValueChanged",
  },
  methods: {
    ...mapActions("movies", [
      "searchMovies",
      "fetchMovies",
      "toggleSearchState",
    ]),
    onSearchValueChanged(value: string) {
      if (value) {
        this.searchMovies(value);
        this.toggleSearchState(true);
      } else {
        this.fetchMovies();
        this.toggleSearchState(false);
      }
    },
  },
});
</script>

<style scoped>
#header {
  margin-bottom: 30px;
}

.navbar {
  background-color: rgba(0, 0, 0, 0.7) !important;
}

.search-input {
  color: #fff;
  background: rgba(255, 255, 255, 0.1);
  border-color: rgba(0, 0, 0, 0.6);
}

.search-input:focus {
  box-shadow: none;
  background: rgba(255, 255, 255, 0.2);
  border-color: rgba(0, 0, 0, 0.6);
  color: #fff;
}
</style>
