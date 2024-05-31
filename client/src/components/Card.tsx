// src/components/Card.tsx
import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { FaCopy } from 'react-icons/fa';

interface Repo {
  html_url: string;
  name: string;
  description: string | null;
  created_at: string;
  stargazers_count: number;
  forks_count: number;
  language: string | null;
  open_issues_count: number;
  clone_url: string;
}

interface CardProps {
  repo: Repo;
}

const Card: React.FC<CardProps> = ({ repo }) => {
  const handleCardClick = () => {
    window.open(repo.html_url, '_blank');
  };

  const handleCloneClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    navigator.clipboard.writeText(repo.clone_url).then(() => {
      alert('Clone URL copied to clipboard!');
    }, (err) => {
      console.error('Failed to copy: ', err);
    });
  };

  return (
    <div className="card mb-3" onClick={handleCardClick} style={{ cursor: 'pointer' }}>
      <div className="card-body">
        <h5 className="card-title" style={{ fontSize: '1.5rem', color: 'darkblue' }}>
          {repo.name}
        </h5>
        <h6 className="card-subtitle mb-2 text-muted">{repo.language}</h6>
        <p className="card-text">{repo.description}</p>
        <p className="card-text">
          <small className="text-muted">Created at: {new Date(repo.created_at).toLocaleDateString()}</small>
        </p>
        <p className="card-text">
          <small className="text-muted">⭐ Stars: {repo.stargazers_count}</small>
        </p>
        <p className="card-text">
          <small className="text-muted">🍴 Forks: {repo.forks_count}</small>
        </p>
        <p className="card-text">
          <small className="text-muted">Issues: {repo.open_issues_count}</small>
        </p>
        <button 
          onClick={handleCloneClick} 
          className="btn btn-primary"
          style={{ display: 'flex', alignItems: 'center' }}
        >
          <FaCopy style={{ marginRight: '5px' }} /> Clone Repo
        </button>
      </div>
    </div>
  );
};

export default Card;
