import React, { useState, useEffect } from 'react';
import '../styles/Adminglobal.css';

const AuditLogs = () => {
  // State for logs and filters
  const [logs, setLogs] = useState([]);
  const [filteredLogs, setFilteredLogs] = useState([]);
  const [loading, setLoading] = useState(true);
  
  // Filter states
  const [filters, setFilters] = useState({
    action: '',
    user: '',
    module: '',
    dateRange: 'week'
  });
  
  // Search term
  const [searchTerm, setSearchTerm] = useState('');
  
  // Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const [logsPerPage] = useState(15);
  
  // Generate mock audit log data
  useEffect(() => {
    const generateMockLogs = () => {
      setLoading(true);
      
      // Mock users
      const users = [
        { id: 1, name: 'Amit Sharma', role: 'Admin' },
        { id: 2, name: 'Priya Patel', role: 'Supervisor' },
        { id: 3, name: 'Rajesh Kumar', role: 'Contractor' },
        { id: 4, name: 'Neha Gupta', role: 'Supervisor' },
        { id: 5, name: 'Sanjay Verma', role: 'Admin' }
      ];
      
      // Mock action types
      const actionTypes = [
        'Login',
        'Logout',
        'Create',
        'Update',
        'Delete',
        'Assign',
        'Status Change',
        'Export',
        'Settings Change',
        'Password Reset'
      ];
      
      // Mock modules
      const modules = [
        'User Management',
        'Report Management',
        'Dashboard',
        'Categories',
        'Settings',
        'Authentication',
        'Workflow',
        'Notifications'
      ];
      
      // Generate logs
      const mockLogs = [];
      const now = new Date(2025, 3, 13); // April 13, 2025
      
      for (let i = 0; i < 100; i++) {
        const user = users[Math.floor(Math.random() * users.length)];
        const action = actionTypes[Math.floor(Math.random() * actionTypes.length)];
        const module = modules[Math.floor(Math.random() * modules.length)];
        
        // Random date within the last 30 days
        const date = new Date(now);
        date.setDate(date.getDate() - Math.floor(Math.random() * 30));
        date.setHours(
          Math.floor(Math.random() * 24),
          Math.floor(Math.random() * 60),
          Math.floor(Math.random() * 60)
        );
        
        // Generate description based on action and module
        let description = '';
        let details = {};
        
        switch (action) {
          case 'Login':
            description = `User logged in`;
            details = { ip: `192.168.${Math.floor(Math.random() * 255)}.${Math.floor(Math.random() * 255)}` };
            break;
          case 'Logout':
            description = `User logged out`;
            details = { sessionDuration: `${Math.floor(Math.random() * 120) + 5} minutes` };
            break;
          case 'Create':
            if (module === 'User Management') {
              description = `Created new user account`;
              details = { newUser: `user${Math.floor(Math.random() * 1000)}@example.com` };
            } else if (module === 'Report Management') {
              description = `Created new report`;
              details = { reportId: `REP-2025-${1000 + i}` };
            } else if (module === 'Categories') {
              description = `Created new category`;
              details = { category: ['Pothole', 'Road Damage', 'Street Light', 'Drainage'][Math.floor(Math.random() * 4)] };
            }
            break;
          case 'Update':
            if (module === 'User Management') {
              description = `Updated user account`;
              details = { userId: Math.floor(Math.random() * 100) + 1 };
            } else if (module === 'Report Management') {
              description = `Updated report details`;
              details = { reportId: `REP-2025-${1000 + i}` };
            } else if (module === 'Settings') {
              description = `Updated system settings`;
              details = { section: ['Email', 'Notifications', 'Security', 'General'][Math.floor(Math.random() * 4)] };
            }
            break;
          case 'Delete':
            if (module === 'User Management') {
              description = `Deleted user account`;
              details = { userId: Math.floor(Math.random() * 100) + 1 };
            } else if (module === 'Report Management') {
              description = `Deleted report`;
              details = { reportId: `REP-2025-${1000 + i}` };
            }
            break;
          case 'Assign':
            description = `Assigned report to department`;
            details = { 
              reportId: `REP-2025-${1000 + i}`,
              department: ['Roads & Infrastructure', 'Public Works', 'Municipal Services'][Math.floor(Math.random() * 3)]
            };
            break;
          case 'Status Change':
            description = `Changed report status`;
            details = { 
              reportId: `REP-2025-${1000 + i}`,
              oldStatus: ['Pending', 'Assigned', 'In Progress'][Math.floor(Math.random() * 3)],
              newStatus: ['In Progress', 'Resolved', 'Closed'][Math.floor(Math.random() * 3)]
            };
            break;
          case 'Export':
            description = `Exported data`;
            details = { 
              format: ['PDF', 'Excel', 'CSV'][Math.floor(Math.random() * 3)],
              records: Math.floor(Math.random() * 1000) + 50
            };
            break;
          case 'Settings Change':
            description = `Changed system settings`;
            details = { setting: ['Email Template', 'Notification Preferences', 'SLA Timings'][Math.floor(Math.random() * 3)] };
            break;
          case 'Password Reset':
            description = `Initiated password reset`;
            details = { 
              target: Math.random() > 0.5 ? 'self' : `user${Math.floor(Math.random() * 100)}@example.com` 
            };
            break;
          default:
            description = `Performed action on system`;
        }
        
        mockLogs.push({
          id: i + 1,
          timestamp: date.toISOString(),
          user: user,
          action: action,
          module: module,
          description: description,
          details: details,
          ip: `192.168.${Math.floor(Math.random() * 255)}.${Math.floor(Math.random() * 255)}`
        });
      }
      
      // Sort logs by timestamp (newest first)
      mockLogs.sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));
      
      setLogs(mockLogs);
      setFilteredLogs(mockLogs);
      setLoading(false);
    };
    
    generateMockLogs();
  }, []);
  
  // Apply filters and search
  useEffect(() => {
    let result = [...logs];
    
    // Filter by action
    if (filters.action) {
      result = result.filter(log => log.action === filters.action);
    }
    
    // Filter by user
    if (filters.user) {
      result = result.filter(log => log.user.id === parseInt(filters.user));
    }
    
    // Filter by module
    if (filters.module) {
      result = result.filter(log => log.module === filters.module);
    }
    
    // Filter by date range
    const now = new Date(2025, 3, 13); // April 13, 2025
    let dateLimit = new Date(now);
    
    switch (filters.dateRange) {
      case 'today':
        dateLimit.setHours(0, 0, 0, 0);
        break;
      case 'week':
        dateLimit.setDate(dateLimit.getDate() - 7);
        break;
      case 'month':
        dateLimit.setMonth(dateLimit.getMonth() - 1);
        break;
      case 'quarter':
        dateLimit.setMonth(dateLimit.getMonth() - 3);
        break;
      case 'year':
        dateLimit.setFullYear(dateLimit.getFullYear() - 1);
        break;
      default:
        dateLimit.setDate(dateLimit.getDate() - 7);
    }
    
    result = result.filter(log => new Date(log.timestamp) >= dateLimit);
    
    // Apply search term
    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      result = result.filter(log => 
        log.user.name.toLowerCase().includes(term) ||
        log.action.toLowerCase().includes(term) ||
        log.module.toLowerCase().includes(term) ||
        log.description.toLowerCase().includes(term) ||
        JSON.stringify(log.details).toLowerCase().includes(term)
      );
    }
    
    setFilteredLogs(result);
    setCurrentPage(1); // Reset to first page when filters change
  }, [logs, filters, searchTerm]);
  
  // Get unique values for filters
  const getUniqueActions = () => {
    return [...new Set(logs.map(log => log.action))];
  };
  
  const getUniqueUsers = () => {
    return [...new Set(logs.map(log => JSON.stringify(log.user)))].map(user => JSON.parse(user));
  };
  
  const getUniqueModules = () => {
    return [...new Set(logs.map(log => log.module))];
  };
  
  // Format date for display
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleString('en-IN', {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit'
    });
  };
  
  // Get current logs for pagination
  const indexOfLastLog = currentPage * logsPerPage;
  const indexOfFirstLog = indexOfLastLog - logsPerPage;
  const currentLogs = filteredLogs.slice(indexOfFirstLog, indexOfLastLog);
  
  // Change page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);
  
  // Export logs
  const exportLogs = (format) => {
    alert(`Exporting logs in ${format} format`);
    // In a real application, this would trigger an API call to generate and download the file
  };
  
  return (
    <div className="audit-logs-container">
      <h1 className="audit-logs-title">Audit Logs</h1>
      
      <div className="audit-logs-header">
        <div className="audit-logs-actions">
          <div className="export-buttons">
            <button className="btn-export" onClick={() => exportLogs('CSV')}>
              Export CSV
            </button>
            <button className="btn-export" onClick={() => exportLogs('PDF')}>
              Export PDF
            </button>
          </div>
          
          <div className="search-container">
            <input
              type="text"
              placeholder="Search logs..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="search-input"
            />
          </div>
        </div>
        
        <div className="filter-container">
          <div className="filter-group">
            <label>Action:</label>
            <select 
              value={filters.action} 
              onChange={(e) => setFilters({...filters, action: e.target.value})}
              className="filter-select"
            >
              <option value="">All Actions</option>
              {getUniqueActions().map(action => (
                <option key={action} value={action}>{action}</option>
              ))}
            </select>
          </div>
          
          <div className="filter-group">
            <label>User:</label>
            <select 
              value={filters.user} 
              onChange={(e) => setFilters({...filters, user: e.target.value})}
              className="filter-select"
            >
              <option value="">All Users</option>
              {getUniqueUsers().map(user => (
                <option key={user.id} value={user.id}>{user.name} ({user.role})</option>
              ))}
            </select>
          </div>
          
          <div className="filter-group">
            <label>Module:</label>
            <select 
              value={filters.module} 
              onChange={(e) => setFilters({...filters, module: e.target.value})}
              className="filter-select"
            >
              <option value="">All Modules</option>
              {getUniqueModules().map(module => (
                <option key={module} value={module}>{module}</option>
              ))}
            </select>
          </div>
          
          <div className="filter-group">
            <label>Time Period:</label>
            <select 
              value={filters.dateRange} 
              onChange={(e) => setFilters({...filters, dateRange: e.target.value})}
              className="filter-select"
            >
              <option value="today">Today</option>
              <option value="week">Last 7 Days</option>
              <option value="month">Last 30 Days</option>
              <option value="quarter">Last 3 Months</option>
              <option value="year">Last Year</option>
            </select>
          </div>
        </div>
      </div>
      
      {loading ? (
        <div className="loading-indicator">Loading audit logs...</div>
      ) : (
        <>
          <div className="logs-count">
            Showing {currentLogs.length} of {filteredLogs.length} logs
          </div>
          
          <div className="logs-table-container">
            <table className="logs-table">
              <thead>
                <tr>
                  <th>Timestamp</th>
                  <th>User</th>
                  <th>Action</th>
                  <th>Module</th>
                  <th>Description</th>
                  <th>IP Address</th>
                  <th>Details</th>
                </tr>
              </thead>
              <tbody>
                {currentLogs.map(log => (
                  <tr key={log.id}>
                    <td>{formatDate(log.timestamp)}</td>
                    <td>
                      <span className="user-name">{log.user.name}</span>
                      <span className="user-role">{log.user.role}</span>
                    </td>
                    <td>
                      <span className={`action-badge ${log.action.toLowerCase().replace(' ', '-')}`}>
                        {log.action}
                      </span>
                    </td>
                    <td>{log.module}</td>
                    <td>{log.description}</td>
                    <td>{log.ip}</td>
                    <td>
                      <button 
                        className="btn-view-details"
                        onClick={() => alert(JSON.stringify(log.details, null, 2))}
                      >
                        View Details
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          
          {filteredLogs.length > logsPerPage && (
            <div className="pagination">
              <button 
                className="pagination-btn"
                disabled={currentPage === 1}
                onClick={() => paginate(currentPage - 1)}
              >
                Previous
              </button>
              
              {Array.from({ length: Math.ceil(filteredLogs.length / logsPerPage) }).map((_, index) => {
                // Show limited page numbers with ellipsis
                if (
                  index === 0 || 
                  index === Math.ceil(filteredLogs.length / logsPerPage) - 1 ||
                  (index >= currentPage - 2 && index <= currentPage + 2)
                ) {
                  return (
                    <button
                      key={index}
                      className={`pagination-btn ${currentPage === index + 1 ? 'active' : ''}`}
                      onClick={() => paginate(index + 1)}
                    >
                      {index + 1}
                    </button>
                  );
                } else if (
                  (index === 1 && currentPage > 4) ||
                  (index === Math.ceil(filteredLogs.length / logsPerPage) - 2 && currentPage < Math.ceil(filteredLogs.length / logsPerPage) - 4)
                ) {
                  return <span key={index} className="pagination-ellipsis">...</span>;
                }
                return null;
              })}
              
              <button 
                className="pagination-btn"
                disabled={currentPage === Math.ceil(filteredLogs.length / logsPerPage)}
                onClick={() => paginate(currentPage + 1)}
              >
                Next
              </button>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default AuditLogs;
