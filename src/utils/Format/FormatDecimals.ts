export class FormatDecimals {
    public static asMoney(value: number | string | null | undefined): string {
        return this.formatBase(value, { decimals: 2 })
    }

    public static asBillingParameter(value: number | string | null | undefined): string {
        return this.formatBase(value, { decimals: 2 })
    }

    public static asM3(value: number | string | null | undefined): string {
        return this.formatBase(value, { decimals: 3 })
    }

    public static asKg(value: number | string | null | undefined): string {
        return this.formatBase(value, { decimals: 3 })
    }

    public static asGasMaterialValue(value: number | string | null | undefined): string {
        return this.formatBase(value, { decimals: 4 })
    }

    public static asUnitValue(value: number | string | null | undefined): string {
        return this.formatBase(value, { decimals: 4 })
    }

    public static asFactor(
        value: number | string | null | undefined,
        factorParams: number
    ): string {
        return this.formatBase(value, { decimals: factorParams })
    }

    public static parseBrazilianNumber = (value: string | number | null | undefined): number => {
        if (!value) {
            return 0
        }

        if (typeof value === "number") {
            return value
        }

        const parsableString = value.replace(/\./g, "").replace(",", ".")
        const number = parseFloat(parsableString)

        return isNaN(number) ? 0 : number
    }

    private static formatBase(
        value: number | string | null | undefined,
        options: { decimals: number; prefix?: string; suffix?: string }
    ): string {
        const { decimals, prefix = "", suffix = "" } = options
        let numStr = String(value ?? "").trim()
        if (!numStr) {
            const zeroFractional = "0".repeat(decimals)
            return `${prefix}0,${zeroFractional}${suffix}`
        }
        numStr = numStr.replace(",", ".")
        const num = Number(numStr)
        if (isNaN(num)) {
            const zeroFractional = "0".repeat(decimals)
            return `${prefix}0,${zeroFractional}${suffix}`
        }
        const [integerRaw, fractionalRaw = ""] = numStr.split(".")
        const integerPart = integerRaw.replace(/\B(?=(\d{3})+(?!\d))/g, ".")
        const fractionalPart = fractionalRaw.slice(0, decimals).padEnd(decimals, "0")

        return `${prefix}${integerPart},${fractionalPart}${suffix}`
    }
}
