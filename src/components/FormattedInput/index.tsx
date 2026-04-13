import { TouchableOpacity, View } from "react-native"
import { Input, Label, ErrorMessage } from "./style"
import { FieldMask } from "@/utils/Format/FieldMask"
import { SanitizeField } from "@/utils/Format/SanitizeField"
import { FormattedInputProps } from "@/interfaces/components/FormattedInput"
import { useState } from "react"
import { Ionicons } from "@expo/vector-icons"
import { theme } from "@/styles/theme"

export function FormattedInput({
    type = "default",
    label,
    error,
    value,
    onChangeText,
    ...rest
}: FormattedInputProps) {
    const [isPasswordVisible, setIsPasswordVisible] = useState(false)
    let displayValue = value
    let keyboardType = rest.keyboardType || "default"
    let autoCapitalize = rest.autoCapitalize || "none"
    let maxLength = rest.maxLength
    let secureTextEntry = rest.secureTextEntry

    switch (type) {
        case "cpf_cnpj":
            displayValue = FieldMask.cpfCnpj(value)
            keyboardType = "numeric"
            maxLength = 18
            break
        case "phone":
            displayValue = FieldMask.phoneNumber(value)
            keyboardType = "phone-pad"
            maxLength = 15
            break
        case "cep":
            displayValue = FieldMask.cep(value)
            keyboardType = "numeric"
            maxLength = 9
            break
        case "email":
            keyboardType = "email-address"
            autoCapitalize = "none"
            break
        case "name":
            autoCapitalize = "words"
            break
        case "password":
            secureTextEntry = !isPasswordVisible
            break
    }

    const handleChange = (text: string) => {
        let cleanText = text
        switch (type) {
            case "cpf_cnpj":
            case "phone":
            case "cep":
                cleanText = FieldMask.removeMask(text)
                break
            case "email":
                cleanText = SanitizeField.email(text)
                break
            case "name":
                cleanText = SanitizeField.phraseOnlyLetters(text)
                cleanText = cleanText
                    .toLowerCase()
                    .replace(/(?:^|\s)\S/g, (char) => char.toUpperCase())
                cleanText = cleanText.replace(/\b(De|Da|Do|Das|Dos)\b/g, (match) =>
                    match.toLowerCase()
                )
                break
        }
        onChangeText(cleanText)
    }

    return (
        <View style={{ width: "100%", marginBottom: 8 }}>
            {label && <Label>{label}</Label>}
            <View style={{ position: "relative", justifyContent: "center" }}>
                <Input
                    value={displayValue}
                    onChangeText={handleChange}
                    keyboardType={keyboardType}
                    autoCapitalize={autoCapitalize}
                    maxLength={maxLength}
                    hasError={!!error}
                    secureTextEntry={secureTextEntry}
                    style={type === "password" ? { paddingRight: 50, ...rest.style } : rest.style}
                    {...rest}
                />

                {type === "password" && (
                    <TouchableOpacity
                        style={{
                            position: "absolute",
                            right: 0,
                            top: 0,
                            bottom: 0,
                            paddingHorizontal: 16,
                            alignItems: "center",
                            justifyContent: "center",
                            backgroundColor: "transparent",
                        }}
                        onPress={() => setIsPasswordVisible(!isPasswordVisible)}
                        activeOpacity={0.7}
                    >
                        <Ionicons
                            name={isPasswordVisible ? "eye-off-outline" : "eye-outline"}
                            size={24}
                            color={theme.color.lightGray}
                        />
                    </TouchableOpacity>
                )}
            </View>
            {!!error && <ErrorMessage>{error}</ErrorMessage>}
        </View>
    )
}
