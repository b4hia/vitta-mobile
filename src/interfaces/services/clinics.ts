export enum ClinicsListResponseKeys {
    ID = "id",
    CORPORATE_NAME = "corporate_name",
    ACTIVE = "active",
    CPF_CNPJ = "cpf_cnpj",
    EMAIL = "email",
    PHONE = "phone",
    RESPONSIBLE_NAME = "responsible_name",
    ADDRESS_STREET = "address_street",
    ADDRESS_NUMBER = "address_number",
    ADDRESS_NEIGHBORHOOD = "address_neighborhood",
    ADDRESS_CITY = "address_city",
    ADDRESS_STATE = "address_state",
    ADDRESS_ZIP_CODE = "address_zip_code",
    ADDRESS_COMPLEMENT = "address_complement",
    ATTENDANCE_START_TIME = "attendance_start_time",
    ATTENDANCE_END_TIME = "attendance_end_time",
    WORKING_DAYS = "working_days",
    HEALTH_INSURANCE_IDS = "health_insurance_ids",
}

export interface IGetListClinicsRequest {
    [ClinicsListResponseKeys.ID]: string
    [ClinicsListResponseKeys.CORPORATE_NAME]: string
    [ClinicsListResponseKeys.ACTIVE]: boolean
    [ClinicsListResponseKeys.CPF_CNPJ]: string
    [ClinicsListResponseKeys.EMAIL]: string
    [ClinicsListResponseKeys.PHONE]: string
    [ClinicsListResponseKeys.RESPONSIBLE_NAME]: string
    [ClinicsListResponseKeys.ADDRESS_STREET]: string
    [ClinicsListResponseKeys.ADDRESS_NUMBER]: string
    [ClinicsListResponseKeys.ADDRESS_NEIGHBORHOOD]: string
    [ClinicsListResponseKeys.ADDRESS_CITY]: string
    [ClinicsListResponseKeys.ADDRESS_STATE]: string
    [ClinicsListResponseKeys.ADDRESS_ZIP_CODE]: string
    [ClinicsListResponseKeys.ADDRESS_COMPLEMENT]: string
    [ClinicsListResponseKeys.ATTENDANCE_START_TIME]: string
    [ClinicsListResponseKeys.ATTENDANCE_END_TIME]: string
    [ClinicsListResponseKeys.WORKING_DAYS]: number[]
    [ClinicsListResponseKeys.HEALTH_INSURANCE_IDS]: string[]
}
