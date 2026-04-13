import React, { createContext, useRef } from "react"
import { IChildrenProps } from "../interfaces/common"
import { ToastAndroid } from "react-native"
import { Loading as LoadingComponent } from "@/components/Loading"
import { ILoadingForwardHandles } from "@/interfaces/components/Loading"

interface Props {
    Loading: {
        show: (description?: React.ReactNode) => void
        hide: () => void
    }
    Toast: {
        show: (message: string, duration?: number, gravity?: number) => void
    }
}

const NotificationContext = createContext<Props | undefined>(undefined)

export function NotificationProvider({ children }: IChildrenProps) {
    const loadingRef = useRef<ILoadingForwardHandles>(null)
    const showLoading = (description?: React.ReactNode) => {
        loadingRef.current?.show(description)
    }
    const hideLoading = () => {
        loadingRef.current?.hide()
    }
    const showToast = (
        message: string,
        duration = ToastAndroid.LONG,
        gravity = ToastAndroid.BOTTOM
    ) => {
        ToastAndroid.showWithGravity(message, duration, gravity)
    }
    const values: Props = {
        Loading: {
            show: showLoading,
            hide: hideLoading,
        },
        Toast: {
            show: showToast,
        },
    }
    return (
        <NotificationContext.Provider value={values}>
            {children}
            <LoadingComponent ref={loadingRef} />
        </NotificationContext.Provider>
    )
}

export const useNotification = () => {
    const context = React.useContext(NotificationContext)
    if (!context) {
        throw new Error("useNotification must be used within a NotificationProvider")
    }
    return context
}
