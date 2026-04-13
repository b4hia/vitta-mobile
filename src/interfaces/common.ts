import { ThemeColors } from "../interfaces/styles"
import React from "react"

export interface IChildrenProps {
    children: React.ReactNode | JSX.Element
}

export type TFormError<T> = {
    [key in keyof T]?: string
}

export interface IObjectKey<Data> {
    [key: string]: Data
}

export interface ISeverity {
    severity?: ThemeColors
}

export interface IFileFormData {
    uri: string
    type: string
    name: string
}

export type THandleRequest = <Params extends any[] = never, Response = void>(
    request: (...args: Params) => Promise<Response>,
    requestProps?: IRequestOptions<Response>,
    ...args: Params
) => Promise<Response>

export interface IRequestOptions<ResponseData> {
    loadingMessage?: string
    errorMessage?: string
    sucessMessage?: string
    onSuccess?: (response: ResponseData) => Promise<void> | void
    onError?: (error: any) => Promise<void> | void
    onFinally?: () => Promise<void> | void
}
