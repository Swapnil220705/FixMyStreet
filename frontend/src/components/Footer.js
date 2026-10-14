import React from 'react';

/***********************************************************************
 * Footer Component
 * ---------------------------------------------------------------------
 * This functional component renders the footer section of the website.
 * It comprises multiple sub-sections including branding, navigation links,
 * social media connections, and a newsletter signup form, along with legal
 * links at the bottom. The footer helps users easily access additional
 * platform information and keeps them connected with updates.
 ***********************************************************************/
const Footer = () => {
    /***********************************************************************
   * Component Rendering
   * ---------------------------------------------------------------------
   * Returns the JSX for the footer, organized as follows:
   *   - The <footer> element with an id ("contact") and a class for styling.
   *   - A container that houses all the footer content.
   *   - A branding section that displays the logo, title, description,
   *     and social media links.
   *   - A set of navigational link columns categorizing links into
   *     "Platform", "Resources", and "Company".
   *   - A newsletter section with a brief call-to-action and subscription 
   *     form.
   *   - A footer bottom area featuring copyright and legal links.
   ***********************************************************************/
  return (
    <footer id="contact" className="footer">
      <div className="container">
        <div className="footer-content">
          <div className="footer-brand">
            <div className="logo">
              <img src="logo.png" alt="FixMyStreet Logo" />
            </div>
            <p>Empowering citizens and authorities to create safer roads together</p>
            <div className="social-links">
              <a href="#" aria-label="Facebook"><i className="fab fa-facebook"></i></a>
              <a href="#" aria-label="Twitter"><i className="fab fa-twitter"></i></a>
              <a href="#" aria-label="Instagram"><i className="fab fa-instagram"></i></a>
              <a href="#" aria-label="LinkedIn"><i className="fab fa-linkedin"></i></a>
            </div>
          </div>
          
          <div className="footer-links">
            <div className="link-column">
              <h3>Platform</h3>
              <ul>
                <li><a href="#">Report an Issue</a></li>
                <li><a href="#">Track Reports</a></li>
                <li><a href="#">Municipal Dashboard</a></li>
                <li><a href="#">Analytics</a></li>
              </ul>
            </div>
            
            <div className="link-column">
              <h3>Resources</h3>
              <ul>
                <li><a href="#">Documentation</a></li>
                <li><a href="#">API</a></li>
                <li><a href="#">Case Studies</a></li>
                <li><a href="#">Impact Reports</a></li>
              </ul>
            </div>
            
            <div className="link-column">
              <h3>Company</h3>
              <ul>
                <li><a href="#">About Us</a></li>
                <li><a href="#">Team</a></li>
                <li><a href="#">Blog</a></li>
                <li><a href="#">Careers</a></li>
              </ul>
            </div>
          </div>
          
          <div className="footer-newsletter">
            <h3>Stay Connected</h3>
            <p>Subscribe to our newsletter for updates on road safety initiatives</p>
            <form className="newsletter-form">
              <input type="email" placeholder="Your email address" required />
              <button type="submit" className="btn-primary">Subscribe</button>
            </form>
          </div>
        </div>
        
        <div className="footer-bottom">
          <p>&copy; {new Date().getFullYear()} FixMyStreet. All rights reserved.</p>
          <div className="legal-links">
            <a href="#">Privacy Policy</a>
            <a href="#">Terms of Service</a>
            <a href="#">Cookies</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

/***********************************************************************
 * Export Component
 * ---------------------------------------------------------------------
 * Export the Footer component as the default export to make it
 * accessible for import in other parts of the application.
 ***********************************************************************/
export default Footer;