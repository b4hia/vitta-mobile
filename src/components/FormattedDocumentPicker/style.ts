import styled from "styled-components/native"

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
    margin-bottom: 4px; /* Dá um respiro pequeno entre o texto e o Input */
    margin-left: 4px;
`
export const UploadBox = styled.TouchableOpacity<{ hasError: boolean }>`
    border-width: 1.5px;
    border-style: dashed;
    border-color: ${({ hasError, theme }) => (hasError ? theme.color.danger : "#d1d5db")};
    border-radius: 8px;
    padding: 24px 16px;
    align-items: center;
    justify-content: center;
    background-color: ${({ hasError }) => (hasError ? "#fef2f2" : "#f9fafb")};
    margin-top: 8px;
`

export const UploadText = styled.Text<{ hasError: boolean }>`
    margin-top: 8px;
    font-size: 14px;
    font-weight: 500;
    color: ${({ hasError, theme }) => (hasError ? theme.color.danger : "#4b5563")};
`

export const HintText = styled.Text`
    margin-top: 4px;
    font-size: 12px;
    color: #9ca3af;
`

export const SelectedBox = styled.View`
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    border-width: 1px;
    border-color: #e5e7eb;
    border-radius: 8px;
    padding: 12px;
    background-color: #ffffff;
    margin-top: 8px;
`

export const FileInfoContainer = styled.View`
    flex-direction: row;
    align-items: center;
    flex: 1;
`

export const ImagePreview = styled.Image`
    width: 40px;
    height: 40px;
    border-radius: 6px;
    background-color: #f3f4f6;
`

export const IconBox = styled.View`
    width: 40px;
    height: 40px;
    border-radius: 6px;
    background-color: #fef3c7;
    align-items: center;
    justify-content: center;
`

export const FileDetails = styled.View`
    flex: 1;
    margin-left: 12px;
    margin-right: 12px;
`

export const FileName = styled.Text`
    font-size: 14px;
    font-weight: 500;
    color: #1f2937;
`

export const FileSize = styled.Text`
    font-size: 12px;
    color: #6b7280;
    margin-top: 2px;
`

export const RemoveButton = styled.TouchableOpacity`
    padding: 8px;
`
