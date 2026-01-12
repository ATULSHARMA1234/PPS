import { useState, useEffect } from 'react'
import RevealSection from '../components/RevealSection'

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    company: '',
    service: '',
    message: ''
  })
  const [showThankYou, setShowThankYou] = useState(false)
  const [countdown, setCountdown] = useState(5)
  const [isSubmitting, setIsSubmitting] = useState(false)

  useEffect(() => {
    document.title = 'Contact Us | PPS Logistics'
  }, [])

  useEffect(() => {
    if (!showThankYou) return
    const interval = setInterval(() => {
      setCountdown(prev => {
        if (prev <= 1) {
          window.location.href = '/'
        }
        return prev - 1
      })
    }, 1000)
    
    return () => clearInterval(interval)
  }, [showThankYou])

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    setIsSubmitting(true)
    
    setTimeout(() => {
      setShowThankYou(true)
      setFormData({ name: '', email: '', phone: '', company: '', service: '', message: '' })
      setIsSubmitting(false)
    }, 1000)
  }

  const contactInfo = [
    {
      icon: 'fa-map-marker-alt',
      title: 'Headquarters',
      content: 'PPS Logistics Hub, Plot No. 42-A, Industrial Estate, Phase III, New Delhi - 110020, India'
    },
    {
      icon: 'fa-phone',
      title: 'Phone',
      content: '+91 999 000 1111',
      subContent: 'Available 24/7'
    },
    {
      icon: 'fa-envelope',
      title: 'Email',
      content: 'info@ppslogistics.in',
      subContent: 'support@ppslogistics.in'
    },
    {
      icon: 'fa-clock',
      title: 'Business Hours',
      content: 'Monday - Friday: 9:00 AM - 6:00 PM',
      subContent: 'Saturday: 10:00 AM - 4:00 PM'
    }
  ]

  return (
    <div className="pt-20">
      {/* Hero Section */}
      <section className="relative h-96 flex items-center justify-center pt-20">
        <div className="text-center max-w-4xl px-4">
          <h1 className="text-6xl md:text-7xl font-black text-white mb-4">Get In Touch</h1>
          <p className="text-xl text-blue-300">We'd love to hear from you. Let's discuss your logistics needs.</p>
        </div>
      </section>

      {/* Contact Section */}
      <RevealSection className="py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            {/* Contact Information */}
            <div>
              <h2 className="text-4xl font-black text-white mb-8">Contact Information</h2>
              
              <div className="space-y-8">
                {contactInfo.map((info, idx) => (
                  <div key={idx} className="flex gap-4">
                    <div className="text-blue-500 text-2xl flex-shrink-0 mt-2">
                      <i className={`fas ${info.icon}`}></i>
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-white mb-2">{info.title}</h3>
                      <p className="text-gray-400">{info.content}</p>
                      {info.subContent && <p className="text-gray-400">{info.subContent}</p>}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Contact Form */}
            <div className="bg-[#1a1a1a] rounded-2xl p-8 border border-blue-600/30">
              <h2 className="text-4xl font-black text-white mb-8">Send us a Message</h2>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label className="block text-sm font-bold uppercase tracking-widest text-blue-400 mb-2">Full Name</label>
                  <input type="text" name="name" value={formData.name} onChange={handleChange} required disabled={isSubmitting} className="w-full p-4 bg-[#121212] border border-blue-600/30 rounded-lg focus:border-blue-500 outline-none text-white disabled:opacity-50" placeholder="Your Name" />
                </div>

                <div>
                  <label className="block text-sm font-bold uppercase tracking-widest text-blue-400 mb-2">Email Address</label>
                  <input type="email" name="email" value={formData.email} onChange={handleChange} required disabled={isSubmitting} className="w-full p-4 bg-[#121212] border border-blue-600/30 rounded-lg focus:border-blue-500 outline-none text-white disabled:opacity-50" placeholder="your@email.com" />
                </div>

                <div>
                  <label className="block text-sm font-bold uppercase tracking-widest text-blue-400 mb-2">Phone Number</label>
                  <input type="tel" name="phone" value={formData.phone} onChange={handleChange} required disabled={isSubmitting} className="w-full p-4 bg-[#121212] border border-blue-600/30 rounded-lg focus:border-blue-500 outline-none text-white disabled:opacity-50" placeholder="+91 999 000 1111" />
                </div>

                <div>
                  <label className="block text-sm font-bold uppercase tracking-widest text-blue-400 mb-2">Company Name</label>
                  <input type="text" name="company" value={formData.company} onChange={handleChange} disabled={isSubmitting} className="w-full p-4 bg-[#121212] border border-blue-600/30 rounded-lg focus:border-blue-500 outline-none text-white disabled:opacity-50" placeholder="Your Company" />
                </div>

                <div>
                  <label className="block text-sm font-bold uppercase tracking-widest text-blue-400 mb-2">Service Type</label>
                  <select name="service" value={formData.service} onChange={handleChange} required disabled={isSubmitting} className="w-full p-4 bg-[#121212] border border-blue-600/30 rounded-lg focus:border-blue-500 outline-none text-white disabled:opacity-50">
                    <option value="">Select a service</option>
                    <option value="ftl">Full Truck Load (FTL)</option>
                    <option value="ptl">Partial Truck Load (PTL)</option>
                    <option value="warehousing">Warehousing & Distribution</option>
                    <option value="express">Express Delivery</option>
                    <option value="other">Other</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-bold uppercase tracking-widest text-blue-400 mb-2">Message</label>
                  <textarea name="message" value={formData.message} onChange={handleChange} required rows="4" disabled={isSubmitting} className="w-full p-4 bg-[#121212] border border-blue-600/30 rounded-lg focus:border-blue-500 outline-none text-white disabled:opacity-50" placeholder="Tell us about your logistics needs..."></textarea>
                </div>

                <button type="submit" disabled={isSubmitting} className="w-full bg-blue-600 hover:bg-blue-500 text-white py-4 rounded-lg font-bold uppercase tracking-widest transition-all disabled:opacity-50 disabled:cursor-not-allowed">
                  {isSubmitting ? 'Sending...' : 'Send Message'}
                </button>
              </form>
            </div>
          </div>
        </div>
      </RevealSection>

      {/* Thank You Message */}
      {showThankYou && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm z-[999] flex items-center justify-center">
          <div className="bg-[#1a1a1a] rounded-2xl p-12 text-center border-2 border-blue-600 max-w-md w-full mx-4">
            <div className="text-6xl text-blue-500 mb-6">
              <i className="fas fa-check-circle"></i>
            </div>
            <h2 className="text-4xl font-black text-white mb-4">Thank You!</h2>
            <p className="text-xl text-gray-300 mb-8">We've received your message and will get back to you shortly with a customized logistics solution for your needs.</p>
            <p className="text-gray-400 text-sm">Redirecting to homepage in <span className="font-bold">{countdown}</span> seconds...</p>
          </div>
        </div>
      )}
    </div>
  )
}
