export async function searchUsers({ username, location, minRepos }) {
  let query = "";

  if (username) query += `${username} in:login`;
  if (location) query += ` location:${location}`;
  if (minRepos) query += ` repos:>=${minRepos}`;

  const url = `https://api.github.com/search/users?q=${encodeURIComponent(query)}&per_page=10`;

  const response = await fetch(url);
  if (!response.ok) throw new Error("GitHub API Error");

  return response.json();
}
