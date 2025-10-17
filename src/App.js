import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Link, NavLink, useNavigate } from 'react-router-dom';
import ScrollToTop from './components/ScrollToTop';
import HomePage from './components/HomePage';
import CourseDetail from './components/CourseDetailPage';
import CoursesPage from './components/CoursesPage';
import ResumePage from './components/ResumePage';
import ServicesPage from './components/ServicesPage';
import AboutUsPage from './components/AboutUsPage';
import CertificationsListPage from './components/CertificationsListPage';
import CertificationsPage from './components/CertificationsPage';
import AdminAuth from './components/AdminAuth';
import AdminPage from './components/AdminPage';
import ContactPage from './components/ContactPage';
import Footer from './components/Footer';
import PrivacyPolicyPage from './components/PrivacyPolicyPage';
import TermsPage from './components/TermsPage';
import CancellationPolicyPage from './components/CancellationPolicyPage';
import PaymentSuccessPage from './components/PaymentSuccessPage';
import InterviewQuestionsPage from './components/InterveiwQuestionPage';
<<<<<<< HEAD
=======

>>>>>>> f6902d5fca2eaace9a6699115f56f57dfe0f9bb5
// CORRECTED: Import paths now point to the 'blog' subfolder
//import BlogPage from './components/BlogPage';
//import SinglePostPage from './components/SinglePostPage';

import './App.css';
<<<<<<< HEAD
=======
import Pmp from './components/certifications/Pmp';
>>>>>>> f6902d5fca2eaace9a6699115f56f57dfe0f9bb5

function AppLogic() {
    const navigate = useNavigate();
    const [isAuthenticated, setIsAuthenticated] = useState(sessionStorage.getItem('isAdminAuthenticated') === 'true');
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [openDropdown, setOpenDropdown] = useState(null);

    useEffect(() => {
        const checkAuth = () => {
            setIsAuthenticated(sessionStorage.getItem('isAdminAuthenticated') === 'true');
        };
        window.addEventListener('storage', checkAuth);
        return () => window.removeEventListener('storage', checkAuth);
    }, []);

    const handleLogin = (password) => {
        if (password === 'coaching') {
            sessionStorage.setItem('isAdminAuthenticated', 'true');
            setIsAuthenticated(true);
            navigate('/admin');
            return true;
        }
        return false;
    };

<<<<<<< HEAD
=======

>>>>>>> f6902d5fca2eaace9a6699115f56f57dfe0f9bb5
    const handleLogout = () => {
        sessionStorage.removeItem('isAdminAuthenticated');
        setIsAuthenticated(false);
        navigate('/');
    };

    const closeMenu = () => {
        setIsMenuOpen(false);
        setOpenDropdown(null);
    };

    const toggleDropdown = (name) => {
      // This logic correctly ensures the dropdown only opens on tap on mobile devices.
      // For desktop, you would typically use CSS :hover pseudo-class to show the dropdown.
      if (window.innerWidth <= 992) {
        setOpenDropdown(prev => (prev === name ? null : name));
      }
    };

    return (
        <>
            <header className="app-header">
                <Link to="/" className="logo" onClick={closeMenu}>Jstechnohub</Link>
                
                <button 
                    className={`hamburger-menu ${isMenuOpen ? 'active' : ''}`} 
                    onClick={() => setIsMenuOpen(!isMenuOpen)}
                    aria-label="Toggle navigation menu"
                >
                    <span className="hamburger-line"></span>
                    <span className="hamburger-line"></span>
                    <span className="hamburger-line"></span>
                </button>

                <nav className={`nav-links ${isMenuOpen ? 'open' : ''}`}>
                    <div className="mobile-menu-header">
                        <span className="mobile-menu-title">jstechnohub</span>
                        <button className="mobile-close-btn" onClick={closeMenu}>×</button>
                    </div>
                    
                    <NavLink to="/" className="nav-item" onClick={closeMenu} end>Home</NavLink>
                    <NavLink to="/courses" className="nav-item" onClick={closeMenu}>Courses</NavLink>
                
                    {/* Certifications Dropdown */}
                    <div className={`nav-item dropdown ${openDropdown === 'certifications' ? 'open' : ''}`}>
                        <span 
                            className="dropdown-toggle" 
                            onClick={() => toggleDropdown('certifications')}
                        >
                            Certifications <span className="dropdown-arrow">▾</span>
                        </span>
                        <div className="dropdown-menu">
                            <NavLink to="/certifications/sales-force" className="dropdown-link" onClick={closeMenu}>Sales Force</NavLink>
                            <NavLink to="/certifications/ccna" className="dropdown-link" onClick={closeMenu}>CCNA</NavLink>
                            <NavLink to="/certifications/palo-alto" className="dropdown-link" onClick={closeMenu}>Palo Alto</NavLink>
                            <NavLink to="/certifications/vmware" className="dropdown-link" onClick={closeMenu}>Vmware</NavLink>
                            <NavLink to="/certifications/cbap" className="dropdown-link" onClick={closeMenu}>CBAP</NavLink>
                            <NavLink to="/certifications/cams-training" className="dropdown-link" onClick={closeMenu}>CAMS Training & Certification</NavLink>
                            <NavLink to="/certifications/cia-training" className="dropdown-link" onClick={closeMenu}>Certified Internal Auditor (CIA)</NavLink>
                            <NavLink to="/certifications/capm-training" className="dropdown-link" onClick={closeMenu}>Certified Associate Project Management (CAPM)</NavLink>
                            <NavLink to="/certifications/pmp" className="dropdown-link" onClick={closeMenu}>Project Management Professional (PMP)</NavLink>
                        </div>
                    </div>

                    <NavLink to="/services" className="nav-item" onClick={closeMenu}>Services</NavLink>
                    <NavLink to="/resume" className="nav-item" onClick={closeMenu}>Resume</NavLink>
                    {/* ADDED: A navigation link for the blog */}
                    <NavLink to="/interview-questions" className="nav-item" onClick={closeMenu}>Interview Q's</NavLink>
                    <NavLink to="/about" className="nav-item" onClick={closeMenu}>About Us</NavLink>
                    <NavLink to="/contact" className="nav-item" onClick={closeMenu}>Contact Us</NavLink>
                    {isAuthenticated && (
                        <NavLink to="/admin" className="nav-item" onClick={closeMenu}>Admin Panel</NavLink>
                    )}
<<<<<<< HEAD
=======
                    {isAuthenticated && <li className="nav-item" onClick={handleLogout} style={{cursor:'pointer'}}>Logout</li>}

>>>>>>> f6902d5fca2eaace9a6699115f56f57dfe0f9bb5
                </nav>
                
                {isMenuOpen && <div className="nav-overlay" onClick={closeMenu}></div>}
            </header>
            
            <main className="main-content">
                <Routes>
                    <Route path="/" element={<HomePage />} />
                    <Route path="/courses" element={<CoursesPage />} />
                    <Route path="/course/:id" element={<CourseDetail />} />
                    <Route path="/certifications" element={<CertificationsListPage />} />
<<<<<<< HEAD
=======
                    <Route path="/certifications/pmp" element={<Pmp/>} />
>>>>>>> f6902d5fca2eaace9a6699115f56f57dfe0f9bb5
                    <Route path="/certifications/:certId" element={<CertificationsPage />} />
                    <Route path="/resume" element={<ResumePage />} />
                    <Route path="/services" element={<ServicesPage />} />
                    <Route path="/about" element={<AboutUsPage />} />
                    <Route path="/contact" element={<ContactPage />} />
                    <Route path="/privacy-policy" element={<PrivacyPolicyPage />} />
                    {/* CORRECTED: Using a standard URL format */}
                    <Route path="/terms-of-service" element={<TermsPage />} />
                    <Route path="/cancellation-policy" element={<CancellationPolicyPage />} />
                    <Route path="/payment-success" element={<PaymentSuccessPage />} />
                    {/* These routes for the blog pages are correct */}
                    <Route path="/interview-questions" element={<InterviewQuestionsPage />} />
                    <Route path="/admin" element={ isAuthenticated ? <AdminPage onLogout={handleLogout} /> : <AdminAuth onLogin={handleLogin} /> } />
                </Routes>
            </main>
            <Footer />
        </>
    );
}

function App() {
    return (
        <Router>
            <ScrollToTop />
            <AppLogic />
        </Router>
    );
}

export default App;