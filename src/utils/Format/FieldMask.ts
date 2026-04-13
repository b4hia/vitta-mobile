export class FieldMask {
    static cpfCnpj(value?: string | null): string {
        if (!value) return ""
        value = value.replace(/\D/g, "")
        if (value.length <= 3) return value
        let mask, maskPosition
        if (value.length <= 6) {
            mask = /^(\d{3})(\d{1,3})/
            maskPosition = "$1.$2"
        } else if (value.length <= 9) {
            mask = /^(\d{3})(\d{3})(\d{1,3})/
            maskPosition = "$1.$2.$3"
        } else if (value.length <= 11) {
            mask = /^(\d{3})(\d{3})(\d{3})(\d{1,2})/
            maskPosition = "$1.$2.$3-$4"
        } else if (value.length <= 12) {
            mask = /^(\d{2})(\d{3})(\d{3})(\d{4})/
            maskPosition = "$1.$2.$3/$4"
        } else {
            mask = /^(\d{2})(\d{3})(\d{3})(\d{4})(\d{1,2})/
            maskPosition = "$1.$2.$3/$4-$5"
        }
        return value.replace(mask, maskPosition)
    }

    static cep(value?: string): string {
        if (!value) return ""
        const digits = value.replace(/\D/g, "")
        return digits.replace(/^(\d{5})(\d{1,3})/, "$1-$2")
    }

    static removeMask(value?: string | null): string {
        if (!value) return ""
        return value.replace(/\D/g, "")
    }

    static phoneNumber(value?: string | null): string {
        if (!value) return ""

        let digits = value.replace(/\D/g, "")

        if (digits.startsWith("55") && digits.length > 10) {
            digits = digits.substring(2)
        }

        if (digits.length <= 10) {
            return digits.replace(/^(\d{2})(\d{4})(\d{0,4})/, "($1) $2-$3")
        } else {
            return digits.replace(/^(\d{2})(\d{5})(\d{0,4})$/, "($1) $2-$3")
        }
    }
}
