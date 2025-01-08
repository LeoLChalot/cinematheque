import './App.css'
import popcorn from '/popcorn.png'
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom'
import HomePage from './pages/HomePage';
import FilmFormPage from './pages/FilmFormPage';
import FilmDetailsPage from './pages/FilmDetailsPage';
import FilmsIndexPage from './pages/FilmsIndexPage';
import NotFound from './pages/NotFound';
import CustomNavbar from './components/CustomNavbar';
import links from './data/linksCollection';


function App() {
  return (
    <>
      <Router>
        <CustomNavbar brandLogo={popcorn} links={links}/>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/add" element={<FilmFormPage />} />
          <Route path="/edit/:id" element={<FilmFormPage />} />
          <Route path="/films" element={<FilmsIndexPage />} />
          <Route path="/film/:id" element={<FilmDetailsPage />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Router>
    </>
  )
}

export default App
