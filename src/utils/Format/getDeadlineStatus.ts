import { ServiceOrderDeadlineStatusKeys } from "@/interfaces/services/Constants"
import dayjs from "dayjs"

export function getDeadlineStatus(startDate?: string | number, endDate?: string | number) {
    if (!startDate || !endDate) {
        return ServiceOrderDeadlineStatusKeys.OS_DL_NORMAL
    }
    const now = dayjs().unix()
    const startSlaDate = typeof startDate === "number" ? startDate : dayjs(startDate).unix()
    const endSlaDate = typeof endDate === "number" ? endDate : dayjs(endDate).unix()

    if (now < startSlaDate) {
        return ServiceOrderDeadlineStatusKeys.OS_DL_NORMAL
    }

    if (now > endSlaDate) {
        return ServiceOrderDeadlineStatusKeys.OS_DL_LATE
    }

    const totalDuration = endSlaDate - startSlaDate
    const elapsedDuration = now - startSlaDate
    const percentagePassed = (elapsedDuration / totalDuration) * 100

    if (percentagePassed < 50) {
        return ServiceOrderDeadlineStatusKeys.OS_DL_NORMAL
    } else if (percentagePassed <= 75) {
        return ServiceOrderDeadlineStatusKeys.OS_DL_ATTENTION
    } else {
        return ServiceOrderDeadlineStatusKeys.OS_DL_ENDING
    }
}
