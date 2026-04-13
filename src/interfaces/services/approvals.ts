import { ApprovalTypeKeys } from "./constants"

export enum PostAprrovalKeys {
    TYPE = "type",
    PAYLOAD = "payload",
    EVIDENCES = "evidences",
}

export enum PayloadDoctorApprovalKeys {
    FULL_NAME = "full_name",
    CPF_CNPJ = "cpf_cnpj",
    JUSTIFICATION = "justification",
    DOCUMENT_IDENTIFIER = "document_identifier",
    IS_INDEPENDENT = "is_independent",
    LINKED_CLINIC_CNPJ = "linked_clinic_cnpj",
    SPECIALTIES_IDS = "specialties_ids",
    CLINIC_DATA = "clinic_data",
}

export enum PayloadClinicApprovalKeys {
    CORPORATE_NAME = "corporate_name",
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

export enum ApprovalType {
    BECOME_DOCTOR = ApprovalTypeKeys.BECOME_DOCTOR,
    REGISTER_CLINIC = ApprovalTypeKeys.REGISTER_CLINIC,
}

export enum ApprovalRequesterKeys {
    ID = "id",
    FIRST_NAME = "first_name",
    LAST_NAME = "last_name",
    EMAIL = "email",
    CPF_CNPJ = "cpf_cnpj",
    PHONE = "phone",
}

export enum ApprovalResponseKeys {
    ID = "id",
    TYPE = "type",
    STATUS = "status",
    PAYLOAD = "payload",
    EVIDENCE_URLS = "evidenceUrls",
    CREATED_AT = "created_at",
    REQUESTER = "requester",
}

export enum PatchReviewApprovalKeys {
    ID = "id",
    STATUS = "status",
    REJECT_REASON = "reject_reason",
}

export enum ApprovalStatus {
    PENDING = "PENDING",
    APPROVED = "APPROVED",
    REJECTED = "REJECTED",
}

export interface IApprovalRequest {
    [ApprovalResponseKeys.ID]: string
    [ApprovalResponseKeys.TYPE]: ApprovalType
    [ApprovalResponseKeys.STATUS]: ApprovalStatus
    [ApprovalResponseKeys.PAYLOAD]: PayloadDoctorApproval | PayloadClinicApproval
    [ApprovalResponseKeys.EVIDENCE_URLS]: string[]
    [ApprovalResponseKeys.CREATED_AT]: string
    [ApprovalResponseKeys.REQUESTER]?: {
        [ApprovalRequesterKeys.ID]: string
        [ApprovalRequesterKeys.FIRST_NAME]: string
        [ApprovalRequesterKeys.LAST_NAME]: string
        [ApprovalRequesterKeys.EMAIL]: string
        [ApprovalRequesterKeys.CPF_CNPJ]: string
        [ApprovalRequesterKeys.PHONE]: string
    }
}

export interface IPostApprovalParams {
    [PostAprrovalKeys.TYPE]: ApprovalType
    [PostAprrovalKeys.PAYLOAD]: PayloadDoctorApproval | PayloadClinicApproval
    [PostAprrovalKeys.EVIDENCES]: string[]
}

export interface PayloadDoctorApproval {
    [PayloadDoctorApprovalKeys.FULL_NAME]: string
    [PayloadDoctorApprovalKeys.CPF_CNPJ]: string
    [PayloadDoctorApprovalKeys.JUSTIFICATION]: string
    [PayloadDoctorApprovalKeys.DOCUMENT_IDENTIFIER]: string
    [PayloadDoctorApprovalKeys.SPECIALTIES_IDS]: string[]
    [PayloadDoctorApprovalKeys.IS_INDEPENDENT]: boolean
    [PayloadDoctorApprovalKeys.LINKED_CLINIC_CNPJ]?: string
    [PayloadDoctorApprovalKeys.CLINIC_DATA]?: PayloadClinicApproval
}

export interface PayloadClinicApproval {
    [PayloadClinicApprovalKeys.CORPORATE_NAME]: string
    [PayloadClinicApprovalKeys.CPF_CNPJ]: string
    [PayloadClinicApprovalKeys.EMAIL]: string
    [PayloadClinicApprovalKeys.PHONE]: string
    [PayloadClinicApprovalKeys.RESPONSIBLE_NAME]: string
    [PayloadClinicApprovalKeys.ADDRESS_STREET]: string
    [PayloadClinicApprovalKeys.ADDRESS_NUMBER]: string
    [PayloadClinicApprovalKeys.ADDRESS_NEIGHBORHOOD]: string
    [PayloadClinicApprovalKeys.ADDRESS_CITY]: string
    [PayloadClinicApprovalKeys.ADDRESS_STATE]: string
    [PayloadClinicApprovalKeys.ADDRESS_ZIP_CODE]: string
    [PayloadClinicApprovalKeys.ADDRESS_COMPLEMENT]: string
    [PayloadClinicApprovalKeys.ATTENDANCE_START_TIME]: string
    [PayloadClinicApprovalKeys.ATTENDANCE_END_TIME]: string
    [PayloadClinicApprovalKeys.WORKING_DAYS]: number[] // dias da semana como números (0-6)
    [PayloadClinicApprovalKeys.HEALTH_INSURANCE_IDS]: string[]
}
