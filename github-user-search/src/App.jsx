import { useState } from "react";
import Search from "./components/Search";
import { searchUsers, getUserDetails } from "./services/githubService";

export default function App() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [page, setPage] = useState(1);
  const [lastQuery, setLastQuery] = useState(null);
  const [hasMore, setHasMore] = useState(false);

  const fetchUsers = async (criteria, pageNumber = 1, append = false) => {
    setLoading(true);
    setError("");

    try {
      const result = await searchUsers({ ...criteria, page: pageNumber });

      const detailedUsers = await Promise.all(
        result.items.map(async (user) => {
          const details = await getUserDetails(user.login);
          return {
            id: user.id,
            login: user.login,
            avatar_url: user.avatar_url,
            html_url: user.html_url,
            location: details.location,
            public_repos: details.public_repos,
          };
        })
      );

      setUsers((prev) => (append ? [...prev, ...detailedUsers] : detailedUsers));
      setHasMore(result.total_count > pageNumber * 20);
      setPage(pageNumber);
      setLastQuery(criteria);
    } catch (err) {
      setError("Failed to fetch users.");
      console.error(err);
    }

    setLoading(false);
  };

  const handleSearch = (criteria) => {
    fetchUsers(criteria, 1, false);
  };

  const loadMore = () => {
    if (lastQuery) {
      fetchUsers(lastQuery, page + 1, true);
    }
  };

  return (
    <div className="p-4 max-w-6xl mx-auto">
      <Search onSearch={handleSearch} />

      {loading && <p className="text-center text-blue-500">Loading...</p>}
      {error && <p className="text-center text-red-500">{error}</p>}

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mt-6">
        {users.map((user) => (
          <div key={user.id} className="p-4 border rounded shadow bg-white">
            <img
              src={user.avatar_url}
              alt={user.login}
              className="w-20 h-20 rounded-full mb-3 mx-auto"
            />
            <h3 className="text-xl font-semibold text-center">{user.login}</h3>
            <p className="text-center text-sm text-gray-600">
              📍 {user.location || "Unknown"}
            </p>
            <p className="text-center text-sm text-gray-600">
              📂 {user.public_repos} public repos
            </p>
            <div className="text-center mt-2">
              <a
                href={user.html_url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
              >
                View Profile
              </a>
            </div>
          </div>
        ))}
      </div>

      {hasMore && !loading && (
        <div className="flex justify-center mt-8">
          <button
            onClick={loadMore}
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded"
          >
            Load More
          </button>
        </div>
      )}
    </div>
  );
}
