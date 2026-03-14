import { useState } from "react";
import axiosClient from "../api/axiosClient";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      // call backend register api
      await axiosClient.post("/auth/register", { name, email, password });

      navigate("/login");
    } catch (err) {
      setError(err.response?.data?.message || "Registration failed");
    }
  };

  return (
    <div className="flex items-center justify-center h-screen bg-blue-200">
      <form
        className="bg-blue-100 p-8 rounded-3xl shadow-md w-96"
        onSubmit={handleSubmit}
      >
        <h1 className="text-2xl font-bold mb-6 text-center">Register</h1>
        {error && <p className="text-red-500 mb-4">{error}</p>}

        <input
          type="text"
          placeholder="Full Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full p-3 mb-4 border border-blue-200 rounded-3xl focus:outline-none focus:border-blue-200 focus:ring-2 focus:ring-blue-200"
          required
        />
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full p-3 mb-4 border border-blue-200 rounded-3xl focus:outline-none focus:border-blue-200 focus:ring-2 focus:ring-blue-200"
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full p-3 mb-4 border border-blue-200 rounded-3xl focus:outline-none focus:border-blue-200 focus:ring-2 focus:ring-blue-200"
          required
        />
        <button
          type="submit"
          className="w-full bg-[#02c39a] text-white font-bold p-2 py-3 rounded-3xl hover:bg-[#02b48d]"
        >
          Register
        </button>
        <p className="text-center mt-4 text-sm mb-4">
          Already have an account?{" "}
          <Link to="/login" className="text-blue-600 font-semibold">
            Login
          </Link>
        </p>
      </form>
    </div>
  );
}

export default Register;
