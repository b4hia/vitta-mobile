import { TouchableOpacity, Text } from "react-native"
import { useNavigation } from "@react-navigation/native"
import { NativeStackNavigationProp } from "@react-navigation/native-stack"
import { AuthStackParamList } from "../../route"
import styled from "styled-components/native"
import { useLoginContext } from "./loginContext"

type LoginNavigationProp = NativeStackNavigationProp<AuthStackParamList, "Login">

export function LoginFormBase() {
    const navigation = useNavigation<LoginNavigationProp>()
    const {
        email,
        setEmail,
        password,
        setPassword,
        handleLogin,
        // loginWithBiometrics,
        loginWithGoogle,
    } = useLoginContext()

    return (
        <Container>
            <Title>Bem-vindo ao Vitta</Title>
            <Subtitle>Faça login para acessar suas consultas</Subtitle>

            <Input
                placeholder="E-mail ou CPF"
                value={email}
                onChangeText={setEmail}
                keyboardType="email-address"
                autoCapitalize="none"
            />

            <Input
                placeholder="Senha"
                value={password}
                onChangeText={setPassword}
                secureTextEntry
            />

            <ForgotPasswordButton onPress={() => navigation.navigate("ForgotPassword")}>
                <LinkText>Esqueci minha senha</LinkText>
            </ForgotPasswordButton>

            <PrimaryButton onPress={handleLogin}>
                <ButtonText>Entrar</ButtonText>
            </PrimaryButton>

            <SecondaryButton onPress={() => loginWithGoogle("fake-token-google")}>
                <SecondaryButtonText>Entrar com Google</SecondaryButtonText>
            </SecondaryButton>

            <Footer>
                <Text>Ainda não tem conta? </Text>
                <TouchableOpacity onPress={() => navigation.navigate("Cadastro")}>
                    <LinkTextBold>Cadastre-se</LinkTextBold>
                </TouchableOpacity>
            </Footer>
        </Container>
    )
}

const Container = styled.View`
    flex: 1;
    justify-content: center;
    padding: 24px;
    background-color: ${({ theme }) => theme.color.white};
`
const Title = styled.Text`
    font-size: 28px;
    font-weight: bold;
    color: ${({ theme }) => theme.color.primary};
    margin-bottom: 8px;
`
const Subtitle = styled.Text`
    font-size: 16px;
    color: ${({ theme }) => theme.color.gray};
    margin-bottom: 32px;
`
const Input = styled.TextInput`
    border-width: 1px;
    border-color: ${({ theme }) => theme.color.lightGray};
    border-radius: 8px;
    padding: 16px;
    margin-bottom: 16px;
    font-size: 16px;
`
const ForgotPasswordButton = styled.TouchableOpacity`
    align-self: flex-end;
    margin-bottom: 24px;
`
const LinkText = styled.Text`
    color: ${({ theme }) => theme.color.primary};
    font-size: 14px;
`
const LinkTextBold = styled(LinkText)`
    font-weight: bold;
`
const PrimaryButton = styled.TouchableOpacity`
    background-color: ${({ theme }) => theme.color.primary};
    padding: 16px;
    border-radius: 8px;
    align-items: center;
    margin-bottom: 16px;
`
const ButtonText = styled.Text`
    color: ${({ theme }) => theme.color.white};
    font-size: 16px;
    font-weight: bold;
`
const SecondaryButton = styled.TouchableOpacity`
    background-color: transparent;
    border-width: 1px;
    border-color: ${({ theme }) => theme.color.primary};
    padding: 16px;
    border-radius: 8px;
    align-items: center;
    margin-bottom: 16px;
`
const SecondaryButtonText = styled.Text`
    color: ${({ theme }) => theme.color.primary};
    font-size: 16px;
    font-weight: bold;
`
const Footer = styled.View`
    flex-direction: row;
    justify-content: center;
    margin-top: 24px;
`
