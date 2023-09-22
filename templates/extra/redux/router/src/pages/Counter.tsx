import { Link } from 'react-router-dom';
import './Counter.css';
import { useDispatch, useSelector } from 'react-redux';
import { GlobalState } from '../types';
import { counterAction } from '../redux/actions/counterAction';

function Counter() {
  const counterState = useSelector((state: GlobalState) => state.counterReducer);
  const dispatch = useDispatch();

  return (
    <div className="card">
      <h2>{counterState.counter}</h2>
      <button onClick={ () => dispatch(counterAction()) }>
        Increment 1
      </button>
      <button onClick={ () => dispatch(counterAction(5)) }>
        Increment 5
      </button>
      <Link className="link" to="/">Go back</Link>
    </div>
  );
}

export default Counter;
