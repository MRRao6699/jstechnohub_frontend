import React, { useState } from 'react';
import styles from './ContactPage.module.css';
import { submitCertificationEnquiry } from '../services/api'; // API call for certificate enquiries
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css"
// The 'import coachPhoto' line has been removed.

// Section 1: Hero Component (Image removed)
const ContactHero = () => (
  <div className={styles.contactHeader}>
    {/* The <img> tag has been removed from here. */}
    <h1>Ready to Start Your Transformation?</h1>
    <p>I'm excited to connect. Whether you have a question or are ready to book your complimentary discovery call, this is the place to do it. Let's explore how we can achieve your goals together.</p>
  </div>
);

// Section 2: Call-to-Action Component (No changes)
const BookingCTA = () => (
  <div className={styles.ctaSection}>
    <h2>Book a Complimentary Discovery Call</h2>
    <p>This is a no-obligation 30-minute call for us to get to know each other. We'll discuss your goals and how my coaching can help you get there.</p>
    <a href="tel:+918743039914" target="_blank" rel="noopener noreferrer" className={styles.ctaButton}>
      Schedule Your Free Call
    </a>
  </div>
);

// Section 3: Contact Form Component (No changes)
const ContactForm = ({ certificationName }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: '',

  });

  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState(null); // success / error
  const [isSubmitting, setIsSubmitting] = useState(false); // block button while submitting
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
        setErrors({ ...errors, phone: '' }); // clear error

  };

   const handlePhoneChange = (value) => {
    setFormData({ ...formData, phone: value });
    setErrors({ ...errors, phone: '' }); // clear error

  };
 const validateForm = () => {
    const newErrors = {};
    const nameRegex = /^[A-Za-z\s]{3,}$/;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!formData.name.trim()) {
      newErrors.name = 'Name is required.';
    } else if (!nameRegex.test(formData.name)) {
      newErrors.name = 'Name must contain only letters and be at least 3 characters.';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required.';
    } else if (!emailRegex.test(formData.email)) {
      newErrors.email = 'Enter a valid email address.';
    }

    const phoneDigits = formData.phone.replace(/\D/g, '');
    if (!formData.phone) {
      newErrors.phone = 'Phone number is required.';
    } else if (phoneDigits.length < 10) {
      newErrors.phone = 'Enter a valid 10-digit phone number.';
    }

    if (!formData.message.trim()) {
      newErrors.message = 'Message is required.';
    } else if (formData.message.length < 10) {
      newErrors.message = 'Message should be at least 10 characters.';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };


  const handleSubmit = async (e) => {
    e.preventDefault();
          if (!validateForm()) return; // stop if validation fails

    setIsSubmitting(true);
        setStatus(null);



    const payload = {
      ...formData,
      certificationName: certificationName || 'General Inquiry', // optional
    };

    try {
      await submitCertificationEnquiry(payload);
      setStatus('success');
      setFormData({ name: '', email: '', phone: '', message: '' });
    } catch (err) {
      console.error('Error submitting enquiry:', err);
      setStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className={styles.formWrapper}>
      <h2>Send Me a Message</h2>
      <form onSubmit={handleSubmit} noValidate>
        {/* Name */}
        <label htmlFor="name">Name</label>
        <input
          type="text"
          id="name"
          name="name"
          placeholder="Enter Name"
          value={formData.name}
          onChange={handleChange}
          required
        />
        {errors.name && <p className={styles.errorMsg}>{errors.name}</p>}

        {/* Email */}
        <label htmlFor="email">Email</label>
        <input
          type="email"
          id="email"
          name="email"
          placeholder="Enter Email"
          value={formData.email}
          onChange={handleChange}
          required
        />
        {errors.email && <p className={styles.errorMsg}>{errors.email}</p>}

        {/* Phone */}
        <label htmlFor="phone">Phone</label>
        <PhoneInput
          country="in"
          enableSearch={true}
          id="phone"
          name="phone"
          placeholder="Enter Phone Number"
          value={formData.phone}
          onChange={handlePhoneChange}
          inputStyle={{
            width: '100%',
            padding: '15px',
            paddingLeft: '45px',
            fontSize: '14px',
            borderRadius: '6px',
            border: '1px solid #ccc',
          }}
          required
        />
        {errors.phone && <p className={styles.errorMsg}>{errors.phone}</p>}

        {/* Message */}
        <label htmlFor="message">How can I help you?</label>
        <textarea
          id="message"
          name="message"
          rows="5"
          placeholder="Message..."
          value={formData.message}
          onChange={handleChange}
          required
        ></textarea>
        {errors.message && <p className={styles.errorMsg}>{errors.message}</p>}

        <button
          type="submit"
          className={styles.submitButton}
          disabled={isSubmitting}
        >
          {isSubmitting ? 'Submitting...' : 'Send Message'}
        </button>
      </form>

      {/* Status Message */}
      <div className={styles.statusMessage}>
        {status === 'success' && (
          <p className={styles.successMsg}>
            ✅ Your enquiry was submitted successfully!
          </p>
        )}
        {status === 'error' && (
          <p className={styles.errorMsg}>
            ❌ Failed to submit enquiry. Please try again.
          </p>
        )}
      </div>

      <p className={styles.responseTime}>
        I'll do my best to respond within 48 business hours.
      </p>
    </div>
  );
};

// Section 4: FAQ Component (No changes)
const FAQ = () => (
    <div className={styles.faqSection}>
      <h2>Common Questions</h2>
      <div className={styles.faqItem}>
        <h4>What happens during a discovery call?</h4>
        <p>The discovery call is a relaxed chat where we explore your goals and challenges. It's a chance for you to ask questions and for us to see if we're a good fit to work together. There's absolutely no pressure to sign up.</p>
      </div>
      <div className={styles.faqItem}>
        <h4>What are your coaching package prices?</h4>
        <p>I offer several coaching packages tailored to different needs. We can discuss the best option for you during our discovery call, or you can find more details on my <a href="/services">Services Page</a>.</p>
      </div>
    </div>
  );

// Main Page Component (No changes)
const ContactPage = () => {
  return (
    <div className={styles.contactPage}>
      <ContactHero />
      <BookingCTA />
      <div className={styles.contactBody}>
        <ContactForm />
        <div className={styles.otherOptions}>
          <h3>Other Ways to Connect</h3>
          <p><strong>Email:</strong> <a href="mailto:Juned.salmani835@gmail.com">Email us</a></p>
          <p><strong>Follow Me:</strong></p>
          <div className={styles.socialLinks}>
            <a href="https://www.linkedin.com/company/jstechnohub/" target="_blank" rel="noopener noreferrer">LinkedIn</a>
            <a href="https://www.instagram.com/jstechno_hub?igsh=cG81djVwZnNrbDZj" target="_blank" rel="noopener noreferrer">Instagram</a>
          </div>
        </div>
      </div>
      <FAQ />
    </div>
  );
};

export default ContactPage;