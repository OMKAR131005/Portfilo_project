const BASE_URL = import.meta.env.VITE_API_BASE_URL;

// ---- Token helpers ----
export const getToken = () => localStorage.getItem("token");
export const setToken = (token) => localStorage.setItem("token", token);
export const removeToken = () => localStorage.removeItem("token");
export const isLoggedIn = () => !!getToken();

// ---- Auth headers ----
const authHeaders = () => ({
  "Content-Type": "application/json",
  Authorization: `Bearer ${getToken()}`,
});

const jsonHeaders = () => ({
  "Content-Type": "application/json",
});

// ---- Public API ----
export const publicApi = {
  getPublishedBlogs: () =>
    fetch(`${BASE_URL}/public/api/getPublishBlogs`).then(handleResponse),

  getBlogById: (id) =>
    fetch(`${BASE_URL}/public/api/getBlogById/${id}`).then(handleResponse),

  getBlogsByDate: (date) =>
    fetch(`${BASE_URL}/public/api/date/${date}`).then(handleResponse),
};

// ---- Admin API ----
export const adminApi = {
  login: (username, password) =>
    fetch(`${BASE_URL}/auth/login`, {
      method: "POST",
      headers: jsonHeaders(),
      body: JSON.stringify({ username, password }),
    }).then(handleResponse),

  getAllBlogs: () =>
    fetch(`${BASE_URL}/api/admin/getAllBlog`, {
      headers: authHeaders(),
    }).then(handleResponse),

  createBlog: (blog) =>
    fetch(`${BASE_URL}/api/admin/create`, {
      method: "POST",
      headers: authHeaders(),
      body: JSON.stringify(blog),
    }).then(handleResponse),

  updateBlog: (id, blog) =>
    fetch(`${BASE_URL}/api/admin/updateBlog/${id}`, {
      method: "PUT",
      headers: authHeaders(),
      body: JSON.stringify(blog),
    }).then(handleResponse),

  publishBlog: (id) =>
    fetch(`${BASE_URL}/api/admin/publish/${id}`, {
      method: "PATCH",
      headers: authHeaders(),
    }).then(handleResponse),

  deleteBlog: (id) =>
    fetch(`${BASE_URL}/api/admin/delete/${id}`, {
      method: "DELETE",
      headers: authHeaders(),
    }).then(handleResponse),
};

// ---- Response handler ----
async function handleResponse(res) {
  const data = await res.json();
  if (!res.ok) {
    throw new Error(data.message || "Request failed");
  }
  // Unwrap ApiResponse<T> wrapper — return data.data if present, else full object
  return data.data !== undefined ? data.data : data;
}
