import React, { useState } from 'react';
import './Pmp.css';
import FeatureBox from './FeatureBox';
import { submitCertificationEnquiry } from '../../services/api';
import StatsCard from './StatsCard';
import BarChart from './BarChart';


function Pmp() {

  // Convert slug (aws-solutions-architect) -> Aws Solutions Architect
 

  // Local state for form fields & status

  // Convert slug (aws-solutions-architect) -> Aws Solutions Architect
  const certificationTitle = "PMP"
   

  // Local state for form fields & status
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: '',
  });
  const [status, setStatus] = useState(null); // success / error
  const [isSubmitting, setIsSubmitting] = useState(false); // 🚀 new


  const industries = [
    { icon: <i class="fa-solid fa-ranking-star" style={{color:"#5a0e7db8",fontSize:'30px'}}/>, name: "Defense" },
    { icon: <i class="fa-solid fa-building-columns" style={{color:"#5a0e7db8",fontSize:'30px'}}/>, name: "Banking" },
    { icon: <i class="fa-solid fa-lightbulb" style={{color:"#5a0e7db8",fontSize:'30px'}}/>, name: "Energy" },
    { icon: <i class="fa-solid fa-computer-mouse"style={{color:"#5a0e7db8",fontSize:'30px'}} color='#333'/>, name: "IT" },
    { icon: <i class="fa-solid fa-screwdriver-wrench"style={{color:"#5a0e7db8",fontSize:'30px'}} color='#333'/>, name: "Manufacturing" },
    { icon: <i class="fa-solid fa-briefcase-medical"style={{color:"#5a0e7db8",fontSize:'30px'}} color='#333'/>, name: "Healthcare" },
  ];



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
    <>
    <div className="cert-detail-container">
      <header className="cert-detail-hero">
        <h1>Crack Your PMP Exam 
in Just 6 Weeks!</h1>
        <h3>Project Management Professional (PMP)® Certification Training    </h3>
        <p>Live Online Instructor-Led Training </p>
      </header>

      <div className="cert-detail-main">
        <div className="cert-detail-content">
          <h2><strong className='hightlite'>Fast-Track</strong> Your PMP 
Certification Journey</h2>
          <p>
            Leading the way in Project Management training since 2011, JsTechnohub  is thrilled 
to introduce our revamped PMP training package. Crafted to empower you to 
confidently ace your exam on the first attempt, our program offers a proven learning 
path for guaranteed PMP Exam success. 
Aligned with the latest PMP exam content guidelines, our program addresses every 
challenge in your exam preparation journey. Whether you're starting your PMP exam 
prep or juggling it with a full-time job, we've got you covered. Plus, we're so confident 
in this! 
Enroll in our curated Exam Pass PMP Course for a fully guided, mentor-led 5-we study 
experience. With live sessions, a step-by-step study plan, simulations, and ample 
practice, we provide everything you need to crack the PMP exam in the very first 
attempt. 
          </p>

          <h3>Program <strong className='hightlite'>Hightlights</strong></h3>
          <ul>
            <li>36 Contact Hours with Live Instructor-Led Sessions </li>
            <li>35 Hours On-Demand Course by Industry Expert, Carl Pritchard </li>
            <li>Mentor-Led Five-Week Exam Pass Study Plan </li>
            <li>Hands-On Practice with a Question Bank of 2000+ Questions </li>
            <li>Complimentary Mock Tests and Exams for Hands-On Practice </li>
            <li>Free PMP Exam Simulator for Real Exam Experience </li>
            <li>Rejoin Refresher Courses with 180-Day Grand Pass </li>
            <li>Exact PMP Exam Questions Replica Set from PMI </li>
            <li>li500+ Premium Exam Questions Exclusive from PMI</li>
            <li>12 Full-Length Simulation Tests (180 Qs Each) </li>
            <li>Comprehensive Exam Prep Support </li>
          </ul>
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

 <div className="cert-detail-main">
 <div className="cert-detail-content">
    <FeatureBox 
        icon={<i className="fa-regular fa-headphones" style={{ color: "#ff0054", fontSize: "30px" }}></i>}
        title="LEARN" 
        description="through Instructor-Led or Self-Placed Learning. Get 36 PDUs." 
      />
      <FeatureBox 
        icon={<i class="fa-solid fa-calendar-days" style={{ color: "#ff0054", fontSize: "30px" }}></i>} 
        title="STUDY" 
        description="with our Expert-Curated and Mentor-Led Study Plan." 
      />
      <FeatureBox 
        icon={<i class="fa-solid fa-clipboard" style={{ color: "#ff0054", fontSize: "30px" }}></i>} 
        title="PRACTICE" 
        description="with a Premium Question Bank of Over 2000 Questions." 
      />
      <FeatureBox 
        icon={<i class="fa-solid fa-clipboard-list" style={{ color: "#ff0054", fontSize: "30px" }}></i>} 
        title="ASSESS" 
        description="Yourself with Unlimited Attempts to Mock Exams." 
      />
      <FeatureBox 
        icon={<i class="fa-solid fa-clipboard-check" style={{ color: "#ff0054", fontSize: "30px" }}></i>} 
        title="GET EXAM-READY" 
        description="with Full-Length PMP Exam Simulations." 
      />
      <FeatureBox 
        icon={<i class="fa-solid fa-graduation-cap" style={{ color: "#ff0054", fontSize: "30px" }}></i>} 
        title="TAKE THE EXAM" 
        description="and Ace it on the Very First Go!" 
      />
       <div className="congrats-section"> 
        <h3>🎉 <span className="highlight">CONGRATS!</span></h3>
        <p>You're now an in-demand <strong>PMP® certified Project Management Professional!</strong></p>
      <img src='/img/congrats.png' alt="Celebration" className="congrats-img" />
      </div>
      </div>

      <aside className="cert-detail-sidebar">
    <div className="cert-detail-content">

        <h2>By the end of the course, you’ll be able to:</h2>
        <ul>
            <li> Have the right set of materials to crack the PMP exam </li>
            <li>Know the strategies to plan your exam prep alongside a full-time job </li>
            <li>Have mentor access to clear any doubts that may arise </li>
            <li>Have a step-by-step study plan to help you take the exam within 5 weeks </li>
            <li>Above all, you will have a sure-shot way to confidently apply for and clear your PMP exam on the first go </li>
          </ul>
          </div>
      </aside>  
    </div>

    <div className="container">
      <header className="main-heading">
        <h1>
          Project Management Skills <br />
          are in <span className="hightlite">High Demand</span>
        </h1>
      </header>
      <div className="impact-grid">
      <section className="certification-badge">
        <p style={{fontWeight:'bold'}}>Top</p>
        <p>Project Management  Certification</p>
        <div className="badge">CIO</div>
      </section>
      <section className="certification-badge">
        <p style={{fontWeight:'bold'}}>22 Million</p>
        <p>New Project-Oriented Roles required<br/> by 2027</p>
        <div className="">
          <img src='/img/pmi.png'style={{width:'30px'}} alt='Pmi image'/>
        </div>
      </section>
      </div>

      <section className="career-impact">
        <h2 className="career-title">Career Impact</h2>

        <div className="impact-grid">
          <StatsCard
            icon="💰"
            percentage="23%"
            description="Salary Growth Rate (2020 to 2025)"
          />
          <StatsCard
            icon="📈"
            percentage="33%"
            description="Growth in Job Listings (2020 to 2025)"
          />
          <BarChart />
        </div>
      </section>
    </div>

     <div className="container">
      <h2 className="title">Popular across industries</h2>

      <div className="industry-grid">
        {industries.map((item, index) => (
          <div className="industry-item" key={index}>
            {item.icon}
            <span className="label">{item.name}</span>
          </div>
        ))}
      </div>

      <p className="source">Sources: PMP®, PayScale, Glassdoor</p>
    </div>

  <div className="container">
      <header className="main-heading">
        <h1>
          Meet Our PMP<br />
          <span className="hightlite">Program Director</span>
        </h1>
      </header>
<div className="pmp-card">
        <div className="pmp-content">
          {/* Left: Image */}
          <div className="pmp-image">
            <img src="/img/professor.png" alt="Program Director" />
          </div>

          {/* Right: Information */}
          <div className="pmp-info">
            <h3 className="pmp-name">
              <span className="pmp-bar"></span> Swanand Dhekin
            </h3>
            <p className="pmp-role">
              <i>Principal PM Consultant,</i> <br />
              <span className="pmp-company">Jstechnohub, Bangalore</span>
            </p>

            <p className="pmp-description">
              Swanand is a renowned project management expert and has trained
              thousands of students across domains. He brings on board over two
              decades of rich project management experience.
            </p>
          </div>
        </div>

        {/* Bottom: Quote Section */}
        <div className="pmp-quote">
          <p>
            <i>
              “At <span className="pmp-company">Jstechnohub</span>, we're
              excited about cultivating the next generation of project
              professionals, empowering them to drive transformation.”
            </i>
          </p>
        </div>
      </div>
    </div>

   </> 
  );
}

export default Pmp;
