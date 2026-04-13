import { ScrollView, View } from "react-native"
import { SafeAreaView } from "react-native-safe-area-context"
import { Ionicons } from "@expo/vector-icons"
import styled, { useTheme } from "styled-components/native"
import { useNavigation } from "@react-navigation/native"
import { SystemAdminRouteMapKeys } from "@/constants/routes"
import { HomeHeader } from "@/components/Home/Header" // Ajuste o caminho se necessário

// ─── Componente do Card de Ação ──────────────────────────────────────────────
const ActionCard = ({ title, icon, onPress, color, badgeCount }: any) => (
    <CardContainer onPress={onPress} activeOpacity={0.75}>
        {/* Badge simulando notificações (ex: aprovações pendentes) */}
        {badgeCount > 0 && (
            <Badge>
                <BadgeText>{badgeCount}</BadgeText>
            </Badge>
        )}
        <IconWrapper bg={`${color}15`}>
            <Ionicons name={icon} size={28} color={color} />
        </IconWrapper>
        <CardTitle>{title}</CardTitle>
    </CardContainer>
)

export function AdminDashboard() {
    const navigation = useNavigation<any>()
    const theme = useTheme()

    return (
        <Safe>
            <Scroll
                showsVerticalScrollIndicator={false}
                contentContainerStyle={{ padding: 20, paddingBottom: 32 }}
            >
                {/* 1. O Header Saudando o Admin */}
                <HomeHeader />

                {/* 2. Destaque Principal (Call to Action) */}
                <CtaButton activeOpacity={0.85} onPress={() => {}}>
                    <Ionicons name="newspaper-outline" size={20} color={theme.color.white} />
                    <CtaText>Publicar Nova Notícia</CtaText>
                    <Ionicons name="arrow-forward" size={18} color={theme.color.white} />
                </CtaButton>

                {/* 3. Título da Seção */}
                <SectionRow>
                    <SectionTitle>Gerenciamento do Sistema</SectionTitle>
                </SectionRow>

                {/* 4. Grid de Opções do Admin */}
                <Grid>
                    <ActionCard
                        title="Aprovações"
                        icon="checkmark-circle"
                        color={theme.color.warning} // Laranja/Amarelo para chamar atenção
                        badgeCount={3} // Número mockado para ficar com cara de admin
                        onPress={() => navigation.navigate(SystemAdminRouteMapKeys.TAB_APPROVALS)}
                    />
                    <ActionCard
                        title="Clínicas"
                        icon="business"
                        color={theme.color.primary}
                        onPress={() => navigation.navigate(SystemAdminRouteMapKeys.TAB_CLINICS)}
                    />
                    <ActionCard
                        title="Usuários"
                        icon="people"
                        color={theme.color.info || "#3b82f6"} // Azul
                        onPress={() => {}}
                    />
                    <ActionCard
                        title="Convênios"
                        icon="shield-checkmark"
                        color={theme.color.success} // Verde
                        onPress={() => {}}
                    />
                    <ActionCard
                        title="Configurações"
                        icon="settings"
                        color={theme.color.gray} // Cinza
                        onPress={() => {}}
                    />
                </Grid>
            </Scroll>
        </Safe>
    )
}

// ─── Styled Components (Padrão Vitta Saúde) ──────────────────────────────────
const Safe = styled(SafeAreaView)`
    flex: 1;
    background-color: ${({ theme }) => theme.color.light};
`
const Scroll = styled.ScrollView``

// Botão CTA (Igual ao Agendar Consulta)
const CtaButton = styled.TouchableOpacity`
    flex-direction: row;
    align-items: center;
    justify-content: center;
    gap: 10px;
    background-color: ${({ theme }) => theme.color.primary};
    border-radius: 16px;
    padding: 16px;
    margin-bottom: 24px;
    elevation: 4;
    shadow-color: #000;
    shadow-opacity: 0.15;
    shadow-radius: 6px;
    shadow-offset: 0px 3px;
`
const CtaText = styled.Text`
    font-size: 16px;
    font-weight: 700;
    color: ${({ theme }) => theme.color.white};
    flex: 1;
    text-align: center;
`

const SectionRow = styled.View`
    margin-bottom: 16px;
`
const SectionTitle = styled.Text`
    font-size: 16px;
    font-weight: 700;
    color: ${({ theme }) => theme.color.tertiary};
`

const Grid = styled.View`
    flex-direction: row;
    flex-wrap: wrap;
    gap: 14px;
`

const CardContainer = styled.TouchableOpacity`
    width: 47.5%; /* Dois cards por linha com um pequeno gap */
    background-color: ${({ theme }) => theme.color.white};
    padding: 20px 16px;
    border-radius: 16px;
    align-items: center;
    elevation: 2;
    shadow-color: #000;
    shadow-opacity: 0.06;
    shadow-radius: 6px;
    shadow-offset: 0px 2px;
    position: relative;
`

const IconWrapper = styled.View<{ bg: string }>`
    width: 56px;
    height: 56px;
    border-radius: 28px;
    align-items: center;
    justify-content: center;
    background-color: ${({ bg }) => bg};
    margin-bottom: 12px;
`

const CardTitle = styled.Text`
    font-size: 14px;
    font-weight: 600;
    color: ${({ theme }) => theme.color.dark};
    text-align: center;
`

const Badge = styled.View`
    position: absolute;
    top: 12px;
    right: 12px;
    background-color: ${({ theme }) => theme.color.danger};
    min-width: 20px;
    height: 20px;
    border-radius: 10px;
    align-items: center;
    justify-content: center;
    padding: 0 6px;
    z-index: 10;
`
const BadgeText = styled.Text`
    font-size: 11px;
    font-weight: bold;
    color: ${({ theme }) => theme.color.white};
`
