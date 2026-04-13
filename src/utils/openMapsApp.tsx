import { IOpenMapsApp } from "@/interfaces/utils/openMapsApp"
import { Linking } from "react-native"

export const openMapsApp = ({
    street,
    streetNumber,
    neighborhood,
    cityRegion,
    zipCode,
}: IOpenMapsApp) => {
    const address = [
        street && streetNumber ? `${street}, ${streetNumber}` : street || streetNumber,
        neighborhood,
        cityRegion,
        zipCode,
    ]
        .filter(Boolean)
        .join(" - ")
        .replace(/\s*-\s*/g, " - ")
        .replace(/\s*,\s*/g, ", ")
        .trim()
    const formattedAddress = encodeURIComponent(address)
    Linking.openURL(`google.navigation:mode=d&q=${formattedAddress}`)
}
