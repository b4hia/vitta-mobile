import { Linking } from "react-native"

export const openTelephoneNumberApp = (phone: string) => {
    Linking.openURL(`tel:${phone}`)
}
