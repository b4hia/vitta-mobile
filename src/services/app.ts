import { IConstantsAllResponse } from "@/interfaces/services/constants"
import { ServiceVittaApi } from "./api"

export const appService = {
    async getConstants(): Promise<IConstantsAllResponse> {
        const response = await ServiceVittaApi.get<IConstantsAllResponse>("/app/constants")
        return response.data
    },
}
