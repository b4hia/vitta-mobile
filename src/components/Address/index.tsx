import { useState } from "react"
import { View } from "react-native"
import { Picker } from "@react-native-picker/picker"
import { FieldMask } from "@/utils/Format/FieldMask"
import viaCepService from "@/services/viaCep"
import { Input, Label, ErrorMessage, PickerContainer } from "./style.ts"
import { theme } from "@/styles/theme"
import { IAddressData } from "@/interfaces/components/Address.ts"
import { FormattedInput } from "../FormattedInput/index.tsx"

const UFS = [
    "AC",
    "AL",
    "AP",
    "AM",
    "BA",
    "CE",
    "DF",
    "ES",
    "GO",
    "MA",
    "MT",
    "MS",
    "MG",
    "PA",
    "PB",
    "PR",
    "PE",
    "PI",
    "RJ",
    "RN",
    "RS",
    "RO",
    "RR",
    "SC",
    "SP",
    "SE",
    "TO",
]

interface AddressFormProps {
    data: IAddressData
    onChange: (field: keyof IAddressData, value: string) => void
    errors?: Partial<Record<keyof IAddressData, string>>
}

export function AddressForm({ data, onChange, errors = {} }: AddressFormProps) {
    const [lockedFields, setLockedFields] = useState({
        street: !!data.street,
        neighborhood: !!data.neighborhood,
        city: !!data.city,
    })

    const handleCepChange = async (text: string) => {
        const cleanCep = FieldMask.removeMask(text)
        onChange("zip_code", cleanCep)

        if (cleanCep.length === 8) {
            try {
                const cepData = await viaCepService.getAddressByCep(cleanCep)
                if (!cepData.erro) {
                    onChange("street", cepData.logradouro || "")
                    onChange("neighborhood", cepData.bairro || "")
                    onChange("city", cepData.localidade || "")
                    onChange("state", cepData.uf || "")

                    setLockedFields({
                        street: !!cepData.logradouro,
                        neighborhood: !!cepData.bairro,
                        city: !!cepData.localidade,
                    })
                }
            } catch (error) {
                console.error("Erro ao buscar CEP", error)
            }
        } else {
            setLockedFields({ street: false, neighborhood: false, city: false })
        }
    }

    const disabledStyle = { backgroundColor: theme.color.white, color: theme.color.lightGray }

    return (
        <View style={{ width: "100%" }}>
            <FormattedInput
                type="cep"
                label="CEP"
                value={data.zip_code}
                onChangeText={handleCepChange}
                error={errors.zip_code}
                placeholder="Seu cep"
            />
            <Label>Rua / Avenida</Label>
            <Input
                placeholder="Nome da sua rua"
                value={data.street}
                onChangeText={(t) => onChange("street", t)}
                editable={!lockedFields.street}
                style={lockedFields.street ? disabledStyle : {}}
                hasError={!!errors.street}
            />
            {!!errors.street && <ErrorMessage>{errors.street}</ErrorMessage>}

            <View style={{ flexDirection: "row", justifyContent: "space-between", gap: 16 }}>
                <View style={{ flex: 1 }}>
                    <Label>Número</Label>
                    <Input
                        placeholder="Ex: 123"
                        value={data.number}
                        onChangeText={(t) => onChange("number", t)}
                        hasError={!!errors.number}
                    />
                    {!!errors.number && <ErrorMessage>{errors.number}</ErrorMessage>}
                </View>

                {data.complement !== undefined && (
                    <View style={{ flex: 1 }}>
                        <Label>Complemento</Label>
                        <Input
                            placeholder="Apto, Casa..."
                            value={data.complement}
                            onChangeText={(t) => onChange("complement", t)}
                        />
                    </View>
                )}
            </View>

            <Label>Bairro</Label>
            <Input
                placeholder="Bairro"
                value={data.neighborhood}
                onChangeText={(t) => onChange("neighborhood", t)}
                editable={!lockedFields.neighborhood}
                style={lockedFields.neighborhood ? disabledStyle : {}}
                hasError={!!errors.neighborhood}
            />
            {!!errors.neighborhood && <ErrorMessage>{errors.neighborhood}</ErrorMessage>}

            <Label>Cidade</Label>
            <Input
                placeholder="Cidade"
                value={data.city}
                onChangeText={(t) => onChange("city", t)}
                editable={!lockedFields.city}
                style={lockedFields.city ? disabledStyle : {}}
                hasError={!!errors.city}
            />
            {!!errors.city && <ErrorMessage>{errors.city}</ErrorMessage>}

            <Label>Estado (UF)</Label>
            <PickerContainer hasError={!!errors.state}>
                <Picker
                    selectedValue={data.state}
                    onValueChange={(val) => onChange("state", val)}
                    enabled={!lockedFields.city}
                    style={{ color: lockedFields.city ? theme.color.lightGray : "#000" }}
                >
                    <Picker.Item
                        label="Selecione um Estado"
                        value=""
                        color={theme.color.lightGray}
                    />
                    {UFS.map((uf) => (
                        <Picker.Item key={uf} label={uf} value={uf} />
                    ))}
                </Picker>
            </PickerContainer>
            {!!errors.state && <ErrorMessage>{errors.state}</ErrorMessage>}
        </View>
    )
}
