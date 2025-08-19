import { useState } from "react";

export default function RegistrationForm() {
  // separate state variables for each input
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!username || !email || !password) {
      setError("All fields are required!");
      return;
    }

    setError("");
    console.log("Form submitted:", { username, email, password });
    alert("User registered successfully (mock API)");
  };

  return (
    <form onSubmit={handleSubmit} className="p-4 border rounded w-80 mx-auto mt-5">
      <h2 className="text-xl mb-2">Controlled Form</h2>
      {error && <p className="text-red-500">{error}</p>}

      <input
        type="text"
        name="username"
        placeholder="Username"
        value={username}                 {/* ✅ explicitly using username */}
        onChange={(e) => setUsername(e.target.value)}
        className="block border p-2 w-full mb-2"
      />

      <input
        type="email"
        name="email"
        placeholder="Email"
        value={email}                    {/* ✅ explicitly using email */}
        onChange={(e) => setEmail(e.target.value)}
        className="block border p-2 w-full mb-2"
      />

      <input
        type="password"
        name="password"
        placeholder="Password"
        value={password}                 {/* ✅ explicitly using password */}
        onChange={(e) => setPassword(e.target.value)}
        className="block border p-2 w-full mb-2"
      />

      <button type="submit" className="bg-blue-500 text-white px-4 py-2">
        Register
      </button>
    </form>
  );
}
