import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import 'bootstrap/dist/css/bootstrap.min.css';
import Bookmark from './pages/Bookmark';
import Detail from './pages/Detail';
import NotFound from './pages/NotFound';
import DetailCharacter from './pages/DetailCharacter';

function App() {
  return (
    <Router>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/bookmark' element={<Bookmark />} />
        <Route path='/anime/:id' element={<Detail />} />
        <Route path='/character/:id' element={<DetailCharacter />} />
        <Route path='*' element={<NotFound />} />
      </Routes>
    </Router>
  );
}

export default App;