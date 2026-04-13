import { TBasicErrorResponse } from "@/interfaces/services/BasicResponse"

export function responseError<T = string>(error: unknown) {
    return error as TBasicErrorResponse<T>
}
