import { useState } from 'react';
import { Link } from 'react-router-dom';
import './Counter.css';

function Counter() {
  const [count, setCount] = useState(0);

  return (
    <div className="card">
      <button onClick={ () => setCount((prevCount) => prevCount + 1) }>
        count is
        {' '}
        {count}
      </button>
      <Link className="link" to="/">Go back</Link>
    </div>
  );
}

export default Counter;
