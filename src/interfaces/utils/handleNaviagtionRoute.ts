import { AuthRouteMapKeys } from "@/constants/routes"
import { TMainRoutes } from "../routes"
type AuthenticatedRoutes = Omit<TMainRoutes, AuthRouteMapKeys.LOGIN>

export type TGetCurrentHistoryRoutes = {
    [K in keyof AuthenticatedRoutes]: {
        key: string
        name: K
        params: AuthenticatedRoutes[K]
    }
}[keyof AuthenticatedRoutes][]
