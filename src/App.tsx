import { BrowserRouter, Routes, Route } from 'react-router-dom';
import PlayerList from './components/PlayerList';
import PlayerProfile from './components/PlayerProfile';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<PlayerList />} />
        <Route path="/:username" element={<PlayerProfile />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
