import React, { useState } from "react";
import { motion } from "framer-motion";
import { useAuth } from "../context/AuthContext";
import { useNavigate, Link } from "react-router-dom";

const Login = () => {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await login(form);

      // 🔥 ApiResponse structure ke hisaab se
      const role = res.data.user.role;

      if (role === "admin") {
        navigate("/admin");
      } else {
        navigate("/dashboard");
      }

    } catch (err) {
      setError("Invalid credentials");
    }
  };

  return (
    <div className="min-h-screen bg-[#0f172a] flex items-center justify-center text-white">
      <motion.form
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        onSubmit={handleSubmit}
        className="bg-gray-800 p-8 rounded-2xl w-96 space-y-6"
      >
        <h2 className="text-3xl font-bold text-center">Login</h2>

        {error && <p className="text-red-400 text-sm">{error}</p>}

        <input
          type="email"
          placeholder="Email"
          className="w-full p-3 rounded bg-gray-700 outline-none"
          onChange={(e) => setForm({ ...form, email: e.target.value })}
        />

        <input
          type="password"
          placeholder="Password"
          className="w-full p-3 rounded bg-gray-700 outline-none"
          onChange={(e) => setForm({ ...form, password: e.target.value })}
        />

        <button className="w-full bg-blue-500 hover:bg-blue-600 p-3 rounded font-bold">
          Login
        </button>

        <p className="text-center text-sm">
          Don't have an account?{" "}
          <Link to="/register" className="text-blue-400">
            Register
          </Link>
        </p>
      </motion.form>
    </div>
  );
};

export default Login;