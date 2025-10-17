// import React from 'react';
// import { useParams } from 'react-router-dom';
// import './CertificationsPage.css'; // We will provide this CSS next

// function CertificationsPage() {
//     const { certId } = useParams();

//     const certificationTitle = certId
//         .split('-')
//         .map(word => word.charAt(0).toUpperCase() + word.slice(1))
//         .join(' ');

//     return (
//         <div className="cert-detail-container">
//             <header className="cert-detail-hero">
//                 <h1>{certificationTitle} Certification Training</h1>
//                 <p>Master the skills needed to become a certified professional.</p>
//             </header>
//             <div className="cert-detail-main">
//                 <div className="cert-detail-content">
//                     <h2>About This Certification</h2>
//                     <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>
//                     <h3>Course Outline</h3>
//                     <ul>
//                         <li>Module 1: Introduction to {certificationTitle}</li>
//                         <li>Module 2: Core Concepts and Architecture</li>
//                         <li>Module 3: Advanced Implementation Techniques</li>
//                         <li>Module 4: Security & Compliance Best Practices</li>
//                         <li>Module 5: Exam Preparation & Mock Tests</li>
//                     </ul>
//                     <h3>Who Should Attend?</h3>
//                     <p>This course is designed for professionals seeking to validate their expertise and advance their career. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.</p>
//                 </div>
//                 <aside className="cert-detail-sidebar">
//                     <div className="enquiry-form-wrapper-detail">
//                         <h3>Request More Info</h3>
//                         <form className="enquiry-form-detail">
//                             <input type="text" placeholder="Your Name*" required />
//                             <input type="email" placeholder="Your Email*" required />
//                             <input type="tel" placeholder="Phone Number" />
//                             <textarea placeholder="Your Message..." rows="5"></textarea>
//                             <button type="submit" className="btn-submit-detail">Submit</button>
//                         </form>
//                     </div>
//                 </aside>
//             </div>
//         </div>
//     );
// }

// export default CertificationsPage;
import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import './CertificationsPage.css';
import { submitCertificationEnquiry } from '../services/api';

function CertificationsPage() {
  const { certId } = useParams();

  // Convert slug (aws-solutions-architect) -> Aws Solutions Architect
  const certificationTitle = certId
    .split('-')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');

  // Local state for form fields & status
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: '',
  });
  const [status, setStatus] = useState(null); // success / error
  const [isSubmitting, setIsSubmitting] = useState(false); // 🚀 new

  // Handle input changes
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Handle form submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true); // 🚀 block button

    const enquiryPayload = {
      ...formData,
      certificationName: certificationTitle, // readable certificate name
    };

    try {
      await submitCertificationEnquiry(enquiryPayload); // ✅ call certification endpoint
      setStatus('success');
      setFormData({ name: '', email: '', phone: '', message: '' });
    } catch (err) {
      console.error('Error submitting enquiry:', err);
      setStatus('error');
    } finally {
      setIsSubmitting(false); // 🚀 re-enable button
    }
  };

  return (
    <div className="cert-detail-container">
      <header className="cert-detail-hero">
        <h1>{certificationTitle} Certification Training</h1>
        <p>Master the skills needed to become a certified professional.</p>
      </header>

      <div className="cert-detail-main">
        <div className="cert-detail-content">
          <h2>About This Certification</h2>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
          </p>

          <h3>Course Outline</h3>
          <ul>
            <li>Module 1: Introduction to {certificationTitle}</li>
            <li>Module 2: Core Concepts and Architecture</li>
            <li>Module 3: Advanced Implementation Techniques</li>
            <li>Module 4: Security & Compliance Best Practices</li>
            <li>Module 5: Exam Preparation & Mock Tests</li>
          </ul>

          <h3>Who Should Attend?</h3>
          <p>
            This course is designed for professionals seeking to validate their expertise and advance their career. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
          </p>
        </div>

        <aside className="cert-detail-sidebar">
          <div className="enquiry-form-wrapper-detail">
            <h3>Request More Info</h3>

            <form className="enquiry-form-detail" onSubmit={handleSubmit}>
              <input
                type="text"
                name="name"
                placeholder="Your Name*"
                value={formData.name}
                onChange={handleChange}
                required
              />
              <input
                type="email"
                name="email"
                placeholder="Your Email*"
                value={formData.email}
                onChange={handleChange}
                required
              />
              <input
                type="tel"
                name="phone"
                placeholder="Phone Number*"
                value={formData.phone}
                onChange={handleChange}
                required
              />
              <textarea
                name="message"
                placeholder="Your Message..."
                rows="5"
                value={formData.message}
                onChange={handleChange}
                required
              ></textarea>

              <button
                type="submit"
                className="btn-submit-detail"
                disabled={isSubmitting}
              >
                {isSubmitting ? 'Submitting...' : 'Submit'}
              </button>
            </form>

            {status === 'success' && (
              <p className="success-msg">Enquiry submitted successfully!</p>
            )}
            {status === 'error' && (
              <p className="error-msg">❌ Failed to submit enquiry. Please try again.</p>
            )}
          </div>
        </aside>
      </div>
    </div>
  );
}

export default CertificationsPage;
