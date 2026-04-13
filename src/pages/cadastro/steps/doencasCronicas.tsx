import { ActivityIndicator } from "react-native"
import { SignupParamsUserKeys } from "@/interfaces/services/auth"
import { SystemConstantsKeys, BasicConstantKeys } from "@/interfaces/services/constants"
import styled from "styled-components/native"
import { useCadastroContext } from "../cadastroContext"
import { useAppConstants } from "@/contexts/constants"
import {
    ButtonText,
    OptionItem,
    OptionText,
    PrimaryButton,
    SecondaryButton,
    SecondaryButtonText,
    Subtitle,
    Title,
} from "../style"
import { theme } from "@/styles/theme"

export function ChronicDiseaseStep() {
    const { formData, updateField, nextStep, prevStep } = useCadastroContext()
    const { constants, loadingConstants } = useAppConstants()
    const selectedDiseases = formData[SignupParamsUserKeys.CHRONIC_DISEASE_IDS] || []
    const chronicDiseasesList = constants?.[SystemConstantsKeys.CHRONIC_DISEASES] || []
    const hasNoDisease = selectedDiseases.length === 0

    const handleToggleDisease = (diseaseId: string) => {
        if (selectedDiseases.includes(diseaseId)) {
            updateField(
                SignupParamsUserKeys.CHRONIC_DISEASE_IDS,
                selectedDiseases.filter((id) => id !== diseaseId)
            )
        } else {
            updateField(SignupParamsUserKeys.CHRONIC_DISEASE_IDS, [...selectedDiseases, diseaseId])
        }
    }
    const handleSelectNone = () => {
        updateField(SignupParamsUserKeys.CHRONIC_DISEASE_IDS, [])
    }

    if (loadingConstants) {
        return <ActivityIndicator size="large" color={theme.color.secondary} />
    }

    return (
        <>
            <Title>Criar Conta - Saúde</Title>
            <Subtitle>Selecione se você possui alguma doença crônica:</Subtitle>
            <OptionItem isSelected={hasNoDisease} onPress={handleSelectNone} activeOpacity={0.7}>
                <OptionText isSelected={hasNoDisease}>Não possuo nenhuma doença crônica</OptionText>
            </OptionItem>

            {chronicDiseasesList.map((disease) => {
                const diseaseId = disease[BasicConstantKeys.ID]
                const diseaseValue = disease[BasicConstantKeys.VALUE]
                const isSelected =
                    formData[SignupParamsUserKeys.CHRONIC_DISEASE_IDS]?.includes(diseaseId)

                return (
                    <CheckboxButton
                        key={diseaseId}
                        selected={isSelected}
                        onPress={() => handleToggleDisease(diseaseId)}
                        activeOpacity={0.7}
                    >
                        <CheckboxText selected={isSelected}>{diseaseValue}</CheckboxText>
                    </CheckboxButton>
                )
            })}

            <PrimaryButton onPress={nextStep}>
                <ButtonText>Próximo Passo</ButtonText>
            </PrimaryButton>

            <SecondaryButton onPress={prevStep}>
                <SecondaryButtonText>Voltar ao passo anterior</SecondaryButtonText>
            </SecondaryButton>
        </>
    )
}

const CheckboxButton = styled.TouchableOpacity<{ selected?: boolean }>`
    padding: 16px;
    border-width: 1px;
    border-color: ${({ selected, theme }) =>
        selected ? theme.color?.primary || "#92400e" : "#CCC"};
    background-color: ${({ selected }) => (selected ? "#FEF3C7" : "transparent")};
    border-radius: 8px;
    margin-bottom: 8px;
`
const CheckboxText = styled.Text<{ selected?: boolean }>`
    color: ${({ selected, theme }) => (selected ? theme.color?.primary || "#92400e" : "#333")};
    font-weight: ${({ selected }) => (selected ? "bold" : "normal")};
`
