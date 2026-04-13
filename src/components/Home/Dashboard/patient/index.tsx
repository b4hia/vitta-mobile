import { useState, useCallback } from "react"
import { ActivityIndicator, RefreshControl, TouchableOpacity, Alert, View } from "react-native"
import { Ionicons } from "@expo/vector-icons"
import styled, { useTheme, DefaultTheme } from "styled-components/native"
import appointmentService, { Appointment } from "@/services/appointmentService"
import dayjs from "dayjs"
import "dayjs/locale/pt-br"
import { SafeAreaView } from "react-native-safe-area-context"
import { useNavigation, useFocusEffect } from "@react-navigation/native"
import { HomeHeader } from "../../Header"

dayjs.locale("pt-br")

function statusInfo(status: string | undefined, theme: DefaultTheme) {
    switch (status) {
        case "CONFIRMED":
        case "SCHEDULED":
            return {
                bg: `${theme.color.success}22`,
                text: theme.color.success,
                label: "Confirmada",
            }
        case "PENDING":
            return { bg: `${theme.color.warning}22`, text: theme.color.warning, label: "Pendente" }
        case "CANCELLED":
        case "CANCELED":
            return { bg: `${theme.color.danger}22`, text: theme.color.danger, label: "Cancelada" }
        case "COMPLETED":
            return { bg: `${theme.color.info}22`, text: theme.color.info, label: "Concluída" }
        default:
            return { bg: theme.color.lightGray, text: theme.color.dark, label: status || "—" }
    }
}

export default function PatientDashboard() {
    const theme = useTheme()
    const navigation = useNavigation<any>()
    const [appointments, setAppointments] = useState<Appointment[]>([])
    const [loading, setLoading] = useState(true)
    const [refreshing, setRefreshing] = useState(false)
    const [error, setError] = useState(false)
    const fetchAppointments = useCallback(async (silent = false) => {
        if (!silent) setLoading(true)
        setError(false)
        try {
            const data = await appointmentService.getMyAppointments()
            setAppointments(data || [])
        } catch {
            setError(true)
        } finally {
            setLoading(false)
            setRefreshing(false)
        }
    }, [])

    useFocusEffect(
        useCallback(() => {
            fetchAppointments(true)
        }, [fetchAppointments])
    )
    const onRefresh = () => {
        setRefreshing(true)
        fetchAppointments(false)
    }
    const now = dayjs()
    const upcoming = appointments.filter(
        (a) =>
            dayjs(a.scheduled_at).isAfter(now) &&
            a.status !== "CANCELLED" &&
            a.status !== "CANCELED" &&
            a.status !== "COMPLETED"
    )

    const past = appointments
        .filter((a) => dayjs(a.scheduled_at).isBefore(now) || a.status === "COMPLETED")
        .slice(0, 3)

    const handleCancel = (id: string) => {
        Alert.alert("Cancelar consulta", "Tem certeza que deseja cancelar esta consulta?", [
            { text: "Não", style: "cancel" },
            {
                text: "Sim, cancelar",
                style: "destructive",
                onPress: async () => {
                    await appointmentService.cancelAppointment(id, "Cancelado pelo paciente")
                    fetchAppointments(true)
                },
            },
        ])
    }

    return (
        <Safe>
            <Scroll
                showsVerticalScrollIndicator={false}
                contentContainerStyle={{ padding: 20, paddingBottom: 32 }}
                refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
            >
                <HomeHeader />

                {/* CTA */}
                <CtaButton
                    activeOpacity={0.85}
                    onPress={() => navigation.navigate("ScheduleAppointment")}
                >
                    <Ionicons name="calendar-outline" size={20} color={theme.color.white} />
                    <CtaText>Agendar nova consulta</CtaText>
                    <Ionicons name="arrow-forward" size={18} color={theme.color.white} />
                </CtaButton>

                {/* Quick actions */}
                <QuickRow>
                    {(
                        [
                            { icon: "search-outline", label: "Médicos" },
                            { icon: "business-outline", label: "Clínicas" },
                            { icon: "document-text-outline", label: "Resultados" },
                            { icon: "chatbubble-ellipses-outline", label: "Suporte" },
                        ] as const
                    ).map((item) => (
                        <QuickBtn key={item.label} activeOpacity={0.75}>
                            <QuickIcon>
                                <Ionicons name={item.icon} size={21} color={theme.color.primary} />
                            </QuickIcon>
                            <QuickLabel>{item.label}</QuickLabel>
                        </QuickBtn>
                    ))}
                </QuickRow>

                {/* Próximas consultas */}
                <SectionRow>
                    <SectionTitle>Próximas consultas</SectionTitle>
                    {upcoming.length > 0 && (
                        <CountBadge>
                            <CountBadgeText>{upcoming.length}</CountBadgeText>
                        </CountBadge>
                    )}
                </SectionRow>

                {loading && appointments.length === 0 ? (
                    <ActivityIndicator style={{ marginTop: 20 }} color={theme.color.primary} />
                ) : error ? (
                    <EmptyCard>
                        <Ionicons name="cloud-offline-outline" size={36} color={theme.color.gray} />
                        <EmptyText>Não foi possível carregar</EmptyText>
                        <TouchableOpacity onPress={() => fetchAppointments()}>
                            <RetryText>Tentar novamente</RetryText>
                        </TouchableOpacity>
                    </EmptyCard>
                ) : upcoming.length === 0 ? (
                    <EmptyCard>
                        <Ionicons name="calendar-outline" size={36} color={theme.color.gray} />
                        <EmptyText>Nenhuma consulta agendada</EmptyText>
                    </EmptyCard>
                ) : (
                    upcoming.map((a) => (
                        <AppointmentCard key={a.id} item={a} onCancel={() => handleCancel(a.id)} />
                    ))
                )}

                {/* Anteriores */}
                {!loading && past.length > 0 && (
                    <>
                        <SectionRow style={{ marginTop: 8 }}>
                            <SectionTitle>Consultas anteriores</SectionTitle>
                        </SectionRow>
                        {past.map((a) => (
                            <AppointmentCard key={a.id} item={a} muted />
                        ))}
                    </>
                )}
            </Scroll>
        </Safe>
    )
}

// ─── Appointment Card ────────────────────────────────────────────────────────
function AppointmentCard({
    item,
    muted = false,
    onCancel,
}: {
    item: Appointment | any
    muted?: boolean
    onCancel?: () => void
}) {
    const theme = useTheme()
    const s = statusInfo(item.status, theme)
    const date = dayjs(item.scheduled_at)

    const doctorName = item.doctor?.first_name
        ? `${item.doctor.first_name} ${item.doctor.last_name || ""}`
        : (item.doctor?.name ?? "Médico")
    const specialtyName =
        item.specialty?.value ?? item.specialty?.name ?? item.appointment_type ?? "Consulta"
    const clinicName = item.clinic?.corporate_name ?? item.clinic?.name

    return (
        <Card muted={muted} activeOpacity={0.8}>
            <DateBox muted={muted}>
                <DateDay muted={muted}>{date.format("DD")}</DateDay>
                <DateMon muted={muted}>{date.format("MMM").toUpperCase()}</DateMon>
            </DateBox>
            <CardInfo>
                <DoctorName numberOfLines={1}>{doctorName}</DoctorName>
                <Specialty numberOfLines={1}>{specialtyName}</Specialty>
                <CardMeta>
                    <Ionicons name="time-outline" size={12} color={theme.color.gray} />
                    <MetaText>{date.format("HH:mm")}</MetaText>
                    {clinicName && <MetaText numberOfLines={1}>· {clinicName}</MetaText>}
                </CardMeta>
                {onCancel &&
                    !muted &&
                    item.status !== "CANCELLED" &&
                    item.status !== "CANCELED" &&
                    item.status !== "COMPLETED" && (
                        <CancelBtn onPress={onCancel} activeOpacity={0.7}>
                            <CancelText>Cancelar</CancelText>
                        </CancelBtn>
                    )}
            </CardInfo>
            <StatusBadge bg={s.bg}>
                <StatusText color={s.text}>{s.label}</StatusText>
            </StatusBadge>
        </Card>
    )
}

// ─── Styled Components ──────────────────────────────────────────────────────
const Safe = styled(SafeAreaView)`
    flex: 1;
    background-color: ${({ theme }) => theme.color.light};
`
const Scroll = styled.ScrollView``

const CtaButton = styled.TouchableOpacity`
    flex-direction: row;
    align-items: center;
    justify-content: center;
    gap: 10px;
    background-color: ${({ theme }) => theme.color.primary};
    border-radius: 16px;
    padding: 16px;
    margin-bottom: 20px;
    elevation: 4;
`
const CtaText = styled.Text`
    font-size: 16px;
    font-weight: 700;
    color: ${({ theme }) => theme.color.white};
    flex: 1;
    text-align: center;
`
const QuickRow = styled.View`
    flex-direction: row;
    gap: 8px;
    margin-bottom: 24px;
`
const QuickBtn = styled.TouchableOpacity`
    flex: 1;
    align-items: center;
    gap: 5px;
`
const QuickIcon = styled.View`
    width: 50px;
    height: 50px;
    border-radius: 15px;
    background-color: ${({ theme }) => theme.color.white};
    align-items: center;
    justify-content: center;
    elevation: 2;
`
const QuickLabel = styled.Text`
    font-size: 10px;
    font-weight: 600;
    color: ${({ theme }) => theme.color.dark};
    text-align: center;
`
const SectionRow = styled.View`
    flex-direction: row;
    align-items: center;
    gap: 8px;
    margin-bottom: 12px;
`
const SectionTitle = styled.Text`
    font-size: 16px;
    font-weight: 700;
    color: ${({ theme }) => theme.color.tertiary};
`
const CountBadge = styled.View`
    background-color: ${({ theme }) => theme.color.primary};
    border-radius: 10px;
    min-width: 20px;
    height: 20px;
    align-items: center;
    justify-content: center;
    padding: 0 6px;
`
const CountBadgeText = styled.Text`
    font-size: 11px;
    font-weight: 700;
    color: ${({ theme }) => theme.color.white};
`
const Card = styled.TouchableOpacity<{ muted?: boolean }>`
    background-color: ${({ theme }) => theme.color.white};
    border-radius: 16px;
    flex-direction: row;
    align-items: flex-start;
    padding: 14px;
    margin-bottom: 10px;
    elevation: 2;
    gap: 12px;
    opacity: ${({ muted }) => (muted ? 0.72 : 1)};
`
const DateBox = styled.View<{ muted?: boolean }>`
    width: 46px;
    height: 52px;
    border-radius: 12px;
    align-items: center;
    justify-content: center;
    background-color: ${({ theme, muted }) =>
        muted ? theme.color.lightGray : `${theme.color.primary}22`};
`
const DateDay = styled.Text<{ muted?: boolean }>`
    font-size: 18px;
    font-weight: 800;
    color: ${({ theme, muted }) => (muted ? theme.color.gray : theme.color.primary)};
`
const DateMon = styled.Text<{ muted?: boolean }>`
    font-size: 10px;
    font-weight: 700;
    color: ${({ theme, muted }) => (muted ? theme.color.gray : theme.color.primary)};
    margin-top: -2px;
`
const CardInfo = styled.View`
    flex: 1;
`
const DoctorName = styled.Text`
    font-size: 14px;
    font-weight: 700;
    color: ${({ theme }) => theme.color.dark};
    margin-bottom: 2px;
`
const Specialty = styled.Text`
    font-size: 12px;
    color: ${({ theme }) => theme.color.gray};
    margin-bottom: 4px;
`
const CardMeta = styled.View`
    flex-direction: row;
    align-items: center;
    gap: 4px;
`
const MetaText = styled.Text`
    font-size: 12px;
    color: ${({ theme }) => theme.color.gray};
    flex-shrink: 1;
`
const CancelBtn = styled.TouchableOpacity`
    margin-top: 8px;
    align-self: flex-start;
`
const CancelText = styled.Text`
    font-size: 11px;
    font-weight: 600;
    color: ${({ theme }) => theme.color.danger};
`
const StatusBadge = styled.View<{ bg: string }>`
    border-radius: 8px;
    padding: 4px 8px;
    background-color: ${({ bg }) => bg};
`
const StatusText = styled.Text<{ color: string }>`
    font-size: 10px;
    font-weight: 700;
    color: ${({ color }) => color};
`
const EmptyCard = styled.View`
    background-color: ${({ theme }) => theme.color.white};
    border-radius: 16px;
    padding: 32px;
    align-items: center;
    gap: 8px;
    margin-bottom: 16px;
    elevation: 1;
`
const EmptyText = styled.Text`
    font-size: 14px;
    color: ${({ theme }) => theme.color.gray};
    font-weight: 500;
`
const RetryText = styled.Text`
    font-size: 14px;
    font-weight: 600;
    color: ${({ theme }) => theme.color.primary};
`
