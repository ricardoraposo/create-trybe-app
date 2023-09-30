import store from './redux';

export type GlobalState = ReturnType<typeof store.getState>;
