import axios from "axios"
import AsyncStorage from "@react-native-async-storage/async-storage"

const api = axios.create({
    baseURL: process.env.EXPO_PUBLIC_API_URL,
    timeout: parseInt(process.env.EXPO_PUBLIC_VITTA_REQUEST_TIMEOUT ?? "30000") || 30000,
    headers: {
        "Content-Type": "application/json",
    },
})

api.interceptors.request.use(
    async (config) => {
        const token = await AsyncStorage.getItem("@vitta:token")
        if (token) {
            config.headers.Authorization = `Bearer ${token}`
        }
        return config
    },
    (error) => Promise.reject(error)
)

export default api
export { api as ServiceVittaApi }
