import { useEffect, useState } from "react"
import {
    ActivityIndicator,
    FlatList,
    RefreshControl,
    Modal,
    Alert,
    TouchableOpacity,
} from "react-native"
import { Ionicons } from "@expo/vector-icons"
import {
    ApprovalStatus,
    ApprovalType,
    IApprovalRequest,
    PayloadClinicApproval,
    PayloadDoctorApproval,
} from "@/interfaces/services/approvals"
import dayjs from "dayjs"
import { useApprovalsContext } from "./approvalsContext"
import { useNotification } from "@/contexts/notification"
import { theme } from "@/styles/theme"
import {
    CardIcon,
    Card,
    ActionRow,
    ApproveButton,
    ApproveButtonText,
    CancelButton,
    CancelButtonText,
    Content,
    EmptyState,
    EmptyText,
    EmptyTitle,
    Header,
    IconWrapper,
    ModalContent,
    ModalHeader,
    ModalOverlay,
    ModalScroll,
    ModalTitle,
    RejectButton,
    RejectButtonText,
    RejectContainer,
    CardDate,
    CardInfo,
    CardSubtitle,
    CardTitle,
    DetailLabel,
    DetailSection,
    DetailSubValue,
    DetailValue,
    ConfirmRejectButton,
    ConfirmRejectText,
    LoadingContainer,
    RejectInput,
    Safe,
    Subtitle,
    Title,
    BadgeRow,
    BadgeText,
    CopyBadge,
} from "./style"
import * as Clipboard from "expo-clipboard"

export default function ApprovalsScreen() {
    const { approvals, loading, refreshing, fetchApprovals, handleReview } = useApprovalsContext()
    const { Toast } = useNotification()
    const [selectedRequest, setSelectedRequest] = useState<IApprovalRequest | null>(null)
    const [isRejecting, setIsRejecting] = useState(false)
    const [rejectReason, setRejectReason] = useState("")

    useEffect(() => {
        fetchApprovals()
    }, [fetchApprovals])

    const onRefresh = () => {
        fetchApprovals(false)
    }
    const openModal = (item: IApprovalRequest) => {
        setSelectedRequest(item)
        setIsRejecting(false)
        setRejectReason("")
    }
    const closeModal = () => {
        setSelectedRequest(null)
        setIsRejecting(false)
        setRejectReason("")
    }

    const onApprove = async () => {
        if (!selectedRequest) return
        const success = await handleReview(selectedRequest.id, ApprovalStatus.APPROVED)
        if (success) closeModal()
    }

    const onRejectConfirm = async () => {
        if (!selectedRequest) return
        if (!rejectReason.trim()) {
            Alert.alert("Atenção", "Por favor, informe o motivo da rejeição.")
            return
        }
        const success = await handleReview(
            selectedRequest.id,
            ApprovalStatus.REJECTED,
            rejectReason
        )
        if (success) closeModal()
    }

    const handleCopy = async (text: string, label: string) => {
        await Clipboard.setStringAsync(text)
        Toast.show(`${label} copiado!`)
    }

    const renderItem = ({ item }: { item: IApprovalRequest }) => {
        const isDoctor = item.type === ApprovalType.BECOME_DOCTOR
        const docPayload = item.payload as PayloadDoctorApproval
        const clinicPayload = item.payload as PayloadClinicApproval
        const isIndependent = isDoctor && docPayload.is_independent
        const title = isDoctor ? docPayload.full_name : clinicPayload.corporate_name
        let subtitle = isDoctor
            ? `CRM: ${docPayload.document_identifier}`
            : `CNPJ: ${clinicPayload.cpf_cnpj}`

        if (isIndependent) subtitle += " • Médico Autônomo"

        return (
            <Card activeOpacity={0.7} onPress={() => openModal(item)}>
                <CardIcon isDoctor={isDoctor}>
                    <Ionicons
                        name={isDoctor ? "medical" : "business"}
                        size={24}
                        color={theme.color.primary}
                    />
                </CardIcon>
                <CardInfo>
                    <CardTitle numberOfLines={1}>{title}</CardTitle>
                    <CardSubtitle>{subtitle}</CardSubtitle>
                    <CardDate>
                        Enviado em {dayjs(item.created_at).format("DD/MM/YYYY HH:mm")}
                    </CardDate>
                </CardInfo>
                <Ionicons name="chevron-forward" size={20} color={theme.color.gray} />
            </Card>
        )
    }

    return (
        <Safe>
            <Header>
                <Title>Aprovações</Title>
                <Subtitle>Gerencie as solicitações pendentes</Subtitle>
            </Header>

            <Content>
                {loading && !refreshing ? (
                    <LoadingContainer>
                        <ActivityIndicator size="large" color={theme.color.primary} />
                    </LoadingContainer>
                ) : (
                    <FlatList
                        data={approvals}
                        keyExtractor={(item) => item.id}
                        renderItem={renderItem}
                        contentContainerStyle={{ padding: 24, paddingBottom: 100 }}
                        showsVerticalScrollIndicator={false}
                        refreshControl={
                            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
                        }
                        ListEmptyComponent={
                            <EmptyState>
                                <IconWrapper>
                                    <Ionicons
                                        name="checkmark-done-circle-outline"
                                        size={48}
                                        color={theme.color.primary}
                                    />
                                </IconWrapper>
                                <EmptyTitle>Tudo em dia!</EmptyTitle>
                                <EmptyText>
                                    Não há nenhuma solicitação de clínica ou médico aguardando
                                    aprovação no momento.
                                </EmptyText>
                            </EmptyState>
                        }
                    />
                )}
            </Content>
            <Modal
                visible={!!selectedRequest}
                animationType="slide"
                transparent={true}
                onRequestClose={closeModal}
            >
                <ModalOverlay>
                    <ModalContent>
                        {selectedRequest &&
                            (() => {
                                // 👇 Extraindo variáveis aqui para deixar o JSX super limpo
                                const isDoctor = selectedRequest.type === ApprovalType.BECOME_DOCTOR
                                const docPayload = selectedRequest.payload as PayloadDoctorApproval
                                const clinicPayload =
                                    selectedRequest.payload as PayloadClinicApproval
                                const isIndependent = isDoctor && docPayload.is_independent
                                const linkedClinicData = isIndependent
                                    ? docPayload.clinic_data
                                    : null

                                return (
                                    <>
                                        <ModalHeader>
                                            <ModalTitle>Detalhes da Solicitação</ModalTitle>
                                            <TouchableOpacity onPress={closeModal}>
                                                <Ionicons
                                                    name="close"
                                                    size={24}
                                                    color={theme.color.dark}
                                                />
                                            </TouchableOpacity>
                                        </ModalHeader>

                                        <ModalScroll showsVerticalScrollIndicator={false}>
                                            <DetailSection>
                                                <DetailLabel>Tipo de Solicitação</DetailLabel>
                                                <DetailValue>
                                                    {isDoctor
                                                        ? "Cadastro de Médico"
                                                        : "Cadastro de Clínica"}
                                                    {isIndependent && " (Autônomo)"}
                                                </DetailValue>
                                            </DetailSection>

                                            <DetailSection>
                                                <DetailLabel>Solicitante</DetailLabel>
                                                <DetailValue>
                                                    {selectedRequest.requester?.first_name}{" "}
                                                    {selectedRequest.requester?.last_name}
                                                </DetailValue>
                                                <DetailSubValue>
                                                    {selectedRequest.requester?.email}
                                                </DetailSubValue>
                                            </DetailSection>

                                            <DetailSection>
                                                <DetailLabel>Dados do Perfil</DetailLabel>
                                                <DetailValue>
                                                    {isDoctor
                                                        ? docPayload.full_name
                                                        : clinicPayload.corporate_name}
                                                </DetailValue>
                                                <BadgeRow>
                                                    <CopyBadge
                                                        activeOpacity={0.7}
                                                        onPress={() =>
                                                            handleCopy(
                                                                isDoctor
                                                                    ? docPayload.cpf_cnpj
                                                                    : clinicPayload.cpf_cnpj,
                                                                "Documento"
                                                            )
                                                        }
                                                    >
                                                        <Ionicons
                                                            name="copy-outline"
                                                            size={14}
                                                            color={theme.color.primary}
                                                        />
                                                        <BadgeText>
                                                            {isDoctor
                                                                ? `CPF: ${docPayload.cpf_cnpj}`
                                                                : `CNPJ: ${clinicPayload.cpf_cnpj}`}
                                                        </BadgeText>
                                                    </CopyBadge>

                                                    {isDoctor && (
                                                        <CopyBadge
                                                            activeOpacity={0.7}
                                                            onPress={() =>
                                                                handleCopy(
                                                                    docPayload.document_identifier,
                                                                    "CRM"
                                                                )
                                                            }
                                                        >
                                                            <Ionicons
                                                                name="copy-outline"
                                                                size={14}
                                                                color={theme.color.primary}
                                                            />
                                                            <BadgeText>
                                                                CRM:{" "}
                                                                {docPayload.document_identifier}
                                                            </BadgeText>
                                                        </CopyBadge>
                                                    )}
                                                </BadgeRow>
                                            </DetailSection>
                                            {isIndependent && linkedClinicData && (
                                                <DetailSection
                                                    style={{
                                                        backgroundColor: "#f9fafb",
                                                        padding: 16,
                                                        borderRadius: 12,
                                                    }}
                                                >
                                                    <DetailLabel>Clínica Registrada</DetailLabel>
                                                    <DetailValue>
                                                        {linkedClinicData.corporate_name}
                                                    </DetailValue>

                                                    <BadgeRow>
                                                        <CopyBadge
                                                            activeOpacity={0.7}
                                                            onPress={() =>
                                                                handleCopy(
                                                                    linkedClinicData.cpf_cnpj,
                                                                    "CNPJ da Clínica"
                                                                )
                                                            }
                                                        >
                                                            <Ionicons
                                                                name="copy-outline"
                                                                size={14}
                                                                color={theme.color.primary}
                                                            />
                                                            <BadgeText>
                                                                CNPJ: {linkedClinicData.cpf_cnpj}
                                                            </BadgeText>
                                                        </CopyBadge>
                                                    </BadgeRow>

                                                    <DetailSubValue style={{ marginTop: 8 }}>
                                                        Responsável:{" "}
                                                        {linkedClinicData.responsible_name}
                                                    </DetailSubValue>
                                                    <DetailSubValue>
                                                        Contato: {linkedClinicData.phone}
                                                    </DetailSubValue>
                                                    <DetailSubValue>
                                                        Endereço: {linkedClinicData.address_street},{" "}
                                                        {linkedClinicData.address_number} -{" "}
                                                        {linkedClinicData.address_city}/
                                                        {linkedClinicData.address_state}
                                                    </DetailSubValue>
                                                </DetailSection>
                                            )}

                                            <DetailSection>
                                                <DetailLabel>Evidências Anexadas</DetailLabel>
                                                {selectedRequest.evidenceUrls &&
                                                selectedRequest.evidenceUrls.length > 0 ? (
                                                    selectedRequest.evidenceUrls.map(
                                                        (url, index) => (
                                                            <DetailSubValue key={index}>
                                                                📄 Anexo {index + 1} (Disponível no
                                                                painel web)
                                                            </DetailSubValue>
                                                        )
                                                    )
                                                ) : (
                                                    <DetailSubValue>
                                                        Nenhum anexo encontrado.
                                                    </DetailSubValue>
                                                )}
                                            </DetailSection>

                                            {isRejecting ? (
                                                <RejectContainer>
                                                    <DetailLabel
                                                        style={{ color: theme.color.danger }}
                                                    >
                                                        Motivo da Rejeição
                                                    </DetailLabel>
                                                    <RejectInput
                                                        placeholder="Descreva o motivo para o usuário..."
                                                        placeholderTextColor={theme.color.gray}
                                                        multiline
                                                        value={rejectReason}
                                                        onChangeText={setRejectReason}
                                                    />
                                                    <ActionRow>
                                                        <CancelButton
                                                            onPress={() => setIsRejecting(false)}
                                                        >
                                                            <CancelButtonText>
                                                                Cancelar
                                                            </CancelButtonText>
                                                        </CancelButton>
                                                        <ConfirmRejectButton
                                                            onPress={onRejectConfirm}
                                                        >
                                                            <ConfirmRejectText>
                                                                Confirmar Rejeição
                                                            </ConfirmRejectText>
                                                        </ConfirmRejectButton>
                                                    </ActionRow>
                                                </RejectContainer>
                                            ) : (
                                                <ActionRow>
                                                    <RejectButton
                                                        onPress={() => setIsRejecting(true)}
                                                    >
                                                        <RejectButtonText>
                                                            Rejeitar
                                                        </RejectButtonText>
                                                    </RejectButton>
                                                    <ApproveButton onPress={onApprove}>
                                                        <ApproveButtonText>
                                                            Aprovar
                                                        </ApproveButtonText>
                                                    </ApproveButton>
                                                </ActionRow>
                                            )}
                                        </ModalScroll>
                                    </>
                                )
                            })()}
                    </ModalContent>
                </ModalOverlay>
            </Modal>
        </Safe>
    )
}
