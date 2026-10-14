import React, { useState } from 'react';
import { href, useNavigate } from 'react-router-dom';
import ResponsiveNavbar from './ResponsiveNavbar';
import { useAuth } from './authcontext';

const HeroSection = () => {
  const [email, setEmail] = useState('');
  const navigate = useNavigate();
  const { currentUser } = useAuth() || {};

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle newsletter signup
    alert(`Thank you for subscribing with ${email}`);
    setEmail('');
  };

  const handleReportClick = () => {
    navigate('/report');
  };

  const handleViewIssuesClick = () => {
    navigate('/issues');
  };

  const handleAdminClick = () => {
    navigate('/admin');
  };

  return (
    <section className="hero-section">
      <div className="hero-container">
        <ResponsiveNavbar />

        <div className="hero-content">
          <div className="hero-text">
            <h1>Report Road Issues, <br />Improve Your Community</h1>
            <p>FixMyStreet empowers citizens to report potholes and road damage while helping authorities resolve them efficiently using AI technology.</p>
            <div className="cta-buttons">
              <button className="btn-primary btn-large" onClick={handleReportClick}>Report a Pothole</button>
              <button className="btn-secondary btn-large" onClick={handleViewIssuesClick}>View Local Issues</button>
              {/* <button 
                className="btn-admin btn-large" 
                onClick={handleAdminClick}
              >
                Admin Dashboard
              </button> */}
            </div>
            <div className="stats">
              <div className="stat-item">
                <h3>11,000+</h3>
                <p>Accidents prevented</p>
              </div>
              <div className="stat-item">
                <h3>85%</h3>
                <p>Resolution rate</p>
              </div>
              <div className="stat-item">
                <h3>48hrs</h3>
                <p>Avg. response time</p>
              </div>
            </div>
          </div>
          <div className="hero-image">
            <img src="https://static.vecteezy.com/system/resources/previews/006/245/105/non_2x/repair-road-isometric-composition-vector.jpg" />
          </div>
        </div>

        <div className="newsletter">
          <h3>Stay updated on your community's improvements</h3>
          <form onSubmit={handleSubmit}>
            <input 
              type="email" 
              placeholder="Your email address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <button type="submit" className="btn-primary">Subscribe</button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;