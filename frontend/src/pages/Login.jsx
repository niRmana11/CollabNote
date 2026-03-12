import { useState, useCallback, useContext } from "react";
import axiosClient from "../api/axiosClient";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      // call backend login api
      const res = await axiosClient.post("/auth/login", { email, password });

      login(res.data.user, res.data.token);

      navigate("/");
    } catch (err) {
      setError(err.response?.data?.message || "Login Failed");
    }
  };

  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <form
        className="bg-white p-8 rounded shadow-md w-96"
        onSubmit={handleSubmit}
      >
        <h1 className="text-2xl font-bold mb-6 text-center">Login</h1>
        {error && <p className="text-red-500 mb-4">{error}</p>}
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full p-2 mb-4 border rounded"
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full p-2 mb-4 border rounded"
          required
        />
        <button
          type="submit"
          className="w-full bg-blue-600 text-white p-2 rounded hover:bg-blue-700"
        >
          Login
        </button>
      </form>
    </div>
  );
}

export default Login;
