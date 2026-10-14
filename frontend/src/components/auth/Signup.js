import { useState } from 'react';
import { User, Shield, Mail, Lock, UserCheck, Building, Phone, Calendar, Fingerprint, Loader } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { register } from '../../services/api';
import AlertDialog from '../AlertDialog';
import './Signup.css';

export default function SignupPage() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('citizen');
  const [isLoading, setIsLoading] = useState(false);
  const [alertState, setAlertState] = useState({
    isOpen: false,
    message: '',
    type: 'error'
  });

  // Form state for citizen signup
  const [citizenForm, setCitizenForm] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
    dateOfBirth: '',
    phone: '',
  });

  // Form state for admin signup
  const [adminForm, setAdminForm] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
    employeeId: '',
    departmentCode: '',
    governmentId: '',
    referenceCode: '',
  });

  // Validation functions
  const isValidEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const checkPasswordStrength = (password) => {
    // At least 8 characters, 1 uppercase, 1 lowercase, 1 number
    const strongRegex = new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.{8,})");
    return strongRegex.test(password);
  };

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
    
    // Email validation
    if (!isValidEmail(citizenForm.email)) {
      setAlertState({
        isOpen: true,
        message: "Please enter a valid email address.",
        type: 'error'
      });
      setIsLoading(false);
      return;
    }
    
    // Password strength validation
    if (!checkPasswordStrength(citizenForm.password)) {
      setAlertState({
        isOpen: true,
        message: "Password must be at least 8 characters and include uppercase, lowercase, and numbers.",
        type: 'error'
      });
      setIsLoading(false);
      return;
    }
    
    // Validate password confirmation
    if (citizenForm.password !== citizenForm.confirmPassword) {
      setAlertState({
        isOpen: true,
        message: "Passwords don't match. Please try again.",
        type: 'error'
      });
      setIsLoading(false);
      return;
    }
    
    try {
      const response = await register({
        name: `${citizenForm.firstName} ${citizenForm.lastName}`,
        email: citizenForm.email,
        password: citizenForm.password,
        password_confirmation: citizenForm.confirmPassword,
        phone: citizenForm.phone,
        date_of_birth: citizenForm.dateOfBirth
      });
      
      // Show success message
      setAlertState({
        isOpen: true,
        message: 'Registration successful! Redirecting to dashboard...',
        type: 'success'
      });
      
      // Store token and user data
      localStorage.setItem('token', response.data.token);
      localStorage.setItem('user', JSON.stringify(response.data.user));
      
      // Redirect to home page after a short delay
      setTimeout(() => {
        navigate('/');
      }, 1500);
      
    } catch (err) {
      // Handle different error scenarios
      let errorMessage = 'Registration failed. Please try again.';
      
      if (err.response) {
        if (err.response.status === 422) {
          // Validation errors
          if (err.response.data.errors) {
            if (err.response.data.errors.email) {
              errorMessage = 'This email is already registered. Please login instead.';
            } else if (err.response.data.errors.password) {
              errorMessage = err.response.data.errors.password[0];
            } else {
              // Get the first validation error message
              const firstErrorField = Object.keys(err.response.data.errors)[0];
              if (firstErrorField && err.response.data.errors[firstErrorField][0]) {
                errorMessage = err.response.data.errors[firstErrorField][0];
              }
            }
          } else if (err.response.data.message) {
            errorMessage = err.response.data.message;
          }
        } else if (err.response.status === 429) {
          errorMessage = 'Too many registration attempts. Please try again later.';
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

  const handleAdminSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Email validation
    if (!isValidEmail(adminForm.email)) {
      setAlertState({
        isOpen: true,
        message: "Please enter a valid email address.",
        type: 'error'
      });
      setIsLoading(false);
      return;
    }
    
    // Password strength validation
    if (!checkPasswordStrength(adminForm.password)) {
      setAlertState({
        isOpen: true,
        message: "Password must be at least 8 characters and include uppercase, lowercase, and numbers.",
        type: 'error'
      });
      setIsLoading(false);
      return;
    }
    
    // Validate password confirmation
    if (adminForm.password !== adminForm.confirmPassword) {
      setAlertState({
        isOpen: true,
        message: "Passwords don't match. Please try again.",
        type: 'error'
      });
      setIsLoading(false);
      return;
    }
    
    try {
      // For admin registration, you might need a different endpoint
      // or additional validation in your backend
      const response = await register({
        name: `${adminForm.firstName} ${adminForm.lastName}`,
        email: adminForm.email,
        password: adminForm.password,
        password_confirmation: adminForm.confirmPassword,
        employee_id: adminForm.employeeId,
        department_code: adminForm.departmentCode,
        government_id: adminForm.governmentId,
        reference_code: adminForm.referenceCode,
        is_admin: true
      });
      
      // Show success message
      setAlertState({
        isOpen: true,
        message: 'Admin account created successfully! Redirecting to admin dashboard...',
        type: 'success'
      });
      
      // Store token and user data
      localStorage.setItem('token', response.data.token);
      localStorage.setItem('user', JSON.stringify(response.data.user));
      
      // Redirect to admin page after a short delay
      setTimeout(() => {
        navigate('/admin');
      }, 1500);
      
    } catch (err) {
      // Handle different error scenarios
      let errorMessage = 'Admin registration failed. Please try again.';
      
      if (err.response) {
        if (err.response.status === 422) {
          // Validation errors
          if (err.response.data.errors) {
            if (err.response.data.errors.email) {
              errorMessage = 'This email is already registered. Please login instead.';
            } else if (err.response.data.errors.employee_id) {
              errorMessage = 'Invalid employee ID. Please verify and try again.';
            } else if (err.response.data.errors.department_code) {
              errorMessage = 'Invalid department code. Please verify and try again.';
            } else if (err.response.data.errors.reference_code) {
              errorMessage = 'Invalid reference code. Please contact IT support.';
            } else if (err.response.data.errors.password) {
              errorMessage = err.response.data.errors.password[0];
            } else {
              // Get the first validation error message
              const firstErrorField = Object.keys(err.response.data.errors)[0];
              if (firstErrorField && err.response.data.errors[firstErrorField][0]) {
                errorMessage = err.response.data.errors[firstErrorField][0];
              }
            }
          } else if (err.response.data.message) {
            errorMessage = err.response.data.message;
          }
        } else if (err.response.status === 403) {
          errorMessage = 'You do not have permission to create an admin account.';
        } else if (err.response.status === 429) {
          errorMessage = 'Too many registration attempts. Please try again later.';
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

  // Handle back to home
  const handleBackClick = () => {
    navigate('/');
  };

  // Close alert dialog
  const handleCloseAlert = () => {
    setAlertState({
      ...alertState,
      isOpen: false
    });
  };
  
  return (
    <div className="signup-page">
      <div className="signup-container">
        <div className="signup-illustration">
          <div className="illustration-content">
            {activeTab === 'citizen' ? (
              <>
                <h2>Join Our Community</h2>
                <p>Sign up to report issues and make your neighborhood better</p>
                <div className="illustration-image citizen-signup-image"></div>
              </>
            ) : (
              <>
                <h2>Admin Registration</h2>
                <p>Create an account to manage community reports and services</p>
                <div className="illustration-image admin-signup-image"></div>
              </>
            )}
          </div>
        </div>
        
        <div className="signup-form-wrapper">
          <button className="signup-back-button" onClick={handleBackClick}>
            ← Back to Home
          </button>
          
          <div className="signup-tabs">
            <button 
              className={`signup-tab ${activeTab === 'citizen' ? 'active' : ''}`}
              onClick={() => setActiveTab('citizen')}
            >
              <User size={18} />
              <span>Citizen</span>
            </button>
            <button 
              className={`signup-tab ${activeTab === 'admin' ? 'active' : ''}`}
              onClick={() => setActiveTab('admin')}
            >
              <Shield size={18} />
              <span>Admin</span>
            </button>
          </div>
          
          <div className="signup-form-container">
            {activeTab === 'citizen' ? (
              <div className="signup-form animate-in">
                <h2>Register to access government services</h2>
                <p>Create an account to report issues and track their progress</p>
                
                <form onSubmit={handleCitizenSubmit}>
                  <div className="signup-form-group">
                    <div className="signup-input-icon">
                      <User size={20} />
                      <input
                        type="text"
                        name="firstName"
                        placeholder="First Name"
                        value={citizenForm.firstName}
                        onChange={handleCitizenChange}
                        required
                      />
                    </div>
                  </div>
                  
                  <div className="signup-form-group">
                    <div className="signup-input-icon">
                      <User size={20} />
                      <input
                        type="text"
                        name="lastName"
                        placeholder="Last Name"
                        value={citizenForm.lastName}
                        onChange={handleCitizenChange}
                        required
                      />
                    </div>
                  </div>
                  
                  <div className="signup-form-group">
                    <div className="signup-input-icon">
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
                  
                  <div className="signup-form-group">
                    <div className="signup-input-icon">
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
                  
                  <div className="signup-form-group">
                    <div className="signup-input-icon">
                      <Lock size={20} />
                      <input
                        type="password"
                        name="confirmPassword"
                        placeholder="Confirm Password"
                        value={citizenForm.confirmPassword}
                        onChange={handleCitizenChange}
                        required
                      />
                    </div>
                  </div>
                  
                  <div className="signup-form-group">
                    <div className="signup-input-icon">
                      <Calendar size={20} />
                      <input
                        type="date"
                        name="dateOfBirth"
                        placeholder="Date of Birth"
                        value={citizenForm.dateOfBirth}
                        onChange={handleCitizenChange}
                        required
                      />
                    </div>
                  </div>
                  
                  <div className="signup-form-group">
                    <div className="signup-input-icon">
                      <Phone size={20} />
                      <input
                        type="tel"
                        name="phone"
                        placeholder="Phone Number"
                        value={citizenForm.phone}
                        onChange={handleCitizenChange}
                        required
                      />
                    </div>
                  </div>
                  
                  <div className="signup-form-options">
                    <label className="signup-checkbox-container">
                      <input type="checkbox" required />
                      <span className="signup-checkmark"></span>
                      I agree to the Terms and Conditions
                    </label>
                  </div>
                  
                  <button type="submit" className="btn-primary signup-btn-full" disabled={isLoading}>
                    {isLoading ? (
                      <>
                        <Loader size={20} className="spin" /> Signing up...
                      </>
                    ) : (
                      'Sign Up'
                    )}
                  </button>
                </form>
                
                <div className="signup-form-footer">
                  <p>Already have an account? <a href="/login" className="signup-btn-link">Log In</a></p>
                </div>
              </div>
            ) : (
              <div className="signup-form animate-in">
                <h2>Create your administrative account</h2>
                <p>Sign up to manage reports and municipal services</p>
                
                <form onSubmit={handleAdminSubmit}>
                  <div className="signup-form-group">
                    <div className="signup-input-icon">
                      <User size={20} />
                      <input
                        type="text"
                        name="firstName"
                        placeholder="First Name"
                        value={adminForm.firstName}
                        onChange={handleAdminChange}
                        required
                      />
                    </div>
                  </div>
                  
                  <div className="signup-form-group">
                    <div className="signup-input-icon">
                      <User size={20} />
                      <input
                        type="text"
                        name="lastName"
                        placeholder="Last Name"
                        value={adminForm.lastName}
                        onChange={handleAdminChange}
                        required
                      />
                    </div>
                  </div>
                  
                  <div className="signup-form-group">
                    <div className="signup-input-icon">
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
                  
                  <div className="signup-form-group">
                    <div className="signup-input-icon">
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
                  
                  <div className="signup-form-group">
                    <div className="signup-input-icon">
                      <Lock size={20} />
                      <input
                        type="password"
                        name="confirmPassword"
                        placeholder="Confirm Password"
                        value={adminForm.confirmPassword}
                        onChange={handleAdminChange}
                        required
                      />
                    </div>
                  </div>
                  
                  <div className="signup-form-group">
                    <div className="signup-input-icon">
                      <UserCheck size={20} />
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
                  
                  <div className="signup-form-group">
                    <div className="signup-input-icon">
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
                        <div className="signup-form-group">
                <div className="signup-input-icon">
                  <Fingerprint size={20} />
                  <input
                    type="text"
                    name="governmentId"
                    placeholder="Government ID"
                    value={adminForm.governmentId}
                    onChange={handleAdminChange}
                    required
                  />
                </div>
              </div>
              
              <div className="signup-form-group">
                <div className="signup-input-icon">
                  <Shield size={20} />
                  <input
                    type="text"
                    name="referenceCode"
                    placeholder="Reference Code"
                    value={adminForm.referenceCode}
                    onChange={handleAdminChange}
                    required
                  />
                </div>
              </div>
              
              <div className="signup-form-options">
                <label className="signup-checkbox-container">
                  <input type="checkbox" required />
                  <span className="signup-checkmark"></span>
                  I agree to the Terms and Conditions
                </label>
              </div>
              
              <button type="submit" className="btn-primary signup-btn-full" disabled={isLoading}>
                {isLoading ? (
                  <>
                    <Loader size={20} className="spin" /> Creating account...
                  </>
                ) : (
                  'Create Account'
                )}
              </button>
            </form>
            
            <div className="signup-form-footer">
              <p>Already have an account? <a href="/login" className="signup-btn-link">Log In</a></p>
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
