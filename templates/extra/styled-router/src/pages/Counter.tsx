import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Card } from '../styles';

function Counter() {
  const [count, setCount] = useState(0);

  return (
    <Card>
      <button onClick={ () => setCount((prevCount) => prevCount + 1) }>
        count is
        {' '}
        {count}
      </button>
      <Link className="link" to="/">Go back</Link>
    </Card>
  );
}

export default Counter;
