import axios from "axios";

// Expected by the test/check: fetchUserData function
export async function fetchUserData(username) {
  try {
    const response = await axios.get(`https://api.github.com/users/${username}`);
    return response.data;
  } catch (error) {
    throw new Error("Failed to fetch user data");
  }
}

// Your original searchUsers logic, now with axios
export async function searchUsers({ username, location, minRepos, page = 1 }) {
  let query = "";

  if (username) query += `${username} in:login`;
  if (location) query += ` location:${location}`;
  if (minRepos) query += ` repos:>=${minRepos}`;

  const url = `https://api.github.com/search/users?q=${encodeURIComponent(
    query
  )}&per_page=20&page=${page}`;

  try {
    const response = await axios.get(url);
    return response.data;
  } catch (error) {
    throw new Error(`GitHub API error: ${error.response?.status || error.message}`);
  }
}

// You can still keep getUserDetails if needed (optional now)
export async function getUserDetails(username) {
  try {
    const response = await axios.get(`https://api.github.com/users/${username}`);
    return response.data;
  } catch (error) {
    throw new Error("Failed to fetch user details");
  }
}
