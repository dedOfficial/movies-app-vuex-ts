import Vue from 'vue';
import Vuex from 'vuex';

import movies from './modules/movies';

Vue.use(Vuex);

export interface IRootState {
  [k: string]: any;
}

export default new Vuex.Store({
  state: {},
  mutations: {},
  actions: {},
  modules: {
    movies,
  },
});
