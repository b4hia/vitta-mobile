import { SafeAreaView } from "react-native-safe-area-context"
import styled from "styled-components/native"

export const Safe = styled(SafeAreaView)`
    flex: 1;
    background-color: ${({ theme }) => theme.color.light};
`
export const Header = styled.View`
    padding: 24px 24px 16px 24px;
    background-color: ${({ theme }) => theme.color.white};
    elevation: 2;
    shadow-color: #000;
    shadow-opacity: 0.05;
    shadow-radius: 8px;
    shadow-offset: 0px 2px;
    z-index: 10;
`
export const Title = styled.Text`
    font-size: 24px;
    font-weight: bold;
    color: ${({ theme }) => theme.color.tertiary};
`
export const Subtitle = styled.Text`
    font-size: 14px;
    color: ${({ theme }) => theme.color.gray};
    margin-top: 4px;
`
export const Content = styled.View`
    flex: 1;
`
export const LoadingContainer = styled.View`
    flex: 1;
    justify-content: center;
    align-items: center;
`

export const Card = styled.TouchableOpacity`
    flex-direction: row;
    align-items: center;
    background-color: ${({ theme }) => theme.color.white};
    padding: 16px;
    border-radius: 16px;
    margin-bottom: 12px;
    elevation: 1;
    shadow-color: #000;
    shadow-opacity: 0.05;
    shadow-radius: 4px;
    shadow-offset: 0px 2px;
`
export const CardIcon = styled.View<{ isDoctor: boolean }>`
    width: 48px;
    height: 48px;
    border-radius: 24px;
    background-color: ${({ theme, isDoctor }) =>
        isDoctor ? `${theme.color.primary}15` : "#e0f2fe"};
    align-items: center;
    justify-content: center;
    margin-right: 16px;
`
export const CardInfo = styled.View`
    flex: 1;
`
export const CardTitle = styled.Text`
    font-size: 16px;
    font-weight: bold;
    color: ${({ theme }) => theme.color.dark};
    margin-bottom: 2px;
`
export const CardSubtitle = styled.Text`
    font-size: 13px;
    color: ${({ theme }) => theme.color.gray};
    margin-bottom: 4px;
`
export const CardDate = styled.Text`
    font-size: 11px;
    color: ${({ theme }) => theme.color.gray};
    font-style: italic;
`

export const EmptyState = styled.View`
    align-items: center;
    justify-content: center;
    padding: 32px;
    margin-top: 40px;
`
export const IconWrapper = styled.View`
    width: 80px;
    height: 80px;
    border-radius: 40px;
    background-color: ${({ theme }) => theme.color.primary}15;
    align-items: center;
    justify-content: center;
    margin-bottom: 16px;
`
export const EmptyTitle = styled.Text`
    font-size: 18px;
    font-weight: bold;
    color: ${({ theme }) => theme.color.dark};
    margin-bottom: 8px;
`
export const EmptyText = styled.Text`
    font-size: 14px;
    color: ${({ theme }) => theme.color.gray};
    text-align: center;
    line-height: 20px;
`

// STYLED COMPONENTS - MODAL
export const ModalOverlay = styled.View`
    flex: 1;
    background-color: rgba(0, 0, 0, 0.5);
    justify-content: flex-end;
`
export const ModalContent = styled.View`
    background-color: ${({ theme }) => theme.color.white};
    border-top-left-radius: 24px;
    border-top-right-radius: 24px;
    padding: 24px;
    max-height: 85%;
`
export const ModalHeader = styled.View`
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 24px;
`
export const ModalTitle = styled.Text`
    font-size: 18px;
    font-weight: bold;
    color: ${({ theme }) => theme.color.dark};
`
export const ModalScroll = styled.ScrollView``

export const DetailSection = styled.View`
    margin-bottom: 20px;
`
export const DetailLabel = styled.Text`
    font-size: 12px;
    font-weight: bold;
    color: ${({ theme }) => theme.color.gray};
    text-transform: uppercase;
    margin-bottom: 4px;
`
export const DetailValue = styled.Text`
    font-size: 16px;
    font-weight: 600;
    color: ${({ theme }) => theme.color.dark};
`
export const DetailSubValue = styled.Text`
    font-size: 14px;
    color: ${({ theme }) => theme.color.gray};
    margin-top: 2px;
`

export const ActionRow = styled.View`
    flex-direction: row;
    justify-content: space-between;
    gap: 12px;
    margin-top: 24px;
    margin-bottom: 24px;
`
export const RejectButton = styled.TouchableOpacity`
    flex: 1;
    padding: 16px;
    border-radius: 12px;
    background-color: ${({ theme }) => theme.color.danger}15;
    align-items: center;
`
export const RejectButtonText = styled.Text`
    color: ${({ theme }) => theme.color.danger};
    font-weight: bold;
    font-size: 15px;
`
export const ApproveButton = styled.TouchableOpacity`
    flex: 1;
    padding: 16px;
    border-radius: 12px;
    background-color: ${({ theme }) => theme.color.success};
    align-items: center;
`
export const ApproveButtonText = styled.Text`
    color: ${({ theme }) => theme.color.white};
    font-weight: bold;
    font-size: 15px;
`

export const RejectContainer = styled.View`
    margin-top: 16px;
    padding: 16px;
    background-color: ${({ theme }) => theme.color.light};
    border-radius: 16px;
`
export const RejectInput = styled.TextInput`
    background-color: ${({ theme }) => theme.color.white};
    border-width: 1px;
    border-color: ${({ theme }) => theme.color.lightGray};
    border-radius: 8px;
    padding: 12px;
    font-size: 14px;
    color: ${({ theme }) => theme.color.dark};
    margin-top: 8px;
    min-height: 80px;
    text-align-vertical: top;
`
export const CancelButton = styled.TouchableOpacity`
    flex: 1;
    padding: 14px;
    border-radius: 12px;
    background-color: ${({ theme }) => theme.color.lightGray};
    align-items: center;
`
export const CancelButtonText = styled.Text`
    color: ${({ theme }) => theme.color.dark};
    font-weight: bold;
    font-size: 14px;
`
export const ConfirmRejectButton = styled.TouchableOpacity`
    flex: 1;
    padding: 14px;
    border-radius: 12px;
    background-color: ${({ theme }) => theme.color.danger};
    align-items: center;
`
export const ConfirmRejectText = styled.Text`
    color: ${({ theme }) => theme.color.white};
    font-weight: bold;
    font-size: 14px;
`
export const BadgeRow = styled.View`
    flex-direction: row;
    flex-wrap: wrap;
    gap: 8px;
    margin-top: 8px;
    margin-bottom: 4px;
`

export const CopyBadge = styled.TouchableOpacity`
    flex-direction: row;
    align-items: center;
    background-color: ${({ theme }) => theme.color.primary}15;
    padding: 6px 10px;
    border-radius: 8px;
    gap: 6px;
`

export const BadgeText = styled.Text`
    font-size: 13px;
    font-weight: 700;
    color: ${({ theme }) => theme.color.primary};
`
