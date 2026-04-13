import "./gesture-handler.native"
import { registerRootComponent } from "expo"
import App from "@/App"
// import { getMessaging } from "@react-native-firebase/messaging"
// import { onAddNotifications, onMarkNotificationAsSeen } from "@/storage/notificationStorageHandles"
// import { StorageNotificationReceivedTypeKeys } from "@/interfaces/storage"
// import { INotificationData, NotificationDataKeys } from "@/interfaces/services/WebSocket"

// const messaging = getMessaging()
// messaging.setBackgroundMessageHandler(async (message) => {
//     await onAddNotifications(
//         StorageNotificationReceivedTypeKeys.BACKGROUND,
//         message?.data as undefined | INotificationData
//     )
// })
// messaging.onNotificationOpenedApp(async (message) => {
//     await onMarkNotificationAsSeen(
//         (message?.data as undefined | INotificationData)?.[NotificationDataKeys.ID]
//     )
// })
registerRootComponent(App)
