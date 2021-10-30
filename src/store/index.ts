import Vue from 'vue';
import Vuex from 'vuex';

import movies from './modules/movies';
import loader from './modules/loader';

Vue.use(Vuex);

export interface IRootState {
  [k: string]: any;
}

const store = new Vuex.Store({
  state: {},
  mutations: {},
  actions: {},
  modules: {
    movies,
    loader,
  },
});

store.dispatch('initMoviesState');

export default store;
