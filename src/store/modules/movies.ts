import axios from '@/plugins/axios';
import { ActionContext } from 'vuex';
import { IRootState } from '..';

export interface IMoviesState {
  [k: string]: any;
}

const moviesStore = {
  namespaced: true,
  state: {},
  getters: {},
  mutations: {},
  actions: {
    async fetchMovies(context: ActionContext<IMoviesState, IRootState>) {
      console.log(context);
      // tt0111161
      const res = await axios.get('/?i=tt0111161');
      console.log(res);
    },
  },
};

export default moviesStore;
