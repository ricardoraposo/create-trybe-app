import { useState } from 'react'
import trybeLogo from './assets/trybe.webp'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <div>
        <a href="https://vitejs.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
        <a href="https://betrybe.com" target="_blank">
          <img src={trybeLogo} className="logo trybe" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React + Trybe</h1>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <p>
          Edit <code>src/App.tsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite, React or Trybe logos to learn more
      </p>
      <p className="read-the-docs">
        npx create-trybe-app was created by
        {' '}
        <a href="https://github.com/ricardoraposo" target="_blank">
          Ricardo Raposo
        </a>
      </p>
    </>
  )
}

export default App
