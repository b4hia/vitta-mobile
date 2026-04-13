import styled from "styled-components/native"

export const ScrollContainer = styled.ScrollView`
    flex: 1;
    padding: 24px;
    background-color: ${({ theme }) => theme.color.white};
`
export const Title = styled.Text`
    font-size: 28px;
    font-weight: bold;
    color: ${({ theme }) => theme.color.primary};
    margin-bottom: 8px;
`
export const Subtitle = styled.Text`
    font-size: 16px;
    color: ${({ theme }) => theme.color.gray};
    margin-bottom: 32px;
`

export const Input = styled.TextInput<{ hasError?: boolean }>`
    border-width: 1px;
    border-color: ${({ theme, hasError }) =>
        hasError ? theme.color.danger : theme.color.lightGray};
    border-radius: 8px;
    padding: 16px;
    margin-bottom: ${({ hasError }) => (hasError ? "4px" : "16px")};
    font-size: 16px;
    placeholder-text-color: ${({ theme }) => theme.color.gray};
`
export const ErrorMessage = styled.Text`
    color: ${({ theme }) => theme.color.danger};
    font-size: 12px;
    margin-bottom: 12px;
    margin-left: 4px;
`
export const OptionItem = styled.TouchableOpacity<{ isSelected: boolean }>`
    flex-direction: row;
    align-items: center;
    padding: 16px;
    border-width: 1px;
    /* Se selecionado, usa a cor primária, senão usa cinza claro */
    border-color: ${({ theme, isSelected }) =>
        isSelected ? theme.color.primary : theme.color.lightGray};
    border-radius: 8px;
    margin-bottom: 8px;
    /* Um fundo super claro só para dar destaque quando clicado (opcional) */
    background-color: ${({ theme, isSelected }) => (isSelected ? "#fffbeb" : theme.color.white)};
`
export const OptionText = styled.Text<{ isSelected: boolean }>`
    font-size: 16px;
    color: ${({ theme, isSelected }) => (isSelected ? theme.color.primary : theme.color.gray)};
    font-weight: ${({ isSelected }) => (isSelected ? "bold" : "normal")};
`
export const PickerContainer = styled.View<{ hasError?: boolean }>`
    border-width: 1px;
    border-color: ${({ theme, hasError }) =>
        hasError ? theme.color.danger : theme.color.lightGray};
    border-radius: 8px;
    margin-bottom: ${({ hasError }) => (hasError ? "4px" : "16px")};
    overflow: hidden; /* Garante que o Picker respeite o border-radius */
    background-color: ${({ theme }) => theme.color.white};
`
export const PrimaryButton = styled.TouchableOpacity`
    background-color: ${({ theme }) => theme.color.primary};
    padding: 16px;
    border-radius: 8px;
    align-items: center;
    margin-top: 8px;
    margin-bottom: 16px;
`
export const ButtonText = styled.Text`
    color: ${({ theme }) => theme.color.white};
    font-size: 16px;
    font-weight: bold;
`
export const Label = styled.Text`
    font-size: 14px;
    font-weight: 500;
    color: ${({ theme }) => theme.color.gray};
    margin-bottom: 4px; /* Dá um respiro pequeno entre o texto e o Input */
    margin-left: 4px;
`
export const SecondaryButton = styled.TouchableOpacity`
    background-color: transparent;
    padding: 16px;
    align-items: center;
`
export const SecondaryButtonText = styled.Text`
    color: ${({ theme }) => theme.color.primary};
    font-size: 16px;
    font-weight: bold;
`
