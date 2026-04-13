import { IUser } from "@/interfaces/contexts/auth"
import api from "./api"

export interface RegisterUserDto {
    first_name: string
    last_name: string
    cpf_cnpj: string
    email: string
    phone: string
    birthday: string
    password: string
    address_street: string
    address_number: string
    address_neighborhood: string
    address_city: string
    address_state: string
    address_zip_code: string
    address_complement?: string
    chronicDiseaseIds: string[]
    healthPlan: {
        planId: string
        dependents?: Array<{
            first_name: string
            last_name: string
            cpf_cnpj: string
            birthday: string
            relationship: string
        }>
    }
}

export interface UserProfile {
    id: string
    email: string
    first_name: string
    last_name: string
    phone?: string
    cpf_cnpj?: string
    birthday?: string
    roles: string[]
}

const userService = {
    async registerUser(dto: RegisterUserDto): Promise<UserProfile> {
        const response = await api.post<UserProfile>("/users/register", dto)
        return response.data
    },

    async getProfile(): Promise<IUser> {
        const response = await api.get<IUser>("/users/profile")
        return response.data
    },

    async getUser(id: string): Promise<UserProfile> {
        const response = await api.get<UserProfile>(`/users/${id}`)
        return response.data
    },

    async updateUser(id: string, data: Partial<UserProfile>): Promise<UserProfile> {
        const response = await api.patch<UserProfile>(`/users/${id}`, data)
        return response.data
    },

    async updatePushToken(token: string): Promise<void> {
        await api.patch("/users/me/push-token", { token })
    },
}

export default userService
