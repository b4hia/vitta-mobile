import dayjs from "dayjs"
export function evidenceFilename(filename: string) {
    const date = dayjs().format("YYYY-MM-DD-HH-mm-SSS")
    return `${date}_${filename}`
}
