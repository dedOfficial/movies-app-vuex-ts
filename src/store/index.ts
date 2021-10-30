import Vue from 'vue';
import Vuex from 'vuex';

import movies from './modules/movies';
import loader from './modules/loader';
import notification from './modules/notification';

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
    notification,
  },
});

export default store;
