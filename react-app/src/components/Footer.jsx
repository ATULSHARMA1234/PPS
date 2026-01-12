import { Link } from 'react-router-dom'

export default function Footer() {
  return (
    <footer className="bg-[#1a1a1a] py-16 px-4 border-t border-blue-900/30">
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-12">
        <div>
          <h3 className="text-blue-500 font-bold text-lg mb-4">PPS Logistics</h3>
          <p className="text-gray-400 text-sm">Your trusted partner in logistics excellence.</p>
        </div>
        <div>
          <h4 className="text-white font-bold mb-4">Quick Links</h4>
          <ul className="space-y-2 text-gray-400 text-sm">
            <li><Link to="/" className="hover:text-blue-400 transition-colors">Home</Link></li>
            <li><Link to="/about" className="hover:text-blue-400 transition-colors">About</Link></li>
            <li><Link to="/services" className="hover:text-blue-400 transition-colors">Services</Link></li>
          </ul>
        </div>
        <div>
          <h4 className="text-white font-bold mb-4">Contact Info</h4>
          <p className="text-gray-400 text-sm">+91 999 000 1111</p>
          <p className="text-gray-400 text-sm">info@ppslogistics.in</p>
        </div>
      </div>
      <div className="max-w-6xl mx-auto mt-8 pt-8 border-t border-gray-700 text-center text-gray-400 text-sm">
        <p>&copy; 2024 PPS Logistics. All rights reserved.</p>
      </div>
    </footer>
  )
}
