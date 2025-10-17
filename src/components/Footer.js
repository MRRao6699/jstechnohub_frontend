import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { submitCertificationEnquiry } from '../services/api';
import { FaLinkedin, FaInstagram } from "react-icons/fa";
import './Footer.css';

function Footer() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: ''
  });

  const [status, setStatus] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setStatus(null);

    const payload = {
      ...formData,
      certificationName: 'General Inquiry'
    };

    try {
      await submitCertificationEnquiry(payload);
      setStatus('success');
      setFormData({ name: '', email: '', phone: '', message: '' });
    } catch (err) {
      console.error('Error submitting footer enquiry:', err);
      setStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <footer className="site-footer">
<div className="footer-content">
  {/* Brand & Socials */}
  <div className="footer-column footer-brand">
    <Link to="/" className="footer-logo">jstechnohub</Link>
    <p className="mission-statement">
      Your partner in unlocking potential and achieving meaningful success.
    </p>
    <div className="social-links">
      <a href="https://www.linkedin.com/company/jstechnohub/"
         aria-label="LinkedIn"
         target="_blank"
         rel="noopener noreferrer">
        <FaLinkedin size={24} />
      </a>
      <a href="https://www.instagram.com/jstechno_hub?igsh=cG81djVwZnNrbDZj"
         aria-label="Instagram"
         target="_blank"
         rel="noopener noreferrer">
        <FaInstagram size={24} />
      </a>
    </div>
  </div>
  
  {/* Quick Links */}
  <div className="footer-column footer-links">
    <h3>Quick Links</h3>
    <ul>
      <li><Link to="/about">About Us</Link></li>
      <li><Link to="/courses">Courses</Link></li>
      <li><Link to="/services">Services</Link></li>
      <li><Link to="/resume">Resume Writing</Link></li>
      <li><Link to="/contact">Contact</Link></li>
    </ul>
  </div>
  
  {/* Enquiry Form */}
  <div className="footer-column footer-enquiry">
    <h3>Have a Question?</h3>
    <form onSubmit={handleFormSubmit} className="footer-enquiry-form">

            <input
              type="text"
              name="name"
              placeholder="Your Name"
              value={formData.name}
              onChange={handleInputChange}
              required
            />
            <input
              type="email"
              name="email"
              placeholder="Your Email"
              value={formData.email}
              onChange={handleInputChange}
              required
            />
            <input
              type="text"
              name="phone"
              placeholder="Your Phone Number"
              value={formData.phone}
              onChange={handleInputChange}
              required
            />
            <textarea
              name="message"
              placeholder="Your Message..."
              rows="4"
              value={formData.message}
              onChange={handleInputChange}
              required
            ></textarea>

            <button type="submit" className="btn-submit-footer" disabled={isSubmitting}>
              {isSubmitting ? 'Submitting...' : 'Send Message'}
            </button>

            <div className="footer-status-message">
              {status === 'success' && <p className="successMsg">✅ Your enquiry was submitted successfully!</p>}
              {status === 'error' && <p className="errorMsg">❌ Failed to submit enquiry. Please try again.</p>}
            </div>
          </form>
        </div>

      </div>

        {/* Location Maps */}
{/* Location Maps - full width row */}
<div className="maps-row">
  <div className="map-card">
    <p><strong>Nagpur Office</strong></p>
    <iframe
      src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3721.423535758346!2d79.0881547154023!3d21.14580068903689!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bd4c7bd80c3f53f%3A0x2b8f6d8b1c5cfb5d!2sNagpur!5e0!3m2!1sen!2sin!4v1631872740123!5m2!1sen!2sin"
      allowFullScreen=""
      loading="lazy"
      title="Nagpur Office"
    ></iframe>
  </div>
  <div className="map-card">
    <p><strong>Bangalore Office</strong></p>
    <iframe
      src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3888.8893790352333!2d77.59456271533603!3d12.971598990856214!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bae1670b3f7a9b7%3A0x37ef2c0c1a92a69f!2sBengaluru%2C%20Karnataka!5e0!3m2!1sen!2sin!4v1631872780164!5m2!1sen!2sin"
      allowFullScreen=""
      loading="lazy"
      title="Bangalore Office"
    ></iframe>
  </div>
</div>

      {/* Footer Bottom Bar */}
      <div className="footer-bottom">
        <p>&copy; {new Date().getFullYear()} jstechnohub. All Rights Reserved.</p>
        <div className="footer-legal-links">
          <Link to="/cancellation-policy">Cancellation & Refunds</Link> |{" "}
          <Link to="/privacy-policy">Privacy Policy</Link> |{" "}
          <Link to="/terms-&-conditions">Terms & Conditions</Link>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
