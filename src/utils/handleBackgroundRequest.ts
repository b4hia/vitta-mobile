import { logs } from "./Format/logs"
import { logTime } from "./Format/logTime"
import { responseError } from "./Format/responseError"
import { IRequestOptions } from "@/interfaces/common"
import { LogTimeType, LogType } from "@/interfaces/utils/format"

export const handleBackgroundRequest = async <Params extends any[] = never, Response = void>(
    request: (...args: Params) => Promise<Response>,
    requestProps?: Omit<IRequestOptions<Response>, "loadingMessage">,
    ...args: Params
): Promise<Response> => {
    try {
        logTime(LogTimeType.START, `handleBackgroundRequest-${request.name}`)
        const response = await request(...args)
        requestProps && requestProps.onSuccess && (await requestProps.onSuccess(response))
        requestProps &&
            requestProps.sucessMessage &&
            logs(LogType.SUCCESS, requestProps.sucessMessage)
        logs(LogType.SUCCESS, `Response "${request.name}":`, response)
        return response
    } catch (error) {
        const errorMessage =
            responseError(error)?.response?.data?.detail ||
            (requestProps && requestProps.errorMessage)
        logs(LogType.ERROR, `Error "${request.name}":`, errorMessage)
        // requestProps && requestProps.onError && (await requestProps.onError())
        throw error
    } finally {
        requestProps && requestProps.onFinally && (await requestProps.onFinally())
        logTime(LogTimeType.FINISH, `handleBackgroundRequest-${request.name}`)
    }
}
