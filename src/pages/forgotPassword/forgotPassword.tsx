import { useAuth } from "@/contexts/auth"
import { createContext, PropsWithChildren, useContext, useState } from "react"

interface IForgotPasswordContext {
    document: string
    setDocument: (document: string) => void
    handleSendCode: () => Promise<boolean>
}

const ForgotPasswordContext = createContext<IForgotPasswordContext>({} as IForgotPasswordContext)

export const ForgotPasswordProvider = ({ children }: PropsWithChildren<{}>) => {
    const { onSendCode } = useAuth()
    const [document, setDocument] = useState("")

    const handleSendCode = async () => {
        if (!document) return false
        await onSendCode(document)
        return true
    }

    return (
        <ForgotPasswordContext.Provider value={{ document, setDocument, handleSendCode }}>
            {children}
        </ForgotPasswordContext.Provider>
    )
}

export const useForgotPasswordContext = () => useContext(ForgotPasswordContext)
