import { IObjectKey } from "../common"

export enum GetAppointmentsKeys {
    ID = "id",
    CREATED_AT = "created_at",
    UPDATED_AT = "updated_at",
    SCHEDULED_AT = "scheduled_at",
    PROTOCOL_NUMBER = "protocol_number",
    FINISHED_AT = "finished_at",
    HEALTH_INSURANCE_ID = "health_insurance_id",
    PRICE = "appointment_price",
    PARENT_APPOINTMENT = "parent_appointment",
    PATIENT = "patient",
    CLINIC = "clinic",
    SPECIALTY_ID = "specialty_id",
    DOCTOR = "doctor",
    STATUS = "status",
    EXPECTATED_END_AT = "expected_end_at",
    DOCUMENTS = "documents",
}

export enum PostAppointmentKeys {
    ID = "id",
    PATIENT_ID = "patient_id",
    CLINIC_ID = "clinic_id",
    DOCTOR_ID = "doctor_id",
    SPECIALTY_ID = "specialty_id",
    APPOINTMENT_TYPE = "appointment_type",
    SCHEDULED_AT = "scheduled_at",
    HEALTH_INSURANCE_ID = "health_insurance_id",
    PARENT_APPOINTMENT_ID = "parent_appointment_id",
    DEPENDENT_ID = "dependent_id",
}

export enum GetClinicKeys {
    ID = "id",
    CORPORATE_NAME = "corporate_name",
    ADRESS_STREET = "address_street",
    ADRESS_NUMBER = "address_number",
    ADRESS_COMPLEMENT = "address_complement",
    ADRESS_NEIGHBORHOOD = "address_neighborhood",
    ADRESS_CITY = "address_city",
    ADRESS_STATE = "address_state",
    ADRESS_ZIP_CODE = "address_zip_code",
    EMAIL = "email",
    PHONE = "phone",
}

export enum GetDoctorKeys {
    ID = "id",
    CRM = "crm",
    FIRST_NAME = "first_name",
    LAST_NAME = "last_name",
    SPECIALTIES = "specialties",
}

export enum GetPatientKeys {
    ID = "id",
    FIRST_NAME = "first_name",
    LAST_NAME = "last_name",
    BIRTH_DATE = "birth_date",
    HEALTH_INSURANCE_ID = "health_insurance_id",
    PHONE = "phone",
    EMAIL = "email",
    CPF = "cpf",
    RG = "rg",
    GENDER = "gender",
}

export enum GetParentAppointmentKeys {
    ID = "id",
    CREATED_AT = "created_at",
    SCHEDULED_AT = "scheduled_at",
    PROTOCOL_NUMBER = "protocol_number",
    STATUS = "status",
    NEXT_STEP_SUGGESTION = "next_step_suggestion",
    PRICE = "appointment_price",
    DOCTOR = "doctor",
    CLINIC = "clinic",
}

export enum AppointmentDocumentKeys {
    ID = "id",
    APPOINTMENT_ID = "appointment_id",
    FILE_NAME = "file_name",
    FILE_URL = "file_url",
    DOCUMENT_TYPE = "document_type",
    UPLOADED_AT = "uploaded_at",
    FILE = "file",
}

export interface IGetClinicResponse {
    [GetClinicKeys.ID]: string
    [GetClinicKeys.CORPORATE_NAME]: string
    [GetClinicKeys.ADRESS_STREET]: string
    [GetClinicKeys.ADRESS_NUMBER]: string
    [GetClinicKeys.ADRESS_COMPLEMENT]: string
    [GetClinicKeys.ADRESS_NEIGHBORHOOD]: string
    [GetClinicKeys.ADRESS_CITY]: string
    [GetClinicKeys.ADRESS_STATE]: string
    [GetClinicKeys.ADRESS_ZIP_CODE]: string
    [GetClinicKeys.EMAIL]: string
    [GetClinicKeys.PHONE]: string
}

export interface IGetDoctorResponse {
    [GetDoctorKeys.ID]: string
    [GetDoctorKeys.CRM]: string
    [GetDoctorKeys.FIRST_NAME]: string
    [GetDoctorKeys.LAST_NAME]: string
    [GetDoctorKeys.SPECIALTIES]: string[]
}

export interface IGetPatientResponse {
    [GetPatientKeys.ID]: string
    [GetPatientKeys.FIRST_NAME]: string
    [GetPatientKeys.LAST_NAME]: string
    [GetPatientKeys.BIRTH_DATE]: Date
    [GetPatientKeys.HEALTH_INSURANCE_ID]: string
    [GetPatientKeys.PHONE]: string
    [GetPatientKeys.EMAIL]: string
    [GetPatientKeys.CPF]: string
    [GetPatientKeys.RG]?: string | null
    [GetPatientKeys.GENDER]: "MALE" | "FEMALE"
}

export interface IGetAppointmentDocumentResponse {
    [AppointmentDocumentKeys.ID]: string
    [AppointmentDocumentKeys.APPOINTMENT_ID]: string
    [AppointmentDocumentKeys.FILE_NAME]: string
    [AppointmentDocumentKeys.FILE_URL]: string
    [AppointmentDocumentKeys.DOCUMENT_TYPE]: string
    [AppointmentDocumentKeys.UPLOADED_AT]: Date
}

export interface IGetParentAppointmentResponse {
    [GetParentAppointmentKeys.ID]: string
    [GetParentAppointmentKeys.CREATED_AT]: Date
    [GetParentAppointmentKeys.SCHEDULED_AT]: Date
    [GetParentAppointmentKeys.PROTOCOL_NUMBER]: string
    [GetParentAppointmentKeys.STATUS]: string
    [GetParentAppointmentKeys.NEXT_STEP_SUGGESTION]: string
    [GetParentAppointmentKeys.PRICE]: number
    [GetParentAppointmentKeys.DOCTOR]: IGetDoctorResponse
    [GetParentAppointmentKeys.CLINIC]: IGetClinicResponse
}

export interface IGetAppointmentsResponse {
    [GetAppointmentsKeys.ID]: string
    [GetAppointmentsKeys.SCHEDULED_AT]: Date
    [GetAppointmentsKeys.PATIENT]: {
        [GetPatientKeys.ID]: string
    }
    [GetAppointmentsKeys.STATUS]: string
    [GetAppointmentsKeys.SPECIALTY_ID]: string
    [GetAppointmentsKeys.PRICE]: number
    [GetAppointmentsKeys.DOCTOR]: {
        [GetDoctorKeys.ID]: string
        [GetDoctorKeys.FIRST_NAME]: string
        [GetDoctorKeys.LAST_NAME]: string
    }
    [GetAppointmentsKeys.EXPECTATED_END_AT]?: Date
}

export interface IGetAppointmentByProtocolNumberParams {
    [GetAppointmentsKeys.PROTOCOL_NUMBER]: string
}

export interface IGetAppointmentByIdParam {
    [GetAppointmentsKeys.ID]: string
}

export interface IGetAppointmentDetailResponse {
    [GetAppointmentsKeys.ID]: string
    [GetAppointmentsKeys.CREATED_AT]: Date
    [GetAppointmentsKeys.UPDATED_AT]: Date
    [GetAppointmentsKeys.SCHEDULED_AT]: Date
    [GetAppointmentsKeys.PROTOCOL_NUMBER]: string
    [GetAppointmentsKeys.FINISHED_AT]: Date | null
    [GetAppointmentsKeys.HEALTH_INSURANCE_ID]: string
    [GetAppointmentsKeys.PRICE]: number
    [GetAppointmentsKeys.PARENT_APPOINTMENT]: IGetParentAppointmentResponse | null
    [GetAppointmentsKeys.PATIENT]: IGetPatientResponse
    [GetAppointmentsKeys.DOCTOR]: IGetDoctorResponse
    [GetAppointmentsKeys.CLINIC]: IGetClinicResponse
    [GetAppointmentsKeys.SPECIALTY_ID]: string
    [GetAppointmentsKeys.STATUS]: string
    [GetAppointmentsKeys.EXPECTATED_END_AT]: Date
    [GetAppointmentsKeys.DOCUMENTS]?: IGetAppointmentDocumentResponse[]
}

export interface IPosAppointmentParams {
    [PostAppointmentKeys.PATIENT_ID]: string
    [PostAppointmentKeys.CLINIC_ID]: string
    [PostAppointmentKeys.DOCTOR_ID]: string
    [PostAppointmentKeys.SPECIALTY_ID]: string
    [PostAppointmentKeys.APPOINTMENT_TYPE]: string
    [PostAppointmentKeys.SCHEDULED_AT]: Date
    [PostAppointmentKeys.HEALTH_INSURANCE_ID]: string
    [PostAppointmentKeys.PARENT_APPOINTMENT_ID]?: string | null
    [PostAppointmentKeys.DEPENDENT_ID]?: string | null
}

export interface IPostAppointmentDocumentParams {
    [AppointmentDocumentKeys.APPOINTMENT_ID]: string
    [AppointmentDocumentKeys.DOCUMENT_TYPE]: string
    [AppointmentDocumentKeys.FILE]: {
        uri: string
        name: string
        type: string
    }
}

export interface IPatchAppointmentParams {
    [PostAppointmentKeys.ID]: string
    [PostAppointmentKeys.DOCTOR_ID]?: string
    [PostAppointmentKeys.HEALTH_INSURANCE_ID]?: string
    [PostAppointmentKeys.SCHEDULED_AT]?: Date
    [PostAppointmentKeys.DEPENDENT_ID]?: string | null
    [PostAppointmentKeys.PARENT_APPOINTMENT_ID]?: string | null
}

export type TGetAppointmentsResponse = IObjectKey<TAppointments>
export type TAppointments = IObjectKey<IGetAppointmentDetailResponse>
