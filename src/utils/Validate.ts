import { TFormError } from "@/interfaces/common"

export class Validate {
    static cpfCnpj(value: string): boolean {
        if (!value) return false
        value = value.replace(/\D/g, "")
        const isCpf = value.length === 11
        if (isCpf ? value.length !== 11 : value.length !== 14) {
            return false
        }

        if (/^(\d)\1+$/.test(value)) {
            return false
        }

        const getDigit = (cpfToValidateArray: number[], factor: number): number => {
            const total = cpfToValidateArray.reduce(
                (acc, digit, index) => acc + digit * (factor - index),
                0
            )
            const remainder = total % 11
            return remainder < 2 ? 0 : 11 - remainder
        }

        const cpfToValidateArray = value.split("").map((num) => parseInt(num, 10))
        const firstPosition = isCpf ? 9 : 12
        const factorWeight = isCpf ? 10 : 5

        const firstDigit = getDigit(cpfToValidateArray.slice(0, firstPosition), factorWeight)
        const lastDigit = getDigit(
            cpfToValidateArray.slice(0, firstPosition).concat(firstDigit),
            factorWeight + 1
        )

        return (
            firstDigit === cpfToValidateArray[firstPosition] &&
            lastDigit === cpfToValidateArray[firstPosition + 1]
        )
    }

    static password(password: string) {
        return (
            password.match(
                /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#\$%\^\&*\)\(+=.,_-])[a-zA-Z\d!@#\$%\^\&*\)\(+=.,_-]+$/
            ) !== null
        )
    }
}

export function handleValidation<FormType extends Record<string, any>>(
    form: FormType,
    validateForm: Partial<Record<keyof FormType, (value: FormType[keyof FormType]) => string>>
): TFormError<FormType> {
    const errors: TFormError<FormType> = {}
    Object.entries(form).forEach(([key, value]) => {
        const validationKey = key as keyof typeof validateForm
        if (validationKey in validateForm) {
            const validation = validateForm[validationKey]
            if (validation) {
                errors[key as keyof FormType] = validation(value)
            }
        }
    })
    return errors
}
