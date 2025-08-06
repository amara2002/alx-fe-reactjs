import React, { useState } from "react";
import { fetchUserData, searchUsers } from "../services/githubService";

export default function Search() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  async function handleSearch(e) {
    e.preventDefault();
    if (!query) return;
    setLoading(true);
    setError(null);
    setResults([]);

    try {
      const data = await searchUsers({ username: query });

      const detailedUsers = await Promise.all(
        data.items.map(async (user) => {
          const details = await fetchUserData(user.login);
          return {
            id: user.id,
            login: user.login,
            html_url: user.html_url,
            location: details?.location || "Unknown",
            avatar_url: user.avatar_url,
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

      {results.length === 0 && !loading && (
        <p style={{ marginTop: 20 }}>Looks like we can't find the user</p>
      )}

      {results.length > 0 && (
        <ul style={{ listStyle: "none", padding: 0, marginTop: 20 }}>
          {results.map((user) => (
            <li
              key={user.id}
              style={{
                display: "flex",
                alignItems: "center",
                gap: 10,
                marginBottom: 15,
                borderBottom: "1px solid #ccc",
                paddingBottom: 10,
              }}
            >
              <img
                src={user.avatar_url}
                alt={`${user.login}'s avatar`}
                width={50}
                height={50}
                style={{ borderRadius: "50%" }}
              />
              <div>
                <a
                  href={user.html_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{ fontWeight: "bold" }}
                >
                  {user.login}
                </a>
                <p>Location: {user.location}</p>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
