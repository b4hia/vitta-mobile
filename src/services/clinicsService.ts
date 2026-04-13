import { IGetListClinicsRequest } from "@/interfaces/services/clinics"
import api from "./api"

const clinicService = {
    async getClinics(): Promise<IGetListClinicsRequest[]> {
        const response = await api.get<IGetListClinicsRequest[]>("/clinics/list")
        return response.data
    },

    async getClinicAgenda(clinicId: string, date: string): Promise<any> {
        const response = await api.get(`/clinics/${clinicId}/agenda`, {
            params: { date },
        })
        return response.data
    },
}

export default clinicService
