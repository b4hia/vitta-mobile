import { IUser } from "@/interfaces/contexts/auth"
import { AsyncStorageKeys, IStorageSession } from "@/interfaces/storage"
import AsyncStorage from "@react-native-async-storage/async-storage"
import * as SecureStore from "expo-secure-store"

export class SessionUser {
    private constructor() {}

    static async logout(): Promise<void> {
        try {
            await Promise.all([
                AsyncStorage.removeItem(AsyncStorageKeys.AUTH_USER),
                AsyncStorage.removeItem(AsyncStorageKeys.ACTIVE_ROLE),
                SecureStore.deleteItemAsync(AsyncStorageKeys.AUTH_SESSION),
            ])
        } catch (error) {
            throw error
        }
    }

    static async saveUser(user: IUser): Promise<void> {
        await AsyncStorage.setItem(AsyncStorageKeys.AUTH_USER, JSON.stringify(user))
    }

    static async saveSession(session: IStorageSession): Promise<void> {
        await SecureStore.setItemAsync(AsyncStorageKeys.AUTH_SESSION, JSON.stringify(session))
    }

    static async clearUser(): Promise<void> {
        await AsyncStorage.removeItem(AsyncStorageKeys.AUTH_USER)
    }

    static async getUser(): Promise<IUser | null> {
        try {
            const userString = await AsyncStorage.getItem(AsyncStorageKeys.AUTH_USER)
            if (userString) {
                return JSON.parse(userString)
            }
            return null
        } catch (error) {
            throw error
        }
    }

    static isTokenExpired(expirationSession?: number): boolean {
        if (!expirationSession) return true
        const expirationTime = expirationSession * 1000
        const currentTime = Date.now()
        return currentTime > expirationTime
    }

    static async storageUserSession(data: IStorageSession): Promise<void> {
        try {
            await AsyncStorage.setItem(AsyncStorageKeys.AUTH_SESSION, JSON.stringify(data))
        } catch (error) {
            throw error
        }
    }
    static async getUserSession() {
        try {
            const sessionData = await SecureStore.getItemAsync(AsyncStorageKeys.AUTH_SESSION)
            const userData = await AsyncStorage.getItem(AsyncStorageKeys.AUTH_USER)
            return {
                session: sessionData ? (JSON.parse(sessionData) as IStorageSession) : null,
                user: userData ? (JSON.parse(userData) as IUser) : null,
            }
        } catch (error) {
            throw error
        }
    }
}
