import axios from "axios";

const BASE_URL = import.meta.env.VITE_API_URL;

// 🔹 AI Routes
const aiAPI = axios.create({
  baseURL: `${BASE_URL}/ai`,
  withCredentials: true,
});

// 🔹 Auth Routes
const authAPI = axios.create({
  baseURL: `${BASE_URL}/auth`,
  withCredentials: true,
});

// 🔹 Admin Routes
const adminAPI = axios.create({
  baseURL: `${BASE_URL}/admin`,
  withCredentials: true,
});

// ================= AUTH =================

export const registerUser = async (data) => {
  try {
    const response = await authAPI.post("/register-user", data);
    return response.data;
  } catch (error) {
    throw error.response?.data?.message || "Registration failed";
  }
};

export const logInUser = async (data) => {
  try {
    const response = await authAPI.post("/login-user", data);
    return response.data;
  } catch (error) {
    throw error.response?.data?.message || "Login failed";
  }
};

export const logoutUser = async () => {
  const response = await authAPI.post("/logout");
  return response.data;
};

// ================= AI =================

export const getCareerRoadmap = async (formData) => {
  const response = await aiAPI.post("/generate-roadmap", formData);
  return response.data;
};

export const fetchOSRepos = async (techStack) => {
  const response = await aiAPI.post("/find-os", { techStack });
  return response.data;
};

export const getAdminStats = async () => {
  const response = await adminAPI.get("/stats");
  return response.data;
};