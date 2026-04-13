import api from "./api"
import { ApprovalStatus } from "@/interfaces/services/approvals"

const approvalService = {
    requestDoctorApproval: async (formData: FormData, token: string) => {
        return api.post("/approvals/doctor", formData, {
            headers: {
                "Content-Type": "multipart/form-data",
                Authorization: `Bearer ${token}`,
            },
        })
    },

    requestClinicApproval: async (formData: FormData) => {
        return api.post("/approvals/clinic", formData, {
            headers: {
                "Content-Type": "multipart/form-data",
            },
        })
    },

    getPendingApprovals: async (token: string) => {
        const response = await api.get("/approvals/pending", {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        })
        return response.data
    },

    reviewApproval: async (
        approvalId: string,
        status: ApprovalStatus,
        rejectReason?: string,
        token?: string
    ) => {
        const payload = {
            status,
            reject_reason: rejectReason,
        }

        const response = await api.patch(`/approvals/${approvalId}/review`, payload, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        })

        return response.data
    },
}

export default approvalService
