import {
    IStorageType,
    NofificationActionStatusKeys,
    StorageKeys,
    TGetBlockStorage,
    TGetCondominiumStorage,
    TGetOrderStorage,
    TOnUpdateFirstReadingStatusBlockLevel,
    TOnUpdateFirstReadingStatusCondominiumLevel,
    TOnUpdateFirstReadingStatusUCLevel,
    TOnUpdateReadingRouteStatusBlockLevel,
    TOnUpdateReadingRouteStatusCondominiumLevel,
    TOnUpdateReadingRouteStatusRouteLevel,
    TOnUpdateReadingRouteStatusUCLevel,
    TStorageType,
} from "../storage"
import { ThemeColors } from "../styles"
import { IFileFormData } from "../Common"
import { ApkActionMsgKeys } from "../services/constants"
import { IFAQCard } from "./Card"

interface ModalBaseProps {
    isVisible: boolean
    children: React.ReactNode
}

export type TModalBase = ModalBaseProps

export type TModalActionsForwardHandles = {
    show: (props: TModalActions) => void
    hide: () => void
}

export type TModalActions = Omit<ModalBaseProps, "children" | "isVisible"> & {
    description?: string | JSX.Element
    title: string | JSX.Element
    iconCircleColor?: ThemeColors
    icon?: JSX.Element
    headerTestID?: string
    bodyTestID?: string
    nativeButtonDismissModal?: boolean
}

export type IBlockDetailsModal = TGetBlockStorage &
    IStorageType & {
        blockName: string
    }

export interface ICondominiumDetailsModalBaseProps {
    condominiumName: string
}

export type TCondominiumDetailsModal = TGetCondominiumStorage & ICondominiumDetailsModalBaseProps

export interface IServiceOrderDetailsModal {
    orderId: number
    orderType: string
    orderNumber: string
    severity?: ThemeColors
}

export type TUCDetailsModal = TGetOrderStorage & {
    ucName: string
    cutoffStatus?: string
    severity?: ThemeColors
}

export enum CameraUsageType {
    PHOTO,
    SCANNER,
}

export enum CameraMaskType {
    BARCODE,
    QR_CODE,
    GAUGE_PANEL,
}

export enum CameraOrientationType {
    PORTRAIT,
    LANDSCAPE,
}

export enum CameraTorchType {
    ON = "on",
    OFF = "off",
}

export interface IImagePreviewForwardHandles {
    show: (props: IImagePreview) => void
    hide: () => void
}

export interface IImagePreview {
    photosUri: IFileFormData[]
    onDeletePhoto: (uri: string) => void
    onPhotosChange?: (updatedPhotos: IFileFormData[]) => void
    currentPage: number
    actionsEnable?: boolean
}

export interface TBottomSheet {
    header?: React.ReactNode | React.JSX.Element | string
    body: JSX.Element[]
}

export interface IOptionButtonBottomSheet {
    testID?: string
    icon: JSX.Element
    label: string | JSX.Element
    onPress?: () => void
    disabled?: boolean
}

export interface TBottomSheetForwardHandles {
    show: (data: TBottomSheet) => void
    hide: () => void
}

export interface IServiceOrderImpedimentFoundModal {
    orderNumber: string
    orderId: number
    ucName: string
    cityRegionKey: string
    condominiumKey: string
    blockKey: string
}

export interface IGaugePanelModal {
    onSubmit: (newValue: string) => void
    meterValue?: string | number | null
}

type TDeleteOrderModalReadingRoute = TStorageType<StorageKeys.READING_ROUTES_CITY_REGION> & {
    routeId: number
    cityRegionKey: string
    condominiumKey: string
    blockKey: string
    ucKey: number
    ucName: string
}
type TDeleteOrderModalServiceOrder = TStorageType<StorageKeys.SERVICE_ORDERS_CITY_REGION> & {
    orderKey: number
    orderNumber: string
}
type TDeleteOrderModalFirstReading = TStorageType<StorageKeys.FIRST_READINGS_CITY_REGION> & {
    orderId: number
    cityRegionKey: string
    condominiumKey: string
    blockKey: string
    ucKey: number
    ucName: string
}

export type TDeleteOrderModal =
    | TDeleteOrderModalReadingRoute
    | TDeleteOrderModalServiceOrder
    | TDeleteOrderModalFirstReading

export interface IReadingRouteDetailsModal {
    routeName: string
    routeId: number
    severity?: ThemeColors
}

export type TReadingRouteImpedimentFoundModal = (
    | TOnUpdateReadingRouteStatusRouteLevel
    | TOnUpdateReadingRouteStatusCondominiumLevel
    | TOnUpdateReadingRouteStatusBlockLevel
    | TOnUpdateReadingRouteStatusUCLevel
) & {
    name: string
    routeId: number
    refDate: number
}

export type TFirstReadingImpedimentFoundModal = (
    | TOnUpdateFirstReadingStatusCondominiumLevel
    | TOnUpdateFirstReadingStatusBlockLevel
    | TOnUpdateFirstReadingStatusUCLevel
) & {
    name: string
    orderId: number
    cityRegionKey: string
    condominiumKey: string
}

export interface INotificationDetailsModal {
    type: ApkActionMsgKeys
    title: string
    description: string
    receivedDate: string
    actionStatus: NofificationActionStatusKeys
}

export enum DifferentMeterSerialModalStepKeys {
    HAS_CHANGED_METER,
    HAS_ACCESS_TO_OLD_METER,
}

export interface IDifferentMeterSerialModal {
    defaultStep?: DifferentMeterSerialModalStepKeys
    currentMeterSerial: string
    lastMeterSerial: string
    onSetHasChangedMeter: (hasChanged: boolean) => void
    onSetHasAccessToOldMeter: (hasAccess: boolean) => void
}

export type TFAQModal = Omit<IFAQCard, "id">
