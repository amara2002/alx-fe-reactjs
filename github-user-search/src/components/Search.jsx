import React, { useState } from "react";

export default function Search() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  async function fetchUserData(username) {
    try {
      const res = await fetch(`https://api.github.com/users/${username}`);
      if (!res.ok) throw new Error("Failed to fetch user data");
      return await res.json();
    } catch {
      return null;
    }
  }

  async function handleSearch(e) {
    e.preventDefault(); // ✅ prevent page reload
    if (!query) return;
    setLoading(true);
    setError(null);
    setResults([]);

    try {
      const res = await fetch(`https://api.github.com/search/users?q=${query}`);
      if (!res.ok) throw new Error("Failed to fetch search results");
      const data = await res.json();

      const detailedUsers = await Promise.all(
        data.items.map(async (user) => {
          const details = await fetchUserData(user.login);
          return {
            id: user.id,
            login: user.login,
            html_url: user.html_url,
            location: details?.location || "Unknown",
          };
        })
      );

      setResults(detailedUsers);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div style={{ maxWidth: 600, margin: "auto", padding: 20 }}>
      <h2>GitHub User Search</h2>
      <form onSubmit={handleSearch}>
        <input
          type="text"
          placeholder="Enter username"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          style={{ width: "80%", padding: 8 }}
        />
        <button type="submit" disabled={loading} style={{ padding: 8, marginLeft: 8 }}>
          {loading ? "Searching..." : "Search"}
        </button>
      </form>

      {error && <p style={{ color: "red" }}>Error: {error}</p>}

      {results.length > 0 && (
        <ul style={{ listStyle: "none", padding: 0, marginTop: 20 }}>
          {results.map((user) => (
            <li key={user.id} style={{ marginBottom: 15, borderBottom: "1px solid #ccc", paddingBottom: 10 }}>
              <a href={user.html_url} target="_blank" rel="noopener noreferrer" style={{ fontWeight: "bold" }}>
                {user.login}
              </a>
              <p>Location: {user.location}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
