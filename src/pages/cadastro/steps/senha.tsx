import { useState } from "react"
import { View } from "react-native"
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

export function PasswordStep() {
    const { formData, updateField, nextStep, prevStep } = useCadastroContext()
    const [error, setError] = useState<string | null>(null)
    const [confirmError, setConfirmError] = useState<string | null>(null)
    const [confirmPassword, setConfirmPassword] = useState("")
    const password = formData[SignupParamsUserKeys.PASSWORD] || ""
    const handleNext = () => {
        if (password.length < 8) {
            setError("A senha deve ter pelo menos 8 caracteres.")
            return
        }
        if (!/[A-Z]/.test(password)) {
            setError("A senha deve ter pelo menos uma letra maiúscula.")
            return
        }
        if (!/[a-z]/.test(password)) {
            setError("A senha deve ter pelo menos uma letra minúscula.")
            return
        }
        if (!/[0-9]/.test(password)) {
            setError("A senha deve ter pelo menos um número.")
            return
        }
        if (!/[!@#$%^&*(),.?":{}|<>]/.test(password)) {
            setError("A senha deve ter pelo menos um caractere especial (símbolo).")
            return
        }
        if (password !== confirmPassword) {
            setConfirmError("As senhas não coincidem. Digite novamente.")
            return
        }
        setError(null)
        nextStep()
    }

    return (
        <>
            <Title>Criar Conta - Senha</Title>
            <Subtitle>Crie uma senha segura para sua conta:</Subtitle>

            <View style={{ marginTop: 16 }}>
                <FormattedInput
                    label="Senha"
                    type="password"
                    placeholder="Sua senha secreta"
                    value={password}
                    onChangeText={(text) => {
                        updateField(SignupParamsUserKeys.PASSWORD, text)
                        if (error) setError(null)
                    }}
                    error={error || undefined}
                />
            </View>
            <View style={{ marginTop: 8 }}>
                <FormattedInput
                    label="Confirmar Senha"
                    type="password"
                    placeholder="Digite a senha novamente"
                    value={confirmPassword}
                    onChangeText={(text) => {
                        setConfirmPassword(text)
                        if (confirmError) setConfirmError(null)
                    }}
                    error={confirmError || undefined}
                />
            </View>

            <View style={{ marginTop: 32 }}>
                <PrimaryButton onPress={handleNext}>
                    <ButtonText>Próximo Passo</ButtonText>
                </PrimaryButton>

                <SecondaryButton onPress={prevStep}>
                    <SecondaryButtonText>Voltar ao passo anterior</SecondaryButtonText>
                </SecondaryButton>
            </View>
        </>
    )
}
