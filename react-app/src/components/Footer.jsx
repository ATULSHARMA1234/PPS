import { Link } from 'react-router-dom'

export default function Footer() {
  return (
    <footer className="bg-gray-900 border-t border-gray-700 py-12 px-4 text-white">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          <div>
            <h3 className="text-2xl font-black text-blue-400 mb-4">PPS Logistics</h3>
            <p className="text-gray-400 text-sm">Your trusted logistics partner for 50+ years</p>
          </div>
          
          <div>
            <h4 className="font-bold text-white mb-4 uppercase tracking-widest text-sm">Quick Links</h4>
            <ul className="space-y-2 text-gray-400 text-sm">
              <li><Link to="/" className="hover:text-blue-400 transition">Home</Link></li>
              <li><Link to="/about" className="hover:text-blue-400 transition">About</Link></li>
              <li><Link to="/services" className="hover:text-blue-400 transition">Services</Link></li>
              <li><Link to="/events" className="hover:text-blue-400 transition">Events</Link></li>
              <li><Link to="/contact" className="hover:text-blue-400 transition">Contact</Link></li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-bold text-white mb-4 uppercase tracking-widest text-sm">Services</h4>
            <ul className="space-y-2 text-gray-400 text-sm">
              <li><a href="#" className="hover:text-blue-400 transition">FTL Services</a></li>
              <li><a href="#" className="hover:text-blue-400 transition">PTL Services</a></li>
              <li><a href="#" className="hover:text-blue-400 transition">Warehousing</a></li>
              <li><a href="#" className="hover:text-blue-400 transition">Express Delivery</a></li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-bold text-white mb-4 uppercase tracking-widest text-sm">Follow Us</h4>
            <div className="flex space-x-4 text-gray-400">
              <a href="#" className="hover:text-blue-400 transition text-xl"><i className="fab fa-facebook"></i></a>
              <a href="#" className="hover:text-blue-400 transition text-xl"><i className="fab fa-twitter"></i></a>
              <a href="#" className="hover:text-blue-400 transition text-xl"><i className="fab fa-linkedin"></i></a>
              <a href="#" className="hover:text-blue-400 transition text-xl"><i className="fab fa-instagram"></i></a>
            </div>
          </div>
        </div>
        
        <div className="border-t border-gray-700 pt-8 text-center text-gray-400 text-sm">
          <p>&copy; 2025 PPS Logistics. All rights reserved. | <a href="#" className="hover:text-blue-400">Privacy Policy</a> | <a href="#" className="hover:text-blue-400">Terms of Service</a></p>
        </div>
      </div>
    </footer>
  )
}
