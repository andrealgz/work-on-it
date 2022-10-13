import axios from "axios";

const http = axios.create({
  baseURL: "http://localhost:3001/api/v1",
  withCredentials: true,
});

http.interceptors.response.use(
  function (response) {
    return response.data;
  },
  function (error) {
    if (error?.response?.status === 401) {
      console.error("unauthenticated, redirect to login");
      // localStorage.clear();
      window.location.replace("/");
    }

    return Promise.reject(error);
  }
);

export function getUserProfile(nickname) {
  return http.get(`/users/${nickname}`)
}

export function getAllServices() {
  return http.get("/services")
}

export function getService(id) {
  return http.get(`/services/${id}`)
}

export function createService(service) {
  return http.post("/services/create", service)
}

export function getOrder(id) {
  return http.get(`/orders/${id}`)
}

export function createOrder(order) {
  return http.post("/orders/create", order)
}

export function sendMessage(message) {
  return http.post("/orders/messages", message)
}

export function login(data) {
  return http.post("/login", data);
}

export function register(data) {
  return http.post("/register", data);
}

export function logout() {
  return http.delete("/logout");
}

export function getProfile() {
  return http.get("/profile");
}


