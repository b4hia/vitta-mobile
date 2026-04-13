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
export const ProfileOption = styled.TouchableOpacity<{ selected: boolean }>`
    padding: 16px;
    border-width: 1px;
    border-color: ${({ selected, theme }) =>
        selected ? theme.color.primary : theme.color.lightGray};
    background-color: ${({ selected }) => (selected ? "#fffbeb" : "transparent")};
    border-radius: 8px;
    margin-bottom: 8px;
`
export const ProfileText = styled.Text<{ selected: boolean }>`
    color: ${({ selected, theme }) => (selected ? theme.color.primary : theme.color.gray)};
    font-weight: ${({ selected }) => (selected ? "bold" : "normal")};
    text-align: center;
`

export const DaysGrid = styled.View`
    flex-direction: row;
    flex-wrap: wrap;
    gap: 8px;
    margin-bottom: 16px;
`
export const DayChip = styled.TouchableOpacity<{ selected: boolean }>`
    width: 42px;
    height: 42px;
    border-radius: 21px;
    justify-content: center;
    align-items: center;
    border-width: 1px;
    border-color: ${({ theme, selected }) => (selected ? theme.color.primary : "#CCC")};
    background-color: ${({ selected }) => (selected ? "#fffbeb" : "#FFF")};
`
export const DayChipText = styled.Text<{ selected: boolean }>`
    font-size: 13px;
    color: ${({ theme, selected }) => (selected ? theme.color.primary : "#666")};
    font-weight: ${({ selected }) => (selected ? "bold" : "normal")};
`
export const InsuranceGrid = styled.View`
    flex-direction: row;
    flex-wrap: wrap;
    gap: 8px;
    margin-bottom: 16px;
`
export const InsuranceChip = styled.TouchableOpacity<{ selected: boolean }>`
    padding: 8px 12px;
    border-radius: 20px;
    border-width: 1px;
    border-color: ${({ theme, selected }) => (selected ? theme.color.primary : "#CCC")};
    background-color: ${({ selected }) => (selected ? "#fffbeb" : "#FFF")};
`
export const InsuranceChipText = styled.Text<{ selected: boolean }>`
    font-size: 12px;
    color: ${({ theme, selected }) => (selected ? theme.color.primary : "#666")};
    font-weight: ${({ selected }) => (selected ? "bold" : "normal")};
`

export const SelectionButton = styled.TouchableOpacity<{ selected?: boolean }>`
    padding: 16px;
    border-width: 1px;
    border-color: ${({ selected, theme }) =>
        selected ? theme.color.primary : theme.color.lightGray};
    background-color: ${({ selected }) => (selected ? "#fffbeb" : "transparent")};
    border-radius: 8px;
    margin-bottom: 8px;
`

export const SelectionText = styled.Text<{ selected?: boolean }>`
    color: ${({ selected, theme }) => (selected ? theme.color.primary : theme.color.gray)};
    font-weight: ${({ selected }) => (selected ? "bold" : "normal")};
`

export const HorizontalScroll = styled.ScrollView`
    flex-direction: row;
    margin-bottom: 16px;
`

export const OperatorCircle = styled.TouchableOpacity<{ selected: boolean }>`
    align-items: center;
    margin-right: 16px;
    width: 80px;
`

export const OperatorInitial = styled.View<{ selected: boolean }>`
    width: 50px;
    height: 50px;
    border-radius: 25px;
    background-color: ${({ selected, theme }) =>
        selected ? theme.color.primary : theme.color.lightGray};
    justify-content: center;
    align-items: center;
    margin-bottom: 4px;
`

export const OperatorInitialText = styled.Text<{ selected: boolean }>`
    color: ${({ selected, theme }) => (selected ? theme.color.primary : theme.color.gray)};
    font-weight: bold;
    font-size: 16px;
`

export const OperatorName = styled.Text`
    font-size: 10px;
    text-align: center;
    color: ${({ theme }) => theme.color.gray};
`

export const DependentsContainer = styled.View`
    margin-top: 24px;
    padding-top: 24px;
    border-top-width: 1px;
    border-top-color: #eee;
`

export const DependentCard = styled.View`
    background-color: #f9fafb;
    padding: 16px;
    border-radius: 8px;
    margin-bottom: 16px;
    border-width: 1px;
    border-color: #e5e7eb;
`

export const DependentTitle = styled.Text`
    font-size: 14px;
    font-weight: bold;
    color: #4b5563;
`
