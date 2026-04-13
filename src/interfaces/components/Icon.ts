import * as Icons from "@expo/vector-icons"
import {
    OpaqueColorValue,
    TextProps,
    TextStyle,
    TouchableHighlightProps,
    ViewStyle,
} from "react-native"
import { ThemeColors } from "../styles"

/**
 * Interface for all `expo vector-icons`
 *
 * Extended and added features on search into `expo/vector-icons/build/createIconSet.d.ts`
 */
export interface IIcon<T extends keyof typeof Icons> extends TextProps, TouchableHighlightProps {
    /**
     * Select the kind of vector icon family to use and define tha list of name icons
     */
    iconFamily: T
    /**
     * All available icons provided by the `iconFamily` property
     */
    name: keyof (typeof Icons)[T]["glyphMap"]
    /**
     * Icon size
     */
    size?: number
    /**
     * Text and icon color
     * Use iconStyle or nest a Text component if you need different colors.
     * Can be a string or OpaqueColorValue (returned from PlatformColor(..))
     *
     */
    color?: ThemeColors
    /**
     * Border radius of the button
     * Set to 0 to disable.
     *
     */
    borderRadius?: number
    /**
     * Styles applied to the icon only
     * Good for setting margins or a different color.
     *
     */
    iconStyle?: TextStyle
    /**
     * Style prop inherited from TextProps and TouchableWithoutFeedbackProperties
     * Only exist here so we can have ViewStyle or TextStyle
     */
    style?: ViewStyle | TextStyle
    /**
     * Background color of the button. Can be a string or OpaqueColorValue (returned from
     * PlatformColor(..))
     */
    backgroundColor?: string | OpaqueColorValue
}
