import {
    PayloadClinicApprovalKeys,
    PayloadDoctorApprovalKeys,
} from "@/interfaces/services/approvals"

export interface IProfileFormPayload {
    // Doctor Payload
    [PayloadDoctorApprovalKeys.DOCUMENT_IDENTIFIER]: string
    [PayloadDoctorApprovalKeys.JUSTIFICATION]: string
    [PayloadDoctorApprovalKeys.IS_INDEPENDENT]: boolean
    [PayloadDoctorApprovalKeys.LINKED_CLINIC_CNPJ]: string
    [PayloadDoctorApprovalKeys.SPECIALTIES_IDS]: string[]

    // Clinic
    [PayloadClinicApprovalKeys.CORPORATE_NAME]: string
    [PayloadClinicApprovalKeys.CPF_CNPJ]: string
    [PayloadClinicApprovalKeys.EMAIL]: string
    [PayloadClinicApprovalKeys.PHONE]: string
    [PayloadClinicApprovalKeys.RESPONSIBLE_NAME]: string
    [PayloadClinicApprovalKeys.WORKING_DAYS]: number[]
    [PayloadClinicApprovalKeys.HEALTH_INSURANCE_IDS]: string[]
    [PayloadClinicApprovalKeys.ADDRESS_ZIP_CODE]: string
    [PayloadClinicApprovalKeys.ADDRESS_STREET]: string
    [PayloadClinicApprovalKeys.ADDRESS_NUMBER]: string
    [PayloadClinicApprovalKeys.ADDRESS_NEIGHBORHOOD]: string
    [PayloadClinicApprovalKeys.ADDRESS_CITY]: string
    [PayloadClinicApprovalKeys.ADDRESS_STATE]: string

    //UI control
    usePersonalAddress: boolean
    ui_start_time: Date
    ui_end_time: Date
}
