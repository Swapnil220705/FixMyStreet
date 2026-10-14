import React, { useState, useEffect } from 'react';
import '../styles/Adminglobal.css';
import { BarChart, Bar, LineChart, Line, PieChart, Pie, AreaChart, Area, 
         XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer,
         Cell, Label } from 'recharts';

const DataVisualization = () => {
  // State for date range filter and selected visualization
  const [dateRange, setDateRange] = useState('month');
  const [activeVisualization, setActiveVisualization] = useState('issuesTrend');
  
  // State for chart data
  const [chartData, setChartData] = useState({
    issuesTrend: [],
    severityDistribution: [],
    resolutionMetrics: [],
    categoryDistribution: [],
    departmentPerformance: []
  });
  
  // Generate mock data on component mount or date range change
  useEffect(() => {
    generateMockData(dateRange);
  }, [dateRange]);
  
  const generateMockData = (range) => {
    // Simplified date range calculations
    const dataPoints = range === 'week' ? 7 : 
                      range === 'month' ? 12 : 
                      range === 'quarter' ? 6 : 
                      range === 'year' ? 12 : 12;
    
    // Generate issues trend data (simplified)
    const trendData = Array.from({ length: dataPoints }, (_, i) => ({
      date: `Day ${i+1}`,
      reported: Math.floor(Math.random() * 15) + 10 + (i * 0.5),
      resolved: Math.floor(Math.random() * 10) + 5,
      pending: Math.floor(Math.random() * 5) + 3
    }));
    
    // Generate severity distribution data
    const severityData = [
      { name: 'High', value: Math.floor(Math.random() * 100) + 150 },
      { name: 'Medium', value: Math.floor(Math.random() * 150) + 250 },
      { name: 'Low', value: Math.floor(Math.random() * 200) + 300 }
    ];
    
    // Generate resolution metrics data (simplified)
    const resolutionData = Array.from({ length: dataPoints }, (_, i) => ({
      date: `Day ${i+1}`,
      average: Math.floor(Math.random() * 24) + 36,
      'Roads & Infrastructure': Math.floor(Math.random() * 30) + 24,
      'Public Works': Math.floor(Math.random() * 30) + 24,
      'Municipal Services': Math.floor(Math.random() * 30) + 24
    }));
    
    // Generate category distribution data
    const categories = [
      { name: 'Pothole', value: Math.floor(Math.random() * 200) + 300 },
      { name: 'Broken Pavement', value: Math.floor(Math.random() * 150) + 200 },
      { name: 'Road Damage', value: Math.floor(Math.random() * 100) + 150 },
      { name: 'Street Light', value: Math.floor(Math.random() * 80) + 100 },
      { name: 'Other', value: Math.floor(Math.random() * 40) + 50 }
    ];
    
    // Generate department performance data
    const departmentData = [
      { 
        name: 'Roads & Infrastructure', 
        assigned: Math.floor(Math.random() * 100) + 200,
        resolved: Math.floor(Math.random() * 80) + 160,
        avgResolutionTime: Math.floor(Math.random() * 20) + 40
      },
      { 
        name: 'Public Works', 
        assigned: Math.floor(Math.random() * 80) + 150,
        resolved: Math.floor(Math.random() * 60) + 120,
        avgResolutionTime: Math.floor(Math.random() * 15) + 35
      },
      { 
        name: 'Municipal Services', 
        assigned: Math.floor(Math.random() * 70) + 130,
        resolved: Math.floor(Math.random() * 50) + 100,
        avgResolutionTime: Math.floor(Math.random() * 25) + 45
      }
    ];
    
    // Update all chart data at once
    setChartData({
      issuesTrend: trendData,
      severityDistribution: severityData,
      resolutionMetrics: resolutionData,
      categoryDistribution: categories,
      departmentPerformance: departmentData
    });
  };
  
  // Colors for charts (consolidated)
  const COLORS = {
    primary: '#4361ee',
    success: '#2ecc71',
    warning: '#f39c12',
    danger: '#e74c3c',
    info: '#3498db',
    secondary: '#8d99ae',
    severity: {
      'High': '#e74c3c',
      'Medium': '#f39c12',
      'Low': '#3498db'
    }
  };
  
  // Custom tooltip for charts
  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div className="custom-tooltip">
          <p className="tooltip-label">{`${label}`}</p>
          {payload.map((entry, index) => (
            <p key={`item-${index}`} style={{ color: entry.color }}>
              {`${entry.name}: ${entry.value}`}
            </p>
          ))}
        </div>
      );
    }
    return null;
  };
  
  // Date range selector component
  const DateRangeSelector = () => (
    <div className="date-range-selector">
      <button 
        className={`range-btn ${dateRange === 'week' ? 'active' : ''}`}
        onClick={() => setDateRange('week')}
      >
        Week
      </button>
      <button 
        className={`range-btn ${dateRange === 'month' ? 'active' : ''}`}
        onClick={() => setDateRange('month')}
      >
        Month
      </button>
      <button 
        className={`range-btn ${dateRange === 'quarter' ? 'active' : ''}`}
        onClick={() => setDateRange('quarter')}
      >
        Quarter
      </button>
      <button 
        className={`range-btn ${dateRange === 'year' ? 'active' : ''}`}
        onClick={() => setDateRange('year')}
      >
        Year
      </button>
    </div>
  );
  
  // Visualization selector component
  const VisualizationSelector = () => (
    <div className="visualization-selector">
      <button 
        className={`viz-btn ${activeVisualization === 'issuesTrend' ? 'active' : ''}`}
        onClick={() => setActiveVisualization('issuesTrend')}
      >
        Issue Trends
      </button>
      <button 
        className={`viz-btn ${activeVisualization === 'severityDistribution' ? 'active' : ''}`}
        onClick={() => setActiveVisualization('severityDistribution')}
      >
        Severity Distribution
      </button>
      <button 
        className={`viz-btn ${activeVisualization === 'resolutionMetrics' ? 'active' : ''}`}
        onClick={() => setActiveVisualization('resolutionMetrics')}
      >
        Resolution Metrics
      </button>
      <button 
        className={`viz-btn ${activeVisualization === 'categoryDistribution' ? 'active' : ''}`}
        onClick={() => setActiveVisualization('categoryDistribution')}
      >
        Category Distribution
      </button>
      <button 
        className={`viz-btn ${activeVisualization === 'departmentPerformance' ? 'active' : ''}`}
        onClick={() => setActiveVisualization('departmentPerformance')}
      >
        Department Performance
      </button>
    </div>
  );
  
  return (
    <div className="data-visualization-container">
      <h1 className="data-visualization-title">Data Visualization</h1>
      
      <DateRangeSelector />
      <VisualizationSelector />
      
      <div className="visualization-content">
        {activeVisualization === 'issuesTrend' && (
          <div className="visualization-container">
            <h3>Issue Trends Over Time</h3>
            <div className="chart-container">
              <ResponsiveContainer width="100%" height={400}>
                <AreaChart
                  data={chartData.issuesTrend}
                  margin={{ top: 20, right: 30, left: 20, bottom: 30 }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="date" />
                  <YAxis />
                  <Tooltip content={<CustomTooltip />} />
                  <Legend />
                  <Area type="monotone" dataKey="reported" fill={COLORS.primary} stroke={COLORS.primary} name="Reported" />
                  <Area type="monotone" dataKey="resolved" fill={COLORS.success} stroke={COLORS.success} name="Resolved" />
                  <Area type="monotone" dataKey="pending" fill={COLORS.warning} stroke={COLORS.warning} name="Pending" />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>
        )}
        
        {activeVisualization === 'severityDistribution' && (
          <div className="visualization-container">
            <h3>Issue Severity Distribution</h3>
            <div className="chart-container">
              <ResponsiveContainer width="100%" height={400}>
                <PieChart>
                  <Pie
                    data={chartData.severityDistribution}
                    cx="50%"
                    cy="50%"
                    labelLine={true}
                    outerRadius={150}
                    fill="#8884d8"
                    dataKey="value"
                    nameKey="name"
                    label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                  >
                    {chartData.severityDistribution.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS.severity[entry.name]} />
                    ))}
                  </Pie>
                  <Tooltip />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>
        )}
        
        {activeVisualization === 'resolutionMetrics' && (
          <div className="visualization-container">
            <h3>Resolution Time Metrics</h3>
            <div className="chart-container">
              <ResponsiveContainer width="100%" height={400}>
                <LineChart
                  data={chartData.resolutionMetrics}
                  margin={{ top: 20, right: 30, left: 20, bottom: 30 }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="date" />
                  <YAxis />
                  <Tooltip content={<CustomTooltip />} />
                  <Legend />
                  <Line type="monotone" dataKey="average" stroke={COLORS.primary} strokeWidth={2} name="Overall Average" />
                  <Line type="monotone" dataKey="Roads & Infrastructure" stroke={COLORS.danger} name="Roads & Infrastructure" />
                  <Line type="monotone" dataKey="Public Works" stroke={COLORS.success} name="Public Works" />
                  <Line type="monotone" dataKey="Municipal Services" stroke={COLORS.warning} name="Municipal Services" />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>
        )}
        
        {activeVisualization === 'categoryDistribution' && (
          <div className="visualization-container">
            <h3>Issue Category Distribution</h3>
            <div className="chart-container">
              <ResponsiveContainer width="100%" height={400}>
                <BarChart
                  data={chartData.categoryDistribution}
                  margin={{ top: 20, right: 30, left: 20, bottom: 30 }}
                  layout="vertical"
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis type="number" />
                  <YAxis dataKey="name" type="category" />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="value" name="Number of Issues" fill={COLORS.primary}>
                    {chartData.categoryDistribution.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={Object.values(COLORS)[index % 6]} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        )}
        
        {activeVisualization === 'departmentPerformance' && (
          <div className="visualization-container">
            <h3>Department Performance</h3>
            <div className="chart-container">
              <ResponsiveContainer width="100%" height={400}>
                <BarChart
                  data={chartData.departmentPerformance}
                  margin={{ top: 20, right: 30, left: 20, bottom: 30 }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip content={<CustomTooltip />} />
                  <Legend />
                  <Bar dataKey="assigned" fill={COLORS.primary} name="Assigned Issues" />
                  <Bar dataKey="resolved" fill={COLORS.success} name="Resolved Issues" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default DataVisualization;
