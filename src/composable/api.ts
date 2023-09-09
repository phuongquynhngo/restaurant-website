import axios from "axios";

const api = axios.create({
    baseURL: "http://localhost:3000"
})

// Set default header
api.defaults.headers.common["Content-Type"] = "application/json";
api.defaults.headers.common["Accept"] = "application/json";

export default api;
