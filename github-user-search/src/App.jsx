// src/App.jsx
import React, { useState } from 'react';
import Search from './components/Search';
import { searchUsers } from './services/githubService';

export default function App() {
  const [users, setUsers] = useState([]);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSearch = async (criteria) => {
    setLoading(true);
    setError('');
    try {
      const data = await searchUsers(criteria);
      if (data.total_count === 0) {
        setError("Looks like we can't find the user");
        setUsers([]);
      } else {
        setUsers(data.items);
      }
    } catch (err) {
      setError(err.message || 'Something went wrong');
      setUsers([]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <h1 className="text-center text-3xl font-bold mb-6">GitHub User Search</h1>
      <Search onSearch={handleSearch} />

      {loading && <p className="text-center mt-4">Loading...</p>}

      {error && <p className="text-center mt-4 text-red-600">{error}</p>}

      <div className="mt-6 max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-6">
        {users.map(user => (
          <div key={user.id} className="bg-white rounded shadow p-4 flex items-center space-x-4">
            <img
              src={user.avatar_url}
              alt={user.login}
              className="w-16 h-16 rounded-full"
            />
            <div>
              <a
                href={user.html_url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-lg font-semibold text-blue-600 hover:underline"
              >
                {user.login}
              </a>
              {/* Display extra info if available */}
              {/* Since the Search API does not return location or repos count here, 
                  you'd need extra API calls per user if you want that info */}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
