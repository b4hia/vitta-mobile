export class SanitizeField {
    static codeOrName(value: string) {
        return value
            .replace(/[^a-zA-Z0-9\s]/g, "")
            .replace(/^\s/, "")
            .replace(/\s{2,}/g, " ")
    }

    static phraseOnlyLetters(value: string) {
        return value
            .replace(/[^a-zA-Z\s]/g, "")
            .replace(/^\s/, "")
            .replace(/\s{2,}/g, " ")
    }

    static onlyNumberAndLetter(value: string) {
        return value.replace(/[^a-zA-Z0-9]/g, "")
    }

    static onlyNumber(value: string) {
        return value.replace(/[^0-9]/g, "")
    }

    static onlyLetter(value: string) {
        return value.replace(/[^a-zA-Z]/g, "")
    }

    static routeNumber(value: string) {
        const digits = value.replace(/[^0-9-]/g, "")
        let sanitizedValue = ""

        const parts = digits.split("-")
        if (parts.length > 1) {
            sanitizedValue = parts[0] + "-" + parts.slice(1).join("")
        } else {
            sanitizedValue = digits
        }
        sanitizedValue = sanitizedValue.replace(/^-/, "")
        return sanitizedValue
    }

    static cep(value: string) {
        let sanitizedValue = value.replace(/\D/g, "")
        if (sanitizedValue.length > 5) {
            sanitizedValue = `${sanitizedValue.slice(0, 5)}-${sanitizedValue.slice(5, 8)}`
        }
        return sanitizedValue
    }

    static phoneNumber(value: string) {
        let sanitizedValue = value.replace(/\D/g, "")
        if (sanitizedValue.length <= 11) {
            if (sanitizedValue.length <= 10) {
                sanitizedValue = sanitizedValue.replace(/^(\d{2})(\d{4})(\d{4})$/, "($1) $2-$3")
            } else {
                sanitizedValue = sanitizedValue.replace(/^(\d{2})(\d{5})(\d{4})$/, "($1) $2-$3")
            }
        } else {
            if (sanitizedValue.length === 13) {
                sanitizedValue = sanitizedValue.replace(
                    /^(\d{2})(\d{2})(\d{5})(\d{4})$/,
                    "+$1 ($2) $3-$4"
                )
            } else {
                sanitizedValue = sanitizedValue.replace(
                    /^(\d{2})(\d{2})(\d{4})(\d{4})$/,
                    "+$1 ($2) $3-$4"
                )
            }
        }
        return sanitizedValue
    }

    static email(value: string) {
        let sanitizedValue = value.trim()
        sanitizedValue = sanitizedValue.toLowerCase()
        sanitizedValue = sanitizedValue.replace(/[^a-z0-9.@_+-]/g, "")
        sanitizedValue = sanitizedValue.replace(/\.{2,}/g, ".")
        const atIndex = sanitizedValue.indexOf("@")
        if (atIndex !== -1) {
            const [localPart, domain] = sanitizedValue.split("@")
            sanitizedValue = `${localPart.replace(/@/g, "")}@${domain.replace(/@/g, "")}`
        }

        return sanitizedValue
    }

    static barcode(value?: string) {
        if (!value) return ""
        return value.replace(/[\x00-\x1F\x22\x27\x2C\x5C\x60\x7F-\uFFFF]+/g, "")
    }
}
