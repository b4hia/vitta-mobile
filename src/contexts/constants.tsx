import { createContext, useContext, useEffect, useState } from "react"
import { IChildrenProps } from "@/interfaces/common"
import { IConstantsAllResponse } from "@/interfaces/services/constants"
import { appService } from "@/services/app"
import AsyncStorage from "@react-native-async-storage/async-storage"

const CONSTANTS_STORAGE_KEY = "@vitta_app_constants"

interface IAppConstantsContext {
    constants: IConstantsAllResponse | null
    loadingConstants: boolean
}

const AppConstantsContext = createContext<IAppConstantsContext>({} as IAppConstantsContext)

export const AppConstantsProvider = ({ children }: IChildrenProps) => {
    const [constants, setConstants] = useState<IConstantsAllResponse | null>(null)
    const [loadingConstants, setLoadingConstants] = useState(true)

    useEffect(() => {
        loadConstants()
    }, [])

    async function loadConstants() {
        try {
            const cachedConstants = await AsyncStorage.getItem(CONSTANTS_STORAGE_KEY)
            if (cachedConstants) {
                setConstants(JSON.parse(cachedConstants))
                setLoadingConstants(false)
                return // ← cache found: skip API call entirely
            }
            // Only reaches here on first app launch (no cache)
            const freshConstants = await appService.getConstants()
            setConstants(freshConstants)
            await AsyncStorage.setItem(CONSTANTS_STORAGE_KEY, JSON.stringify(freshConstants))
        } catch (error) {
            console.error("Erro ao carregar constantes", error)
        } finally {
            setLoadingConstants(false)
        }
    }

    return (
        <AppConstantsContext.Provider value={{ constants, loadingConstants }}>
            {children}
        </AppConstantsContext.Provider>
    )
}

export const useAppConstants = () => useContext(AppConstantsContext)
