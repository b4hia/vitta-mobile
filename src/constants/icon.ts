import { TextIconType } from "@/interfaces/components/Styled"
import { ApkActionMsgKeys } from "@/interfaces/services/constants"

export const iconDescription = {
    [TextIconType.APPOINTMENTS]: "Consultas",
    [TextIconType.SCHEDULE]: "Agendar consulta",
    [TextIconType.HEALTH_PLAN]: "Convênio médico",
    [TextIconType.DOCUMENTS]: "Documentos e laudos",
    [TextIconType.FAVORITES]: "Favoritos",
    [TextIconType.NEWS]: "Notícias",
    [TextIconType.SUPPORT_CHAT]: "Suporte",
    [TextIconType.CHAT]: "Chat com clínica",
    [TextIconType.LOCATION]: "Localização",
    [TextIconType.DEPENDENTS]: "Dependentes",
    [TextIconType.TOKEN_REQUEST]: "Solicitar autorização",
    [TextIconType.USER]: "Meu perfil",
    [TextIconType.EMAIL]: "E-mail",
    [TextIconType.PHONE]: "Telefone",
    [TextIconType.EDIT]: "Editar",
    [TextIconType.NOTIFICATION]: "Notificações",
}

export const notificationIcons = {
    [ApkActionMsgKeys.APK_NEW_TOKEN_REQUEST]: "key",
    [ApkActionMsgKeys.APK_NEW_APPOINTMENT]: "calendar-plus",
    [ApkActionMsgKeys.APK_NEW_FAVORITE]: "star",
    [ApkActionMsgKeys.APK_NEW_APPOINTMENT_FILE]: "file-medical",
    [ApkActionMsgKeys.APK_NEW_NEWS]: "newspaper",
    [ApkActionMsgKeys.APK_CANCEL_APPOINTMENT]: "calendar-times",
    [ApkActionMsgKeys.APK_REMOVE_FAVORITE]: "star-half",
    [ApkActionMsgKeys.APK_REMOVE_APPOINTMENT_FILE]: "file-excel",
}
