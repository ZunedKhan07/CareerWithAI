import axios from "axios";

// 🔹 AI Routes
const aiAPI = axios.create({
  baseURL: "http://localhost:7000/api/v1/ai",
  withCredentials: true,
});

// 🔹 Auth Routes
const authAPI = axios.create({
  baseURL: "http://localhost:7000/api/v1/auth",
  withCredentials: true,
});

// 🔹 Admin Routes
const adminAPI = axios.create({
  baseURL: "http://localhost:7000/api/v1/admin",
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