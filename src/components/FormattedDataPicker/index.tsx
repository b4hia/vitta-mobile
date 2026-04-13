import { useState } from "react"
import { View, TouchableOpacity, Text, Platform } from "react-native"
import DateTimePicker, { DateTimePickerEvent } from "@react-native-community/datetimepicker"
import { Input, Label, ErrorMessage } from "./style"
import { DateTime } from "@/utils/Format/DateTime"
import { theme } from "@/styles/theme"

interface FormattedDatePickerProps {
    label?: string
    value: Date | string | null
    mode?: "date" | "time" | "datetime"
    placeholder?: string
    error?: string
    maximumDate?: Date
    minimumDate?: Date
    onChange: (date: Date) => void
}

export function FormattedDatePicker({
    label,
    value,
    mode = "date",
    placeholder,
    error,
    maximumDate,
    minimumDate,
    onChange,
}: FormattedDatePickerProps) {
    const [show, setShow] = useState(false)
    const handleChange = (event: DateTimePickerEvent, selectedDate?: Date) => {
        if (Platform.OS === "android") setShow(false)
        if (selectedDate) onChange(selectedDate)
    }
    const getDisplayFormat = () => {
        if (mode === "time") return "HH:mm"
        if (mode === "datetime") return "DD/MM/YYYY HH:mm"
        return "DD/MM/YYYY"
    }
    const displayValue = value ? new DateTime(value).format(getDisplayFormat()) : ""
    const pickerValue = value ? (value instanceof Date ? value : new Date(value)) : new Date()

    return (
        <View style={{ width: "100%", marginBottom: 8 }}>
            {label && <Label>{label}</Label>}
            <TouchableOpacity onPress={() => setShow(true)} activeOpacity={0.8}>
                <Input
                    placeholder={placeholder || getDisplayFormat()}
                    value={displayValue}
                    editable={false}
                    pointerEvents="none"
                    hasError={!!error}
                />
            </TouchableOpacity>

            {!!error && <ErrorMessage>{error}</ErrorMessage>}

            {show && (
                <DateTimePicker
                    value={pickerValue}
                    mode={mode}
                    display={Platform.OS === "ios" ? "spinner" : "default"}
                    maximumDate={maximumDate}
                    minimumDate={minimumDate}
                    is24Hour={true}
                    onChange={handleChange}
                />
            )}

            {show && Platform.OS === "ios" && (
                <TouchableOpacity
                    onPress={() => setShow(false)}
                    style={{ alignItems: "flex-end", marginTop: 4, marginBottom: 16 }}
                >
                    <Text style={{ color: theme.color.info, fontWeight: "bold" }}>
                        Confirmar {mode === "time" ? "Horário" : "Data"}
                    </Text>
                </TouchableOpacity>
            )}
        </View>
    )
}
