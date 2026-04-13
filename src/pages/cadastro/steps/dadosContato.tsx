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
import { FormattedInput } from "@/components/FormattedInput"

export function ContactDataStep() {
    const { formData, updateField, nextStep, prevStep } = useCadastroContext()
    const [errors, setErrors] = useState<Record<string, string>>({})

    const handleNextStep = () => {
        const newErrors: Record<string, string> = {}
        const email = formData[SignupParamsUserKeys.EMAIL]?.trim()
        const phone = formData[SignupParamsUserKeys.PHONE]?.trim()

        if (!email) {
            newErrors[SignupParamsUserKeys.EMAIL] = "O e-mail é obrigatório"
        } else if (!email.includes("@") || !email.includes(".")) {
            newErrors[SignupParamsUserKeys.EMAIL] = "E-mail inválido"
        }

        if (!phone) {
            newErrors[SignupParamsUserKeys.PHONE] = "O telefone é obrigatório"
        } else if (phone.length !== 11) {
            newErrors[SignupParamsUserKeys.PHONE] =
                "Telefone inválido (deve ter 11 números com DDD)"
        }

        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors)
            return
        }
        setErrors({})
        nextStep()
    }

    const handleChangeText = (field: SignupParamsUserKeys, text: string) => {
        updateField(field, text)
        if (errors[field]) setErrors((prev) => ({ ...prev, [field]: "" }))
    }

    return (
        <>
            <Title>Criar Conta - Contato</Title>
            <Subtitle>Como podemos falar com você?</Subtitle>

            <FormattedInput
                label="E-mail"
                type="email"
                placeholder="Seu melhor e-mail"
                value={formData[SignupParamsUserKeys.EMAIL]}
                onChangeText={(t) => handleChangeText(SignupParamsUserKeys.EMAIL, t)}
                error={errors[SignupParamsUserKeys.EMAIL]}
            />

            <FormattedInput
                label="Celular"
                type="phone"
                placeholder="(11) 99999-9999"
                value={formData[SignupParamsUserKeys.PHONE]}
                onChangeText={(t) => handleChangeText(SignupParamsUserKeys.PHONE, t)}
                error={errors[SignupParamsUserKeys.PHONE]}
            />

            <PrimaryButton onPress={handleNextStep} style={{ marginTop: 16 }}>
                <ButtonText>Próximo Passo</ButtonText>
            </PrimaryButton>

            <SecondaryButton onPress={prevStep}>
                <SecondaryButtonText>Voltar ao passo anterior</SecondaryButtonText>
            </SecondaryButton>
        </>
    )
}
