import api from './api'

export interface Doctor {
    id: string
    name: string
    crm: string
    score?: number
    specialty?: {
        id: string
        name: string
    }
}

export interface AgendaSlot {
    date: string
    slots: string[]
}

const doctorService = {
    async getDoctors(): Promise<Doctor[]> {
        const response = await api.get<Doctor[]>('/doctors')
        return response.data
    },

    async getDoctor(id: string): Promise<Doctor> {
        const response = await api.get<Doctor>(`/doctors/${id}`)
        return response.data
    },

    async getDoctorAgenda(doctorId: string): Promise<AgendaSlot[]> {
        const response = await api.get<AgendaSlot[]>(`/doctors/${doctorId}/agenda`)
        return response.data
    },
}

export default doctorService
