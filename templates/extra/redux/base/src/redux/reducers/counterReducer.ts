import { INCREMENT_COUNTER } from '../actions/counterAction';

type ActionType = {
  type: string;
  payload: number;
};

const initialState = {
  counter: 0,
};

const counterReducer = (state = initialState, action: ActionType) => {
  switch (action.type) {
    case INCREMENT_COUNTER:
      return { ...state, counter: state.counter + action.payload };
    default:
      return state;
  }
};

export default counterReducer;
