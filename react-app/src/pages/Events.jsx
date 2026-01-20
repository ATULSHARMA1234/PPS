import { useState, useEffect } from 'react'
import RevealSection from '../components/RevealSection'

export default function Events() {
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [filteredEvents, setFilteredEvents] = useState([])

  useEffect(() => {
    document.title = 'Events | PPS Logistics'
  }, [])

  const allEvents = [
    {
      id: 1,
      title: 'Best Employee of the Year',
      category: 'awards',
      date: 'March 15, 2025',
      location: 'PPS Head Office, New Delhi',
      image: 'https://images.unsplash.com/photo-1567427017947-545c5f8d16ad?auto=format&fit=crop&w=600&q=80',
      description: 'Honoring our top-performing fleet managers with celebrations and recognition programs that highlight excellence in operations and customer service.',
      attendees: 250,
      time: '10:00 AM - 6:00 PM'
    },
    {
      id: 2,
      title: 'ISO Re-certification Milestone',
      category: 'milestone',
      date: 'February 28, 2025',
      location: 'Corporate Office',
      image: 'https://images.unsplash.com/photo-1578575437130-527eed3abbec?auto=format&fit=crop&w=600&q=80',
      description: 'Maintaining global standards in logistics operations, reinforcing trust with our partners and clients through rigorous quality checks and continuous improvement.',
      attendees: 150,
      time: '2:00 PM - 5:00 PM'
    },
    {
      id: 3,
      title: 'PPS National Meetup',
      category: 'culture',
      date: 'April 10-12, 2025',
      location: 'Resort, Goa',
      image: 'https://images.unsplash.com/photo-1511578314322-379afb476865?auto=format&fit=crop&w=600&q=80',
      description: 'Celebrating achievements, building team cohesion and sharing best practices across departments—our annual meetup brings everyone together.',
      attendees: 500,
      time: 'Full Day Event'
    },
    {
      id: 4,
      title: 'Fleet Expansion Launch',
      category: 'business',
      date: 'March 20, 2025',
      location: 'PPS Logistics Hub',
      image: 'https://images.unsplash.com/photo-1601584115197-04ecc0da31d7?auto=format&fit=crop&w=600&q=80',
      description: 'Launch of 200 new vehicles to our fleet, marking our expansion into 5 new states across India.',
      attendees: 300,
      time: '11:00 AM - 4:00 PM'
    },
    {
      id: 5,
      title: 'Technology Innovation Summit',
      category: 'business',
      date: 'April 5, 2025',
      location: 'Tech Park, Bangalore',
      image: 'https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&w=600&q=80',
      description: 'Exploring AI and IoT solutions for modern logistics challenges with industry experts and tech leaders.',
      attendees: 200,
      time: '9:00 AM - 5:00 PM'
    },
    {
      id: 6,
      title: 'Community CSR Drive',
      category: 'culture',
      date: 'March 22, 2025',
      location: 'Delhi Schools',
      image: 'https://images.unsplash.com/photo-1559027615-cd2628902d4a?auto=format&fit=crop&w=600&q=80',
      description: 'PPS Logistics organizes educational initiatives and skill development programs for underprivileged children.',
      attendees: 100,
      time: '8:00 AM - 2:00 PM'
    },
    {
      id: 7,
      title: 'Safety Training Workshop',
      category: 'training',
      date: 'March 10, 2025',
      location: 'All Regional Offices',
      image: 'https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&w=600&q=80',
      description: 'Comprehensive safety training for all drivers and operational staff to ensure zero accident target.',
      attendees: 400,
      time: '9:00 AM - 1:00 PM'
    },
    {
      id: 8,
      title: 'Customer Appreciation Gala',
      category: 'awards',
      date: 'April 18, 2025',
      location: '5-Star Hotel, Delhi',
      image: 'https://images.unsplash.com/photo-1519671482749-fd09be7ccebf?auto=format&fit=crop&w=600&q=80',
      description: 'Celebrating our valued clients and partners who have been instrumental in PPS Logistics success.',
      attendees: 350,
      time: '6:00 PM - 10:00 PM'
    }
  ]

  useEffect(() => {
    if (selectedCategory === 'all') {
      setFilteredEvents(allEvents)
    } else {
      setFilteredEvents(allEvents.filter(event => event.category === selectedCategory))
    }
  }, [selectedCategory])

  const categories = [
    { id: 'all', label: 'All Events', icon: 'fa-calendar' },
    { id: 'awards', label: 'Awards', icon: 'fa-trophy' },
    { id: 'milestone', label: 'Milestones', icon: 'fa-star' },
    { id: 'culture', label: 'Culture', icon: 'fa-handshake' },
    { id: 'business', label: 'Business', icon: 'fa-briefcase' },
    { id: 'training', label: 'Training', icon: 'fa-book' }
  ]

  return (
    <div className="pt-20">
      {/* Hero Section */}
      <section className="relative h-96 flex items-center justify-center bg-gradient-to-r from-blue-600 to-blue-800">
        <div className="text-center max-w-4xl px-4">
          <h1 className="text-6xl md:text-7xl font-black text-white mb-4">Company Events</h1>
          <p className="text-xl text-blue-100">Celebrate milestones and stay updated with PPS Logistics events</p>
        </div>
      </section>

      {/* Filter Section */}
      <RevealSection className="py-12 px-4 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-wrap gap-4 justify-center">
            {categories.map(cat => (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`px-6 py-3 rounded-full font-bold uppercase tracking-widest transition-all ${
                  selectedCategory === cat.id
                    ? 'bg-blue-600 text-white shadow-lg'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                <i className={`fas ${cat.icon} mr-2`}></i>
                {cat.label}
              </button>
            ))}
          </div>
        </div>
      </RevealSection>

      {/* Events Grid */}
      <section className="py-20 px-4 bg-gray-50">
        <div className="max-w-6xl mx-auto">
          {filteredEvents.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredEvents.map((event, idx) => (
                <RevealSection key={event.id} className={`reveal ${idx % 3 === 0 ? 'lg:col-span-1' : ''}`}>
                  <div className="bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-all transform hover:-translate-y-2">
                    {/* Event Image */}
                    <div className="relative h-64 overflow-hidden group">
                      <img 
                        src={event.image} 
                        alt={event.title}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                      />
                      <div className="absolute top-4 right-4 bg-blue-600 text-white px-4 py-2 rounded-full text-sm font-bold">
                        <i className={`fas ${categories.find(c => c.id === event.category)?.icon} mr-1`}></i>
                        {categories.find(c => c.id === event.category)?.label}
                      </div>
                    </div>

                    {/* Event Details */}
                    <div className="p-6">
                      <h3 className="text-2xl font-bold text-gray-900 mb-3">{event.title}</h3>
                      
                      <div className="space-y-3 mb-6 text-gray-700">
                        <div className="flex items-center gap-2">
                          <i className="fas fa-calendar text-blue-600 w-5"></i>
                          <span>{event.date}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <i className="fas fa-clock text-blue-600 w-5"></i>
                          <span>{event.time}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <i className="fas fa-map-marker-alt text-blue-600 w-5"></i>
                          <span>{event.location}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <i className="fas fa-users text-blue-600 w-5"></i>
                          <span>{event.attendees} Expected Attendees</span>
                        </div>
                      </div>

                      <p className="text-gray-600 text-sm leading-relaxed mb-6">
                        {event.description}
                      </p>

                      <button className="w-full bg-blue-600 hover:bg-blue-500 text-white py-3 rounded-lg font-bold uppercase tracking-widest transition-all">
                        Learn More
                      </button>
                    </div>
                  </div>
                </RevealSection>
              ))}
            </div>
          ) : (
            <div className="text-center py-20">
              <i className="fas fa-inbox text-6xl text-gray-300 mb-4"></i>
              <p className="text-2xl font-bold text-gray-700">No events found</p>
            </div>
          )}
        </div>
      </section>

      {/* Upcoming Events Timeline */}
      <RevealSection className="py-20 px-4 bg-white">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-4xl font-black text-center text-gray-900 mb-16">Event Calendar</h2>
          
          <div className="relative">
            {/* Timeline Line */}
            <div className="hidden md:block absolute left-1/2 transform -translate-x-1/2 w-1 h-full bg-gradient-to-b from-blue-600 to-blue-300"></div>

            {/* Timeline Items */}
            <div className="space-y-12">
              {allEvents.slice(0, 4).map((event, idx) => (
                <div key={event.id} className={`flex items-center ${idx % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'}`}>
                  {/* Content */}
                  <div className={`w-full md:w-5/12 ${idx % 2 === 0 ? 'md:pr-12' : 'md:pl-12'}`}>
                    <div className="bg-gray-50 rounded-lg p-6 border border-gray-200 hover:border-blue-600 transition">
                      <span className="text-blue-600 font-bold text-sm uppercase">{event.date}</span>
                      <h3 className="text-xl font-bold text-gray-900 mt-2 mb-2">{event.title}</h3>
                      <p className="text-gray-700 text-sm">{event.location}</p>
                    </div>
                  </div>

                  {/* Timeline Dot */}
                  <div className="hidden md:flex w-2/12 justify-center">
                    <div className="w-6 h-6 bg-blue-600 rounded-full border-4 border-white shadow-lg"></div>
                  </div>

                  {/* Spacer */}
                  <div className="w-full md:w-5/12"></div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </RevealSection>

      {/* CTA Section */}
      <RevealSection className="py-20 px-4 bg-gradient-to-r from-blue-600 to-blue-800">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl font-black text-white mb-6">Want to Attend Our Events?</h2>
          <p className="text-xl text-blue-100 mb-8">
            Join us for exciting events, networking opportunities, and celebrations at PPS Logistics.
          </p>
          <button className="bg-white text-blue-600 px-10 py-4 rounded-lg font-bold text-lg hover:bg-gray-100 transition-all inline-block">
            Register Interest
          </button>
        </div>
      </RevealSection>
    </div>
  )
}
