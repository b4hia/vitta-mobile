import React, { useEffect, useState } from "react"
import { ActivityIndicator } from "react-native"
import { SafeAreaView } from "react-native-safe-area-context"
import { Ionicons } from "@expo/vector-icons"
import styled from "styled-components/native"
import healthInsuranceService, { HealthInsurancePlan } from "../../services/healthInsuranceService"
import { useAuth } from "../../contexts/auth"

export default function InsuranceScreen() {
    const { user } = useAuth()
    const [plans, setPlans] = useState<HealthInsurancePlan[]>([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        healthInsuranceService.getPlans().then(setPlans).finally(() => setLoading(false))
    }, [])

    return (
        <Safe>
            <Scroll contentContainerStyle={{ padding: 20 }}>
                <Header>
                    <HeaderTitle>Meu Convênio</HeaderTitle>
                </Header>

                <PlanHeroCard>
                    <PlanName>{user?.first_name} {user?.last_name}</PlanName>
                    <PlanNumber>Cartão Ativo</PlanNumber>
                </PlanHeroCard>

                <SectionTitle>Planos disponíveis</SectionTitle>
                {loading ? <ActivityIndicator style={{ marginTop: 20 }} /> : 
                    plans.length > 0 ? plans.map(p => (
                        <PlanCard key={p.id}>
                            <PlanCardLeft>
                                <PlanCardName>{p.name}</PlanCardName>
                                {p.coverage && <PlanCardCoverage>{p.coverage}</PlanCardCoverage>}
                            </PlanCardLeft>
                        </PlanCard>
                    )) : <PlanCardName>Nenhum plano disponível.</PlanCardName>
                }
            </Scroll>
        </Safe>
    )
}

const Safe = styled(SafeAreaView)`flex: 1; background-color: ${({ theme }) => theme.color.light};`
const Scroll = styled.ScrollView``
const Header = styled.View`flex-direction: row; justify-content: space-between; align-items: center; margin-bottom: 20px;`
const HeaderTitle = styled.Text`font-size: 24px; font-weight: 800; color: ${({ theme }) => theme.color.tertiary};`
const PlanHeroCard = styled.View`background-color: ${({ theme }) => theme.color.tertiary}; border-radius: 20px; padding: 22px; margin-bottom: 20px; elevation: 8;`
const PlanName = styled.Text`font-size: 18px; font-weight: 700; color: ${({ theme }) => theme.color.white}; margin-bottom: 6px;`
const PlanNumber = styled.Text`font-size: 16px; color: ${({ theme }) => theme.color.primary}; letter-spacing: 2px;`
const SectionTitle = styled.Text`font-size: 16px; font-weight: 700; color: ${({ theme }) => theme.color.tertiary}; margin-bottom: 12px;`
const PlanCard = styled.View`background-color: ${({ theme }) => theme.color.white}; border-radius: 16px; flex-direction: row; align-items: center; padding: 16px; margin-bottom: 10px; elevation: 2;`
const PlanCardLeft = styled.View`flex: 1;`
const PlanCardName = styled.Text`font-size: 15px; font-weight: 700; color: ${({ theme }) => theme.color.dark};`
const PlanCardCoverage = styled.Text`font-size: 12px; color: ${({ theme }) => theme.color.gray};`
