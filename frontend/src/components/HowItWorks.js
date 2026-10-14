/***********************************************************************
 * Import Dependencies
 * ---------------------------------------------------------------------
 * Import the React library to utilize JSX and define the component.
 ***********************************************************************/
import React from 'react';

/***********************************************************************
 * HowItWorks Component
 * ---------------------------------------------------------------------
 * This functional component represents a section that explains how
 * the FixMyStreet platform operates through a series of steps. It 
 * includes:
 *   - A process flow displaying each step with an icon, title, and description.
 *   - A demo section that provides a video demonstration and a call-to-action.
 ***********************************************************************/
const HowItWorks = () => {

  /***********************************************************************
   * Step Data Array
   * ---------------------------------------------------------------------
   * Define an array of objects where each object represents a process step.
   * Each step contains:
   *   - A unique 'id'
   *   - A 'title' for the step
   *   - A 'description' detailing the step process
   *   - An 'icon' to visually represent the step.
   ***********************************************************************/
  const steps = [
    {
      id: 1,
      title: "Report",
      description: "Citizens upload photos of road issues with their location using our mobile-friendly app",
      icon: "📸"
    },
    {
      id: 2,
      title: "Verify",
      description: "Our AI analyzes the image to confirm the issue and assess its severity",
      icon: "🧠"
    },
    {
      id: 3,
      title: "Assign",
      description: "Municipal authorities receive the report and assign repair teams based on priority",
      icon: "👷‍♂️"
    },
    {
      id: 4,
      title: "Resolve",
      description: "Crews fix the issue and update the status in real-time",
      icon: "🛠️"
    },
    {
      id: 5,
      title: "Feedback",
      description: "Citizens verify the repair and provide feedback on the resolution",
      icon: "✅"
    }
  ];

   /***********************************************************************
   * Component Rendering
   * ---------------------------------------------------------------------
   * The return statement outputs the JSX that forms the "How It Works"
   * section. It includes:
   *   - A section element with a unique id and class for styling.
   *   - A header that displays the section's title and subtitle.
   *   - A process flow that dynamically maps through the 'steps' array 
   *     to render each process step along with a visual connector between steps.
   *   - A demo section that contains a demo video placeholder and a 
   *     call-to-action button to watch the demo.
   ***********************************************************************/
  return (
    <section id="how-it-works" className="how-it-works-section">
      <div className="container">
        <div className="section-header">
          <h2>How FixMyStreet Works</h2>
          <p>A seamless process from reporting to resolution</p>
        </div>
        
        <div className="process-flow">
          {steps.map((step, index) => (
            <div className="process-step" key={step.id}>
              <div className="step-number">{step.id}</div>
              <div className="step-icon">{step.icon}</div>
              <h3>{step.title}</h3>
              <p>{step.description}</p>
              
              {index < steps.length - 1 && (
                <div className="connector"></div>
              )}
            </div>
          ))}
        </div>
        
        <div className="demo-section">
          <div className="demo-content">
            <h3>See it in action</h3>
            <p>Watch how easy it is to report and track road issues in your community</p>
            <button className="btn-secondary">Watch Demo</button>
          </div>
          <div className="demo-video">
            <img src="/api/placeholder/500/280" alt="FixMyStreet Demo" />
            <div className="play-button">▶️</div>
          </div>
        </div>
      </div>
    </section>
  );
};
/***********************************************************************
 * Export Component
 * ---------------------------------------------------------------------
 * Export the HowItWorks component as the default export, making it
 * available for import and use in other parts of the application.
 ***********************************************************************/
export default HowItWorks;