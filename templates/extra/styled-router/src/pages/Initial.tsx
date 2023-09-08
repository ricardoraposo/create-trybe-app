import { useNavigate } from 'react-router-dom';
import reactLogo from '../assets/react.svg';
import { Logo, React, Trybe, Docs } from '../styles';

function Initial() {
  const navigate = useNavigate();

  return (
    <div>
      <div>
        <a href="https://vitejs.dev" target="_blank" rel="noreferrer">
          <Logo src="/vite.svg" className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank" rel="noreferrer">
          <React src={ reactLogo } className="logo react" alt="React logo" />
        </a>
        <a href="https://betrybe.com" target="_blank" rel="noreferrer">
          <Trybe src="/trybe.svg" className="logo trybe" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React + Trybe</h1>
      <button onClick={ () => navigate('/counter') }>Go to counter</button>
      <p>
        Edit
        {' '}
        <code>src/App.tsx</code>
        {' '}
        and save to test HMR
      </p>

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
    </div>
  );
}

export default Initial;
