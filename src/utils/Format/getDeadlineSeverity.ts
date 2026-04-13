import { ThemeColors } from "@/interfaces/styles"
import { getDeadlineStatus } from "./getDeadlineStatus"
import { ServiceOrderDeadlineStatusKeys } from "@/interfaces/services/Constants"

export function getDeadlineSeverity(startDate: string | number, endDate: string | number) {
    const status = getDeadlineStatus(startDate, endDate)
    return status === ServiceOrderDeadlineStatusKeys.OS_DL_NORMAL
        ? ThemeColors.SUCCESS
        : status === ServiceOrderDeadlineStatusKeys.OS_DL_ATTENTION
          ? ThemeColors.WARNING
          : ThemeColors.DANGER
}
