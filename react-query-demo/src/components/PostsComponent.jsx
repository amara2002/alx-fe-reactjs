import { useQuery } from "react-query";
import axios from "axios";

const fetchPosts = async () => {
  const res = await axios.get("https://jsonplaceholder.typicode.com/posts");
  return res.data;
};

export default function PostsComponent() {
  const { data, error, isLoading, refetch } = useQuery("posts", fetchPosts);

  if (isLoading) return <p>Loading posts...</p>;
  if (error) return <p>Error loading posts: {error.message}</p>;

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">Posts</h2>
      <button
        onClick={() => refetch()}
        className="bg-blue-500 text-white px-4 py-2 mb-4"
      >
        Refetch Posts
      </button>

      <ul>
        {data.map((post) => (
          <li key={post.id} className="mb-2 border p-2 rounded">
            <strong>{post.title}</strong>
            <p>{post.body}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}
