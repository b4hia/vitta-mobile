import { createContext, useContext, useState } from "react"
import { ISignupParamsUser, SignupParamsUserKeys } from "@/interfaces/services/auth"
import { useNotification } from "@/contexts/notification"
import { IChildrenProps } from "@/interfaces/common"
import authService from "@/services/authService"
import { SignupStepKeys } from "@/interfaces/pages/login"
import approvalService from "@/services/approvals"

interface ICadastroContext {
    formData: ISignupParamsUser
    updateField: <K extends SignupParamsUserKeys>(field: K, value: ISignupParamsUser[K]) => void
    handleRegister: (approvalDataOverride?: any) => Promise<boolean>
    loading: boolean
    currentStep: SignupStepKeys
    highestStep: number
    nextStep: () => void
    prevStep: () => void
    goToStep: (step: SignupStepKeys) => void
    setApprovalData: (data: any) => void
}

const CadastroContext = createContext<ICadastroContext>({} as ICadastroContext)

export const CadastroProvider = ({ children }: IChildrenProps) => {
    const { Toast, Loading } = useNotification()
    const [loading, setLoading] = useState(false)
    const [currentStep, setCurrentStep] = useState<SignupStepKeys>(SignupStepKeys.PERSONAL_DATA)
    const [highestStep, setHighestStep] = useState<number>(SignupStepKeys.PERSONAL_DATA)
    const [approvalData, setApprovalData] = useState<any>(null)
    const eighteenYearsAgo = new Date()
    eighteenYearsAgo.setFullYear(eighteenYearsAgo.getFullYear() - 18)

    const [formData, setFormData] = useState<ISignupParamsUser>({
        [SignupParamsUserKeys.FIRST_NAME]: "",
        [SignupParamsUserKeys.LAST_NAME]: "",
        [SignupParamsUserKeys.CPF_CNPJ]: "",
        [SignupParamsUserKeys.EMAIL]: "",
        [SignupParamsUserKeys.PHONE]: "",
        [SignupParamsUserKeys.BIRTHDAY]: eighteenYearsAgo,
        [SignupParamsUserKeys.PASSWORD]: "",
        [SignupParamsUserKeys.ADDRESS_STREET]: "",
        [SignupParamsUserKeys.ADDRESS_NUMBER]: "",
        [SignupParamsUserKeys.ADDRESS_COMPLEMENT]: "",
        [SignupParamsUserKeys.ADDRESS_NEIGHBORHOOD]: "",
        [SignupParamsUserKeys.ADDRESS_CITY]: "",
        [SignupParamsUserKeys.ADDRESS_STATE]: "",
        [SignupParamsUserKeys.ADDRESS_ZIP_CODE]: "",
        [SignupParamsUserKeys.HEALTH_PLAN]: null,
        [SignupParamsUserKeys.CHRONIC_DISEASE_IDS]: [],
    } as ISignupParamsUser)

    const updateField = <K extends SignupParamsUserKeys>(field: K, value: ISignupParamsUser[K]) => {
        setFormData((prev) => ({ ...prev, [field]: value }))
    }

    const nextStep = () => {
        setCurrentStep((prev) => {
            const next = prev + 1
            if (next > highestStep) {
                setHighestStep(next)
            }
            return next
        })
    }

    const prevStep = () => {
        setCurrentStep((prev) => prev - 1)
    }

    const goToStep = (step: SignupStepKeys) => {
        setCurrentStep(step)
    }

    const handleRegister = async (approvalDataOverride?: any) => {
        try {
            setLoading(true)
            Loading.show("Criando sua conta...")
            const finalApprovalData = approvalDataOverride || approvalData
            const payloadToApi: any = { ...formData }
            if (payloadToApi[SignupParamsUserKeys.BIRTHDAY] instanceof Date) {
                payloadToApi[SignupParamsUserKeys.BIRTHDAY] =
                    payloadToApi[SignupParamsUserKeys.BIRTHDAY].toISOString()
            }
            if (
                !payloadToApi[SignupParamsUserKeys.CHRONIC_DISEASE_IDS] ||
                payloadToApi[SignupParamsUserKeys.CHRONIC_DISEASE_IDS].length === 0
            ) {
                delete payloadToApi[SignupParamsUserKeys.CHRONIC_DISEASE_IDS]
            }

            if (!payloadToApi[SignupParamsUserKeys.HEALTH_PLAN]) {
                delete payloadToApi[SignupParamsUserKeys.HEALTH_PLAN]
            }
            await authService.register(payloadToApi)
            if (finalApprovalData && finalApprovalData.profile !== "CLIENT") {
                const { access_token } = await authService.login(
                    formData[SignupParamsUserKeys.EMAIL] as string,
                    formData[SignupParamsUserKeys.PASSWORD] as string
                )

                const form = new FormData()
                if (finalApprovalData.files && finalApprovalData.files.length > 0) {
                    finalApprovalData.files.forEach((file: any) => {
                        form.append("evidences", {
                            uri: file.uri,
                            name: file.name,
                            type: file.mimeType || "application/pdf",
                        } as any)
                    })
                }

                if (finalApprovalData.profile === "CLINIC_DOCTOR") {
                    const doctorPayload: any = {
                        full_name:
                            `${formData[SignupParamsUserKeys.FIRST_NAME]} ${formData[SignupParamsUserKeys.LAST_NAME]}`.trim(),
                        cpf_cnpj: formData[SignupParamsUserKeys.CPF_CNPJ],
                        document_identifier: finalApprovalData.extraData.document_identifier,
                        justification: finalApprovalData.extraData.justification,
                        is_independent: finalApprovalData.extraData.is_independent,
                        specialties_ids: finalApprovalData.extraData.specialties_ids,
                    }

                    if (finalApprovalData.extraData.is_independent) {
                        const addressStreet = finalApprovalData.extraData.usePersonalAddress
                            ? formData[SignupParamsUserKeys.ADDRESS_STREET]
                            : finalApprovalData.extraData.address_street
                        const addressNumber = finalApprovalData.extraData.usePersonalAddress
                            ? formData[SignupParamsUserKeys.ADDRESS_NUMBER]
                            : finalApprovalData.extraData.address_number
                        const addressNeighborhood = finalApprovalData.extraData.usePersonalAddress
                            ? formData[SignupParamsUserKeys.ADDRESS_NEIGHBORHOOD]
                            : finalApprovalData.extraData.address_neighborhood
                        const addressCity = finalApprovalData.extraData.usePersonalAddress
                            ? formData[SignupParamsUserKeys.ADDRESS_CITY]
                            : finalApprovalData.extraData.address_city
                        const addressState = finalApprovalData.extraData.usePersonalAddress
                            ? formData[SignupParamsUserKeys.ADDRESS_STATE]
                            : finalApprovalData.extraData.address_state
                        const addressZip = finalApprovalData.extraData.usePersonalAddress
                            ? formData[SignupParamsUserKeys.ADDRESS_ZIP_CODE]
                            : finalApprovalData.extraData.address_zip_code

                        doctorPayload.clinic_data = {
                            corporate_name: finalApprovalData.extraData.corporate_name,
                            cpf_cnpj: finalApprovalData.extraData.cpf_cnpj,
                            email: finalApprovalData.extraData.email,
                            phone: finalApprovalData.extraData.phone,
                            responsible_name: finalApprovalData.extraData.responsible_name,
                            address_street: addressStreet,
                            address_number: addressNumber,
                            address_neighborhood: addressNeighborhood,
                            address_city: addressCity,
                            address_state: addressState,
                            address_complement: "",
                            address_zip_code: addressZip,
                            attendance_start_time:
                                finalApprovalData.extraData.attendance_start_time,
                            attendance_end_time: finalApprovalData.extraData.attendance_end_time,
                            working_days: finalApprovalData.extraData.working_days,
                            health_insurance_ids: finalApprovalData.extraData.health_insurance_ids,
                        }
                    } else {
                        doctorPayload.linked_clinic_cnpj =
                            finalApprovalData.extraData.linked_clinic_cnpj
                    }

                    form.append("type", "BECOME_DOCTOR")
                    form.append("user_email", formData[SignupParamsUserKeys.EMAIL] as string)
                    form.append("payload", JSON.stringify(doctorPayload))

                    await approvalService.requestDoctorApproval(form, access_token)
                } else if (approvalData.profile === "CLINIC_ADMIN") {
                    const addressStreet = finalApprovalData.extraData.usePersonalAddress
                        ? formData[SignupParamsUserKeys.ADDRESS_STREET]
                        : finalApprovalData.extraData.address_street
                    const addressNumber = finalApprovalData.extraData.usePersonalAddress
                        ? formData[SignupParamsUserKeys.ADDRESS_NUMBER]
                        : finalApprovalData.extraData.address_number
                    const addressNeighborhood = finalApprovalData.extraData.usePersonalAddress
                        ? formData[SignupParamsUserKeys.ADDRESS_NEIGHBORHOOD]
                        : finalApprovalData.extraData.address_neighborhood
                    const addressCity = finalApprovalData.extraData.usePersonalAddress
                        ? formData[SignupParamsUserKeys.ADDRESS_CITY]
                        : finalApprovalData.extraData.address_city
                    const addressState = finalApprovalData.extraData.usePersonalAddress
                        ? formData[SignupParamsUserKeys.ADDRESS_STATE]
                        : finalApprovalData.extraData.address_state
                    const addressZip = finalApprovalData.extraData.usePersonalAddress
                        ? formData[SignupParamsUserKeys.ADDRESS_ZIP_CODE]
                        : finalApprovalData.extraData.address_zip_code

                    const clinicPayload = {
                        corporate_name: finalApprovalData.extraData.corporate_name,
                        cpf_cnpj: finalApprovalData.extraData.cpf_cnpj,
                        email: finalApprovalData.extraData.email,
                        phone: finalApprovalData.extraData.phone,
                        responsible_name: finalApprovalData.extraData.responsible_name,
                        address_street: addressStreet,
                        address_number: addressNumber,
                        address_neighborhood: addressNeighborhood,
                        address_city: addressCity,
                        address_state: addressState,
                        address_complement: "",
                        address_zip_code: addressZip,
                        attendance_start_time: finalApprovalData.extraData.attendance_start_time,
                        attendance_end_time: finalApprovalData.extraData.attendance_end_time,
                        working_days: finalApprovalData.extraData.working_days,
                        health_insurance_ids: finalApprovalData.extraData.health_insurance_ids,
                    }
                    form.append("type", "REGISTER_CLINIC")
                    form.append("user_email", formData[SignupParamsUserKeys.EMAIL] as string)
                    form.append("payload", JSON.stringify(clinicPayload))
                    await approvalService.requestClinicApproval(form)
                }
            }

            Toast.show("Cadastro concluído com sucesso!")
            return true
        } catch (error) {
            console.error(error)
            Toast.show("Erro ao processar o cadastro.")
            return false
        } finally {
            setLoading(false)
            Loading.hide()
        }
    }

    return (
        <CadastroContext.Provider
            value={{
                formData,
                updateField,
                handleRegister,
                loading,
                currentStep,
                highestStep,
                nextStep,
                prevStep,
                goToStep,
                setApprovalData,
            }}
        >
            {children}
        </CadastroContext.Provider>
    )
}

export const useCadastroContext = () => useContext(CadastroContext)
