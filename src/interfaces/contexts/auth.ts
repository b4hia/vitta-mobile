export enum UserKeys {
    ID = "id",
    EMAIL = "email",
    FIRST_NAME = "first_name",
    LAST_NAME = "last_name",
    ROLES = "roles",
    ACTIVE_ROLE = "activeRole",
}

export interface IUser {
    [UserKeys.ID]: string
    [UserKeys.EMAIL]: string
    [UserKeys.FIRST_NAME]: string
    [UserKeys.LAST_NAME]: string
    [UserKeys.ROLES]: string[]
    [UserKeys.ACTIVE_ROLE]: string
}

export interface IAuthContext {
    isAuthenticated: boolean
    isAuthenticatedComplete: boolean
    user?: IUser | null
    loading: boolean
    login: (
        username: string,
        password: string,
        clientMetadata?:
            | {
                  [key: string]: string
              }
            | undefined
    ) => Promise<void | undefined>
    logout: () => Promise<void>
    getToken: () => Promise<string | null>
    confirmNewPassword: (newPassword: string, code: string) => Promise<void>
    setHasLoginStep: (value: React.SetStateAction<boolean>) => void
    onSendCode: (username: string) => Promise<void>
    onResetPassword: (cpfCnpj: string, code: string, newPassword: string) => Promise<boolean>
    switchRole: (newRoleKey: string) => Promise<void>
}
