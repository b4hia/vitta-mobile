export enum TaskKeys {
    QUEU = "queu",
}

export enum AsyncStorageKeys {
    AUTH_SESSION = "auth_session",
    AUTH_USER = "auth_user",
    AUTH_CPF_CNPJ = "auth_cpf_cnpj",
    ACTIVE_ROLE = "active_role",
}

export enum StorageUserSessionKeys {
    ID_TOKEN = "idToken",
    ROLES = "roles",
    REFRESH_TOKEN = "refreshToken",
    ACCESS_TOKEN = "accessToken",
    EXPIRATION_SESSION = "expirationSession",
}

export interface IStorageSession {
    [StorageUserSessionKeys.ID_TOKEN]: string
    [StorageUserSessionKeys.ROLES]: string[]
    [StorageUserSessionKeys.REFRESH_TOKEN]?: string
    [StorageUserSessionKeys.ACCESS_TOKEN]: string
    [StorageUserSessionKeys.EXPIRATION_SESSION]?: number
}
