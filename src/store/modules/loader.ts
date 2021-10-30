import mutations from '@/store/mutations';
import { ActionContext } from 'vuex';
import { IRootState } from '..';

const { TOGGLE_LOADER } = mutations;

interface ILoaderState {
  isShowLoader: boolean;
}

const loaderStore = {
  state: {
    isShowLoader: false,
  },
  getters: {
    isShowLoader: ({ isShowLoader }: ILoaderState): boolean => isShowLoader,
  },
  mutations: {
    [TOGGLE_LOADER](state: ILoaderState, bool: boolean): void {
      state.isShowLoader = bool;
    },
  },
  actions: {
    toggleLoader(
      { commit }: ActionContext<ILoaderState, IRootState>,
      bool: boolean
    ): void {
      commit(TOGGLE_LOADER, bool);
    },
  },
};

export default loaderStore;
