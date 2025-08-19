export default function Login({ onLogin }) {
  return (
    <div>
      <h2>Login Page</h2>
      <button
        onClick={() => onLogin(true)}
        className="bg-blue-500 text-white px-4 py-2"
      >
        Login
      </button>
    </div>
  );
}
