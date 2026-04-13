import { ConstantItemKey } from "../contexts/constants"

type BasicConstant<ConstantKeys extends string | number> = {
    [Key in ConstantKeys]: IConstantItem<Key>
}

export enum BasicConstantKeys {
    ID = "id",
    KEY = "key",
    NAME = "name",
    VALUE = "value",
}

export interface IBasicConstantProps {
    [BasicConstantKeys.ID]: string
    [BasicConstantKeys.KEY]: string
    [BasicConstantKeys.NAME]: string
    [BasicConstantKeys.VALUE]: string
}

export interface IConstantItem<T = string> {
    [BasicConstantKeys.ID]: string
    [BasicConstantKeys.KEY]?: T
    [BasicConstantKeys.NAME]?: string
    [BasicConstantKeys.VALUE]: string
}

// AgeRange constant expecify keys
export enum AgeRangeKeys {
    MINAGE = "min_age",
    MAXAGE = "max_age",
}
export interface IAgeRange {
    [BasicConstantKeys.ID]: string
    [BasicConstantKeys.NAME]: string
    [AgeRangeKeys.MINAGE]: number
    [AgeRangeKeys.MAXAGE]: number
}

export enum SystemConstantsKeys {
    SYSTEM_ROLES = "roles",
    CHRONIC_DISEASES = "chronicDiseases",
    MEDICAL_SPECIALTIES = "specialties",
    HEALTH_INSURANCE = "healthInsurances",
    HEALTH_INSURANCE_PLANS = "healthInsurancePlans",
    AGE_RANGES = "ageRanges",
    ENUMS = "enums",
    APK_ACTIONS = "apkActions",
}

export enum ApprovalTypeKeys {
    BECOME_DOCTOR = "BECOME_DOCTOR",
    REGISTER_CLINIC = "REGISTER_CLINIC",
}

export enum ApprovalStatusKeys {
    PENDING = "PENDING",
    APPROVED = "APPROVED",
    REJECTED = "REJECTED",
}

export interface IHealthInsurancePlan {
    [ConstantItemKey.id]: string
    [ConstantItemKey.value]: string
    name: string
    coverage: string
    active: boolean
}

export enum ApkActionMsgKeys {
    APK_NEW_TOKEN_REQUEST = "APK_NEW_TOKEN_REQUEST",
    APK_NEW_APPOINTMENT = "APK_NEW_APPOINTMENT",
    APK_NEW_FAVORITE = "APK_NEW_FAVORITE",
    APK_NEW_APPOINTMENT_FILE = "APK_APPOINTMENT_FILE",
    APK_NEW_NEWS = "APK_NEW_NEWS",
    APK_CANCEL_APPOINTMENT = "APK_CANCEL_APPOINTMENT",
    APK_REMOVE_FAVORITE = "APK_REMOVE_FAVORITE",
    APK_REMOVE_APPOINTMENT_FILE = "APK_REMOVE_APPOINTMENT_FILE",
}

export interface ISystemEnums {
    approvalTypes: ApprovalTypeKeys[]
    approvalStatus: ApprovalStatusKeys[]
}

export type TSystemRolesConstants = BasicConstant<string>
export type TChronicDiseasesConstants = BasicConstant<string>
export type TMedicalSpecialtiesConstants = BasicConstant<string>
export type THealthInsuranceConstants = BasicConstant<string>
export type TAgeFeesConstants = BasicConstant<string>
export type TAppointmentTypeConstants = BasicConstant<string>
export type TAppointmentStatusConstants = BasicConstant<string>
export type TApprovalTypeConstants = BasicConstant<string>
export type TApprovalStatusConstants = BasicConstant<string>

export interface IConstantsAllResponse {
    [SystemConstantsKeys.SYSTEM_ROLES]: IConstantItem[]
    [SystemConstantsKeys.CHRONIC_DISEASES]: IConstantItem[]
    [SystemConstantsKeys.MEDICAL_SPECIALTIES]: IConstantItem[]
    [SystemConstantsKeys.HEALTH_INSURANCE]: IConstantItem[]
    [SystemConstantsKeys.HEALTH_INSURANCE_PLANS]: IConstantItem[]
    [SystemConstantsKeys.AGE_RANGES]: IAgeRange[]
    [SystemConstantsKeys.ENUMS]: ISystemEnums
    [SystemConstantsKeys.APK_ACTIONS]?: IConstantItem<ApkActionMsgKeys>[]
}

export type TGetConstantsByNameParam =
    | TSystemRolesConstants
    | TChronicDiseasesConstants
    | TMedicalSpecialtiesConstants
    | THealthInsuranceConstants
    | TAgeFeesConstants
    | TAppointmentTypeConstants
    | TAppointmentStatusConstants
    | TApprovalTypeConstants
    | TApprovalStatusConstants

export type TGetConstantsByNameParamResponse<T extends TGetConstantsByNameParam> = T

export function transformToConstantObject<T extends string | number>(
    items: IConstantItem<any>[]
): BasicConstant<T> {
    return items.reduce((acc, item) => {
        const key = item.key as unknown as T
        acc[key] = item as IConstantItem<T>
        return acc
    }, {} as BasicConstant<T>)
}
