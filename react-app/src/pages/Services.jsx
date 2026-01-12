import { useEffect } from 'react'
import RevealSection from '../components/RevealSection'

export default function Services() {
  useEffect(() => {
    document.title = 'Services | PPS Logistics'
  }, [])

  const additionalServices = [
    { icon: 'fa-box', title: 'Express Delivery', desc: 'Fast, time-sensitive deliveries for urgent shipments with guaranteed on-time performance.', features: ['Same-day delivery available', 'Priority handling', 'Dedicated vehicles'] },
    { icon: 'fa-globe', title: 'International Logistics', desc: 'Cross-border shipping solutions with customs clearance and documentation support.', features: ['Export/Import services', 'Customs assistance', 'Door-to-door delivery'] },
    { icon: 'fa-cube', title: 'Third Party Logistics', desc: 'End-to-end supply chain management solutions customized to your business needs.', features: ['Supply chain optimization', 'Fleet management', 'Technology integration'] },
    { icon: 'fa-mobile-alt', title: 'Real-time Tracking', desc: 'Advanced GPS tracking and mobile app for complete visibility of your shipments.', features: ['Live vehicle tracking', 'SMS/Email updates', 'Mobile app access'] }
  ]

  const services = [
    {
      title: 'Full Truck Load (FTL)',
      img: 'https://images.unsplash.com/photo-1601584115197-04ecc0da31d7?auto=format&fit=crop&w=600&q=80',
      desc: 'Our FTL service provides exclusive use of an entire truck for your shipment, ensuring direct routes without any transshipment delays or risks.',
      features: [
        'Direct point-to-point delivery',
        'Zero transshipment handling',
        'Scheduled pickup and delivery',
        'Dedicated vehicle assignment',
        'Real-time tracking & updates'
      ]
    },
    {
      title: 'Partial Truck Load (PTL)',
      img: 'https://images.unsplash.com/photo-1580674285054-bed31e145f59?auto=format&fit=crop&w=600&q=80',
      desc: 'For shipments that don\'t require a full truck, our PTL service optimizes costs while maintaining speed and reliability through our consolidated network.',
      features: [
        'Cost-effective shipping',
        'Frequent service frequency',
        'Safe cargo consolidation',
        'Flexible pickup & delivery',
        'Pan-India network coverage'
      ],
      reverse: true
    },
    {
      title: 'Warehousing & Distribution',
      img: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=600&q=80',
      desc: 'Our secure warehousing solutions provide strategic storage and distribution centers across major hubs with advanced inventory management systems.',
      features: [
        'Climate-controlled facilities',
        'Real-time inventory tracking',
        'Order fulfillment services',
        'Value-added services',
        'Integrated logistics solutions'
      ]
    }
  ]

  return (
    <div className="pt-20">
      {/* Hero Section */}
      <section className="relative h-96 flex items-center justify-center">
        <div className="text-center max-w-4xl px-4">
          <h1 className="text-6xl md:text-7xl font-black text-white mb-4">Our Services</h1>
          <p className="text-xl text-blue-300">Comprehensive Logistics Solutions for Your Business</p>
        </div>
      </section>

      {/* Services Overview */}
      <RevealSection className="py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <p className="text-center text-gray-300 text-lg mb-16 max-w-3xl mx-auto">
            PPS Logistics offers a wide range of logistics and supply chain solutions tailored to meet the unique needs of businesses across industries.
          </p>
        </div>
      </RevealSection>

      {/* Services Details */}
      {services.map((service, idx) => (
        <RevealSection key={idx} className={`py-20 px-4 ${idx % 2 === 0 ? 'bg-[#1a1a1a]/50' : ''}`}>
          <div className="max-w-6xl mx-auto">
            <div className={`grid grid-cols-1 md:grid-cols-2 gap-12 items-center ${service.reverse ? 'md:grid-cols-2' : ''}`}>
              <div className={service.reverse ? 'order-2 md:order-1' : ''}>
                <div className="relative h-96">
                  <img src={service.img} alt={service.title} className="w-full h-full object-cover rounded-lg border-4 border-blue-600 shadow-lg" />
                </div>
              </div>
              <div className={service.reverse ? 'order-1 md:order-2' : ''}>
                <h2 className="text-5xl font-black text-white mb-6">{service.title}</h2>
                <p className="text-gray-300 text-lg leading-relaxed mb-6">
                  {service.desc}
                </p>
                <ul className="space-y-4 mb-8">
                  {service.features.map((feature, fIdx) => (
                    <li key={fIdx} className="flex gap-3">
                      <i className="fas fa-check text-blue-500 mt-1"></i>
                      <span className="text-gray-300">{feature}</span>
                    </li>
                  ))}
                </ul>
                <button className="bg-blue-600 hover:bg-blue-500 text-white px-8 py-3 rounded-lg font-bold uppercase tracking-widest transition-all">
                  Learn More
                </button>
              </div>
            </div>
          </div>
        </RevealSection>
      ))}

      {/* Additional Services */}
      <RevealSection className="py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-black text-center text-white mb-16">Additional Services</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {additionalServices.map((item, idx) => (
              <div key={idx} className="bg-[#1a1a1a] rounded-xl p-8 border border-blue-600/30 hover:border-blue-600 transition">
                <i className={`fas ${item.icon} text-blue-500 text-4xl mb-4`}></i>
                <h3 className="text-2xl font-bold text-white mb-4">{item.title}</h3>
                <p className="text-gray-400 mb-4">{item.desc}</p>
                <ul className="space-y-2 text-gray-400 text-sm">
                  {item.features.map((feature, fIdx) => (
                    <li key={fIdx}>• {feature}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </RevealSection>

      {/* CTA Section */}
      <RevealSection className="py-20 px-4 bg-gradient-to-r from-blue-600 to-blue-800">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl font-black text-white mb-6">Need a Custom Solution?</h2>
          <p className="text-xl text-blue-100 mb-8">
            Our team is ready to discuss your specific logistics requirements and design the perfect solution.
          </p>
          <a href="/contact" className="bg-white text-blue-600 px-10 py-4 rounded-lg font-bold text-lg hover:bg-gray-100 transition-all inline-block">
            Contact Us Today
          </a>
        </div>
      </RevealSection>
    </div>
  )
}