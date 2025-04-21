import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css'
import LandingPage from './pages/LandingPage';
import EntertainersPage from './pages/EntertainersPage';
import EntDetailsPage from './pages/EntDetailsPage';
import AddEntertainerPage from './pages/AddEntertainerPage';
import NavBar from './components/NavBar';

function App() {
  
// This is the main component of the application. It sets up the router and defines the routes for the application.
// The routes are defined using the `Routes` and `Route` components from `react-router-dom`.
// The `NavBar` component is used to display the navigation bar at the top of the page.
// The `LandingPage`, `EntertainersPage`, `EntDetailsPage`, and `AddEntertainerPage` components are the main pages of the application.
  return (
    <>
      <Router>
        <NavBar />
        <div className="pt-5">
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/entertainers" element={<EntertainersPage />} />
            {/* This route is used to display the details of a specific entertainer. The entertainer's id is passed as a URL parameter. */}
            <Route path="entertainers/:id" element={<EntDetailsPage />} />
            <Route path="entertainers/add" element={<AddEntertainerPage />} />
          </Routes>
        </div>
        </Router>
    </>
  )
}

export default App
