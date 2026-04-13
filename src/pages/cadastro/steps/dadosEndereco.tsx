import { useState } from "react"
import { SignupParamsUserKeys } from "@/interfaces/services/auth"
import {
    Title,
    Subtitle,
    PrimaryButton,
    ButtonText,
    SecondaryButton,
    SecondaryButtonText,
} from "../style"
import { useCadastroContext } from "../cadastroContext"
import { IAddressData } from "@/interfaces/components/Address"
import { AddressForm } from "@/components/Address"

export function AddressDataStep() {
    const { formData, updateField, nextStep, prevStep } = useCadastroContext()
    const [errors, setErrors] = useState<Partial<Record<keyof IAddressData, string>>>({})

    const addressData: IAddressData = {
        zip_code: formData[SignupParamsUserKeys.ADDRESS_ZIP_CODE] || "",
        street: formData[SignupParamsUserKeys.ADDRESS_STREET] || "",
        number: formData[SignupParamsUserKeys.ADDRESS_NUMBER] || "",
        neighborhood: formData[SignupParamsUserKeys.ADDRESS_NEIGHBORHOOD] || "",
        city: formData[SignupParamsUserKeys.ADDRESS_CITY] || "",
        state: formData[SignupParamsUserKeys.ADDRESS_STATE] || "",
        complement: formData[SignupParamsUserKeys.ADDRESS_COMPLEMENT] || "",
    }

    const handleAddressChange = (field: keyof IAddressData, value: string) => {
        const mapping: Record<keyof IAddressData, SignupParamsUserKeys> = {
            zip_code: SignupParamsUserKeys.ADDRESS_ZIP_CODE,
            street: SignupParamsUserKeys.ADDRESS_STREET,
            number: SignupParamsUserKeys.ADDRESS_NUMBER,
            neighborhood: SignupParamsUserKeys.ADDRESS_NEIGHBORHOOD,
            city: SignupParamsUserKeys.ADDRESS_CITY,
            state: SignupParamsUserKeys.ADDRESS_STATE,
            complement: SignupParamsUserKeys.ADDRESS_COMPLEMENT,
        }

        updateField(mapping[field], value)
        if (errors[field]) setErrors((prev) => ({ ...prev, [field]: undefined }))
    }

    const handleNextStep = () => {
        const newErrors: Partial<Record<keyof IAddressData, string>> = {}

        if (!addressData.zip_code || addressData.zip_code.length !== 8)
            newErrors.zip_code = "CEP inválido"
        if (!addressData.street?.trim()) newErrors.street = "Rua é obrigatória"
        if (!addressData.number?.trim()) newErrors.number = "Número é obrigatório"
        if (!addressData.neighborhood?.trim()) newErrors.neighborhood = "Bairro é obrigatório"
        if (!addressData.city?.trim()) newErrors.city = "Cidade é obrigatória"
        if (!addressData.state) newErrors.state = "Estado é obrigatório"

        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors)
            return
        }
        setErrors({})
        nextStep()
    }

    return (
        <>
            <Title>Criar Conta - Endereço</Title>
            <Subtitle>Onde você mora?</Subtitle>

            <AddressForm data={addressData} onChange={handleAddressChange} errors={errors} />

            <PrimaryButton onPress={handleNextStep} style={{ marginTop: 24 }}>
                <ButtonText>Próximo Passo</ButtonText>
            </PrimaryButton>

            <SecondaryButton onPress={prevStep}>
                <SecondaryButtonText>Voltar ao passo anterior</SecondaryButtonText>
            </SecondaryButton>
        </>
    )
}
