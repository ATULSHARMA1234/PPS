import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import RevealSection from '../components/RevealSection'

export default function Home() {
  const [scrollPos, setScrollPos] = useState(0)
  const [isScrolled, setIsScrolled] = useState(false)
  const [isZoomingOut, setIsZoomingOut] = useState(false)

  useEffect(() => {
    document.title = 'PPS Logistics | Excellence in Motion'
    const handleScroll = () => {
      setScrollPos(window.scrollY)
      setIsScrolled(window.scrollY > 50)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    const nav = document.getElementById('mainNav')
    if (isScrolled) {
      nav?.classList.add('bg-white/95', 'backdrop-blur-md', 'py-4', 'shadow-2xl', 'text-gray-800')
    } else {
      nav?.classList.remove('bg-white/95', 'backdrop-blur-md', 'py-4', 'shadow-2xl', 'text-gray-800')
    }
  }, [isScrolled])

  const handleGetStarted = (e) => {
    e.preventDefault()
    setIsZoomingOut(true)
    
    // Wait for animation to complete before scrolling (1.7 seconds for faster zoom)
    setTimeout(() => {
      const aboutSection = document.getElementById('about')
      if (aboutSection) {
        // Use programmatic scroll for faster performance
        aboutSection.scrollIntoView({ behavior: 'auto', block: 'start' })
        // Add smooth scroll effect with CSS
        window.scrollTo({ top: aboutSection.offsetTop - 80, behavior: 'smooth' })
      }
      setIsZoomingOut(false)
    }, 1700)
  }

  return (
    <div className="w-full">
      {/* Background Images */}
      <div id="bg-cargo" className="bg-transition opacity-100 fixed inset-0 z-[-1]">
        <img 
          src="https://images.unsplash.com/photo-1519003722824-194d4455a60c?auto=format&fit=crop&w=1920&q=80" 
          className="w-full h-full object-cover transition-opacity duration-1000"
          style={{ opacity: scrollPos > 300 ? 0 : 0.3 }}
          alt="Cargo background"
        />
      </div>

      {/* Hero Section */}
      <section className="relative w-full h-screen flex items-center justify-center overflow-hidden">
        <div className={`absolute inset-0 z-10 blur-overlay flex items-center justify-center transition-all duration-[1700ms] ${isZoomingOut ? 'scale-[3.5] opacity-0' : 'scale-100 opacity-100'}`}>
          <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center max-w-5xl px-4 w-full">
            <h1 id="heroTitle" className="text-7xl md:text-9xl font-black mb-4 tracking-tighter text-gray-900 drop-shadow-2xl">
              PPS <span className="text-blue-600">Logistics</span>
            </h1>
            <p id="heroSubtitle" className="text-xl md:text-2xl font-medium mb-10 text-gray-700 italic">
              Fast. Reliable. Fiery. Redefining Indian Supply Chains.
            </p>
            <button 
              onClick={handleGetStarted}
              disabled={isZoomingOut}
              className="bg-gradient-to-r from-blue-600 to-blue-800 text-white px-12 py-5 rounded-full font-bold text-lg hover:from-blue-500 hover:to-blue-700 transition-all shadow-xl inline-block disabled:opacity-50"
            >
              Get Started
            </button>
          </div>
        </div>
      </section>

      {/* About Section - Company Info */}
      <section id="about" className="w-full min-h-screen py-32 px-4 bg-gray-50 relative">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div>
              <span className="text-blue-700 font-bold text-sm uppercase tracking-widest">Prakash Parcel Services Limited</span>
              <h2 className="text-5xl md:text-6xl font-black text-gray-900 mb-6 mt-4 uppercase tracking-tighter">
                Your Preferred Logistics <span className="text-blue-600">Partner!</span>
              </h2>
              
              <p className="text-gray-700 text-base leading-relaxed mb-6">
                Prakash Parcel Services Limited started in 1992, was the parcel division of the erstwhile Prakash Group, one of India's few transport companies started in the 1960s. Over the years, PPS has transformed into a renowned logistics service provider working with several corporate houses, MNCs, MSMEs & PSUs supporting their physical distribution across India.
              </p>
              
              <p className="text-gray-700 text-base leading-relaxed mb-6">
                Our Management has over 5 decades of industry knowledge and our operations team comprises well experienced members, thus we assure best services to our customers. Our emphasis on quality & technology helps maintain repeatability in our services.
              </p>
              
              <p className="text-gray-700 text-base leading-relaxed mb-8">
                Our network is spread across 19 states covering all major cities & industrial towns.
              </p>
              
              <Link to="/about" className="bg-blue-600 hover:bg-blue-500 text-white px-8 py-3 rounded-lg font-bold uppercase tracking-widest transition-all inline-block">
                More Info
              </Link>
            </div>
            
            <div className="relative h-full min-h-[500px]">
              <div className="absolute inset-0">
                <div className="absolute top-0 right-0 w-2/3 h-2/5 rounded-lg overflow-hidden border-4 border-blue-600 shadow-lg">
                  <img src="https://images.unsplash.com/photo-1601584115197-04ecc0da31d7?auto=format&fit=crop&w=600&q=80" className="w-full h-full object-cover" alt="Logistics truck" />
                </div>
                
                <div className="absolute bottom-0 left-0 w-3/5 h-2/5 rounded-lg overflow-hidden shadow-lg">
                  <img src="https://images.unsplash.com/photo-1580674285054-bed31e145f59?auto=format&fit=crop&w=600&q=80" className="w-full h-full object-cover" alt="Delivery truck on road" />
                </div>
                
                <div className="absolute bottom-6 right-6 bg-blue-600 rounded-lg p-6 text-center shadow-xl">
                  <div className="text-4xl font-black text-white">50+</div>
                  <div className="text-sm font-bold text-blue-100 mt-2">Years of Experience</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="w-full py-32 px-4 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-20">
            <h2 className="text-5xl font-bold text-blue-700 uppercase tracking-tighter">Our Expertise</h2>
            <div className="h-1 w-24 bg-blue-600 mx-auto mt-4"></div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { title: 'Full Truck Load (FTL)', img: 'https://images.unsplash.com/photo-1601584115197-04ecc0da31d7?auto=format&fit=crop&w=800&q=80', desc: 'Exclusive use of a truck for your goods, ensuring direct routes and zero transshipment.' },
              { title: 'Partial Truck Load (PTL)', img: 'https://images.unsplash.com/photo-1580674285054-bed31e145f59?auto=format&fit=crop&w=800&q=80', desc: 'Optimized cargo sharing that saves you money while maintaining delivery speed.' },
              { title: 'Warehousing', img: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=800&q=80', desc: 'Secured hubs with real-time stock updates and climate-controlled options.' }
            ].map((service, idx) => (
              <div key={idx} className="service-card group bg-white rounded-3xl border border-gray-200 hover:border-blue-500/50 shadow-md hover:shadow-lg">
                <div className="h-64 overflow-hidden">
                  <img src={service.img} alt={service.title} className="w-full h-full object-cover group-hover:scale-110 transition duration-500" />
                </div>
                <div className="p-8 text-center">
                  <h3 className="text-2xl font-bold text-blue-700">{service.title}</h3>
                  <div className="info-reveal">
                    <p className="text-sm text-gray-700 mb-6">{service.desc}</p>
                    <Link to="/services" className="bg-blue-600 text-white px-6 py-2 rounded-lg font-bold hover:bg-blue-500 transition-all inline-block">Book Now</Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Events Section - Life at PPS */}
      <section id="events" className="w-full py-32 px-4 bg-gray-100">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-20">
            <h2 className="text-5xl font-bold text-blue-700 uppercase tracking-tighter">Life at PPS</h2>
            <div className="h-1 w-24 bg-blue-600 mx-auto mt-4"></div>
          </div>

          <div className="space-y-12">
            <article className="rounded-3xl shadow-lg hover:shadow-2xl transition transform hover:-translate-y-1 overflow-hidden flex flex-col md:flex-row items-center gap-0 event-card bg-white">
              <div className="md:w-1/2 overflow-hidden rounded-t-3xl md:rounded-t-none md:rounded-l-3xl">
                <img src="https://images.unsplash.com/photo-1567427017947-545c5f8d16ad?auto=format&fit=crop&w=1200&q=80" className="w-full h-auto object-contain" alt="Awards event" />
              </div>
              <div className="md:w-1/2 p-8 md:p-12 flex flex-col justify-center bg-white">
                <span className="text-blue-700 font-bold text-xs uppercase tracking-widest">Awards 2025</span>
                <h4 className="text-2xl md:text-3xl font-bold mt-4 text-blue-700">Best Employee of the Year</h4>
                <p className="text-gray-700 mt-6 text-sm md:text-base leading-relaxed">Honoring our top-performing fleet managers with celebrations and recognition programs that highlight excellence in operations and customer service.</p>
              </div>
            </article>

            <article className="rounded-3xl shadow-lg hover:shadow-2xl transition transform hover:-translate-y-1 overflow-hidden flex flex-col md:flex-row-reverse items-center gap-0 event-card bg-white">
              <div className="md:w-1/2 overflow-hidden rounded-t-3xl md:rounded-t-none md:rounded-r-3xl">
                <img src="https://images.unsplash.com/photo-1578575437130-527eed3abbec?auto=format&fit=crop&w=1200&q=80" className="w-full h-auto object-contain" alt="ISO certification" />
              </div>
              <div className="md:w-1/2 p-8 md:p-12 flex flex-col justify-center bg-white">
                <span className="text-blue-700 font-bold text-xs uppercase tracking-widest">Milestone</span>
                <h4 className="text-2xl md:text-3xl font-bold mt-4 text-blue-700">ISO Re-certified</h4>
                <p className="text-gray-700 mt-6 text-sm md:text-base leading-relaxed">Maintaining global standards in logistics operations, reinforcing trust with our partners and clients through rigorous quality checks and continuous improvement.</p>
              </div>
            </article>

            <article className="rounded-3xl shadow-lg hover:shadow-2xl transition transform hover:-translate-y-1 overflow-hidden flex flex-col md:flex-row items-center gap-0 event-card bg-white">
              <div className="md:w-1/2 overflow-hidden rounded-t-3xl md:rounded-t-none md:rounded-l-3xl">
                <img src="https://images.unsplash.com/photo-1511578314322-379afb476865?auto=format&fit=crop&w=1200&q=80" className="w-full h-auto object-contain" alt="Team meetup" />
              </div>
              <div className="md:w-1/2 p-8 md:p-12 flex flex-col justify-center bg-white">
                <span className="text-blue-700 font-bold text-xs uppercase tracking-widest">Culture</span>
                <h4 className="text-2xl md:text-3xl font-bold mt-4 text-blue-700">PPS National Meetup</h4>
                <p className="text-gray-700 mt-6 text-sm md:text-base leading-relaxed">Celebrating achievements, building team cohesion and sharing best practices across departments—our annual meetup brings everyone together.</p>
              </div>
            </article>
          </div>

          <div className="text-center mt-12">
            <Link to="/events" className="bg-blue-600 hover:bg-blue-500 text-white px-8 py-3 rounded-lg font-bold uppercase tracking-widest transition-all inline-block">
              View All Events
            </Link>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="w-full bg-white py-24 px-4 border-t border-gray-200">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-20">
          <div>
            <h2 className="text-5xl font-black text-blue-700 mb-8 uppercase tracking-tighter">Get In Touch</h2>
            <div className="space-y-8 text-gray-700">
              <div className="flex items-start gap-4">
                <i className="fas fa-location-dot text-blue-600 text-xl mt-1"></i>
                <div>
                  <h4 className="font-bold text-gray-900 uppercase tracking-widest text-sm">Headquarters</h4>
                  <p>PPS Logistics Hub, Plot No. 42-A, Industrial Estate, Phase III, New Delhi - 110020, India</p>
                </div>
              </div>
              <p><i className="fas fa-phone mr-3 text-blue-600"></i> +91 999 000 1111</p>
              <p><i className="fas fa-envelope mr-3 text-blue-600"></i> info@ppslogistics.in</p>
            </div>
          </div>
          <div className="flex flex-col items-center justify-center">
            <Link to="/contact" className="bg-blue-600 hover:bg-blue-500 text-white px-12 py-5 rounded-lg font-bold text-lg uppercase tracking-widest transition-all inline-block">
              Contact Us
            </Link>
            <p className="text-gray-700 text-sm mt-6 text-center">Click to fill out our contact form and we'll get back to you shortly</p>
          </div>
        </div>
      </section>
    </div>
  )
}