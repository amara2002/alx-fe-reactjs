import React, { useState } from 'react';
import { fetchUserData } from '../services/githubService';

const Search = () => {
  const [username, setUsername] = useState('');
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setUser(null);

    try {
      const data = await fetchUserData(username);
      setUser(data);
    } catch {
      setError("Looks like we can't find the user");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Enter GitHub username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />
        <button type="submit">Search</button>
      </form>

      {loading && <p>Loading...</p>}

      {error && <p>{error}</p>}

      {user && (
        <div>
          <img src={user.avatar_url} alt={`${user.login} avatar`} width="100" />
          <h3>{user.name || user.login}</h3>
          <a href={user.html_url} target="_blank" rel="noreferrer">
            Visit GitHub Profile
          </a>
        </div>
      )}
    </div>
  );
};

export default Search;
