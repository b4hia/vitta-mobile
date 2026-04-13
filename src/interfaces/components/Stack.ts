import { theme } from "@/styles/theme"
import { ViewProps } from "react-native"

export enum StackJustifyContent {
    START = "flex-start",
    CENTER = "center",
    END = "flex-end",
    BETWEEN = "space-between",
    AROUND = "space-around",
    EVENLY = "space-evenly",
}

export enum StackAlignItems {
    START = "flex-start",
    CENTER = "center",
    END = "flex-end",
    BASELINE = "baseline",
    STRETCH = "stretch",
}

export enum StackFlexWrap {
    NOWRAP = "nowrap",
    WRAP = "wrap",
    WRAP_REVERSE = "wrap-reverse",
}
export interface IStack extends ViewProps {
    rowDirection?: boolean
    gap?: keyof typeof theme.gap
    flexCenter?: boolean
    flex?: number
    padding?: string
    margin?: string
    justifyContent?: StackJustifyContent
    alignItems?: StackAlignItems
    col?: keyof typeof theme.col
    flexWrap?: StackFlexWrap
}
