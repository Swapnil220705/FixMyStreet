import { useState } from 'react';
import { User, Shield, Mail, Lock, Key, Building, Loader } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../authcontext';
import './Login.css';
import AlertDialog from '../../components/AlertDialog';

export default function LoginPage() {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [activeTab, setActiveTab] = useState('citizen');
  const [isLoading, setIsLoading] = useState(false);
  const [alertState, setAlertState] = useState({
    isOpen: false,
    message: '',
    type: 'error'
  });

  // Form state for citizen login
  const [citizenForm, setCitizenForm] = useState({
    email: '',
    password: '',
  });

  // Form state for admin login
  const [adminForm, setAdminForm] = useState({
    email: '',
    password: '',
    employeeId: '',
    departmentCode: '',
  });

  // Handle form changes
  const handleCitizenChange = (e) => {
    setCitizenForm({
      ...citizenForm,
      [e.target.name]: e.target.value
    });
  };

  const handleAdminChange = (e) => {
    setAdminForm({
      ...adminForm,
      [e.target.name]: e.target.value
    });
  };

  // Handle form submissions
  const handleCitizenSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    
    try {
      const result = await login({
        email: citizenForm.email,
        password: citizenForm.password
      }, false);
      
      if (result.success) {
        navigate('/');
      } else {
        // Handle specific error messages
        let errorMessage = result.error;
        
        // Check for specific error messages from the backend
        if (result.error && result.error.toLowerCase().includes('credentials')) {
          errorMessage = 'Invalid email or password. Please try again.';
        } else if (result.error && result.error.toLowerCase().includes('not found')) {
          errorMessage = 'Account not found. Please sign up first.';
        } else if (result.error && result.error.toLowerCase().includes('csrf')) {
          errorMessage = 'Session expired. Please refresh the page and try again.';
        }
        
        setAlertState({
          isOpen: true,
          message: errorMessage,
          type: 'error'
        });
      }
    } catch (err) {
      // Handle different error scenarios
      let errorMessage = 'An unexpected error occurred';
      
      if (err.response) {
        // The request was made and the server responded with a status code
        // that falls out of the range of 2xx
        if (err.response.status === 401) {
          errorMessage = 'Invalid email or password. Please try again.';
        } else if (err.response.status === 404) {
          errorMessage = 'Account not found. Please sign up first.';
        } else if (err.response.status === 429) {
          errorMessage = 'Too many login attempts. Please try again later.';
        } else if (err.response.status === 419) {
          errorMessage = 'Your session has expired. Please refresh the page.';
        } else if (err.response.data && err.response.data.message) {
          errorMessage = err.response.data.message;
        }
      } else if (err.request) {
        // The request was made but no response was received
        errorMessage = 'No response from server. Please check your internet connection.';
      }
      
      setAlertState({
        isOpen: true,
        message: errorMessage,
        type: 'error'
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleAdminSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    
    try {
      const result = await login({
        email: adminForm.email,
        password: adminForm.password,
        employee_id: adminForm.employeeId,
        department_code: adminForm.departmentCode
      }, true);
      
      if (result.success) {
        navigate('/admin');
      } else {
        // Handle specific error messages
        let errorMessage = result.error;
        
        // Check for specific error messages from the backend
        if (result.error && result.error.toLowerCase().includes('credentials')) {
          errorMessage = 'Invalid admin credentials. Please verify all fields.';
        } else if (result.error && result.error.toLowerCase().includes('not found')) {
          errorMessage = 'Admin account not found. Please contact IT support.';
        } else if (result.error && result.error.toLowerCase().includes('department')) {
          errorMessage = 'Invalid department code. Please check and try again.';
        } else if (result.error && result.error.toLowerCase().includes('employee')) {
          errorMessage = 'Invalid employee ID. Please check and try again.';
        } else if (result.error && result.error.toLowerCase().includes('csrf')) {
          errorMessage = 'Session expired. Please refresh the page and try again.';
        }
        
        setAlertState({
          isOpen: true,
          message: errorMessage,
          type: 'error'
        });
      }
    } catch (err) {
      // Handle different error scenarios
      let errorMessage = 'An unexpected error occurred';
      
      if (err.response) {
        if (err.response.status === 401) {
          errorMessage = 'Invalid admin credentials. Please verify all fields.';
        } else if (err.response.status === 403) {
          errorMessage = 'You do not have admin privileges. Please contact IT support.';
        } else if (err.response.status === 404) {
          errorMessage = 'Admin account not found. Please contact IT support.';
        } else if (err.response.status === 429) {
          errorMessage = 'Too many login attempts. Please try again later.';
        } else if (err.response.status === 419) {
          errorMessage = 'Your session has expired. Please refresh the page.';
        } else if (err.response.data && err.response.data.message) {
          errorMessage = err.response.data.message;
        }
      } else if (err.request) {
        errorMessage = 'No response from server. Please check your internet connection.';
      }
      
      setAlertState({
        isOpen: true,
        message: errorMessage,
        type: 'error'
      });
    } finally {
      setIsLoading(false);
    }
  };

  // Handle navigation
  const handleBackClick = () => {
    navigate('/');
  };

  const handleSignupClick = () => {
    navigate('/signup');
  };

  // Close alert dialog
  const handleCloseAlert = () => {
    setAlertState({
      ...alertState,
      isOpen: false
    });
  };
  
  return (
    <div className="login-page">
      <div className="login-container">
        <div className="login-illustration">
          <div className="illustration-content">
            {activeTab === 'citizen' ? (
              <>
                <h2>Welcome Back</h2>
                <p>Report issues and track progress in your community</p>
                <div className="illustration-image citizen-image"></div>
              </>
            ) : (
              <>
                <h2>Admin Portal</h2>
                <p>Manage community reports and municipal services</p>
                <div className="illustration-image admin-image"></div>
              </>
            )}
          </div>
        </div>
        
        <div className="login-form-wrapper">
          <button className="login-back-button" onClick={handleBackClick}>
            ← Back to Home
          </button>
          
          <div className="login-tabs">
            <button 
              className={`login-tab ${activeTab === 'citizen' ? 'active' : ''}`}
              onClick={() => setActiveTab('citizen')}
            >
              <User size={18} />
              <span>Citizen</span>
            </button>
            <button 
              className={`login-tab ${activeTab === 'admin' ? 'active' : ''}`}
              onClick={() => setActiveTab('admin')}
            >
              <Shield size={18} />
              <span>Admin</span>
            </button>
          </div>
          
          <div className="login-form-container">
            {activeTab === 'citizen' ? (
              <div className="login-form animate-in">
                <h2>Access government services</h2>
                <p>Login to report issues and track their progress</p>
                
                <form onSubmit={handleCitizenSubmit}>
                  <div className="login-form-group">
                    <div className="login-input-icon">
                      <Mail size={20} />
                      <input
                        type="email"
                        name="email"
                        placeholder="Email Address"
                        value={citizenForm.email}
                        onChange={handleCitizenChange}
                        required
                      />
                    </div>
                  </div>
                  
                  <div className="login-form-group">
                    <div className="login-input-icon">
                      <Lock size={20} />
                      <input
                        type="password"
                        name="password"
                        placeholder="Password"
                        value={citizenForm.password}
                        onChange={handleCitizenChange}
                        required
                      />
                    </div>
                  </div>
                  
                  <div className="login-form-options">
                    <label className="login-checkbox-container">
                      <input type="checkbox" />
                      <span className="login-checkmark"></span>
                      Remember me
                    </label>
                    <a href="#" className="login-forgot-password">Forgot Password?</a>
                  </div>
                  
                  <button type="submit" className="btn-primary login-btn-full" disabled={isLoading}>
                    {isLoading ? <><Loader size={20} className="spin" /> Logging in...</> : 'Login'}
                  </button>
                </form>
                
                <div className="login-form-footer">
                  <p>Don't have an account? <button className="login-btn-link" onClick={handleSignupClick}>Sign Up</button></p>
                </div>
              </div>
            ) : (
              <div className="login-form animate-in">
                <h2>Secure administrative access</h2>
                <p>Login to manage reports and municipal services</p>
                
                <form onSubmit={handleAdminSubmit}>
                  <div className="login-form-group">
                    <div className="login-input-icon">
                      <Mail size={20} />
                      <input
                        type="email"
                        name="email"
                        placeholder="Official Email Address"
                        value={adminForm.email}
                        onChange={handleAdminChange}
                        required
                      />
                    </div>
                  </div>
                  
                  <div className="login-form-group">
                    <div className="login-input-icon">
                      <Lock size={20} />
                      <input
                        type="password"
                        name="password"
                        placeholder="Password"
                        value={adminForm.password}
                        onChange={handleAdminChange}
                        required
                      />
                    </div>
                  </div>
                  
                  <div className="login-form-group">
                    <div className="login-input-icon">
                      <Key size={20} />
                      <input
                        type="text"
                        name="employeeId"
                        placeholder="Employee ID"
                        value={adminForm.employeeId}
                        onChange={handleAdminChange}
                        required
                      />
                    </div>
                  </div>
                  
                  <div className="login-form-group">
                    <div className="login-input-icon">
                      <Building size={20} />
                      <input
                        type="text"
                        name="departmentCode"
                        placeholder="Department Code"
                        value={adminForm.departmentCode}
                        onChange={handleAdminChange}
                        required
                      />
                    </div>
                  </div>
                  
                  <div className="login-form-options">
                    <label className="login-checkbox-container">
                      <input type="checkbox" />
                      <span className="login-checkmark"></span>
                      Remember me
                    </label>
                    <a href="#" className="login-forgot-password">Forgot Password?</a>
                  </div>
                  
                  <button type="submit" className="btn-primary login-btn-full" disabled={isLoading}>
                    {isLoading ? <><Loader size={20} className="spin" /> Logging in...</> : 'Login'}
                  </button>
                </form>
                
                <div className="login-form-footer">
                  <p>Need department access? <a href="#" className="login-btn-link">Contact IT Support</a></p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
      
      <AlertDialog
        isOpen={alertState.isOpen}
        onClose={handleCloseAlert}
        title={alertState.type === 'error' ? 'Error' : 'Success'}
        message={alertState.message}
        type={alertState.type}
      />
    </div>
  );
}
