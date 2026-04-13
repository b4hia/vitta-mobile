import { MainRouteMapKeys } from "@/constants/routes"
import { TextIconType } from "./Styled"
import {
    ApkActionMsgKeys,
    ConsumptionUnitCutoffKeys,
    RouteStatusKeys,
    ServiceOrderStatusKeys,
} from "../services/constants"
import { ThemeColors } from "../styles"
import { TOptionButton } from "./Button"
import { IOrderId } from "../services/ServiceOrder"
import {
    TFirstReadingBlocksParams,
    TFirstReadingExecuteOrderParams,
    TFirstReadingOrdersParams,
    TReadingRouteBlocksParams,
    TReadingRouteExecuteOrderParams,
    TReadingRouteOrdersParams,
    TServiceOrderBlocksParams,
    TServiceOrderExecuteOrderParams,
    TServiceOrderOrdersParams,
} from "../routes"
import { NofificationActionStatusKeys } from "../storage"

interface ICardHeaderBaseProps {
    impedimentCount: number
    waitingToUploadCount: number
    orderCount: number
    orderTotalCount: number
}

export interface ICardHeader extends Omit<ICardHeaderBaseProps, "orderCount" | "orderTotalCount"> {
    optionButtonTestID?: string
    type: TextIconType.CONDOMINIUMS | TextIconType.BLOCK | TextIconType.UCS
    optionData: TOptionButton
    title: string
}

export interface IReadingRouteCard {
    routeId: number
    refDate: number
    routeNumber: string
    routeName: string
    impedimentCount: number
    routeStatus: string
    ucCount: number
    ucTotalCount: number
    waitingToUploadCount: number
    condominiumCount: number
    condominiumTotalCount: number
    severity: ThemeColors
    periodStartDate: string
    periodEndDate: string
}

export interface ICondominiumCardBaseProps extends ICardHeaderBaseProps {
    neighborhood: string
    blockCount: number
    blockTotalCount: number
}

export type TCondominiumCardFirstReading = TFirstReadingBlocksParams &
    ICondominiumCardBaseProps & {
        route: MainRouteMapKeys.FIRST_READINGS_BLOCKS
    }
export type TCondominiumCardReadingRoute = TReadingRouteBlocksParams &
    ICondominiumCardBaseProps & {
        route: MainRouteMapKeys.READING_ROUTES_BLOCKS
    }
export type TCondominiumCardServiceOrder = TServiceOrderBlocksParams &
    ICondominiumCardBaseProps & {
        route: MainRouteMapKeys.SERVICE_ORDERS_BLOCKS
    }

export type TCondominiumCard =
    | TCondominiumCardReadingRoute
    | TCondominiumCardServiceOrder
    | TCondominiumCardFirstReading

export interface IBlockCardBaseProps extends ICardHeaderBaseProps {
    orderCount: number
    orderTotalCount: number
    condominiumName: string
}

export type TBlockCardFirstReading = TFirstReadingOrdersParams & {
    route: MainRouteMapKeys.FIRST_READINGS_UCS
}
export type TBlockCardReadingRoute = TReadingRouteOrdersParams & {
    route: MainRouteMapKeys.READING_ROUTES_UCS
}
export type TBlockCardServiceOrder = TServiceOrderOrdersParams & {
    route: MainRouteMapKeys.SERVICE_ORDERS_UCS
    orders: IOrderId[]
}

export type TBlockCard = IBlockCardBaseProps &
    (TBlockCardReadingRoute | TBlockCardServiceOrder | TBlockCardFirstReading)

export enum OrderCardStageType {
    EXECUTION,
    WAITING_UPLOAD,
    FINISHED,
}

export interface IOrderCardBaseProps {
    id: number
    userId: number
    stage: OrderCardStageType
    severity?: ThemeColors
    startDate: string
    endDate?: string
}

export interface IOrderCardCutoffStatusProps {
    cutoffType?: ConsumptionUnitCutoffKeys | null
    cutoffStatus: string
}

export interface IOrderCardExecutedStageBaseProps {
    impediment?: string
    currentMeterReading?: string | null
    currentMeterSerial?: string | null
    executionDate: string
}

export interface TOrderCardFirstReadingTypeBaseProps {
    route: MainRouteMapKeys.FIRST_READINGS_EXECUTE
    orderCreationDate: number
}

export interface TOrderCardServiceOrderTypeBaseProps {
    route: MainRouteMapKeys.SERVICE_ORDERS_EXECUTE
    orderNumber: string
    orderType: string
    orderStatus: ServiceOrderStatusKeys
    orderCreationDate: number
}
export interface TOrderCardReadingRouteTypeBaseProps {
    route: MainRouteMapKeys.READING_ROUTES_EXECUTE
    orderMonthRef: string
    orderStatus: RouteStatusKeys
}

export type TOrderCardServiceOrderOnExecution = IOrderCardBaseProps &
    TOrderCardServiceOrderTypeBaseProps &
    IOrderCardCutoffStatusProps & {
        stage: OrderCardStageType.EXECUTION
    }

export type TOrderCardServiceOrderExecuted = IOrderCardBaseProps &
    TOrderCardServiceOrderTypeBaseProps &
    IOrderCardExecutedStageBaseProps &
    IOrderCardCutoffStatusProps & {
        stage: OrderCardStageType.WAITING_UPLOAD | OrderCardStageType.FINISHED
    }

export type TOrderCardFirstReadingOnExecution = IOrderCardBaseProps &
    TOrderCardFirstReadingTypeBaseProps & {
        stage: OrderCardStageType.EXECUTION
    }

export type TOrderCardFirstReadingExecuted = IOrderCardBaseProps &
    TOrderCardFirstReadingTypeBaseProps &
    IOrderCardExecutedStageBaseProps & {
        stage: OrderCardStageType.WAITING_UPLOAD | OrderCardStageType.FINISHED
    }

export type TOrderCardServiceOrder =
    | (TOrderCardServiceOrderOnExecution & TServiceOrderExecuteOrderParams)
    | (TOrderCardServiceOrderExecuted & TServiceOrderExecuteOrderParams)

export type TOrderCardFirstReading =
    | (TOrderCardFirstReadingOnExecution & TFirstReadingExecuteOrderParams)
    | (TOrderCardFirstReadingExecuted & TFirstReadingExecuteOrderParams)

export type TOrderCardReadingRouteOnExecution = IOrderCardBaseProps &
    TOrderCardReadingRouteTypeBaseProps &
    IOrderCardCutoffStatusProps & {
        stage: OrderCardStageType.EXECUTION
    }

export type TOrderCardReadingRouteExecuted = IOrderCardBaseProps &
    TOrderCardReadingRouteTypeBaseProps &
    IOrderCardExecutedStageBaseProps &
    IOrderCardCutoffStatusProps & {
        stage: OrderCardStageType.WAITING_UPLOAD | OrderCardStageType.FINISHED
    }

export type TOrderCardReadingRoute =
    | (TOrderCardReadingRouteOnExecution & TReadingRouteExecuteOrderParams)
    | (TOrderCardReadingRouteExecuted & TReadingRouteExecuteOrderParams)

export type TOrderCard = IOrderCardBaseProps &
    (TOrderCardReadingRoute | TOrderCardServiceOrder | TOrderCardFirstReading)

export interface INotificationCard {
    type: ApkActionMsgKeys
    title: string
    description: string
    messageId: string
    receivedDate: string
    wasSeenDate?: string
    actionStatus: NofificationActionStatusKeys
}

export interface IFAQCard {
    question: string
    answer: string
    id: number
}
