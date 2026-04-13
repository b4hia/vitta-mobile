import { AuthStackParamList } from "@/route"
import { useNavigation } from "@react-navigation/native"
import { NativeStackNavigationProp } from "@react-navigation/native-stack"
import styled from "styled-components/native"
import { useForgotPasswordContext } from "./forgotPassword"

type ForgotPasswordNavigationProp = NativeStackNavigationProp<AuthStackParamList, "ForgotPassword">

export function ForgotPasswordFormBase() {
    const navigation = useNavigation<ForgotPasswordNavigationProp>()
    const { document, setDocument, handleSendCode } = useForgotPasswordContext()

    const onSubmit = async () => {
        const success = await handleSendCode()
        if (success) {
            navigation.goBack()
        }
    }

    return (
        <Container>
            <Title>Recuperar Senha</Title>
            <Subtitle>
                Informe seu CPF ou E-mail para receber as instruções de recuperação.
            </Subtitle>

            <Input
                placeholder="E-mail ou CPF"
                value={document}
                onChangeText={setDocument}
                autoCapitalize="none"
            />

            <PrimaryButton onPress={onSubmit}>
                <ButtonText>Enviar Código</ButtonText>
            </PrimaryButton>

            <SecondaryButton onPress={() => navigation.goBack()}>
                <SecondaryButtonText>Voltar</SecondaryButtonText>
            </SecondaryButton>
        </Container>
    )
}

// Styled Components
const Container = styled.View`
    flex: 1;
    justify-content: center;
    padding: 24px;
    background-color: ${({ theme }) => theme.colors?.background || "#FFFFFF"};
`
const Title = styled.Text`
    font-size: 28px;
    font-weight: bold;
    color: ${({ theme }) => theme.colors?.primary || "#92400e"};
    margin-bottom: 8px;
`
const Subtitle = styled.Text`
    font-size: 16px;
    color: #666;
    margin-bottom: 32px;
    line-height: 22px;
`
const Input = styled.TextInput`
    border-width: 1px;
    border-color: #ccc;
    border-radius: 8px;
    padding: 16px;
    margin-bottom: 24px;
    font-size: 16px;
`
const PrimaryButton = styled.TouchableOpacity`
    background-color: ${({ theme }) => theme.colors?.primary || "#92400e"};
    padding: 16px;
    border-radius: 8px;
    align-items: center;
    margin-bottom: 16px;
`
const ButtonText = styled.Text`
    color: #fff;
    font-size: 16px;
    font-weight: bold;
`
const SecondaryButton = styled.TouchableOpacity`
    background-color: transparent;
    padding: 16px;
    align-items: center;
`
const SecondaryButtonText = styled.Text`
    color: ${({ theme }) => theme.colors?.primary || "#92400e"};
    font-size: 16px;
    font-weight: bold;
`
