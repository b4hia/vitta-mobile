import { TextInputProps } from "react-native"

export type InputFormatType =
    | "cpf_cnpj"
    | "email"
    | "phone"
    | "cep"
    | "name"
    | "password"
    | "default"

export interface FormattedInputProps extends Omit<TextInputProps, "onChangeText"> {
    type?: InputFormatType
    label?: string
    error?: string
    value: string
    onChangeText: (text: string) => void
}
