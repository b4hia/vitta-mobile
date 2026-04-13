import { TouchableHighlightProps } from "react-native"
import { ThemeColors } from "../styles"
import {
    TOrderPageOptions,
    TUCCardOptions,
    TUCPageOptions,
    TReadingRouteCardOptions,
    TCondominiumPageOptions,
    TBlocksPageOptions,
    TBlockCardOptions,
    TCondominiumCardOptions,
} from "../contexts/Modal"
import { theme } from "@/styles/theme"

export interface IButtonBase {
    severity?: ThemeColors
    outline?: boolean
    btnIcon?: boolean
    margin?: keyof typeof theme.spacing
}

export interface IButton extends TouchableHighlightProps, IButtonBase {
    label: string | JSX.Element
}

export enum ActionsButtonType {
    ACTION,
    ALERT,
}

type ActionsButtonAlertProps = {
    confirmButtonTestID?: string
    onConfirmLabel?: string | JSX.Element
    onConfirm: (() => Promise<void>) | (() => void)
    confirmButtonBackgroundColor?: ThemeColors
    disableConfirm?: boolean
}

export type ActionsButtonAlertType = ActionsButtonAlertProps & {
    type: ActionsButtonType.ALERT
}

export type ActionsButtonActionType = ActionsButtonAlertProps & {
    closeButtonTestID?: string
    type: ActionsButtonType.ACTION
    onCloseLabel?: string
    onClose: (() => Promise<void>) | (() => void)
    cancelButtonBackgroundColor?: ThemeColors
    disableClose?: boolean
}

export interface IActionButtonsContainer {
    aboveButtons?: boolean
}

export type TActionsButton = (ActionsButtonAlertType | ActionsButtonActionType) &
    IActionButtonsContainer

export enum OptionButtonType {
    HOME,
    CONDOMINIUM,
    BLOCK,
    UC,
    EXECUTE_ORDER,
    READING_ROUTE,
}

export enum OptionButtonMode {
    CARD_OPTIONS,
    PAGE_OPTIONS,
}

type HomePageOptions = {
    data?: never
    mode: OptionButtonMode.PAGE_OPTIONS
    type: OptionButtonType.HOME
}
type BlocksPageOptions = {
    data: TBlocksPageOptions
    mode: OptionButtonMode.PAGE_OPTIONS
    type: OptionButtonType.BLOCK
}
type UCSPageOptions = {
    data: TUCPageOptions
    mode: OptionButtonMode.PAGE_OPTIONS
    type: OptionButtonType.UC
}
type CondominiumPageOptions = {
    data: never
    mode: OptionButtonMode.PAGE_OPTIONS
    type: OptionButtonType.CONDOMINIUM
}
type ReadingRouteCondominiumPageOptions = {
    data: TCondominiumPageOptions
    mode: OptionButtonMode.PAGE_OPTIONS
    type: OptionButtonType.CONDOMINIUM
}
type ServiceOrdersPageOptions = {
    data: TOrderPageOptions
    mode: OptionButtonMode.PAGE_OPTIONS
    type: OptionButtonType.EXECUTE_ORDER
}
type CondominiumCardOptions = {
    data: TCondominiumCardOptions
    mode: OptionButtonMode.CARD_OPTIONS
    type: OptionButtonType.CONDOMINIUM
}
type BlockCardOptions = {
    data: TBlockCardOptions
    mode: OptionButtonMode.CARD_OPTIONS
    type: OptionButtonType.BLOCK
}
type UCCardOptions = {
    data: TUCCardOptions
    mode: OptionButtonMode.CARD_OPTIONS
    type: OptionButtonType.UC
}
type ReadingRoutePageOptions = {
    data?: never
    mode: OptionButtonMode.PAGE_OPTIONS
    type: OptionButtonType.READING_ROUTE
}
type ReadingRouteCardOptions = {
    data: TReadingRouteCardOptions
    mode: OptionButtonMode.CARD_OPTIONS
    type: OptionButtonType.READING_ROUTE
}

type TOptionsTypes =
    | BlocksPageOptions
    | UCSPageOptions
    | ServiceOrdersPageOptions
    | CondominiumCardOptions
    | BlockCardOptions
    | UCCardOptions
    | ReadingRouteCardOptions
    | ReadingRoutePageOptions
    | CondominiumPageOptions
    | ReadingRouteCondominiumPageOptions
    | HomePageOptions

export type TOptionButton = TOptionsTypes & {
    color?: ThemeColors.WHITE | ThemeColors.DARK
    mode: OptionButtonMode
    type: OptionButtonType
    testID?: string
}
