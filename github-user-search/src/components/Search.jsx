import { useState } from "react";

export default function Search({ onSearch }) {
  const [username, setUsername] = useState("");
  const [location, setLocation] = useState("");
  const [minRepos, setMinRepos] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    onSearch({ username, location, minRepos });
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col md:flex-row gap-4 p-4 bg-white rounded shadow max-w-4xl mx-auto"
    >
      <input
        type="text"
        placeholder="Username"
        className="p-2 rounded border w-full md:w-1/3"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        aria-label="Username"
      />
      <input
        type="text"
        placeholder="Location"
        className="p-2 rounded border w-full md:w-1/3"
        value={location}
        onChange={(e) => setLocation(e.target.value)}
        aria-label="Location"
      />
      <input
        type="number"
        min="0"
        placeholder="Minimum Repositories"
        className="p-2 rounded border w-full md:w-1/4"
        value={minRepos}
        onChange={(e) => setMinRepos(e.target.value)}
        aria-label="Minimum repositories"
      />
      <button
        type="submit"
        className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded"
      >
        Search
      </button>
    </form>
  );
}
