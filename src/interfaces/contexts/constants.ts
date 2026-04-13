export enum ConstantItemKey {
    id = "id",
    key = "key",
    value = "value",
}
export interface IConstantItem {
    [ConstantItemKey.id]: string
    [ConstantItemKey.key]: string
    [ConstantItemKey.value]: string
}
export enum AgeRangeKey {
    id = "id",
    name = "name",
    min_age = "min_age",
    max_age = "max_age",
}

export enum DaysOfWeek {
    SUNDAY = 0,
    MONDAY = 1,
    TUESDAY = 2,
    WEDNESDAY = 3,
    THURSDAY = 4,
    FRIDAY = 5,
    SATURDAY = 6,
}

export interface IAgeRange {
    [AgeRangeKey.id]: string
    [AgeRangeKey.name]: string
    [AgeRangeKey.min_age]: number
    [AgeRangeKey.max_age]: number
}

export interface IAppConstants {
    roles: IConstantItem[]
    ageRanges: IAgeRange[]
    chronicDiseases: IConstantItem[]
    specialties: IConstantItem[]
    healthInsurances: IConstantItem[]
    enums: {
        approvalTypes: string[]
        approvalStatus: string[]
    }
}
