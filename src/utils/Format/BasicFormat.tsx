import { DateTimeFormat, YesOrNoFormat } from "@/interfaces/utils/format"
import { DateTime } from "./DateTime"
import dayjs from "dayjs"

export function executionPeriodDateTimeBasicFormat(date?: number | string | null) {
    return dayjs
        .utc(typeof date === "number" ? dayjs.unix(date) : date)
        .format(DateTimeFormat.DAY_MONTH)
}

export function completeDateTimeBasicFormat(date?: string | null) {
    return new DateTime(date).format(DateTimeFormat.COMPLETE)
}

export function listWithDelimiterBasicFormat(list: string[], delimiter = ", ") {
    return list.join(delimiter)
}

export function namesWithDelimiterBasicFormat(first: string, last: string) {
    return `${first} - ${last}`
}

export function yesOrNoBasicFormat(condition?: boolean | null) {
    return condition ? YesOrNoFormat.YES : YesOrNoFormat.NO
}

export function truncateTextBasicFormat(text: string, maxLength: number) {
    return text.length > maxLength ? text.substring(0, maxLength) + "..." : text
}
