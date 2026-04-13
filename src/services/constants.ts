// import { IBasicResponse } from "@/interfaces/services/basicResponse"
// import {
//     IConstantsAllResponse,
//     SystemConstantsKeys,
//     TGetConstantsByNameParam,
//     TGetConstantsByNameParamResponse,
// } from "@/interfaces/services/constants"

// import { getHeaders, setEndpoint } from "@/utils/baseService"
// import { ServiceVittaApi } from "./api"

// const endpoint = (path?: string) => setEndpoint("/constant", path)

// export const ConstantsServices = {
//     async getAll() {
//         try {
//             const response: IBasicResponse<IConstantsAllResponse> = (
//                 await ServiceVittaApi.get(endpoint("/all"), {
//                     headers: await getHeaders(),
//                 })
//             ).data
//             return response.data
//         } catch (error) {
//             throw error
//         }
//     },
//     async getByName<T extends TGetConstantsByNameParam>(name: SystemConstantsKeys) {
//         try {
//             const response: IBasicResponse<TGetConstantsByNameParamResponse<T>> = (
//                 await ServiceMobileApi.get(endpoint(`/${name}`), {
//                     headers: await getHeaders(),
//                 })
//             ).data
//             return response.data
//         } catch (error) {
//             throw error
//         }
//     },
// }
