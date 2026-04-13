import { DateTimeFormat } from "@/interfaces/utils/format"
import dayjs, { Dayjs } from "dayjs"

export class DateTime {
    public date: Dayjs | string

    constructor(dateInput?: string | number | null, utc_zero: boolean = false) {
        if (!dateInput) {
            this.date = ""
        } else if (typeof dateInput === "number") {
            this.date =
                dateInput.toString().length === 13 ? dayjs(dateInput) : dayjs.unix(dateInput)
        } else {
            this.date = dayjs(utc_zero ? `${dateInput}Z` : dateInput)
        }
    }

    format(formatTo: DateTimeFormat | string) {
        return this.date === "" ? "" : (this.date as Dayjs).format(formatTo)
    }

    public static exportFile() {
        return dayjs().format("DD-MM-YYYY-HH-mm-ss")
    }
}
