import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { adminApi, setToken } from "../../utils/api";

const Login = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const inputClass = `w-full border border-white/20 bg-transparent text-white text-lg
    px-4 py-3 rounded-lg placeholder-white/40
    focus:outline-none focus:border-purple-400/60
    focus:shadow-[0_0_20px_rgba(168,85,247,0.45)]
    transition-all duration-300`;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!username || !password) {
      setError("Username and password are required");
      return;
    }

    setLoading(true);
    try {
      const token = await adminApi.login(username, password);
      setToken(token);
      navigate("/admin");
    } catch (err) {
      setError(err.message || "Invalid credentials");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full h-screen flex items-center justify-center bg-[#050414]">
      <form
        onSubmit={handleSubmit}
        className="bg-gradient-to-r from-black via-[#0f172a] to-[#1e3a8a]
          shadow-[0_0_40px_rgba(168,85,247,0.35)]
          w-[90%] sm:w-[420px] md:w-[480px]
          flex flex-col gap-4 text-white border border-white/10 p-8 rounded-xl"
      >
        <h2 className="text-2xl font-bold text-center mb-2 text-purple-400">
          Admin Login
        </h2>

        {error && (
          <p className="text-red-400 text-sm text-center bg-red-900/20 border border-red-500/30 rounded-lg px-3 py-2">
            {error}
          </p>
        )}

        <input
          className={inputClass}
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          autoComplete="username"
        />

        <input
          className={inputClass}
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          autoComplete="current-password"
        />

        <button
          type="submit"
          disabled={loading}
          className="mt-4 py-3 rounded-lg font-semibold text-white
            bg-gradient-to-r from-purple-600 to-indigo-600
            hover:from-purple-500 hover:to-indigo-500
            shadow-[0_0_30px_rgba(168,85,247,0.5)]
            hover:shadow-[0_0_50px_rgba(168,85,247,0.7)]
            transition-all duration-300
            disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {loading ? "Logging in..." : "Login"}
        </button>
      </form>
    </div>
  );
};

export default Login;
