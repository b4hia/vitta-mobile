import { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react"
import { IAuthContext as IBaseAuthContext, IUser, UserKeys } from "../interfaces/contexts/auth"
import { IChildrenProps } from "../interfaces/common"
import { useNotification } from "./notification"
import { SessionUser } from "@/utils/sessionUser"
import { AsyncStorageKeys, StorageUserSessionKeys } from "@/interfaces/storage"
import { ServiceVittaApi } from "@/services/api"
import { logTime } from "@/utils/Format/logTime"
import authService from "../services/authService"
import { LogTimeType, LogType } from "@/interfaces/utils/format"
import AsyncStorage from "@react-native-async-storage/async-storage"
import { logs } from "@/utils/Format/logs"
import { SystemRoles } from "@/constants/system"
import { responseError } from "@/utils/Format/responseError"
import * as LocalAuthentication from "expo-local-authentication"
import { jwtDecode } from "jwt-decode"
import { onAuthStateChanged } from "@react-native-firebase/auth"
import userService from "@/services/userService"
import auth from "@react-native-firebase/auth"

export interface IAuthContext extends IBaseAuthContext {
    activeRole: string | null
    switchRole: (role: string) => Promise<void>
    loginWithGoogle: (providerToken: string) => Promise<void>
    loginWithBiometrics: () => Promise<void>
    verifyUser: () => Promise<void>
}

export const AuthContext = createContext<IAuthContext>({} as IAuthContext)

export const AuthProvider = ({ children }: IChildrenProps) => {
    const { Toast, Loading } = useNotification()
    const [user, setUser] = useState<IUser | null>(null)
    const [loading, setLoading] = useState(true)
    const [hasLoginStep, setHasLoginStep] = useState(true)
    const [activeRole, setActiveRole] = useState<string | null>(null)
    const isAuthenticated = useMemo(() => !hasLoginStep && !!user, [user, hasLoginStep])
    const isAuthenticatedComplete = useMemo(() => !!user, [user])

    useEffect(() => {
        async function initializeAuth() {
            await loadLastSession()
            auth().onAuthStateChanged(async (firebaseUser) => {
                if (firebaseUser) {
                    try {
                        const token = await firebaseUser.getIdToken()
                        ServiceVittaApi.defaults.headers.common["Authorization"] = `Bearer ${token}`

                        const freshProfile = await userService.getProfile()
                        const storedActiveRole = await AsyncStorage.getItem(
                            AsyncStorageKeys.ACTIVE_ROLE
                        )
                        setUser(freshProfile as IUser)
                        setActiveRole(storedActiveRole)
                        await SessionUser.saveUser(freshProfile as IUser)
                    } catch (error) {
                        console.error("Erro ao restaurar sessão sincronizada:", error)
                    }
                } else {
                    setUser(null)
                    setHasLoginStep(true)
                }
                setLoading(false)
            })
        }

        initializeAuth()
    }, [])

    const onExpireSessionError = async (error: unknown) => {
        const errorMessage = responseError(error)
        if (errorMessage?.status === 401 || errorMessage?.status === 403) {
            Toast.show("Sua sessão expirou. Por favor, faça login novamente.")
            await onLogout()
        }
    }

    async function loadLastSession() {
        try {
            Loading.show("Consultando sessão anterior...")
            const storageInfo = await SessionUser.getUserSession()
            const storedActiveRole = await AsyncStorage.getItem(AsyncStorageKeys.ACTIVE_ROLE)
            if (storageInfo.session && storageInfo.user) {
                const isTokenExpired = SessionUser.isTokenExpired(
                    storageInfo.session[StorageUserSessionKeys.EXPIRATION_SESSION]
                )
                if (isTokenExpired) {
                    throw new Error("Sessão expirada")
                }
                ServiceVittaApi.defaults.headers.common["Authorization"] =
                    `Bearer ${storageInfo.session[StorageUserSessionKeys.ACCESS_TOKEN]}`

                setUser(storageInfo.user)
                setActiveRole(storedActiveRole)
                setHasLoginStep(false)
            }
        } catch (error) {
            await onLogout()
        } finally {
            setLoading(false)
            Loading.hide()
        }
    }

    const onLogout = useCallback(async () => {
        setUser(null)
        setActiveRole(null)
        setHasLoginStep(true)
        delete ServiceVittaApi.defaults.headers.common["Authorization"]
        await SessionUser.logout()
    }, [])

    const processLoginSuccess = async (response: any, username: string) => {
        const { idToken, user: userData } = response
        const decodedToken = jwtDecode<{ exp: number }>(idToken)
        const token = response.access_token || response.idToken || idToken
        ServiceVittaApi.defaults.headers.common["Authorization"] = `Bearer ${token}`
        const roles = userData.roles?.length > 0 ? userData.roles : [SystemRoles.CLIENT]
        const initialActiveRole = userData.activeRole || (roles.length > 0 ? roles[0] : null)

        await Promise.all([
            SessionUser.saveUser(userData),
            SessionUser.saveSession({
                [StorageUserSessionKeys.ACCESS_TOKEN]: token,
                [StorageUserSessionKeys.ID_TOKEN]: token,
                [StorageUserSessionKeys.ROLES]: userData.roles || [],
                [StorageUserSessionKeys.EXPIRATION_SESSION]: decodedToken.exp,
            }),
            AsyncStorage.setItem(AsyncStorageKeys.AUTH_CPF_CNPJ, username),
            initialActiveRole
                ? AsyncStorage.setItem(AsyncStorageKeys.ACTIVE_ROLE, initialActiveRole)
                : Promise.resolve(),
        ])
        setUser({ ...userData, roles })
        setActiveRole(initialActiveRole)
        setHasLoginStep(false)
    }

    const login = async (username: string, password: string) => {
        try {
            logTime(LogTimeType.START, login.name)
            Loading.show("Validando acesso...")
            // internetMiddleware()

            const responseData = await authService.login(username, password)
            await processLoginSuccess(responseData, username)

            logs(LogType.SUCCESS, `Response ${login.name}:`, responseData)
        } catch (error) {
            const errorMessage =
                responseError(error)?.message ||
                "Credenciais inválidas, verifique seu acesso e senha."
            Toast.show(errorMessage)
            logs(LogType.ERROR, `Error ${login.name}:`, errorMessage)
            await onExpireSessionError(error)
            throw error
        } finally {
            Loading.hide()
            logTime(LogTimeType.FINISH, login.name)
        }
    }

    const loginWithGoogle = async (providerToken: string) => {
        try {
            Loading.show("Validando conta Google...")
            const responseData = await authService.socialLogin(providerToken)
            await processLoginSuccess(responseData, responseData.user?.email || "Google User")
        } catch (error) {
            throw error
        } finally {
            Loading.hide()
        }
    }

    const loginWithBiometrics = async () => {
        try {
            const hasHardware = await LocalAuthentication.hasHardwareAsync()
            const isEnrolled = await LocalAuthentication.isEnrolledAsync()
            if (!hasHardware || !isEnrolled) {
                Toast.show("Biometria não disponível neste dispositivo.")
                return
            }
            const authResult = await LocalAuthentication.authenticateAsync({
                promptMessage: "Acesse o aplicativo",
                fallbackLabel: "Usar senha",
            })
            if (authResult.success) {
                await loadLastSession()
                if (!user) Toast.show("Nenhuma sessão salva. Faça login com senha primeiro.")
            } else {
                Toast.show("Autenticação cancelada.")
            }
        } catch (error) {
            Toast.show("Erro ao tentar ler biometria.")
        }
    }

    const switchRole = useCallback(async (role: string) => {
        await AsyncStorage.setItem(AsyncStorageKeys.ACTIVE_ROLE, role)
        setActiveRole(role)
        setUser((prev) => {
            if (!prev) return null
            return { ...prev, activeRole: role } as IUser
        })
    }, [])

    const logout = async () => {
        try {
            Loading.show("Saindo...")
            await authService.logout()
        } catch {
        } finally {
            await onLogout()
            Loading.hide()
        }
    }

    async function getToken() {
        const sessionInfo = await SessionUser.getUserSession()
        return sessionInfo?.session?.[StorageUserSessionKeys.ACCESS_TOKEN] || ""
    }

    async function onSendCode(email: string) {
        try {
            logTime(LogTimeType.START, onSendCode.name)
            Loading.show("Enviando solicitação...")
            await authService.resetPassword({ email })
            Toast.show("Verifique as instruções enviadas para o seu e-mail.")
        } catch (error) {
            Toast.show("Falha na solicitação. Verifique os dados e tente novamente.")
        } finally {
            Loading.hide()
            logTime(LogTimeType.FINISH, onSendCode.name)
        }
    }

    const verifyUser = async () => {
        try {
            const response = await authService.me()
            const freshUserData = response.user
            const userDataWithRole = {
                ...freshUserData,
                [UserKeys.ACTIVE_ROLE]: activeRole,
            } as IUser
            setUser(userDataWithRole)
            await SessionUser.saveUser(userDataWithRole)
            if (activeRole && !freshUserData.roles.includes(activeRole)) {
                setActiveRole(null)
                await AsyncStorage.removeItem(AsyncStorageKeys.ACTIVE_ROLE)
            }
        } catch (error) {
            await onLogout()
        }
    }

    const onResetPassword = async (newPassword: string, confirmationCode: string) => {
        try {
            await authService.resetPassword({
                new_password: newPassword,
                confirm_password: newPassword,
                token: confirmationCode,
            })
            return true
        } catch {
            return false
        }
    }

    const confirmNewPassword = async (newPassword: string, code: string) => {
        await authService.resetPassword({
            new_password: newPassword,
            confirm_password: newPassword,
            token: code,
        })
    }

    const value: IAuthContext = {
        isAuthenticated,
        isAuthenticatedComplete,
        activeRole,
        loading,
        user,
        switchRole,
        loginWithGoogle,
        loginWithBiometrics,
        login,
        logout,
        getToken,
        confirmNewPassword,
        verifyUser,
        onSendCode,
        setHasLoginStep,
        onResetPassword,
    }

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export const useAuth = () => {
    const context = useContext(AuthContext)
    if (!context) {
        throw new Error("AuthProvider hook can only be used inside of AuthProvider")
    }
    return context
}
