import dayjs from "dayjs"

export const getDayMonthByDay = (day: number) => {
    return dayjs().date(day).format("DD/MMM")
}
