import { useState } from 'react';
import reactLogo from './assets/react.svg';
import { Card, Logo, React, Trybe, Docs } from './styles';

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <div>
        <a href="https://vitejs.dev" target="_blank" rel="noreferrer">
          <Logo src="/vite.svg" className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank" rel="noreferrer">
          <React src={ reactLogo } alt="React logo" />
        </a>
        <a href="https://betrybe.com" target="_blank" rel="noreferrer">
          <Trybe src="/trybe.svg" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React + Trybe</h1>
      <Card>
        <button onClick={ () => setCount((prevCount) => prevCount + 1) }>
          count is
          {' '}
          {count}
        </button>
        <p>
          Edit
          {' '}
          <code>src/App.tsx</code>
          {' '}
          and save to test HMR
        </p>
      </Card>
      <Docs>
        Click on the Vite, React or Trybe logos to learn more
      </Docs>
      <Docs>
        npx create-trybe-app was created by
        {' '}
        <a href="https://github.com/ricardoraposo" target="_blank" rel="noreferrer">
          Ricardo Raposo
        </a>
      </Docs>
    </>
  );
}

export default App;
