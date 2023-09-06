import { useNavigate } from 'react-router-dom';
import reactLogo from '../assets/react.svg';

function Initial() {
  const navigate = useNavigate();

  return (
    <div>
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
      <button onClick={ () => navigate('/counter') }>Go to counter</button>
      <p>
        Edit
        {' '}
        <code>src/App.tsx</code>
        {' '}
        and save to test HMR
      </p>

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
    </div>
  );
}

export default Initial;
