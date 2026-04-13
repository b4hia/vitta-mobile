import { TouchableOpacity } from "react-native"
import { SafeAreaView } from "react-native-safe-area-context"
import { Ionicons } from "@expo/vector-icons"
import styled, { useTheme } from "styled-components/native"

export default function ClinicsScreen() {
    const theme = useTheme()

    return (
        <Safe>
            <Header>
                <TitleRow>
                    <Title>Clínicas</Title>
                    <TouchableOpacity>
                        <Ionicons name="add-circle" size={28} color={theme.color.primary} />
                    </TouchableOpacity>
                </TitleRow>

                <SearchBar>
                    <Ionicons name="search" size={20} color={theme.color.gray} />
                    <SearchInput
                        placeholder="Buscar clínica por nome ou CNPJ..."
                        placeholderTextColor={theme.color.gray}
                    />
                </SearchBar>
            </Header>

            <Content>
                <EmptyState>
                    <Ionicons
                        name="business-outline"
                        size={48}
                        color={theme.color.gray}
                        style={{ marginBottom: 16 }}
                    />
                    <EmptyText>
                        Use a barra de busca acima para encontrar clínicas na plataforma.
                    </EmptyText>
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
const TitleRow = styled.View`
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 16px;
`
const Title = styled.Text`
    font-size: 24px;
    font-weight: bold;
    color: ${({ theme }) => theme.color.tertiary};
`
const SearchBar = styled.View`
    flex-direction: row;
    align-items: center;
    background-color: #f3f4f6;
    padding: 12px 16px;
    border-radius: 12px;
    gap: 8px;
`
const SearchInput = styled.TextInput`
    flex: 1;
    font-size: 15px;
    color: ${({ theme }) => theme.color.dark};
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
const EmptyText = styled.Text`
    font-size: 14px;
    color: ${({ theme }) => theme.color.gray};
    text-align: center;
    line-height: 20px;
`
