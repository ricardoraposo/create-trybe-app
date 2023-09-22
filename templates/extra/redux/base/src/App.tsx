import { useDispatch, useSelector } from 'react-redux';
import { type GlobalState } from './types';
import reactLogo from './assets/react.svg';
import './App.css';
import { counterAction } from './redux/actions/counterAction';

function App() {
  const counterState = useSelector((state: GlobalState) => state.counterReducer);
  const dispatch = useDispatch();

  return (
    <>
      <div>
        <a href="https://vitejs.dev" target="_blank" rel="noreferrer">
          <img src="/vite.svg" className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank" rel="noreferrer">
          <img src={ reactLogo } className="logo react" alt="React logo" />
        </a>
        <a href="https://betrybe.com" target="_blank" rel="noreferrer">
          <img src="/trybe.svg" className="logo trybe" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React + Trybe</h1>
      <h2>{counterState.counter}</h2>
      <div className="card">
        <button onClick={ () => dispatch(counterAction()) }>
          Increment 1
        </button>
        <button onClick={ () => dispatch(counterAction(5)) }>
          Increment 5
        </button>
        <p>
          Edit
          {' '}
          <code>src/App.tsx</code>
          {' '}
          and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite, React or Trybe logos to learn more
      </p>
      <p className="read-the-docs">
        npx create-trybe-app was created by
        {' '}
        <a href="https://github.com/ricardoraposo" target="_blank" rel="noreferrer">
          Ricardo Raposo
        </a>
      </p>
    </>
  );
}

export default App;
