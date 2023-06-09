import { HashRouter, Routes, Route } from 'react-router-dom';
import Home from './components/Home';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Song from './components/Song';

const App = () => {
  return (
    <HashRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/song/:selectedYear" element={<Song />} />
        <Route path="*" element={<p>Oops, page not found</p>} />
      </Routes>
      <Footer />
    </HashRouter>
  );
};

export default App;
