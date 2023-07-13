import Game from './componets/Game';
import Title from './componets/Title';

import './styles/main.css';
import { Routes, Route } from 'react-router-dom';



function App() {
  return (
    <div className="App">
      <Routes>
      <Route path="/" element={<Title />} />
      <Route path="game" element={<Game />} /> 
      </Routes>
    </div>
  );
}

export default App;
