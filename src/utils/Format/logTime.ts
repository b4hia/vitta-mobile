import { LogTimeType } from "@/interfaces/utils/format"

LogTimeType
export const logTime = (type: LogTimeType, title: string) => {
    if (__DEV__ && process.env.EXPO_PUBLIC_LOG_TIMER === "true") {
        type === LogTimeType.START ? console.time(title) : console.timeEnd(title)
    }
}
