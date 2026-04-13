import { useState } from "react"
import { useNavigation } from "@react-navigation/native"
import { NativeStackNavigationProp } from "@react-navigation/native-stack"
import { AuthStackParamList } from "../../../route"
import { SignupParamsUserKeys } from "@/interfaces/services/auth"
import { useCadastroContext } from "../cadastroContext"
import {
    ButtonText,
    PrimaryButton,
    SecondaryButton,
    SecondaryButtonText,
    Subtitle,
    Title,
} from "../style"
import { FormattedInput } from "@/components/FormattedInput"
import { FormattedDatePicker } from "@/components/FormattedDataPicker"
import { DocumentValidator } from "@/utils/Format/DocumentValidator"

type NavigationProp = NativeStackNavigationProp<AuthStackParamList, "Cadastro">

export function PersonalDataStep() {
    const navigation = useNavigation<NavigationProp>()
    const { formData, updateField, nextStep } = useCadastroContext()
    const [errors, setErrors] = useState<Record<string, string>>({})

    const handleNextStep = () => {
        const newErrors: Record<string, string> = {}
        const firstName = formData[SignupParamsUserKeys.FIRST_NAME]?.trim()
        const lastName = formData[SignupParamsUserKeys.LAST_NAME]?.trim()
        const cpfCnpj = formData[SignupParamsUserKeys.CPF_CNPJ]

        if (!firstName) newErrors[SignupParamsUserKeys.FIRST_NAME] = "O nome é obrigatório"
        if (!lastName) newErrors[SignupParamsUserKeys.LAST_NAME] = "O sobrenome é obrigatório"
        if (!cpfCnpj) {
            newErrors[SignupParamsUserKeys.CPF_CNPJ] = "CPF ou CNPJ é obrigatório"
        } else if (!DocumentValidator.isValidCpfOrCnpj(cpfCnpj)) {
            newErrors[SignupParamsUserKeys.CPF_CNPJ] = "CPF ou CNPJ inválido"
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
        if (errors[field]) {
            setErrors((prevErrors) => ({ ...prevErrors, [field]: "" }))
        }
    }

    return (
        <>
            <Title>Criar Conta</Title>
            <Subtitle>Preencha seus dados pessoais</Subtitle>
            <FormattedInput
                label="Nome"
                type="name"
                placeholder="Seu primeiro nome"
                value={formData[SignupParamsUserKeys.FIRST_NAME]}
                onChangeText={(t) => handleChangeText(SignupParamsUserKeys.FIRST_NAME, t)}
                error={errors[SignupParamsUserKeys.FIRST_NAME]}
            />

            <FormattedInput
                label="Sobrenome"
                type="name"
                placeholder="Seu sobrenome"
                value={formData[SignupParamsUserKeys.LAST_NAME]}
                onChangeText={(t) => handleChangeText(SignupParamsUserKeys.LAST_NAME, t)}
                error={errors[SignupParamsUserKeys.LAST_NAME]}
            />

            <FormattedInput
                label="CPF ou CNPJ"
                type="cpf_cnpj"
                placeholder="000.000.000-00"
                value={formData[SignupParamsUserKeys.CPF_CNPJ]}
                onChangeText={(t) => handleChangeText(SignupParamsUserKeys.CPF_CNPJ, t)}
                error={errors[SignupParamsUserKeys.CPF_CNPJ]}
            />

            <FormattedDatePicker
                label="Data de Nascimento"
                mode="date"
                maximumDate={new Date()}
                value={formData[SignupParamsUserKeys.BIRTHDAY] as Date}
                onChange={(date) => updateField(SignupParamsUserKeys.BIRTHDAY, date)}
            />

            <PrimaryButton onPress={handleNextStep}>
                <ButtonText>Próximo Passo</ButtonText>
            </PrimaryButton>

            <SecondaryButton onPress={() => navigation.goBack()}>
                <SecondaryButtonText>Voltar para o Login</SecondaryButtonText>
            </SecondaryButton>
        </>
    )
}
