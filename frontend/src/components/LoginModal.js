import React, { useState } from 'react';

const LoginModal = ({ isOpen, onClose }) => {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    // In a real app, this would connect to an authentication API
    if (isLogin) {
      console.log('Logging in with:', email, password);
      // Simulate successful login
      localStorage.setItem('user', JSON.stringify({ email, name: 'User' }));
    } else {
      console.log('Registering with:', name, email, password);
      // Simulate successful registration
      localStorage.setItem('user', JSON.stringify({ email, name }));
    }
    // Close modal after login/registration
    onClose();
    window.location.reload(); // Force refresh to update UI with logged in state
  };

  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <button className="modal-close" onClick={onClose}>×</button>
        <h2>{isLogin ? 'Login' : 'Create Account'}</h2>
        
        <form onSubmit={handleSubmit}>
          {!isLogin && (
            <div className="form-group">
              <label htmlFor="name">Full Name</label>
              <input 
                type="text" 
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required={!isLogin}
              />
            </div>
          )}
          
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input 
              type="email" 
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          
          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input 
              type="password" 
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          
          <button type="submit" className="btn-primary btn-full">
            {isLogin ? 'Login' : 'Create Account'}
          </button>
        </form>
        
        <div className="modal-footer">
          <p>
            {isLogin ? "Don't have an account?" : "Already have an account?"}
            <button 
              className="btn-link" 
              onClick={() => setIsLogin(!isLogin)}
            >
              {isLogin ? 'Sign Up' : 'Login'}
            </button>
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginModal;