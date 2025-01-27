
import axios from "axios"
import { ACCESS_TOKEN } from "./constants"

const api = axios.create({
    baseURL: import.meta.env.VITE_API_URL,
    withCredentials: true,
    headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
    }
})

api.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem(ACCESS_TOKEN)

        if (token) {
            // console.log("=====================\n", `Bearer ${token}`)
            config.headers.Authorization = `Bearer ${token}`

        }
        return config
    },
    (error) => {
        return Promise.reject(error)
    }
)

export default api