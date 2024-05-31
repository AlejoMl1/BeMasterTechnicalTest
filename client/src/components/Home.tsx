// src/components/Home.tsx
import React, { useState } from 'react';
import axios from 'axios';
import Card from './Card';

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

const Home: React.FC = () => {
  const [username, setUsername] = useState<string>('');
  const [repos, setRepos] = useState<Repo[]>([]);
  const [error, setError] = useState<string>('');

  const fetchRepos = async () => {
    try {
      const response = await axios.get(`http://localhost:3000/github?username=${username}`);
      setRepos(response.data.data);
      setError('');
    } catch (err) {
      setError('Failed to fetch repositories. Please check the username and try again.');
      setRepos([]);
    }
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    fetchRepos();
  };

  return (
    <div className="container mt-5">
      <h1 className="text-center">GitHub Top 10 Repositories</h1>
      <form onSubmit={handleSubmit} className="my-4">
        <div className="input-group justify-content-center">
          <input
            type="text"
            className="form-control"
            placeholder="Enter GitHub username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            style={{ maxWidth: '400px' }}
          />
          <div className="input-group-append">
            <button 
              type="submit" 
              className="btn btn-primary" 
              style={{ marginLeft: '30px' }}
            >
              Search
            </button>
          </div>
        </div>
      </form>
      {error && <div className="alert alert-danger">{error}</div>}
      <div className="row">
        {repos.map((repo) => (
          <div key={repo.html_url} className="col-md-4">
            <Card repo={repo} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;
