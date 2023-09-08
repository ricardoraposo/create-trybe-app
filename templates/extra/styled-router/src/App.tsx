import { Route, Routes } from 'react-router-dom';
import Initial from './pages/Initial';
import Counter from './pages/Counter';

function App() {
  return (
    <Routes>
      <Route path="/" element={ <Initial /> } />
      <Route path="/counter" element={ <Counter /> } />
    </Routes>
  );
}

export default App;
