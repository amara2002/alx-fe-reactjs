import { useParams } from "react-router-dom";

export default function BlogPost() {
  const { id } = useParams();

  return (
    <div>
      <h2>Blog Post</h2>
      <p>Displaying content for blog post with ID: <strong>{id}</strong></p>
    </div>
  );
}
