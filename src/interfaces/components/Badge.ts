export enum CountBadgeType {
    UC,
    WAITING_UPLOAD,
    IMPEDIMENT,
    CONDOMINIUM,
}

export interface ICountBadge {
    type: CountBadgeType
    count: number
    totalCount?: number
}
