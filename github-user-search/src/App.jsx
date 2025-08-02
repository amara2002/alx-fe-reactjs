import { useState } from "react";
import Search from "./components/Search";
import { searchUsers } from "./services/githubService";

function App() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleSearch = async (criteria) => {
    setLoading(true);
    try {
      const data = await searchUsers(criteria);
      setUsers(data.items);
    } catch (error) {
      console.error(error);
    }
    setLoading(false);
  };

  return (
    <div className="max-w-4xl mx-auto">
      <Search onSearch={handleSearch} />
      {loading && <p className="text-center">Loading...</p>}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 p-4">
        {users.map((user) => (
          <div key={user.id} className="border p-4 rounded shadow">
            <img src={user.avatar_url} alt="Avatar" className="w-16 h-16 rounded-full" />
            <h3 className="font-semibold">{user.login}</h3>
            <a href={user.html_url} target="_blank" rel="noopener noreferrer" className="text-blue-600">
              View Profile
            </a>
            {/* Optional: Fetch and display more details (location, repo count) in future enhancement */}
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
