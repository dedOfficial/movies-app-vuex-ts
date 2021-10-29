import axios from '@/plugins/axios';
import { ActionContext } from 'vuex';
import { IRootState } from '..';
import IDs from '../mock/imdb_top250';
import mutations from '../mutations';

export interface IMoviesState {
  top250IDs: string[];
  moviesPerPage: number;
  currentPage: number;
  movies: TSerializedData;
  [k: string]: any;
}

export type TData = {
  imdbID?: string;
  [k: string]: any;
};

type TSerializedData = { [k: string]: TData };

function serializeResponse(movies: TData[]): TSerializedData {
  const res = movies.reduce((acc, mov) => {
    if (mov.imdbID) {
      acc[mov.imdbID] = mov;
    }
    return acc;
  }, {});
  return res;
}

const { MOVIES } = mutations;

const moviesStore = {
  namespaced: true,
  state: {
    top250IDs: IDs,
    moviesPerPage: 12,
    currentPage: 1,
    movies: {},
  },
  getters: {
    sliceIDs:
      ({ top250IDs }: IMoviesState) =>
      (from: number, to: number): string[] =>
        top250IDs.slice(from, to),
    currentPage: ({ currentPage }: IMoviesState): number => currentPage,
    moviesPerPage: ({ moviesPerPage }: IMoviesState): number => moviesPerPage,
  },
  mutations: {
    [MOVIES]: (state: IMoviesState, movies: TSerializedData): void => {
      state.movies = movies;
    },
  },
  actions: {
    initMoviesState: {
      handler(context: ActionContext<IMoviesState, IRootState>): void {
        context.dispatch('fetchMovies');
      },
      root: true,
    },
    async fetchMovies(
      context: ActionContext<IMoviesState, IRootState>
    ): Promise<void> {
      try {
        const { sliceIDs, currentPage, moviesPerPage } = context.getters;
        const to = currentPage * moviesPerPage;
        const from = to - moviesPerPage;

        const request = sliceIDs(from, to).map((id: string) =>
          axios.get(`/?i=${id}`)
        );

        const response = await (<Promise<TData[]>>Promise.all(request));
        const movies = serializeResponse(response);
        context.commit(MOVIES, movies);
      } catch (error) {
        console.log(error);
      }
    },
  },
};

export default moviesStore;
