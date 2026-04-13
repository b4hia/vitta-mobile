import { GetImpedimentKeys, IImpediment } from "@/interfaces/services/Impediment"
import { IGetImpedimentsAvailables } from "@/interfaces/utils/Format"
import { ServiceOrderTypeKeys } from "@/interfaces/services/Constants"

export function getImpedimentsAvailables({
    data = {},
    serviceTypes,
    entity,
    withoutAllowRead,
}: IGetImpedimentsAvailables): IImpediment[] {
    const serviceOrderTypeValues = Object.values(ServiceOrderTypeKeys)

    return Object.values(data).filter((impediment) => {
        let matchesServiceType = true
        if (serviceTypes) {
            matchesServiceType = serviceTypes.some((type) =>
                impediment[GetImpedimentKeys.IM_SERVICE_APPLIED].includes(type)
            )
        } else {
            const nonServiceOrderTypes = impediment[GetImpedimentKeys.IM_SERVICE_APPLIED].filter(
                (type) => !serviceOrderTypeValues.includes(type as ServiceOrderTypeKeys)
            )
            matchesServiceType = nonServiceOrderTypes.length > 0
        }

        const matchesEntity = impediment[GetImpedimentKeys.IM_ALLOW_ENTITIES].includes(entity)

        let allowedAll = true
        if (withoutAllowRead) {
            allowedAll = !impediment[GetImpedimentKeys.IM_ALLOW_READ_ROUTE]
        }

        return matchesServiceType && matchesEntity && allowedAll
    })
}
