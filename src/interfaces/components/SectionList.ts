import {
    DefaultSectionT,
    SectionListData,
    SectionListProps,
    SectionListRenderItem,
} from "react-native"
import { TextIconType } from "./Styled"

export type TSectionHeaderData<Sections extends {}> = {
    section: SectionListData<
        Sections,
        DefaultSectionT & {
            title: string
            id?: string
        }
    >
}

export interface TSectionList<Sections>
    extends Omit<
        SectionListProps<
            Sections,
            DefaultSectionT & {
                title: string
                id?: string
            }
        >,
        "renderSectionHeader" | "contentContainerStyle" | "stickySectionHeadersEnabled"
    > {
    renderItem: SectionListRenderItem<
        Sections,
        DefaultSectionT & {
            title: string
        }
    >
    iconType?: TextIconType
}

export type TSections<RenderItemProps> = SectionListData<
    RenderItemProps,
    DefaultSectionT & {
        title: string
        id?: string
    }
>[]
