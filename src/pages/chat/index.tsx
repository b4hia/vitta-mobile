import { SafeAreaView } from "react-native-safe-area-context"
import { Ionicons } from "@expo/vector-icons"
import styled, { useTheme } from "styled-components/native"

export default function SupportChatScreen() {
    const theme = useTheme()

    return (
        <Safe>
            <Header>
                <Title>Mensagens</Title>
                <Subtitle>Suporte e atendimento</Subtitle>
            </Header>

            <Content>
                <EmptyState>
                    <IconWrapper>
                        <Ionicons
                            name="chatbubbles-outline"
                            size={40}
                            color={theme.color.primary}
                        />
                    </IconWrapper>
                    <EmptyTitle>Caixa de entrada vazia</EmptyTitle>
                    <EmptyText>Você não possui nenhuma conversa ativa no momento.</EmptyText>

                    <NewChatButton activeOpacity={0.8}>
                        <ButtonText>Iniciar nova conversa</ButtonText>
                    </NewChatButton>
                </EmptyState>
            </Content>
        </Safe>
    )
}

const Safe = styled(SafeAreaView)`
    flex: 1;
    background-color: ${({ theme }) => theme.color.light};
`
const Header = styled.View`
    padding: 24px 24px 16px 24px;
    background-color: ${({ theme }) => theme.color.white};
    elevation: 2;
    shadow-color: #000;
    shadow-opacity: 0.05;
    shadow-radius: 8px;
    shadow-offset: 0px 2px;
`
const Title = styled.Text`
    font-size: 24px;
    font-weight: bold;
    color: ${({ theme }) => theme.color.tertiary};
`
const Subtitle = styled.Text`
    font-size: 14px;
    color: ${({ theme }) => theme.color.gray};
    margin-top: 4px;
`
const Content = styled.View`
    flex: 1;
    padding: 24px;
    justify-content: center;
`
const EmptyState = styled.View`
    align-items: center;
    justify-content: center;
    padding: 32px;
`
const IconWrapper = styled.View`
    width: 80px;
    height: 80px;
    border-radius: 40px;
    background-color: ${({ theme }) => theme.color.primary}15;
    align-items: center;
    justify-content: center;
    margin-bottom: 16px;
`
const EmptyTitle = styled.Text`
    font-size: 18px;
    font-weight: bold;
    color: ${({ theme }) => theme.color.dark};
    margin-bottom: 8px;
`
const EmptyText = styled.Text`
    font-size: 14px;
    color: ${({ theme }) => theme.color.gray};
    text-align: center;
    line-height: 20px;
    margin-bottom: 24px;
`
const NewChatButton = styled.TouchableOpacity`
    background-color: ${({ theme }) => theme.color.primary};
    padding: 14px 24px;
    border-radius: 24px;
`
const ButtonText = styled.Text`
    color: ${({ theme }) => theme.color.white};
    font-weight: bold;
    font-size: 15px;
`
