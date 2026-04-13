export interface IWebSocketContext {
    isWebSocketConnected: boolean
    sendMessage: (message: string) => void
}
