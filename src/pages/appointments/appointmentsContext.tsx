import { createContext, useContext, useState, useCallback, useMemo } from "react"
import { useNotification } from "@/contexts/notification"
import { IChildrenProps } from "@/interfaces/common"
import { useAuth } from "@/contexts/auth"
import clinicService from "@/services/clinicService"
import { IGetListClinicsRequest } from "@/interfaces/services/clinics"
import { useAppConstants } from "@/contexts/constants"
import { SystemConstantsKeys } from "@/interfaces/services/constants"

export interface ISpecialty {
    id: string
    key: string
    value: string
}

interface IScheduleContext {
    clinics: IGetListClinicsRequest[]
    specialties: ISpecialty[]
    agenda: any
    loading: boolean
    fetchClinics: () => Promise<void>
    fetchAgenda: (clinicId: string, date: string) => Promise<void>
    clearAgenda: () => void
}

const ScheduleContext = createContext<IScheduleContext>({} as IScheduleContext)

export const ScheduleProvider = ({ children }: IChildrenProps) => {
    const { Toast, Loading } = useNotification()
    const { getToken } = useAuth()
    const { constants } = useAppConstants()
    const [clinics, setClinics] = useState<IGetListClinicsRequest[]>([])
    const [agenda, setAgenda] = useState<any>(null)
    const [loading, setLoading] = useState(false)
    const specialties = useMemo<ISpecialty[]>(() => {
        return (constants?.[SystemConstantsKeys.MEDICAL_SPECIALTIES] || []).map((item) => ({
            id: item.id,
            key: item.key ?? "",
            value: item.value,
        }))
    }, [constants])

    const fetchClinics = useCallback(async () => {
        try {
            setLoading(true)
            const data = await clinicService.getClinics()
            setClinics(data)
        } catch (error) {
            console.error("Erro ao buscar clínicas:", error)
            Toast.show("Não foi possível carregar as clínicas.")
        } finally {
            setLoading(false)
        }
    }, [Toast])

    const fetchAgenda = useCallback(
        async (clinicId: string, date: string) => {
            try {
                Loading.show("Buscando horários disponíveis...")
                const token = await getToken()
                if (!token) return

                const data = await clinicService.getClinicAgenda(clinicId, date)
                setAgenda(data)
            } catch (error) {
                console.error("Erro ao buscar agenda:", error)
                Toast.show("Não foi possível buscar a agenda para esta data.")
                setAgenda(null)
            } finally {
                Loading.hide()
            }
        },
        [getToken, Toast, Loading]
    )

    const clearAgenda = useCallback(() => setAgenda(null), [])

    return (
        <ScheduleContext.Provider
            value={{
                clinics,
                specialties,
                agenda,
                loading,
                fetchClinics,
                fetchAgenda,
                clearAgenda,
            }}
        >
            {children}
        </ScheduleContext.Provider>
    )
}

export const useScheduleContext = () => useContext(ScheduleContext)
