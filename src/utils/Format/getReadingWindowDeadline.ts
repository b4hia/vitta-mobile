import { getDeadlineStatus } from "./getDeadlineStatus"
import { formatReadingWindowDates } from "./formatReadingWindowDates"

export function getReadingWindowDeadline(dayPeriod: string) {
    const { startDate, endDate } = formatReadingWindowDates(dayPeriod)
    return getDeadlineStatus(startDate, endDate)
}
