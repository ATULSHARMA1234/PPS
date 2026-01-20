import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import Home from './pages/Home'
import About from './pages/About'
import Services from './pages/Services'
import Events from './pages/Events'
import Contact from './pages/Contact'
import Profile from './pages/Profile'
import PartnerProfile from './pages/PartnerProfile'
import Admin from './pages/Admin'
import './App.css'

export default function App() {
  return (
    <Router>
      <div className="bg-white text-gray-900 overflow-x-hidden min-h-screen">
        <Routes>
          <Route path="/admin" element={<Admin />} />
          <Route 
            path="/*" 
            element={
              <>
                <Navbar />
                <Routes>
                  <Route path="/" element={<Home />} />
                  <Route path="/about" element={<About />} />
                  <Route path="/services" element={<Services />} />
                  <Route path="/events" element={<Events />} />
                  <Route path="/contact" element={<Contact />} />
                  <Route path="/profile" element={<Profile />} />
                  <Route path="/partner-profile" element={<PartnerProfile />} />
                </Routes>
                <Footer />
              </>
            } 
          />
        </Routes>
      </div>
    </Router>
  )
}
