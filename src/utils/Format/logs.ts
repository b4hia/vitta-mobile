import { LogType } from "@/interfaces/utils/format"
import { DateTime } from "./DateTime"
import dayjs from "dayjs"
import { prettifyJSON } from "./prettifyJSON"

export const logs = (type: LogType, title: string, message?: any) => {
    const formattedTitle = `[${new DateTime(dayjs().toISOString()).format("HH:mm:ss")}] ${title}`
    const formattedMessage = message ? prettifyJSON(message) : ""
    type === LogType.SUCCESS
        ? console.info(formattedTitle, formattedMessage)
        : console.error(formattedTitle, formattedMessage)
}
