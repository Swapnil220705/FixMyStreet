import React, { useState } from 'react';
import '../css/DocumentViewer.css';

/**
 * DocumentViewer Component
 * ---------------------------------------------------------------------
 * This component displays documents and images related to reported issues.
 * It supports multiple file types and provides a gallery view with a 
 * modal for larger previews.
 * 
 * @param {Object} props - Component props
 * @param {Array} props.documents - Array of document objects
 * @param {boolean} props.showDemo - Whether to show demo data
 * @returns {JSX.Element} - Rendered component
 */
const DocumentViewer = ({ documents = [], showDemo = false }) => {
  const [selectedDocument, setSelectedDocument] = useState(null);

  // Mock data for demonstration
  const mockDocuments = [
    {
      id: 'doc1',
      type: 'image',
      url: '/images/pothole1.jpg',
      title: 'Pothole on Main Street',
      description: 'Large pothole causing traffic hazard',
      uploadedBy: 'John Doe',
      uploadDate: '2025-04-13T09:45:00'
    },
    {
      id: 'doc2',
      type: 'pdf',
      url: '/documents/repair_report.pdf',
      title: 'Repair Assessment Report',
      description: 'Official assessment of road damage',
      uploadedBy: 'City Engineer',
      uploadDate: '2025-04-14T11:30:00'
    },
    {
      id: 'doc3',
      type: 'image',
      url: '/images/road_damage.jpg',
      title: 'Cracked Pavement on Oak Avenue',
      description: 'Extensive cracking requiring immediate attention',
      uploadedBy: 'Jane Smith',
      uploadDate: '2025-04-14T14:15:00'
    }
  ];

  // Use mock data if showDemo is true or if no documents are provided
  const displayDocuments = showDemo || documents.length === 0 ? mockDocuments : documents;

  // Function to format date
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

  // Function to get icon based on document type
  const getDocumentIcon = (type) => {
    switch (type.toLowerCase()) {
      case 'image':
        return '🖼️';
      case 'pdf':
        return '📄';
      case 'video':
        return '🎥';
      default:
        return '📎';
    }
  };

  // Function to open document in modal
  const openDocument = (document) => {
    setSelectedDocument(document);
  };

  // Function to close modal
  const closeModal = () => {
    setSelectedDocument(null);
  };

  return (
    <div className="document-viewer">
      <h3 className="document-viewer-title">Related Documents</h3>
      
      {displayDocuments.length > 0 ? (
        <div className="document-gallery">
          {displayDocuments.map((doc) => (
            <div key={doc.id} className="document-item" onClick={() => openDocument(doc)}>
              <div className="document-icon">
                {getDocumentIcon(doc.type)}
              </div>
              <div className="document-info">
                <h4>{doc.title}</h4>
                <p>{doc.description}</p>
                <span className="document-meta">
                  Uploaded by {doc.uploadedBy} on {formatDate(doc.uploadDate)}
                </span>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="no-documents">
          <p>No documents available for this issue.</p>
        </div>
      )}

      {selectedDocument && (
        <div className="document-modal" onClick={closeModal}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <button className="close-button" onClick={closeModal}>&times;</button>
            <h2>{selectedDocument.title}</h2>
            {selectedDocument.type === 'image' ? (
              <img src={selectedDocument.url} alt={selectedDocument.title} />
            ) : (
              <iframe src={selectedDocument.url} title={selectedDocument.title}></iframe>
            )}
            <p>{selectedDocument.description}</p>
            <p className="document-meta">
              Uploaded by {selectedDocument.uploadedBy} on {formatDate(selectedDocument.uploadDate)}
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default DocumentViewer;
