import React, { useState } from 'react';
import { searchUsers, getUserDetails } from '../services/githubService';

export default function Search() {
  const [query, setQuery] = useState('');
  const [location, setLocation] = useState('');
  const [minRepos, setMinRepos] = useState('');
  const [users, setUsers] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const buildQuery = () => {
    let q = query;
    if (location) q += ` location:${location}`;
    if (minRepos) q += ` repos:>=${minRepos}`;
    return q;
  };

  const fetchUsers = async (pageToFetch = 1) => {
    setLoading(true);
    setError(null);
    try {
      const data = await searchUsers(buildQuery(), pageToFetch);

      // For each user, fetch details
      const detailedUsers = await Promise.all(
        data.items.map(async (user) => {
          const details = await getUserDetails(user.login);
          return { ...user, ...details };
        })
      );

      if (pageToFetch === 1) {
        setUsers(detailedUsers);
      } else {
        setUsers((prev) => [...prev, ...detailedUsers]);
      }
      setPage(pageToFetch);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (e) => {
    e.preventDefault();
    fetchUsers(1);
  };

  const loadMore = () => {
    fetchUsers(page + 1);
  };

  return (
    <div className="max-w-3xl mx-auto p-4">
      <form onSubmit={handleSearch} className="flex flex-col gap-4 mb-6">
        <input
          type="text"
          placeholder="Username"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="border p-2 rounded"
          required
        />
        <input
          type="text"
          placeholder="Location (optional)"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          className="border p-2 rounded"
        />
        <input
          type="number"
          placeholder="Minimum repositories (optional)"
          value={minRepos}
          onChange={(e) => setMinRepos(e.target.value)}
          className="border p-2 rounded"
          min={0}
        />
        <button
          type="submit"
          className="bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
          disabled={loading}
        >
          {loading ? 'Searching...' : 'Search'}
        </button>
      </form>

      {error && <p className="text-red-500 mb-4">{error}</p>}

      <ul>
        {users.map((user) => (
          <li key={user.id} className="flex items-center mb-4 border p-3 rounded shadow">
            <img
              src={user.avatar_url}
              alt={`${user.login} avatar`}
              className="w-16 h-16 rounded-full mr-4"
            />
            <div>
              <a
                href={user.html_url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-700 font-semibold text-lg"
              >
                {user.login}
              </a>
              <p>Location: {user.location || 'N/A'}</p>
              <p>Public Repos: {user.public_repos}</p>
            </div>
          </li>
        ))}
      </ul>

      {users.length > 0 && (
        <button
          onClick={loadMore}
          className="mt-4 px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
          disabled={loading}
        >
          {loading ? 'Loading...' : 'Load More'}
        </button>
      )}
    </div>
  );
}
