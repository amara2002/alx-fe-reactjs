import React, { useState } from "react";

export default function Search() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);

  // async function to fetch data
  async function handleSearch() {
    if (!query) return;
    try {
      const response = await fetch(`https://api.example.com/search?q=${query}`);
      const data = await response.json();
      setResults(data.items || []);
    } catch (error) {
      console.error("Fetch error:", error);
    }
  }

  return (
    <div>
      <input
        type="text"
        value={query}
        onChange={e => setQuery(e.target.value)}
        placeholder="Search something..."
      />
      <button onClick={handleSearch}>Search</button>

      {/* conditional render results only if there are any */}
      {results.length > 0 && (
        <ul>
          {results.map(item => (
            <li key={item.id}>{item.name}</li>
          ))}
        </ul>
      )}
    </div>
  );
}
