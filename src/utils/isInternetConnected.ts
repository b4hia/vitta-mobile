import * as Network from "expo-network"

export const isInternetConnected = async () => {
    const status = await Network.getNetworkStateAsync()
    return !!(status.isInternetReachable && status.isConnected)
}
