import { combineReducers, legacy_createStore } from 'redux';
import { Provider } from 'react-redux';
import { render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { GlobalState } from '../types';
import counterReducer from '../redux/reducers/conterReducer';

function renderWithRedux(
  component: JSX.Element,
  state: GlobalState | undefined = undefined,
  store = legacy_createStore(combineReducers({ counterReducer }), state),
) {
  const user = userEvent.setup();
  return {
    ...render(<Provider store={ store }>{component}</Provider>),
    store,
    user,
  };
}

export default renderWithRedux;
