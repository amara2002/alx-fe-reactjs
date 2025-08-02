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
    <form onSubmit={handleSubmit} className="flex flex-col md:flex-row gap-4 p-4">
      <input
        type="text"
        placeholder="Username"
        className="p-2 rounded border w-full md:w-1/3"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <input
        type="text"
        placeholder="Location"
        className="p-2 rounded border w-full md:w-1/3"
        value={location}
        onChange={(e) => setLocation(e.target.value)}
      />
      <input
        type="number"
        placeholder="Min Repos"
        className="p-2 rounded border w-full md:w-1/4"
        value={minRepos}
        onChange={(e) => setMinRepos(e.target.value)}
      />
      <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">
        Search
      </button>
    </form>
  );
}
