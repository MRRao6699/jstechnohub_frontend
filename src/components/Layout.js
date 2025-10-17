// src/components/Layout.js

import React from 'react';
import Footer from './Footer'; // Import the Footer you just created

// The 'children' prop is a special prop that will contain the content of your pages
function Layout({ children }) {
    return (
        <div className="site-container">
            <main className="main-content">
                {children}  {/* This is where your page content will be displayed */}
            </main>
            <Footer />
        </div>
    );
}

export default Layout;