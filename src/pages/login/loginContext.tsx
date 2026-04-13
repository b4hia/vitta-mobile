import { createContext, PropsWithChildren, useContext, useState } from "react"
import { useAuth } from "../../contexts/auth"
import { GoogleSignin } from "@react-native-google-signin/google-signin"
import auth from "@react-native-firebase/auth"

interface ILoginContext {
    email: string
    setEmail: (email: string) => void
    password: string
    setPassword: (password: string) => void
    handleLogin: () => Promise<void>
    loginWithBiometrics: () => Promise<void>
    loginWithGoogle: (token: string) => Promise<void>
}

GoogleSignin.configure({
    webClientId: process.env.EXPO_PUBLIC_GOOGLE_WEB_CLIENT_ID,
})

const LoginContext = createContext<ILoginContext>({} as ILoginContext)

export const LoginProvider = ({ children }: PropsWithChildren<{}>) => {
    const { login, loginWithBiometrics, loginWithGoogle: apiLoginWithGoogle } = useAuth()

    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

    const handleLogin = async () => {
        if (!email || !password) return
        await login(email, password)
    }
    const loginWithGoogle = async () => {
        try {
            await GoogleSignin.hasPlayServices()
            const { data } = await GoogleSignin.signIn()
            const idToken = data?.idToken

            if (!idToken) return
            const googleCredential = auth.GoogleAuthProvider.credential(idToken)
            const userCredential = await auth().signInWithCredential(googleCredential)
            const firebaseToken = await userCredential.user.getIdToken()

            await apiLoginWithGoogle(firebaseToken)
        } catch (error: any) {
            // Erro 12501 significa que o usuário fechou a janelinha (não precisa de log de erro)
            if (error.code !== "12501") {
                console.error("Erro no Login Google:", error)
            }
        }
    }

    return (
        <LoginContext.Provider
            value={{
                email,
                setEmail,
                password,
                setPassword,
                handleLogin,
                loginWithBiometrics,
                loginWithGoogle,
            }}
        >
            {children}
        </LoginContext.Provider>
    )
}

export const useLoginContext = () => useContext(LoginContext)
