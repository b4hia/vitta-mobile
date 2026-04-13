import api from "./api"

export interface Appointment {
    id: string
    patient_id: string
    clinic_id: string
    doctor_id: string
    specialty_id: string
    appointment_type: string
    scheduled_at: string
    status?: string
    protocol_number?: string
    health_insurance_plan_id?: string
    clinic?: { id: string; name: string }
    doctor?: { id: string; name: string }
    specialty?: { id: string; name: string }
}

export interface CreateAppointmentDto {
    patient_id: string
    clinic_id: string
    doctor_id: string
    specialty_id: string
    appointment_type: string
    scheduled_at: string
    health_insurance_plan_id?: string
}

const appointmentService = {
    async createAppointment(dto: CreateAppointmentDto): Promise<Appointment> {
        const response = await api.post<Appointment>("/appointments", dto)
        return response.data
    },

    async getAppointment(id: string): Promise<Appointment> {
        const response = await api.get<Appointment>(`/appointments/${id}`)
        return response.data
    },

    async getAppointmentByProtocol(protocolNumber: string): Promise<Appointment> {
        const response = await api.get<Appointment>(`/appointments/protocol/${protocolNumber}`)
        return response.data
    },

    async cancelAppointment(id: string, reason: string): Promise<void> {
        await api.patch(`/appointments/${id}/cancel`, { reason })
    },

    async rescheduleAppointment(id: string, newDate: string, reason: string): Promise<void> {
        await api.patch(`/appointments/${id}/reschedule`, { newDate, reason })
    },

    async getMyAppointments(): Promise<Appointment[]> {
        const response = await api.get<Appointment[]>("/appointments")
        return response.data
    },
}

export default appointmentService
