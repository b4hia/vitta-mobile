import { TextInputProps } from "react-native"

export interface IFeedbackFormField {
    testID?: string
    validMessage?: string | JSX.Element
    invalidMessage?: string | JSX.Element
    infoMessage?: string | JSX.Element
}

export interface IInputFormFieldFormControlProps {
    isFocused?: boolean
    isFilled?: boolean
    isValid?: boolean
    isInvalid?: boolean
}

export interface IInputFormFieldIconContainerProps extends IInputFormFieldFormControlProps {
    hideIconBackground?: boolean
    disabled?: boolean
}

export interface IInputFormFieldFlexContainerProps {
    flexContainer?: number
}
export interface IInputFormFieldIcon extends IInputFormFieldIconContainerProps {
    icon?: JSX.Element
    onIconPress?: () => void
    disabled?: boolean
    testID: string
}

export interface IInputFormField
    extends TextInputProps,
        IFeedbackFormField,
        Omit<IInputFormFieldIcon, "iconTestID">,
        IInputFormFieldFlexContainerProps {
    label?: string
    icon?: JSX.Element
    onIconPress?: () => void
    isValid?: boolean
    isInvalid?: boolean
    flexContainer?: number
    disabled?: boolean
    isOptional?: boolean
    testID: string
}

export enum SortOrder {
    ASCENDING = 1,
    DESCENDING = -1,
}

export interface ISearchInputWithSort {
    onChangeFilter: (value: React.SetStateAction<string>) => void
    filterValue: string
    filterPlaceholder: string
    onChangeSort: (value: React.SetStateAction<SortOrder>) => void
    sort: SortOrder
    onScannerPress?: () => void
}
