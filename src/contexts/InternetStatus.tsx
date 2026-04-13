import { createContext, useContext, useState, useEffect, useCallback, useRef } from "react"
import * as Network from "expo-network"
import { type EventSubscription } from "expo-modules-core"
// import { StatusBar } from "@/components/StatusBar"
import { IChildrenProps } from "@/interfaces/common"
import { useNotification } from "./notification"

interface Props {
    isInternetConnected: boolean
    internetMiddleware: () => void
}

const InternetStatusContext = createContext<Props | undefined>(undefined)

export const InternetStatusProvider = ({ children }: IChildrenProps) => {
    const networkStatusListener = useRef<EventSubscription | null>(null)
    const { Toast } = useNotification()
    const [isInternetConnected, setIsInternetConnected] = useState(true)

    useEffect(() => {
        onGetNetworkStatus()
        onStartNetworkListener()
        return () => {
            onCloseNetworkListener()
        }
    }, [])

    const onGetNetworkStatus = useCallback(async () => {
        const response = await Network.getNetworkStateAsync()
        const isInternetReachable = !!(response.isInternetReachable && response.isConnected)
        setIsInternetConnected(isInternetReachable)
    }, [])

    const onStartNetworkListener = useCallback(() => {
        networkStatusListener.current = Network.addNetworkStateListener(onGetNetworkStatus)
    }, [])

    const onCloseNetworkListener = useCallback(() => {
        if (networkStatusListener.current) {
            networkStatusListener.current.remove()
            networkStatusListener.current = null
        }
    }, [isInternetConnected])

    const internetMiddleware = useCallback(() => {
        if (!isInternetConnected) {
            Toast.show("Sem conexão com a internet, verifique sua conexão e tente novamente.")
            throw Error("Sem conexão com a internet.")
        }
    }, [isInternetConnected])

    const values: Props = {
        isInternetConnected,
        internetMiddleware,
    }

    return (
        <InternetStatusContext.Provider value={values}>
            {/* <StatusBar isInternetConnected={isInternetConnected} /> */}
            {children}
        </InternetStatusContext.Provider>
    )
}

export const useInternetStatus = () => {
    const context = useContext(InternetStatusContext)
    if (!context) {
        throw new Error("useInternetStatus hook can only be used inside of InternetStatusProvider")
    }
    return context
}
