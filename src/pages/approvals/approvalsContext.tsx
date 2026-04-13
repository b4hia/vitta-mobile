import { createContext, useContext, useState, useCallback } from "react"
import { useNotification } from "@/contexts/notification"
import { IChildrenProps } from "@/interfaces/common"
import approvalService from "@/services/approvals"
import { IApprovalRequest, ApprovalStatus } from "@/interfaces/services/approvals"
import { useAuth } from "@/contexts/auth"

interface IApprovalsContext {
    approvals: IApprovalRequest[]
    loading: boolean
    refreshing: boolean
    fetchApprovals: (silent?: boolean) => Promise<void>
    handleReview: (
        approvalId: string,
        status: ApprovalStatus,
        rejectReason?: string
    ) => Promise<boolean>
}

const ApprovalsContext = createContext<IApprovalsContext>({} as IApprovalsContext)

export const ApprovalsProvider = ({ children }: IChildrenProps) => {
    const { Toast, Loading } = useNotification()
    const { getToken } = useAuth()

    const [approvals, setApprovals] = useState<IApprovalRequest[]>([])
    const [loading, setLoading] = useState(true)
    const [refreshing, setRefreshing] = useState(false)

    const fetchApprovals = useCallback(
        async (silent = false) => {
            try {
                if (!silent) setLoading(true)
                const token = await getToken()
                if (!token) return

                const data = await approvalService.getPendingApprovals(token)
                setApprovals(data)
            } catch (error) {
                console.error("Erro ao buscar aprovações:", error)
                Toast.show("Não foi possível carregar a lista de aprovações.")
            } finally {
                setLoading(false)
                setRefreshing(false)
            }
        },
        [getToken, Toast]
    )

    const handleReview = async (
        approvalId: string,
        status: ApprovalStatus,
        rejectReason?: string
    ) => {
        try {
            Loading.show("Processando solicitação...")
            const token = await getToken()
            if (!token) throw new Error("Token não encontrado")
            await approvalService.reviewApproval(approvalId, status, rejectReason, token)
            setApprovals((prev) => prev.filter((item) => item.id !== approvalId))

            Toast.show(
                status === ApprovalStatus.APPROVED
                    ? "Solicitação aprovada com sucesso!"
                    : "Solicitação rejeitada."
            )
            return true
        } catch (error) {
            console.error("Erro ao revisar aprovação:", error)
            Toast.show("Erro ao processar a solicitação.")
            return false
        } finally {
            Loading.hide()
        }
    }

    return (
        <ApprovalsContext.Provider
            value={{
                approvals,
                loading,
                refreshing,
                fetchApprovals,
                handleReview,
            }}
        >
            {children}
        </ApprovalsContext.Provider>
    )
}

export const useApprovalsContext = () => useContext(ApprovalsContext)
