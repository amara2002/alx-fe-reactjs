export async function searchUsers({ username, location, minRepos, page = 1 }) {
  let query = "";

  if (username) query += `${username} in:login`;
  if (location) query += ` location:${location}`;
  if (minRepos) query += ` repos:>=${minRepos}`;

  const url = `https://api.github.com/search/users?q=${encodeURIComponent(
    query
  )}&per_page=20&page=${page}`;

  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(`GitHub API error: ${response.status}`);
  }

  return response.json();
}

export async function getUserDetails(username) {
  const response = await fetch(`https://api.github.com/users/${username}`);
  if (!response.ok) {
    throw new Error("Failed to fetch user details");
  }
  return response.json();
}
