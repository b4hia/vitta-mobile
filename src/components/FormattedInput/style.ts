import styled from "styled-components/native"

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

export const Label = styled.Text`
    font-size: 14px;
    font-weight: 500;
    color: ${({ theme }) => theme.color.gray};
    margin-bottom: 4px;
    margin-left: 4px;
`
