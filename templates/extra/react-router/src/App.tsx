import { Route, Routes } from 'react-router-dom';
import './App.css';
import Initial from './Initial';
import Counter from './Counter';

function App() {
  return (
    <Routes>
      <Route path="/" element={ <Initial /> } />
      <Route path="/counter" element={ <Counter /> } />
    </Routes>
  );
}

export default App;
