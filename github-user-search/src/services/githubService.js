const BASE_URL = 'https://api.github.com';

export async function searchUsers(query, page = 1, perPage = 20) {
  const url = `${BASE_URL}/search/users?q=${encodeURIComponent(query)}&page=${page}&per_page=${perPage}`;
  const res = await fetch(url);
  if (!res.ok) throw new Error('Failed to fetch users');
  return res.json(); // includes items: [users basic info]
}

export async function getUserDetails(username) {
  const url = `${BASE_URL}/users/${username}`;
  const res = await fetch(url);
  if (!res.ok) throw new Error(`Failed to fetch details for ${username}`);
  return res.json(); // includes location, public_repos, etc.
}
