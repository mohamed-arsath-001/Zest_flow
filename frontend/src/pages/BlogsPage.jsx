import React from 'react';
import { Link } from 'react-router-dom';
import './PageStyles.css';

const BlogsPage = () => {
  return (
    <div className="page-container pt-32">
      <div className="content-wrapper">
        <h1 className="page-title">Insights & Articles</h1>
        <p className="page-subtitle">The latest thoughts and trends in AI automation.</p>

        <div className="placeholder-section">
          <h2>Recent Posts</h2>
          <div className="placeholder-grid list-view">
            <Link to="/blogs/future-of-ai" className="placeholder-box link-box text-left">
              <h3>The Future of AI in Enterprise</h3>
              <p>Discover how AI is reshaping corporate operations...</p>
              <span className="text-sm text-muted mt-2 block">May 15, 2024</span>
            </Link>
            <Link to="/blogs/automation-workflows" className="placeholder-box link-box text-left">
              <h3>Optimizing Automation Workflows</h3>
              <p>Best practices for setting up scalable automation...</p>
              <span className="text-sm text-muted mt-2 block">April 22, 2024</span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BlogsPage;
