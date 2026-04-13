import { theme } from "@/styles/theme"
import { IChildrenProps } from "../Common"
import { ThemeColors } from "../styles"

export interface IContainerSafeAreaView {
    defaultHeight?: boolean
}

export interface IScrollViewProps extends IContainerSafeAreaView {
    useScrollView: true
    onRefresh?: () => void
}

export interface IContainerViewProps extends IContainerSafeAreaView {
    useScrollView?: false
    flex?: number
}

export type TContainer = IChildrenProps & IContainerStyle & (IScrollViewProps | IContainerViewProps)

export interface IContainerStyle {
    backgroundColor?: ThemeColors
    padding?: string
    gap?: keyof typeof theme.gap
    extraHeight?: boolean
}
