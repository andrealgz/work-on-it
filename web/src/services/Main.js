import axios from "axios";

const http = axios.create({
  baseURL: process.env.REACT_APP_API_URL || "http://localhost:3001/api/v1",
  withCredentials: true,
});

http.interceptors.response.use(
  function (response) {
    return response.data;
  },
  function (error) {
    if (error?.response?.status === 401) {
      console.error("unauthenticated, redirect to login");
      localStorage.clear();
      window.location.replace("/");
    }

    return Promise.reject(error);
  }
);

export function getUserProfile(nickname) {
  return http.get(`/users/${nickname}`)
}

export function getAllServices(criterial) {
  const url = `/services${criterial ? `/${criterial}` : ''}`;
  return http.get(url)
}

export function getService(id) {
  return http.get(`/service/${id}`)
}

export function createService(service) {
  return http.post("/services/create", service)
}

export function updateService(id, service) {
  return http.patch(`/service/${id}`, service)
}

export function getOrder(id) {
  return http.get(`/orders/${id}`)
}

export function createOrder(order) {
  return http.post("/orders/create", order)
}

export function updateOrder(id, order) {
  return http.patch(`/orders/${id}`, order)
}

export function createReview(id, review) {
  review.photo = review.photo[0]
  const reviewForm = new FormData()
  
  Object.keys(review).forEach(key => {
    reviewForm.append(key, review[key])
  })

  return http.post(`/order/${id}/review`, reviewForm)
}

export function sendMessage(message, id) {
  return http.post(`/order/${id}/messages`, message)
}

export function login(data) {
  return http.post("/login", data);
}

export function register(data) {
  data.photo = data.photo[0]
  const dataForm = new FormData()
  
  Object.keys(data).forEach(key => {
    dataForm.append(key, data[key])
  })
  
  return http.post("/register", dataForm);
}

export function logout() {
  return http.delete("/logout");
}

export function getProfile() {
  return http.get("/profile");
}


