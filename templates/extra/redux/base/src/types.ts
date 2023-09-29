import store from './redux';

export type GlobalState = ResultType<typeof store.getState>;
