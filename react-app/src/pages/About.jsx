import { useEffect } from 'react'
import RevealSection from '../components/RevealSection'

export default function About() {
  useEffect(() => {
    document.title = 'About PPS Logistics | Company Information'
  }, [])

  const boardMembers = [
    { name: 'Rajesh Kumar', position: 'Chairman & MD', bio: 'Over 30 years of experience in logistics and transportation industry. Visionary leader driving innovation and excellence.' },
    { name: 'Priya Sharma', position: 'Director - Operations', bio: 'Strategic leader with 25+ years in supply chain management and operational excellence.' },
    { name: 'Vikram Patel', position: 'Director - Finance', bio: 'Financial expert with 20+ years experience in corporate finance and strategic planning.' },
    { name: 'Anjali Desai', position: 'Director - Technology', bio: 'Tech innovator driving digital transformation and technology initiatives at PPS.' },
    { name: 'Arjun Singh', position: 'Director - HR & Admin', bio: 'People management expert fostering a culture of excellence and employee development.' },
    { name: 'Meera Nair', position: 'Director - Customer Relations', bio: 'Customer-centric leader ensuring exceptional service and long-term client partnerships.' }
  ]

  const whyChooseUs = [
    { icon: 'fa-clock', title: '50+ Years Experience', desc: 'Over 5 decades of industry knowledge and proven expertise in logistics management.' },
    { icon: 'fa-network-wired', title: 'Pan-India Network', desc: 'Coverage across 19 states with presence in all major cities and industrial towns.' },
    { icon: 'fa-certificate', title: 'Quality Certified', desc: 'ISO certified operations ensuring consistent quality and reliability in every service.' },
    { icon: 'fa-users', title: 'Expert Team', desc: 'Well-experienced operations team with deep industry knowledge and best practices.' },
    { icon: 'fa-leaf', title: 'Sustainable Practices', desc: 'Eco-friendly solutions with optimized routes and carbon footprint reduction.' },
    { icon: 'fa-headset', title: '24/7 Support', desc: 'Round-the-clock customer support and real-time tracking for peace of mind.' }
  ]

  const coreValues = [
    { title: 'Partnership', desc: 'We view our clients as partners in their growth journey, not just customers.' },
    { title: 'Excellence', desc: 'Commitment to quality and continuous improvement in all operations.' },
    { title: 'Reliability', desc: 'Consistent, dependable service that you can trust every single time.' },
    { title: 'Innovation', desc: 'Embracing technology and new approaches to improve logistics solutions.' }
  ]

  return (
    <div className="pt-20">
      {/* Hero Section */}
      <section className="relative h-96 flex items-center justify-center bg-gray-50">
        <div className="text-center max-w-4xl px-4">
          <h1 className="text-6xl md:text-7xl font-black text-gray-900 mb-4">About PPS Logistics</h1>
          <p className="text-xl text-blue-700">Your Trusted Partner in Logistics Excellence</p>
        </div>
      </section>

      {/* Company History */}
      <RevealSection className="py-20 px-4 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center mb-20">
            <div>
              <h2 className="text-4xl md:text-5xl font-black text-gray-900 mb-6">Our History</h2>
              <p className="text-gray-700 text-lg leading-relaxed mb-4">
                Prakash Parcel Services Limited started in 1992 as the parcel division of the erstwhile Prakash Group, one of India's few transport companies started in the 1960s.
              </p>
              <p className="text-gray-700 text-lg leading-relaxed mb-4">
                Over the decades, we have evolved and transformed into a renowned logistics service provider working with several corporate houses, MNCs, MSMEs & PSUs supporting their physical distribution across India.
              </p>
              <p className="text-gray-700 text-lg leading-relaxed">
                We believe that we are partners in the growth of our customers, and this philosophy guides every decision we make.
              </p>
            </div>
            <div className="relative h-96">
              <img src="https://images.unsplash.com/photo-1519003722824-194d4455a60c?auto=format&fit=crop&w=600&q=80" alt="Company history" className="w-full h-full object-cover rounded-lg border-4 border-blue-600 shadow-lg" />
            </div>
          </div>
        </div>
      </RevealSection>

      {/* Mission & Vision */}
      <RevealSection className="py-20 px-4 bg-gray-50">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-black text-center text-gray-900 mb-16">Mission & Vision</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <div className="bg-white rounded-2xl p-8 border-l-4 border-blue-600 shadow-md">
              <h3 className="text-3xl font-bold text-blue-700 mb-4">Our Mission</h3>
              <p className="text-gray-700 text-lg leading-relaxed">
                To provide innovative, reliable, and sustainable logistics solutions that empower businesses to reach their markets efficiently while maintaining the highest standards of service quality and customer satisfaction.
              </p>
            </div>
            <div className="bg-white rounded-2xl p-8 border-l-4 border-blue-500 shadow-md">
              <h3 className="text-3xl font-bold text-blue-700 mb-4">Our Vision</h3>
              <p className="text-gray-700 text-lg leading-relaxed">
                To become India's most trusted logistics partner, recognized for operational excellence, technological innovation, and unwavering commitment to customer success across all segments of the supply chain industry.
              </p>
            </div>
          </div>
        </div>
      </RevealSection>

      {/* Why Choose Us */}
      <RevealSection className="py-20 px-4 bg-[#1a1a1a]/50">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-black text-center text-white mb-16">Why Choose PPS</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {whyChooseUs.map((item, idx) => (
              <div key={idx} className="bg-[#1a1a1a] rounded-xl p-8 border border-blue-600/30 hover:border-blue-600 transition">
                <i className={`fas ${item.icon} text-blue-500 text-4xl mb-4`}></i>
                <h3 className="text-xl font-bold text-white mb-3">{item.title}</h3>
                <p className="text-gray-400">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </RevealSection>

      {/* Core Values */}
      <RevealSection className="py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-black text-center text-white mb-16">Our Core Values</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {coreValues.map((value, idx) => (
              <div key={idx} className="flex gap-4">
                <div className="text-blue-500 text-2xl flex-shrink-0">
                  <i className="fas fa-check-circle"></i>
                </div>
                <div>
                  <h3 className="text-xl font-bold text-white mb-2">{value.title}</h3>
                  <p className="text-gray-400">{value.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </RevealSection>

      {/* Board of Members */}
      <RevealSection className="py-20 px-4 bg-[#1a1a1a]/50">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-black text-center text-white mb-16">Board of Members</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {boardMembers.map((member, idx) => (
              <div key={idx} className="bg-[#1a1a1a] rounded-xl overflow-hidden border border-blue-600/30 hover:border-blue-600 transition">
                <div className="h-64 bg-gradient-to-br from-blue-600 to-blue-800 flex items-center justify-center">
                  <i className="fas fa-user-tie text-6xl text-white/30"></i>
                </div>
                <div className="p-6 text-center">
                  <h3 className="text-xl font-bold text-white mb-2">{member.name}</h3>
                  <p className="text-blue-400 font-semibold mb-3">{member.position}</p>
                  <p className="text-gray-400 text-sm">{member.bio}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </RevealSection>

      {/* CTA Section */}
      <RevealSection className="py-20 px-4 bg-gradient-to-r from-blue-600 to-blue-800">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl font-black text-white mb-6">Ready to Partner With Us?</h2>
          <p className="text-xl text-blue-100 mb-8">
            Let's discuss how PPS Logistics can help optimize your supply chain and drive your business forward.
          </p>
          <a href="/contact" className="bg-white text-blue-600 px-10 py-4 rounded-lg font-bold text-lg hover:bg-gray-100 transition-all inline-block">
            Get In Touch
          </a>
        </div>
      </RevealSection>
    </div>
  )
}