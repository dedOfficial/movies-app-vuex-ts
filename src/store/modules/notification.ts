import mutations from '@/store/mutations';
import { ActionContext } from 'vuex';
import { IRootState } from '..';

const { SHOW_TOAST_NOTIFY } = mutations;

interface INotificationState {
  messagePool: TNotifyParams[];
}

export type TNotifyParams = {
  variant: string;
  msg: string;
  title: string;
};

const notificationStore = {
  state: {
    messagePool: [],
  },
  getters: {
    messagePool: ({ messagePool }: INotificationState): TNotifyParams =>
      messagePool[messagePool.length - 1],
  },
  mutations: {
    [SHOW_TOAST_NOTIFY](state: INotificationState, msg: TNotifyParams): void {
      state.messagePool.push(msg);
    },
  },
  actions: {
    showNotify(
      { commit }: ActionContext<INotificationState, IRootState>,
      msg: TNotifyParams
    ): void {
      commit(SHOW_TOAST_NOTIFY, msg);
    },
  },
};

export default notificationStore;
