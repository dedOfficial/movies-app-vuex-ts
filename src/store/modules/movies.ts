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
  Title?: string;
  Poster?: string;
  Year?: string;
  [k: string]: any;
};

export type TSerializedData = { [k: string]: TData };

function serializeResponse(movies: TData[]): TSerializedData {
  const res = movies.reduce((acc, mov) => {
    if (mov.imdbID) {
      acc[mov.imdbID] = mov;
    }
    return acc;
  }, {});
  return res;
}

const { MOVIES, CURRENT_PAGE, REMOVE_MOVIE } = mutations;

const moviesStore = {
  namespaced: true,
  state: {
    top250IDs: IDs,
    moviesPerPage: 12,
    currentPage: 1,
    movies: {},
  },
  getters: {
    moviesList: ({ movies }: IMoviesState): TSerializedData => movies,
    sliceIDs:
      ({ top250IDs }: IMoviesState) =>
      (from: number, to: number): string[] =>
        top250IDs.slice(from, to),
    currentPage: ({ currentPage }: IMoviesState): number => currentPage,
    moviesPerPage: ({ moviesPerPage }: IMoviesState): number => moviesPerPage,
    moviesTotal: ({ top250IDs }: IMoviesState): number => top250IDs.length,
  },
  mutations: {
    [MOVIES]: (state: IMoviesState, movies: TSerializedData): void => {
      state.movies = movies;
    },
    [CURRENT_PAGE]: (state: IMoviesState, page: number): void => {
      state.currentPage = page;
    },
    [REMOVE_MOVIE]: (state: IMoviesState, index: number): void => {
      state.top250IDs.splice(index, 1);
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
        context.dispatch('toggleLoader', true, { root: true });
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
      } finally {
        context.dispatch('toggleLoader', false, { root: true });
      }
    },

    changeCurrentPage(
      { commit, dispatch }: ActionContext<IMoviesState, IRootState>,
      page: number
    ): void {
      commit(CURRENT_PAGE, page);
      dispatch('fetchMovies');
    },

    removeMovie(
      { commit, dispatch, state }: ActionContext<IMoviesState, IRootState>,
      id: string
    ): void {
      const index = state.top250IDs.findIndex((item) => item === id);

      if (index !== -1) {
        commit(REMOVE_MOVIE, index);
        dispatch('fetchMovies');
      }
    },
  },
};

export default moviesStore;
