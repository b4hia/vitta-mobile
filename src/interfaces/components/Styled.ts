import { TextProps } from "react-native"
import { ThemeColors } from "../styles"

export enum TextType {
    HEADING,
    TITLE,
    SUBTITLE,
    DEFAULT,
    LABEL,
    SMALL,
}

export enum TextAlign {
    LEFT = "left",
    CENTER = "center",
    RIGHT = "right",
    JUSTIFY = "justify",
    AUTO = "auto",
}

export enum FontWeightKeys {
    LIGHT = "300",
    REGULAR = "400",
    MEDIUM = "500",
    BOLD = "600",
    EXTRA_BOLD = "700",
    BLACK = "800",
}

export interface IStyledTextProps extends TextProps {
    type?: TextType
    color?: ThemeColors
    textAlign?: TextAlign
    fontWeight?: FontWeightKeys
}

export enum TextIconType {
    APPOINTMENTS = "calendar-check",
    CALENDAR = "calendar-days",
    CALENDAR_CHECK = "calendar-check",
    CHAT = "comments",
    DEPENDENTS = "users",
    DOCUMENTS = "file-lines",
    EDIT = "edit",
    EMAIL = "envelope",
    FAVORITES = "star",
    HEALTH_PLAN = "file-medical",
    LOCATION = "location-dot",
    NEWS = "newspaper",
    NOTIFICATION = "bell",
    PHONE = "phone",
    SCHEDULE = "calendar-plus",
    SUPPORT_CHAT = "headset",
    TOKEN_REQUEST = "key",
    UPLOAD = "cloud-arrow-up",
    USER = "user-large",
    WAITING_UPLOAD = "cloud-arrow-up",
}

export interface ITextStyled extends IStyledTextProps {
    iconType?: TextIconType
}
