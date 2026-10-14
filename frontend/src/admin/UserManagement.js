import React, { useState } from 'react';
import '../styles/Adminglobal.css';

const UserManagement = () => {
  // Mock data for users
  const [users, setUsers] = useState([
    { 
      id: 1, 
      name: 'Amit Sharma', 
      email: 'amit.sharma@municipality.gov.in', 
      role: 'Admin', 
      department: 'IT',
      status: 'Active',
      lastActive: '2025-04-13T12:30:00'
    },
    { 
      id: 2, 
      name: 'Priya Patel', 
      email: 'priya.patel@municipality.gov.in', 
      role: 'Supervisor', 
      department: 'Roads & Infrastructure',
      status: 'Active',
      lastActive: '2025-04-13T10:15:00'
    },
    { 
      id: 3, 
      name: 'Rajesh Kumar', 
      email: 'rajesh.kumar@municipality.gov.in', 
      role: 'Contractor', 
      department: 'Public Works',
      status: 'Inactive',
      lastActive: '2025-04-10T09:45:00'
    },
    { 
      id: 4, 
      name: 'Neha Gupta', 
      email: 'neha.gupta@municipality.gov.in', 
      role: 'Supervisor', 
      department: 'Municipal Services',
      status: 'Active',
      lastActive: '2025-04-12T16:20:00'
    },
    { 
      id: 5, 
      name: 'Sanjay Verma', 
      email: 'sanjay.verma@municipality.gov.in', 
      role: 'Contractor', 
      department: 'Roads & Infrastructure',
      status: 'Active',
      lastActive: '2025-04-11T14:10:00'
    }
  ]);

  const [filter, setFilter] = useState({
    role: '',
    department: '',
    status: ''
  });

  const [searchTerm, setSearchTerm] = useState('');
  const [selectedUser, setSelectedUser] = useState(null);

  // Filter users based on search and filter criteria
  const filteredUsers = users.filter(user => {
    const matchesSearch = 
      user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesRole = filter.role ? user.role === filter.role : true;
    const matchesDepartment = filter.department ? user.department === filter.department : true;
    const matchesStatus = filter.status ? user.status === filter.status : true;
    
    return matchesSearch && matchesRole && matchesDepartment && matchesStatus;
  });

  // Get unique values for filters
  const roles = [...new Set(users.map(user => user.role))];
  const departments = [...new Set(users.map(user => user.department))];
  const statuses = [...new Set(users.map(user => user.status))];

  // Format date for display
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleString('en-IN', {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <div className="user-management-container">
      <h1 className="user-management-title">User Management</h1>
      
      <div className="user-management-actions">
        <div className="search-filter-container">
          <div className="search-container">
            <input
              type="text"
              placeholder="Search users by name or email"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="search-input"
            />
          </div>
          
          <div className="filters-container">
            <select 
              value={filter.role} 
              onChange={(e) => setFilter({...filter, role: e.target.value})}
              className="filter-select"
            >
              <option value="">All Roles</option>
              {roles.map(role => (
                <option key={role} value={role}>{role}</option>
              ))}
            </select>
            
            <select 
              value={filter.department} 
              onChange={(e) => setFilter({...filter, department: e.target.value})}
              className="filter-select"
            >
              <option value="">All Departments</option>
              {departments.map(dept => (
                <option key={dept} value={dept}>{dept}</option>
              ))}
            </select>
            
            <select 
              value={filter.status} 
              onChange={(e) => setFilter({...filter, status: e.target.value})}
              className="filter-select"
            >
              <option value="">All Statuses</option>
              {statuses.map(status => (
                <option key={status} value={status}>{status}</option>
              ))}
            </select>
          </div>
        </div>
        
        <button className="btn-primary">Add New User</button>
      </div>
      
      <div className="users-table-container">
        <table className="users-table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Role</th>
              <th>Department</th>
              <th>Status</th>
              <th>Last Active</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredUsers.map(user => (
              <tr key={user.id} className={user.status === 'Inactive' ? 'inactive-user' : ''}>
                <td>{user.name}</td>
                <td>{user.email}</td>
                <td>
                  <span className={`role-badge ${user.role.toLowerCase()}`}>
                    {user.role}
                  </span>
                </td>
                <td>{user.department}</td>
                <td>
                  <span className={`status-indicator ${user.status.toLowerCase()}`}>
                    {user.status}
                  </span>
                </td>
                <td>{formatDate(user.lastActive)}</td>
                <td className="action-buttons">
                  <button 
                    className="btn-edit" 
                    onClick={() => setSelectedUser(user)}
                    title="Edit User"
                  >
                    ✏️
                  </button>
                  <button 
                    className="btn-delete" 
                    title="Delete User"
                  >
                    🗑️
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      
      {selectedUser && (
        <div className="user-modal-overlay">
          <div className="user-modal">
            <div className="user-modal-header">
              <h2>Edit User</h2>
              <button 
                className="btn-close" 
                onClick={() => setSelectedUser(null)}
              >
                ✕
              </button>
            </div>
            <div className="user-modal-body">
              <div className="form-group">
                <label>Name</label>
                <input 
                  type="text" 
                  value={selectedUser.name} 
                  onChange={(e) => setSelectedUser({...selectedUser, name: e.target.value})}
                />
              </div>
              <div className="form-group">
                <label>Email</label>
                <input 
                  type="email" 
                  value={selectedUser.email} 
                  onChange={(e) => setSelectedUser({...selectedUser, email: e.target.value})}
                />
              </div>
              <div className="form-group">
                <label>Role</label>
                <select 
                  value={selectedUser.role} 
                  onChange={(e) => setSelectedUser({...selectedUser, role: e.target.value})}
                >
                  {roles.map(role => (
                    <option key={role} value={role}>{role}</option>
                  ))}
                </select>
              </div>
              <div className="form-group">
                <label>Department</label>
                <select 
                  value={selectedUser.department} 
                  onChange={(e) => setSelectedUser({...selectedUser, department: e.target.value})}
                >
                  {departments.map(dept => (
                    <option key={dept} value={dept}>{dept}</option>
                  ))}
                </select>
              </div>
              <div className="form-group">
                <label>Status</label>
                <select 
                  value={selectedUser.status} 
                  onChange={(e) => setSelectedUser({...selectedUser, status: e.target.value})}
                >
                  {statuses.map(status => (
                    <option key={status} value={status}>{status}</option>
                  ))}
                </select>
              </div>
            </div>
            <div className="user-modal-footer">
              <button 
                className="btn-secondary" 
                onClick={() => setSelectedUser(null)}
              >
                Cancel
              </button>
              <button 
                className="btn-primary" 
                onClick={() => {
                  setUsers(users.map(u => u.id === selectedUser.id ? selectedUser : u));
                  setSelectedUser(null);
                }}
              >
                Save Changes
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserManagement;
