import { useState } from "react"
import { View, ActivityIndicator, Switch } from "react-native"
import { useNavigation } from "@react-navigation/native"
import { NativeStackNavigationProp } from "@react-navigation/native-stack"
import { AuthStackParamList } from "../../../route"
import { useCadastroContext } from "../cadastroContext"
import {
    Title,
    Subtitle,
    PrimaryButton,
    ButtonText,
    SecondaryButton,
    SecondaryButtonText,
    Label,
    InsuranceGrid,
    InsuranceChip,
    InsuranceChipText,
    DaysGrid,
    DayChip,
    DayChipText,
    ProfileOption,
    ProfileText,
} from "../style"
import { useAppConstants } from "@/contexts/constants"
import { SystemConstantsKeys } from "@/interfaces/services/constants"
import { DateTime } from "@/utils/Format/DateTime"
import { DaysOfWeek } from "@/interfaces/contexts/constants"
import {
    PayloadClinicApprovalKeys,
    PayloadDoctorApprovalKeys,
} from "@/interfaces/services/approvals"
import { IAddressData } from "@/interfaces/components/Address"
import { AddressForm } from "@/components/Address"
import { SanitizeField } from "@/utils/Format/SanitizeField"
import { IProfileFormPayload } from "@/interfaces/pages/signup"
import { FormattedDatePicker } from "@/components/FormattedDataPicker"
import { DocumentPickerButton } from "@/components/FormattedDocumentPicker"
import { FormattedInput } from "@/components/FormattedInput"
import { DocumentValidator } from "@/utils/Format/DocumentValidator"
import { useNotification } from "@/contexts/notification"
import { SignupParamsUserKeys } from "@/interfaces/services/auth"

const ALLOWED_SIGNUP_ROLES = ["CLIENT", "CLINIC_DOCTOR", "CLINIC_ADMIN"]

const DAYS_OF_WEEK = [
    { id: DaysOfWeek.SUNDAY, label: "Dom" },
    { id: DaysOfWeek.MONDAY, label: "Seg" },
    { id: DaysOfWeek.TUESDAY, label: "Ter" },
    { id: DaysOfWeek.WEDNESDAY, label: "Qua" },
    { id: DaysOfWeek.THURSDAY, label: "Qui" },
    { id: DaysOfWeek.FRIDAY, label: "Sex" },
    { id: DaysOfWeek.SATURDAY, label: "Sáb" },
]

type NavigationProp = NativeStackNavigationProp<AuthStackParamList, "Cadastro">

export function ProfileStep() {
    const navigation = useNavigation<NavigationProp>()
    const { formData, setApprovalData, handleRegister, prevStep, loading } = useCadastroContext()
    const { constants, loadingConstants } = useAppConstants()
    const { Toast } = useNotification()
    const allRoles = constants?.[SystemConstantsKeys.SYSTEM_ROLES] || []
    const visibleRoles = allRoles.filter((role: any) => ALLOWED_SIGNUP_ROLES.includes(role.key))
    const operators = constants?.[SystemConstantsKeys.HEALTH_INSURANCE] || []
    const specialtiesList = constants?.[SystemConstantsKeys.MEDICAL_SPECIALTIES] || []
    const [selectedRoleKey, setSelectedRoleKey] = useState<string>("CLIENT")
    const [files, setFiles] = useState<Record<string, any>>({})
    const userFullName =
        `${formData[SignupParamsUserKeys.FIRST_NAME] || ""} ${formData[SignupParamsUserKeys.LAST_NAME] || ""}`.trim()

    const [extraData, setExtraData] = useState<IProfileFormPayload>({
        [PayloadDoctorApprovalKeys.DOCUMENT_IDENTIFIER]: "",
        [PayloadDoctorApprovalKeys.JUSTIFICATION]: "",
        [PayloadDoctorApprovalKeys.IS_INDEPENDENT]: true,
        [PayloadDoctorApprovalKeys.LINKED_CLINIC_CNPJ]: "",
        [PayloadDoctorApprovalKeys.SPECIALTIES_IDS]: [],

        [PayloadClinicApprovalKeys.CORPORATE_NAME]: "",
        [PayloadClinicApprovalKeys.CPF_CNPJ]: "",
        [PayloadClinicApprovalKeys.EMAIL]: "",
        [PayloadClinicApprovalKeys.PHONE]: "",
        [PayloadClinicApprovalKeys.RESPONSIBLE_NAME]: userFullName,
        [PayloadClinicApprovalKeys.WORKING_DAYS]: [],
        [PayloadClinicApprovalKeys.HEALTH_INSURANCE_IDS]: [],

        usePersonalAddress: true,
        [PayloadClinicApprovalKeys.ADDRESS_ZIP_CODE]: "",
        [PayloadClinicApprovalKeys.ADDRESS_STREET]: "",
        [PayloadClinicApprovalKeys.ADDRESS_NUMBER]: "",
        [PayloadClinicApprovalKeys.ADDRESS_NEIGHBORHOOD]: "",
        [PayloadClinicApprovalKeys.ADDRESS_CITY]: "",
        [PayloadClinicApprovalKeys.ADDRESS_STATE]: "",
        ui_start_time: new Date(),
        ui_end_time: new Date(),
    })

    const showClinicFields =
        selectedRoleKey === "CLINIC_ADMIN" ||
        (selectedRoleKey === "CLINIC_DOCTOR" && extraData.is_independent)
    const requiredDocs =
        selectedRoleKey === "CLINIC_ADMIN"
            ? ["Comprovante CNPJ"]
            : selectedRoleKey === "CLINIC_DOCTOR" && extraData.is_independent
              ? ["Comprovante CRM", "Comprovante CNPJ da Clínica"]
              : selectedRoleKey === "CLINIC_DOCTOR"
                ? ["Comprovante CRM"]
                : [] // Client doesn't require documents

    const toggleWorkingDay = (dayId: number) => {
        setExtraData((prev) => {
            const days = prev.working_days.includes(dayId)
                ? prev.working_days.filter((d) => d !== dayId)
                : [...prev.working_days, dayId].sort()
            return { ...prev, working_days: days }
        })
    }
    const toggleInsurance = (id: string) => {
        setExtraData((prev) => {
            const ids = prev.health_insurance_ids.includes(id)
                ? prev.health_insurance_ids.filter((i) => i !== id)
                : [...prev.health_insurance_ids, id]
            return { ...prev, health_insurance_ids: ids }
        })
    }
    const toggleSpecialty = (id: string) => {
        setExtraData((prev) => {
            const ids = prev[PayloadDoctorApprovalKeys.SPECIALTIES_IDS].includes(id)
                ? prev[PayloadDoctorApprovalKeys.SPECIALTIES_IDS].filter((i) => i !== id)
                : [...prev[PayloadDoctorApprovalKeys.SPECIALTIES_IDS], id]
            return { ...prev, [PayloadDoctorApprovalKeys.SPECIALTIES_IDS]: ids }
        })
    }
    const handleClinicAddressChange = (field: keyof IAddressData, value: string) => {
        const mapping: Record<keyof IAddressData, string> = {
            zip_code: PayloadClinicApprovalKeys.ADDRESS_ZIP_CODE,
            street: PayloadClinicApprovalKeys.ADDRESS_STREET,
            number: PayloadClinicApprovalKeys.ADDRESS_NUMBER,
            neighborhood: PayloadClinicApprovalKeys.ADDRESS_NEIGHBORHOOD,
            city: PayloadClinicApprovalKeys.ADDRESS_CITY,
            state: PayloadClinicApprovalKeys.ADDRESS_STATE,
        }
        setExtraData((prev) => ({ ...prev, [mapping[field]]: value }))
    }
    const clinicAddressData: IAddressData = {
        zip_code: extraData[PayloadClinicApprovalKeys.ADDRESS_ZIP_CODE],
        street: extraData[PayloadClinicApprovalKeys.ADDRESS_STREET],
        number: extraData[PayloadClinicApprovalKeys.ADDRESS_NUMBER],
        neighborhood: extraData[PayloadClinicApprovalKeys.ADDRESS_NEIGHBORHOOD],
        city: extraData[PayloadClinicApprovalKeys.ADDRESS_CITY],
        state: extraData[PayloadClinicApprovalKeys.ADDRESS_STATE],
    }

    const onSubmit = async () => {
        const missingDocs = requiredDocs.filter((doc) => !files[doc])
        if (missingDocs.length > 0) {
            Toast.show(`Falta anexar: ${missingDocs.join(" e ")}`)
            return
        }
        if (selectedRoleKey === "CLINIC_DOCTOR" && !extraData.is_independent) {
            if (extraData[PayloadDoctorApprovalKeys.SPECIALTIES_IDS].length === 0) {
                Toast.show("Selecione ao menos uma especialidade médica.")
                return
            }

            if (!extraData.is_independent) {
                const cnpj = extraData[PayloadDoctorApprovalKeys.LINKED_CLINIC_CNPJ]
                if (!DocumentValidator.isValidCNPJ(cnpj)) {
                    Toast.show("O CNPJ da clínica vinculada é inválido.")
                    return
                }
            }
        }
        if (showClinicFields) {
            const cnpj = extraData[PayloadClinicApprovalKeys.CPF_CNPJ]
            if (!DocumentValidator.isValidCNPJ(cnpj)) {
                Toast.show("O CNPJ da clínica informado é inválido.")
                return
            }
            if (extraData.working_days.length === 0) {
                Toast.show("Selecione ao menos um dia de funcionamento da clínica.")
                return
            }
            const startH = extraData.ui_start_time.getHours()
            const startM = extraData.ui_start_time.getMinutes()
            const endH = extraData.ui_end_time.getHours()
            const endM = extraData.ui_end_time.getMinutes()

            if (startH === endH && startM === endM) {
                Toast.show("O horário de abertura e fechamento não podem ser iguais.")
                return
            }
        }

        const formattedExtraData = {
            ...extraData,
            [PayloadClinicApprovalKeys.ATTENDANCE_START_TIME]: new DateTime(
                extraData.ui_start_time
            ).format("HH:mm"),
            [PayloadClinicApprovalKeys.ATTENDANCE_END_TIME]: new DateTime(
                extraData.ui_end_time
            ).format("HH:mm"),
        }
        const filesArray = Object.values(files).filter(Boolean)
        const approvalPayload = {
            profile: selectedRoleKey,
            extraData: formattedExtraData,
            files: filesArray,
        }
        setApprovalData(approvalPayload)
        const success = await handleRegister(approvalPayload)
        if (success) {
            navigation.navigate("Login")
        }
    }

    if (loadingConstants) return <ActivityIndicator size="large" color="#92400e" />

    return (
        <>
            <Title>Criar Conta - Perfil</Title>
            <Subtitle>Como você deseja utilizar o Vitta Saúde?</Subtitle>

            {visibleRoles.map((role: any) => (
                <ProfileOption
                    key={role.id}
                    selected={selectedRoleKey === role.key}
                    onPress={() => setSelectedRoleKey(role.key)}
                >
                    <ProfileText selected={selectedRoleKey === role.key}>{role.value}</ProfileText>
                </ProfileOption>
            ))}

            {selectedRoleKey === "CLINIC_DOCTOR" && (
                <View style={{ marginTop: 16 }}>
                    <FormattedInput
                        label="CRM / Documento"
                        placeholder="Ex: CRMSP 123456"
                        value={extraData[PayloadDoctorApprovalKeys.DOCUMENT_IDENTIFIER]}
                        onChangeText={(t) =>
                            setExtraData({
                                ...extraData,
                                [PayloadDoctorApprovalKeys.DOCUMENT_IDENTIFIER]:
                                    SanitizeField.onlyNumberAndLetter(t).toUpperCase(),
                            })
                        }
                    />
                    <Label style={{ marginTop: 8 }}>Selecione as suas especialidades</Label>
                    <InsuranceGrid>
                        {specialtiesList.map((spec: any) => (
                            <InsuranceChip
                                key={spec.id}
                                selected={extraData[
                                    PayloadDoctorApprovalKeys.SPECIALTIES_IDS
                                ].includes(spec.id)}
                                onPress={() => toggleSpecialty(spec.id)}
                            >
                                <InsuranceChipText
                                    selected={extraData[
                                        PayloadDoctorApprovalKeys.SPECIALTIES_IDS
                                    ].includes(spec.id)}
                                >
                                    {spec.value}
                                </InsuranceChipText>
                            </InsuranceChip>
                        ))}
                    </InsuranceGrid>

                    <View
                        style={{
                            flexDirection: "row",
                            alignItems: "center",
                            justifyContent: "space-between",
                            marginVertical: 16,
                        }}
                    >
                        <Label style={{ marginBottom: 0 }}>Sou Médico Independente</Label>
                        <Switch
                            value={extraData[PayloadDoctorApprovalKeys.IS_INDEPENDENT]}
                            onValueChange={(val) =>
                                setExtraData({
                                    ...extraData,
                                    [PayloadDoctorApprovalKeys.IS_INDEPENDENT]: val,
                                })
                            }
                        />
                    </View>

                    {!extraData[PayloadDoctorApprovalKeys.IS_INDEPENDENT] && (
                        <FormattedInput
                            label="CNPJ da Clínica onde atua"
                            type="cpf_cnpj"
                            placeholder="00.000.000/0000-00"
                            value={extraData[PayloadDoctorApprovalKeys.LINKED_CLINIC_CNPJ]}
                            onChangeText={(t) =>
                                setExtraData({
                                    ...extraData,
                                    [PayloadDoctorApprovalKeys.LINKED_CLINIC_CNPJ]: t,
                                })
                            }
                        />
                    )}

                    <FormattedInput
                        label="Justificativa de Atuação"
                        placeholder="Ex: Clínico Geral com foco em..."
                        value={extraData[PayloadDoctorApprovalKeys.JUSTIFICATION]}
                        onChangeText={(t) =>
                            setExtraData({
                                ...extraData,
                                [PayloadDoctorApprovalKeys.JUSTIFICATION]: t,
                            })
                        }
                    />
                </View>
            )}

            {/* Renderiza os campos de clínica se a tratativa 2 for verdadeira */}
            {showClinicFields && (
                <View style={{ marginTop: 16 }}>
                    <FormattedInput
                        label="Razão Social da Clínica"
                        type="name"
                        placeholder="Nome oficial da clínica"
                        value={extraData[PayloadClinicApprovalKeys.CORPORATE_NAME]}
                        onChangeText={(t) =>
                            setExtraData({
                                ...extraData,
                                [PayloadClinicApprovalKeys.CORPORATE_NAME]: t,
                            })
                        }
                    />

                    <FormattedInput
                        label="CNPJ da Clínica"
                        type="cpf_cnpj"
                        placeholder="00.000.000/0000-00"
                        value={extraData[PayloadClinicApprovalKeys.CPF_CNPJ]}
                        onChangeText={(t) =>
                            setExtraData({ ...extraData, [PayloadClinicApprovalKeys.CPF_CNPJ]: t })
                        }
                    />

                    <FormattedInput
                        label="E-mail Comercial"
                        type="email"
                        placeholder="contato@clinica.com"
                        value={extraData[PayloadClinicApprovalKeys.EMAIL]}
                        onChangeText={(t) =>
                            setExtraData({ ...extraData, [PayloadClinicApprovalKeys.EMAIL]: t })
                        }
                    />

                    <FormattedInput
                        label="Telefone Comercial"
                        type="phone"
                        placeholder="(00) 00000-0000"
                        value={extraData[PayloadClinicApprovalKeys.PHONE]}
                        onChangeText={(t) =>
                            setExtraData({ ...extraData, [PayloadClinicApprovalKeys.PHONE]: t })
                        }
                    />

                    <FormattedInput
                        label="Nome do Responsável Legal"
                        type="name"
                        placeholder="Seu nome"
                        value={extraData[PayloadClinicApprovalKeys.RESPONSIBLE_NAME]}
                        onChangeText={(t) =>
                            setExtraData({
                                ...extraData,
                                [PayloadClinicApprovalKeys.RESPONSIBLE_NAME]: t,
                            })
                        }
                    />

                    <Label style={{ marginTop: 8 }}>Dias de Funcionamento</Label>
                    <DaysGrid>
                        {DAYS_OF_WEEK.map((day) => (
                            <DayChip
                                key={day.id}
                                selected={extraData[
                                    PayloadClinicApprovalKeys.WORKING_DAYS
                                ].includes(day.id)}
                                onPress={() => toggleWorkingDay(day.id)}
                            >
                                <DayChipText
                                    selected={extraData[
                                        PayloadClinicApprovalKeys.WORKING_DAYS
                                    ].includes(day.id)}
                                >
                                    {day.label}
                                </DayChipText>
                            </DayChip>
                        ))}
                    </DaysGrid>

                    <View style={{ flexDirection: "row", gap: 16, marginBottom: 16 }}>
                        <View style={{ flex: 1 }}>
                            <FormattedDatePicker
                                label="Abertura"
                                mode="time"
                                value={extraData.ui_start_time}
                                onChange={(date) =>
                                    setExtraData({ ...extraData, ui_start_time: date })
                                }
                            />
                        </View>
                        <View style={{ flex: 1 }}>
                            <FormattedDatePicker
                                label="Fechamento"
                                mode="time"
                                value={extraData.ui_end_time}
                                onChange={(date) =>
                                    setExtraData({ ...extraData, ui_end_time: date })
                                }
                            />
                        </View>
                    </View>

                    <Label>Convênios Atendidos</Label>
                    <InsuranceGrid>
                        {operators.map((op: any) => (
                            <InsuranceChip
                                key={op.id}
                                selected={extraData.health_insurance_ids.includes(op.id)}
                                onPress={() => toggleInsurance(op.id)}
                            >
                                <InsuranceChipText
                                    selected={extraData.health_insurance_ids.includes(op.id)}
                                >
                                    {op.value}
                                </InsuranceChipText>
                            </InsuranceChip>
                        ))}
                    </InsuranceGrid>

                    <View
                        style={{
                            flexDirection: "row",
                            alignItems: "center",
                            justifyContent: "space-between",
                            marginVertical: 16,
                            backgroundColor: "#f9fafb",
                            padding: 12,
                            borderRadius: 8,
                        }}
                    >
                        <Label style={{ marginBottom: 0, flex: 1 }}>
                            O endereço da clínica é o mesmo do meu cadastro pessoal?
                        </Label>
                        <Switch
                            value={extraData.usePersonalAddress}
                            onValueChange={(val) =>
                                setExtraData({ ...extraData, usePersonalAddress: val })
                            }
                        />
                    </View>

                    {!extraData.usePersonalAddress && (
                        <View
                            style={{
                                padding: 16,
                                borderWidth: 1,
                                borderColor: "#e5e7eb",
                                borderRadius: 8,
                                marginBottom: 16,
                            }}
                        >
                            <Subtitle>Endereço da Clínica</Subtitle>
                            <AddressForm
                                data={clinicAddressData}
                                onChange={handleClinicAddressChange}
                            />
                        </View>
                    )}
                </View>
            )}
            {requiredDocs.map((docLabel) => (
                <DocumentPickerButton
                    key={docLabel}
                    label={docLabel}
                    file={files[docLabel]}
                    onFileSelect={(selectedFile) =>
                        setFiles((prev) => ({ ...prev, [docLabel]: selectedFile }))
                    }
                    allowedTypes={["application/pdf", "image/*"]}
                    maxSizeMB={5}
                />
            ))}

            <PrimaryButton onPress={onSubmit} disabled={loading} style={{ marginTop: 32 }}>
                <ButtonText>{loading ? "Enviando..." : "Concluir Cadastro"}</ButtonText>
            </PrimaryButton>

            <SecondaryButton onPress={prevStep} disabled={loading}>
                <SecondaryButtonText>Voltar ao passo anterior</SecondaryButtonText>
            </SecondaryButton>
        </>
    )
}
