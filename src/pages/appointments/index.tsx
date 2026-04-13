import { useEffect, useState, useMemo } from "react"
import { Alert, ScrollView, TouchableOpacity, View, ActivityIndicator } from "react-native"
import { SafeAreaView } from "react-native-safe-area-context"
import { Ionicons } from "@expo/vector-icons"
import styled, { useTheme } from "styled-components/native"
import { useNavigation } from "@react-navigation/native"
import { useAuth } from "@/contexts/auth"
import appointmentService, { CreateAppointmentDto } from "@/services/appointmentService"
import { useNotification } from "@/contexts/notification"
import dayjs from "dayjs"
import { useScheduleContext } from "./appointmentsContext" // Ajuste o caminho se necessário

export default function ScheduleAppointmentScreen() {
    const theme = useTheme()
    const navigation = useNavigation()
    const { user } = useAuth()
    const { Loading, Toast } = useNotification()
    const {
        clinics,
        specialties,
        agenda,
        fetchClinics,
        fetchAgenda,
        clearAgenda,
        loading: contextLoading,
    } = useScheduleContext()

    const [specialtyId, setSpecialtyId] = useState<string | null>(null)
    const [clinicId, setClinicId] = useState<string | null>(null)
    const [selectedDate, setSelectedDate] = useState<string>("")
    const [doctorId, setDoctorId] = useState<string | null>(null)
    const [selectedTime, setSelectedTime] = useState<string | null>(null)

    useEffect(() => {
        fetchClinics()
    }, [fetchClinics])

    const handleDateChange = (text: string) => {
        let val = text.replace(/\D/g, "")
        if (val.length > 4) val = val.substring(0, 4) + "-" + val.substring(4)
        if (val.length > 7) val = val.substring(0, 7) + "-" + val.substring(7)
        setSelectedDate(val)
        if (agenda !== null) {
            clearAgenda()
            setDoctorId(null)
            setSelectedTime(null)
        }
    }

    const handleSearchAgenda = async () => {
        if (!clinicId || selectedDate.length !== 10) return
        setDoctorId(null)
        setSelectedTime(null)
        await fetchAgenda(clinicId, selectedDate)
    }

    const selectedClinicInfo = useMemo(() => {
        return clinics?.find((c) => c.id === clinicId)
    }, [clinics, clinicId])

    const availableTimes = useMemo(() => {
        if (!selectedClinicInfo || selectedDate.length !== 10 || agenda === null) return []
        const startStr = selectedClinicInfo.attendance_start_time
        const endStr = selectedClinicInfo.attendance_end_time
        const duration = 15
        if (!startStr || !endStr || !duration) return []

        let current = dayjs(`${selectedDate}T${startStr}:00`)
        const end = dayjs(`${selectedDate}T${endStr}:00`)
        const slots: string[] = []
        while (current.isBefore(end)) {
            if (current.add(duration, "minute").isAfter(end)) break
            const timeString = current.format("HH:mm")
            slots.push(timeString)
            current = current.add(duration, "minute")
        }

        return slots
    }, [selectedClinicInfo, selectedDate, agenda])

    // Mock do Médico
    const availableDoctors =
        agenda !== null ? [{ id: "7e11ad4e-95d1-4cec-866b-f312b626b999", name: "Dr. Miguel" }] : []

    const isFormComplete = specialtyId && clinicId && doctorId && selectedDate && selectedTime

    const handleConfirmSchedule = async () => {
        if (!user?.id || !isFormComplete) return

        try {
            Loading.show("Agendando consulta...")
            const scheduledAtIso = dayjs(`${selectedDate}T${selectedTime}:00`).toISOString()

            const payload: CreateAppointmentDto = {
                patient_id: user.id,
                clinic_id: clinicId,
                doctor_id: doctorId,
                specialty_id: specialtyId,
                appointment_type: "CHECKUP",
                scheduled_at: scheduledAtIso,
                health_insurance_plan_id: (user as any).health_insurance_id || undefined,
            }

            await appointmentService.createAppointment(payload)

            Toast.show("Consulta agendada com sucesso!")
            navigation.goBack()
        } catch (error) {
            console.error("Erro ao agendar:", error)
            Alert.alert("Erro", "Não foi possível realizar o agendamento. Tente novamente.")
        } finally {
            Loading.hide()
        }
    }

    return (
        <Safe>
            <Header>
                <TouchableOpacity
                    onPress={() => navigation.goBack()}
                    style={{ padding: 8, marginLeft: -8 }}
                >
                    <Ionicons name="arrow-back" size={24} color={theme.color.dark} />
                </TouchableOpacity>
                <Title>Agendar Consulta</Title>
                <View style={{ width: 24 }} />
            </Header>

            {contextLoading ? (
                <View style={{ flex: 1, justifyContent: "center" }}>
                    <ActivityIndicator size="large" color={theme.color.primary} />
                </View>
            ) : (
                <ScrollView
                    contentContainerStyle={{ padding: 24, paddingBottom: 100 }}
                    showsVerticalScrollIndicator={false}
                >
                    <SectionTitle>1. Especialidade</SectionTitle>
                    <OptionsGrid>
                        {specialties?.map((spec) => (
                            <OptionCard
                                key={spec.id}
                                selected={specialtyId === spec.id}
                                onPress={() => {
                                    setSpecialtyId(spec.id)
                                    clearAgenda()
                                    setClinicId(null)
                                }}
                            >
                                <OptionText selected={specialtyId === spec.id}>
                                    {spec.value}
                                </OptionText>
                            </OptionCard>
                        ))}
                    </OptionsGrid>

                    {specialtyId && (
                        <>
                            <SectionTitle>2. Clínica</SectionTitle>
                            <OptionsGrid>
                                {clinics?.map((clinic) => (
                                    <OptionCard
                                        key={clinic.id}
                                        selected={clinicId === clinic.id}
                                        onPress={() => {
                                            setClinicId(clinic.id)
                                            clearAgenda()
                                        }}
                                    >
                                        <OptionText selected={clinicId === clinic.id}>
                                            {clinic.corporate_name}
                                        </OptionText>
                                    </OptionCard>
                                ))}
                            </OptionsGrid>
                        </>
                    )}

                    {clinicId && (
                        <>
                            <SectionTitle>3. Data da Consulta</SectionTitle>
                            <View style={{ flexDirection: "row", gap: 12 }}>
                                <InputBox
                                    style={{ flex: 1 }}
                                    value={selectedDate}
                                    onChangeText={handleDateChange}
                                    placeholder="YYYY-MM-DD (Ex: 2026-04-13)"
                                    maxLength={10}
                                    keyboardType="numeric"
                                />
                                <SearchDateButton
                                    onPress={handleSearchAgenda}
                                    disabled={selectedDate.length < 10}
                                >
                                    <Ionicons name="search" size={20} color={theme.color.white} />
                                </SearchDateButton>
                            </View>
                            <InputTip>Digite a data desejada e toque na lupa.</InputTip>
                        </>
                    )}

                    {clinicId &&
                        selectedDate.length === 10 &&
                        agenda !== null &&
                        (availableTimes.length === 0 ? (
                            <EmptyAgendaBox>
                                <Ionicons
                                    name="calendar-clear-outline"
                                    size={32}
                                    color={theme.color.gray}
                                />
                                <EmptyAgendaTitle>Sem horários disponíveis</EmptyAgendaTitle>
                                <EmptyAgendaText>
                                    Não há vagas para o dia{" "}
                                    {dayjs(selectedDate).format("DD/MM/YYYY")} ou a clínica está
                                    fechada.
                                </EmptyAgendaText>
                            </EmptyAgendaBox>
                        ) : (
                            <>
                                <SectionTitle>4. Profissional</SectionTitle>
                                <OptionsGrid>
                                    {availableDoctors.map((doc) => (
                                        <OptionCard
                                            key={doc.id}
                                            selected={doctorId === doc.id}
                                            onPress={() => setDoctorId(doc.id)}
                                        >
                                            <OptionText selected={doctorId === doc.id}>
                                                {doc.name}
                                            </OptionText>
                                        </OptionCard>
                                    ))}
                                </OptionsGrid>

                                {doctorId && (
                                    <>
                                        <SectionTitle>5. Horário</SectionTitle>
                                        <OptionsGrid>
                                            {availableTimes.map((time) => (
                                                <OptionCard
                                                    key={time}
                                                    selected={selectedTime === time}
                                                    onPress={() => setSelectedTime(time)}
                                                    style={{ flex: 0, minWidth: 80 }}
                                                >
                                                    <OptionText selected={selectedTime === time}>
                                                        {time}
                                                    </OptionText>
                                                </OptionCard>
                                            ))}
                                        </OptionsGrid>
                                    </>
                                )}
                            </>
                        ))}
                </ScrollView>
            )}

            <Footer>
                <SubmitButton disabled={!isFormComplete} onPress={handleConfirmSchedule}>
                    <SubmitButtonText>Confirmar Agendamento</SubmitButtonText>
                </SubmitButton>
            </Footer>
        </Safe>
    )
}

const Safe = styled(SafeAreaView)`
    flex: 1;
    background-color: ${({ theme }) => theme.color.light};
`
const Header = styled.View`
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    padding: 20px 24px;
    background-color: ${({ theme }) => theme.color.white};
    elevation: 2;
    shadow-color: #000;
    shadow-opacity: 0.05;
    shadow-radius: 4px;
`
const Title = styled.Text`
    font-size: 18px;
    font-weight: bold;
    color: ${({ theme }) => theme.color.dark};
`

const SectionTitle = styled.Text`
    font-size: 16px;
    font-weight: 700;
    color: ${({ theme }) => theme.color.tertiary};
    margin-top: 24px;
    margin-bottom: 12px;
`
const OptionsGrid = styled.View`
    flex-direction: row;
    flex-wrap: wrap;
    gap: 12px;
`
const OptionCard = styled.TouchableOpacity<{ selected: boolean }>`
    flex: 1;
    min-width: 140px;
    padding: 14px;
    border-radius: 12px;
    align-items: center;
    justify-content: center;
    background-color: ${({ theme, selected }) =>
        selected ? theme.color.primary : theme.color.white};
    border-width: 1px;
    border-color: ${({ theme, selected }) =>
        selected ? theme.color.primary : theme.color.lightGray};
`
const OptionText = styled.Text<{ selected: boolean }>`
    font-size: 14px;
    font-weight: 600;
    text-align: center;
    color: ${({ theme, selected }) => (selected ? theme.color.white : theme.color.dark)};
`
const InputBox = styled.TextInput`
    background-color: ${({ theme }) => theme.color.white};
    border-width: 1px;
    border-color: ${({ theme }) => theme.color.lightGray};
    border-radius: 12px;
    padding: 14px 16px;
    font-size: 15px;
    color: ${({ theme }) => theme.color.dark};
`
const SearchDateButton = styled.TouchableOpacity`
    background-color: ${({ theme }) => theme.color.primary};
    border-radius: 12px;
    width: 56px;
    align-items: center;
    justify-content: center;
    opacity: ${({ disabled }) => (disabled ? 0.5 : 1)};
`
const InputTip = styled.Text`
    font-size: 12px;
    color: ${({ theme }) => theme.color.gray};
    margin-top: 6px;
    margin-left: 4px;
`

const EmptyAgendaBox = styled.View`
    margin-top: 24px;
    padding: 24px;
    background-color: ${({ theme }) => theme.color.white};
    border-radius: 16px;
    align-items: center;
    justify-content: center;
    border-width: 1px;
    border-color: ${({ theme }) => theme.color.lightGray};
`
const EmptyAgendaTitle = styled.Text`
    font-size: 16px;
    font-weight: bold;
    color: ${({ theme }) => theme.color.dark};
    margin-top: 12px;
    margin-bottom: 4px;
`
const EmptyAgendaText = styled.Text`
    font-size: 14px;
    color: ${({ theme }) => theme.color.gray};
    text-align: center;
    line-height: 20px;
`

const Footer = styled.View`
    padding: 20px 24px;
    background-color: ${({ theme }) => theme.color.white};
    elevation: 8;
    shadow-color: #000;
    shadow-opacity: 0.1;
    shadow-radius: 8px;
    shadow-offset: 0px -2px;
`
const SubmitButton = styled.TouchableOpacity`
    background-color: ${({ theme }) => theme.color.primary};
    padding: 16px;
    border-radius: 12px;
    align-items: center;
    opacity: ${({ disabled }) => (disabled ? 0.5 : 1)};
`
const SubmitButtonText = styled.Text`
    font-size: 16px;
    font-weight: bold;
    color: ${({ theme }) => theme.color.white};
`
