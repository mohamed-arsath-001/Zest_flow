import React from 'react';
import { useParams } from 'react-router-dom';
import './PageStyles.css';

const ServiceDetailPage = () => {
  const { id } = useParams();

  return (
    <div className="page-container pt-32">
      <div className="content-wrapper">
        <h1 className="page-title">Service Details: {id}</h1>
        <p className="page-subtitle">Deep dive into our specific offering.</p>

        <div className="placeholder-section">
          <h2>Overview</h2>
          <p>This is a detailed view of the {id} service. Here we explain the methodology, features, and benefits of choosing this specific solution for your business.</p>
        </div>

        <div className="placeholder-section">
          <h2>Key Deliverables</h2>
          <ul>
            <li>Comprehensive analysis</li>
            <li>Custom deployment strategy</li>
            <li>Ongoing support and optimization</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default ServiceDetailPage;
