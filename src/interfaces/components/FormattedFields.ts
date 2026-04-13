import { theme } from "@/styles/theme"
import { ISeverity } from "../Common"
import { TextIconType } from "./Styled"

export interface ICounterFormattedField extends Omit<TDetailFormattedField, "description"> {
    count?: number
    totalCount?: number
}

export type TDetailFormattedField = ISeverity &
    IDetailBodyItem & {
        testID?: string
        title: string
        description?: string | number | JSX.Element
        iconType?: TextIconType
        alignTextOnCenter?: boolean
    }

export interface IDetailBodyItem {
    borderStart?: boolean
    col?: keyof typeof theme.col
}
