import React from "react";
import { useState } from "react";
import { motion } from "framer-motion";
import { useAuth } from "../context/AuthContext";
import { useNavigate, Link } from "react-router-dom";

const Register = () => {
  const { register } = useAuth();
  const navigate = useNavigate();
  const [form, setForm] = useState({
    userName: "",
    email: "",
    password: "",
  });
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await register(form);
      navigate("/login");
    } catch (err) {
      setError(err);
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
        <h2 className="text-3xl font-bold text-center">Register</h2>

        {error && <p className="text-red-400 text-sm">{error}</p>}

        <input
          type="text"
          placeholder="Username"
          className="w-full p-3 rounded bg-gray-700 outline-none"
          onChange={(e) => setForm({ ...form, userName: e.target.value })}
        />

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

        <button className="w-full bg-emerald-500 hover:bg-emerald-600 p-3 rounded font-bold">
          Register
        </button>

        <p className="text-center text-sm">
          Already have an account?{" "}
          <Link to="/login" className="text-emerald-400">
            Login
          </Link>
        </p>
      </motion.form>
    </div>
  );
};

export default Register;