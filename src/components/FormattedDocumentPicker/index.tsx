import { useState } from "react"
import { View } from "react-native"
import * as DocumentPicker from "expo-document-picker"
import { Ionicons } from "@expo/vector-icons"
import {
    Label,
    ErrorMessage,
    FileDetails,
    FileName,
    FileSize,
    FileInfoContainer,
    HintText,
    UploadBox,
    UploadText,
    SelectedBox,
    ImagePreview,
    IconBox,
    RemoveButton,
} from "./style"
import { theme } from "@/styles/theme"

export interface DocumentPickerButtonProps {
    label: string
    file: DocumentPicker.DocumentPickerAsset | null
    onFileSelect: (file: DocumentPicker.DocumentPickerAsset | null) => void
    error?: string
    allowedTypes?: string[]
    maxSizeMB?: number
}

export function DocumentPickerButton({
    label,
    file,
    onFileSelect,
    error,
    allowedTypes = ["*/*"],
    maxSizeMB,
}: DocumentPickerButtonProps) {
    const [localError, setLocalError] = useState<string | null>(null)
    const displayError = localError || error
    const pickDocument = async () => {
        setLocalError(null)
        try {
            const result = await DocumentPicker.getDocumentAsync({
                type: allowedTypes,
                copyToCacheDirectory: true,
            })
            if (!result.canceled && result.assets && result.assets.length > 0) {
                const selectedFile = result.assets[0]
                if (maxSizeMB && selectedFile.size) {
                    const sizeInMB = selectedFile.size / (1024 * 1024)
                    if (sizeInMB > maxSizeMB) {
                        setLocalError(`O arquivo deve ter no máximo ${maxSizeMB}MB.`)
                        return
                    }
                }
                onFileSelect(selectedFile)
            }
        } catch (err) {
            console.error("Erro ao selecionar arquivo:", err)
            setLocalError("Ocorreu um erro ao selecionar o arquivo.")
        }
    }

    const removeDocument = () => {
        setLocalError(null)
        onFileSelect(null)
    }

    const formatFileSize = (bytes?: number) => {
        if (!bytes) return ""
        if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`
        return `${(bytes / (1024 * 1024)).toFixed(2)} MB`
    }

    const isImage = file?.mimeType?.startsWith("image/")

    return (
        <View style={{ marginTop: 16, marginBottom: 16, width: "100%" }}>
            <Label>{label}</Label>

            {!file && (
                <UploadBox onPress={pickDocument} activeOpacity={0.7} hasError={!!displayError}>
                    <Ionicons
                        name="cloud-upload-outline"
                        size={32}
                        color={displayError ? theme.color.danger : theme.color.info}
                    />
                    <UploadText hasError={!!displayError}>Clique para anexar arquivo</UploadText>
                    <HintText>
                        {allowedTypes.includes("image/*") &&
                        allowedTypes.includes("application/pdf")
                            ? "PDF, JPG ou PNG."
                            : "Documento válido."}
                        {maxSizeMB ? ` Máx. ${maxSizeMB}MB` : ""}
                    </HintText>
                </UploadBox>
            )}

            {file && (
                <SelectedBox>
                    <FileInfoContainer>
                        {isImage ? (
                            <ImagePreview source={{ uri: file.uri }} />
                        ) : (
                            <IconBox>
                                <Ionicons
                                    name="document-text"
                                    size={24}
                                    color={theme.color.success}
                                />
                            </IconBox>
                        )}

                        <FileDetails>
                            <FileName numberOfLines={1} ellipsizeMode="middle">
                                {file.name}
                            </FileName>
                            <FileSize>{formatFileSize(file.size)}</FileSize>
                        </FileDetails>
                    </FileInfoContainer>

                    <RemoveButton onPress={removeDocument}>
                        <Ionicons name="trash-outline" size={20} color={theme.color.danger} />
                    </RemoveButton>
                </SelectedBox>
            )}

            {!!displayError && <ErrorMessage>{displayError}</ErrorMessage>}
        </View>
    )
}
