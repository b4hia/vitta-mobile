export enum PostLoginParams {
    EMAIL = "email",
    PASSWORD = "password",
}

export enum PostResetPasswordParams {
    CPF_CNPJ = "cpf_cnpj",
    EMAIL = "email",
    NEW_PASSWORD = "new_password",
    CONFIRM_PASSWORD = "confirm_password",
    TOKEN = "token",
}

export enum PostRefreshToken {
    REFRESH_TOKEN = "refresh_token",
}

export enum PostSocialLoginParams {
    PROVIDER_TOKEN = "provider_token",
    PROVIDER = "provider",
}

export enum AuthResponseKeys {
    ACCESS_TOKEN = "access_token",
    REFRESH_TOKEN = "refresh_token",
    EXPIRES_IN = "expires_in",
    ROLES = "roles",
}

export enum SignupParamsUserKeys {
    FIRST_NAME = "first_name",
    LAST_NAME = "last_name",
    CPF_CNPJ = "cpf_cnpj",
    EMAIL = "email",
    PHONE = "phone",
    BIRTHDAY = "birthday",
    PASSWORD = "password",
    ADDRESS_STREET = "address_street",
    ADDRESS_NUMBER = "address_number",
    ADDRESS_COMPLEMENT = "address_complement",
    ADDRESS_NEIGHBORHOOD = "address_neighborhood",
    ADDRESS_CITY = "address_city",
    ADDRESS_STATE = "address_state",
    ADDRESS_ZIP_CODE = "address_zip_code",
    // GENDER = "gender",
    // ROLE = "role",
    // HEALTH_PLAN = "health_plan",
    // CHRONIC_DISEASE_ID = "chronic_diseases_id",
    HEALTH_PLAN = "healthPlan",
    CHRONIC_DISEASE_IDS = "chronicDiseaseIds",
}

export enum HealthPlanKeys {
    PLAN_ID = "planId",
    DEPENDENTS = "dependents",
    CONTRACT_NUMBER = "contractNumber",
}

export enum DependentKeys {
    ID = "id",
    NAME = "name",
    CPF = "cpf",
    BIRTH_DATE = "birthday",
}

export interface IPostLoginParams {
    [PostLoginParams.EMAIL]: string
    [PostLoginParams.PASSWORD]: string
}

export interface IPostRefreshToken {
    [PostRefreshToken.REFRESH_TOKEN]: string
}

export interface IPostSocialLoginParams {
    [PostSocialLoginParams.PROVIDER_TOKEN]: string
    [PostSocialLoginParams.PROVIDER]: "GOOGLE" | "APPLE"
}

export interface IForgotPasswordParams {
    [PostResetPasswordParams.CPF_CNPJ]: string
}

export interface IForgotPasswordResponse {
    [PostResetPasswordParams.EMAIL]: string
}

export interface IResetPasswordParams {
    [PostResetPasswordParams.TOKEN]: string
    [PostResetPasswordParams.NEW_PASSWORD]: string
    [PostResetPasswordParams.CONFIRM_PASSWORD]: string
}

export interface IDependentsKeys {
    [DependentKeys.ID]: string
    [DependentKeys.NAME]: string
    [DependentKeys.CPF]: string
    [DependentKeys.BIRTH_DATE]: Date
}

export interface IHealthPlanKeys {
    [HealthPlanKeys.PLAN_ID]: string
    [HealthPlanKeys.DEPENDENTS]: IDependentsKeys[]
    [HealthPlanKeys.CONTRACT_NUMBER]: string
}

export interface ISignupParamsUser {
    [SignupParamsUserKeys.FIRST_NAME]: string
    [SignupParamsUserKeys.LAST_NAME]: string
    [SignupParamsUserKeys.CPF_CNPJ]: string
    [SignupParamsUserKeys.EMAIL]: string
    [SignupParamsUserKeys.PHONE]: string
    [SignupParamsUserKeys.BIRTHDAY]: Date
    [SignupParamsUserKeys.PASSWORD]: string
    [SignupParamsUserKeys.ADDRESS_STREET]: string
    [SignupParamsUserKeys.ADDRESS_NUMBER]: string
    [SignupParamsUserKeys.ADDRESS_COMPLEMENT]: string
    [SignupParamsUserKeys.ADDRESS_NEIGHBORHOOD]: string
    [SignupParamsUserKeys.ADDRESS_CITY]: string
    [SignupParamsUserKeys.ADDRESS_STATE]: string
    [SignupParamsUserKeys.ADDRESS_ZIP_CODE]: string
    [SignupParamsUserKeys.HEALTH_PLAN]: IHealthPlanKeys | null
    [SignupParamsUserKeys.CHRONIC_DISEASE_IDS]: string[] | null
}

export interface IAuthResponse {
    [AuthResponseKeys.ACCESS_TOKEN]: string
    [AuthResponseKeys.REFRESH_TOKEN]: string
    [AuthResponseKeys.EXPIRES_IN]?: number
    [AuthResponseKeys.ROLES]?: string[]
}
