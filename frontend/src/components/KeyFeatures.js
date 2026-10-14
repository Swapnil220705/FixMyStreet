/***********************************************************************
 * Import Dependencies
 * ---------------------------------------------------------------------
 * Import the React library necessary for creating React components.
 ***********************************************************************/
import React from 'react';

/***********************************************************************
 * KeyFeatures Component
 * ---------------------------------------------------------------------
 * This functional component renders a section highlighting the key
 * features of the application. It uses a grid to display each feature
 * with an icon, title, and description, along with a call-to-action 
 * prompting users to get started.
 ***********************************************************************/

const KeyFeatures = () => {

    /***********************************************************************
   * Feature Data Array
   * ---------------------------------------------------------------------
   * An array of objects, where each object represents a feature with:
   * - a unique 'id'
   * - a descriptive 'title'
   * - a short 'description'
   * - an 'icon' representing the feature visually.
   ***********************************************************************/

  const features = [
    {
      id: 1,
      title: "AI-Powered Pothole Detection",
      description: "Our OpenCV technology automatically verifies and classifies the severity of reported issues",
      icon: "🔍"
    },
    {
      id: 2,
      title: "Real-time Tracking",
      description: "Citizens can monitor the status of their reports from submission to resolution",
      icon: "📱"
    },
    {
      id: 3,
      title: "Geolocation Mapping",
      description: "Precise GPS tracking to accurately pinpoint and visualize road issues",
      icon: "📍"
    },
    {
      id: 4,
      title: "Municipal Dashboard",
      description: "Authorities gain data-driven insights to efficiently allocate resources",
      icon: "📊"
    },
    {
      id: 5,
      title: "Community Engagement",
      description: "Citizens can upvote issues and provide feedback on repairs",
      icon: "👥"
    },
    {
      id: 6,
      title: "Transparent Governance",
      description: "Access to resolution timelines and performance metrics builds public trust",
      icon: "✅"
    }
  ];

  /***********************************************************************
   * Component Rendering
   * ---------------------------------------------------------------------
   * The return statement produces the JSX elements for the features
   * section. It includes:
   * - A section element with an id and styling class.
   * - A container div to restrict content width and manage layout.
   * - A section header featuring the title and a brief description.
   * - A grid that maps over the features array, rendering each feature
   *   as a card with an icon, title, and description.
   * - A call-to-action (CTA) segment encouraging user engagement.
   ***********************************************************************/

  return (
    <section id="features" className="features-section">
      <div className="container">
        <div className="section-header">
          <h2>Key Features</h2>
          <p>Transforming how communities address road infrastructure problems</p>
        </div>
        
        <div className="features-grid">
          {features.map(feature => (
            <div className="feature-card" key={feature.id}>
              <div className="feature-icon">{feature.icon}</div>
              <h3>{feature.title}</h3>
              <p>{feature.description}</p>
            </div>
          ))}
        </div>
{/*         
        <div className="features-cta">
          <h3>Ready to improve your community's roads?</h3>
          <button className="btn-primary">Get Started</button>
        </div> */}
      </div>
    </section>
  );
};

/***********************************************************************
 * Export Component
 * ---------------------------------------------------------------------
 * Export the KeyFeatures component as the default export, allowing it 
 * to be imported and used in other parts of the application.
 ***********************************************************************/

export default KeyFeatures;