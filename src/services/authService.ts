import { ServiceVittaApi } from "./api"
import {
    IPostLoginParams,
    IPostRefreshToken,
    IResetPasswordParams,
    IAuthResponse,
    IPostSocialLoginParams,
    ISignupParamsUser,
} from "@/interfaces/services/auth"

export interface LoginResponse extends IAuthResponse {
    user: {
        id: string
        email: string
        first_name: string
        last_name: string
        roles: string[]
        activeRole: string
    }
}

const authService = {
    async login(email: string, password: string): Promise<LoginResponse> {
        const payload: IPostLoginParams = { email, password }
        const response = await ServiceVittaApi.post<LoginResponse>("/auth/login", payload)
        return response.data
    },

    async register(payload: ISignupParamsUser): Promise<void> {
        await ServiceVittaApi.post("/users/register", payload)
    },

    async socialLogin(providerToken: string): Promise<LoginResponse> {
        const payload = {
            token: providerToken,
        }

        const response = await ServiceVittaApi.post<LoginResponse>("/auth/social-login", payload)
        return response.data
    },

    async logout(): Promise<void> {
        await ServiceVittaApi.post("/auth/logout")
    },

    async resetPassword(params: IResetPasswordParams): Promise<void> {
        await ServiceVittaApi.post("/auth/reset-password", params)
    },

    async refreshToken(refreshToken: string): Promise<LoginResponse> {
        const payload: IPostRefreshToken = { refresh_token: refreshToken }
        const response = await ServiceVittaApi.post<LoginResponse>("/auth/refresh-auth", payload)
        return response.data
    },

    async me(): Promise<LoginResponse> {
        const response = await ServiceVittaApi.get<LoginResponse>("/auth/me")
        return response.data
    },
}

export default authService
