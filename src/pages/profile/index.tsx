import React, { useEffect, useState } from "react"
import { Alert, ActivityIndicator } from "react-native"
import { SafeAreaView } from "react-native-safe-area-context"
import { Ionicons } from "@expo/vector-icons"
import styled, { useTheme } from "styled-components/native"
import { useAuth } from "../../contexts/auth"
import userService, { UserProfile } from "../../services/userService"

const MENU_ITEMS = [
    { icon: "person-outline" as const, label: "Dados pessoais", sub: "Nome, e-mail, telefone" },
    { icon: "shield-outline" as const, label: "Segurança", sub: "Senha e biometria" },
    { icon: "notifications-outline" as const, label: "Notificações", sub: "Preferências de alertas" },
    { icon: "help-circle-outline" as const, label: "Ajuda & Suporte", sub: "FAQ e contato" },
    { icon: "document-text-outline" as const, label: "Termos e Privacidade", sub: "Políticas do app" },
]

export default function ProfileScreen() {
    const { user: authUser, logout } = useAuth()
    const theme = useTheme()
    const [profile, setProfile] = useState<UserProfile | null>(null)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        userService.getProfile()
            .then(setProfile)
            .catch(() => {/* usa authUser como fallback */})
            .finally(() => setLoading(false))
    }, [])

    const displayUser = profile ?? authUser
    const firstName = displayUser?.first_name ?? "Usuário"
    const lastName = displayUser?.last_name ?? ""
    const initials = `${firstName.charAt(0)}${lastName.charAt(0)}`.toUpperCase()

    const handleLogout = () =>
        Alert.alert("Sair", "Deseja encerrar sua sessão?", [
            { text: "Cancelar", style: "cancel" },
            { text: "Sair", style: "destructive", onPress: logout },
        ])

    return (
        <Safe>
            <Scroll contentContainerStyle={{ paddingBottom: 40 }}>
                {/* Hero */}
                <HeroSection>
                    <Avatar>
                        {loading
                            ? <ActivityIndicator color={theme.color.white} />
                            : <AvatarText>{initials}</AvatarText>
                        }
                    </Avatar>
                    <FullName>{firstName} {lastName}</FullName>
                    <Email>{displayUser?.email}</Email>
                    {authUser?.roles?.map(role => (
                        <RoleBadge key={role}><RoleBadgeText>{role}</RoleBadgeText></RoleBadge>
                    ))}
                </HeroSection>

                {/* Info cards */}
                {displayUser?.phone && (
                    <InfoRow>
                        <Ionicons name="call-outline" size={18} color={theme.color.primary} />
                        <InfoText>{displayUser.phone}</InfoText>
                    </InfoRow>
                )}
                {(displayUser as UserProfile)?.cpf_cnpj && (
                    <InfoRow>
                        <Ionicons name="id-card-outline" size={18} color={theme.color.primary} />
                        <InfoText>{(displayUser as UserProfile).cpf_cnpj}</InfoText>
                    </InfoRow>
                )}

                {/* Menu */}
                <MenuSection>
                    {MENU_ITEMS.map((item, i) => (
                        <MenuRow key={item.label} last={i === MENU_ITEMS.length - 1} activeOpacity={0.7}>
                            <MenuIconBox>
                                <Ionicons name={item.icon} size={20} color={theme.color.primary} />
                            </MenuIconBox>
                            <MenuInfo>
                                <MenuLabel>{item.label}</MenuLabel>
                                <MenuSub>{item.sub}</MenuSub>
                            </MenuInfo>
                            <Ionicons name="chevron-forward" size={18} color={theme.color.gray} />
                        </MenuRow>
                    ))}
                </MenuSection>

                {/* Logout */}
                <LogoutBtn onPress={handleLogout} activeOpacity={0.8}>
                    <Ionicons name="log-out-outline" size={20} color={theme.color.danger} />
                    <LogoutText>Encerrar sessão</LogoutText>
                </LogoutBtn>

                <VersionText>Vitta Mobile v1.0.0</VersionText>
            </Scroll>
        </Safe>
    )
}

// ─── Styled Components ──────────────────────────────────────────────────────
const Safe = styled(SafeAreaView)`flex: 1; background-color: ${({ theme }) => theme.color.light};`
const Scroll = styled.ScrollView``

const HeroSection = styled.View`
    background-color: ${({ theme }) => theme.color.tertiary};
    padding: 36px 24px 28px;
    align-items: center;
`
const Avatar = styled.View`
    width: 80px; height: 80px; border-radius: 40px;
    background-color: ${({ theme }) => theme.color.primary};
    align-items: center; justify-content: center;
    margin-bottom: 14px;
    border-width: 3px; border-color: rgba(255,255,255,0.2);
`
const AvatarText = styled.Text`font-size: 28px; font-weight: 800; color: ${({ theme }) => theme.color.white};`
const FullName = styled.Text`font-size: 20px; font-weight: 800; color: ${({ theme }) => theme.color.white}; margin-bottom: 4px;`
const Email = styled.Text`font-size: 13px; color: rgba(255,255,255,0.65); margin-bottom: 10px;`
const RoleBadge = styled.View`
    background-color: ${({ theme }) => `${theme.color.primary}44`};
    border-radius: 20px; padding: 4px 12px; margin-top: 4px;
    border-width: 1px; border-color: ${({ theme }) => theme.color.primary};
`
const RoleBadgeText = styled.Text`font-size: 11px; font-weight: 700; color: ${({ theme }) => theme.color.primary};`

const InfoRow = styled.View`
    flex-direction: row; align-items: center; gap: 10px;
    background-color: ${({ theme }) => theme.color.white};
    margin: 8px 20px 0; border-radius: 12px; padding: 14px 16px;
    elevation: 1;
`
const InfoText = styled.Text`font-size: 14px; color: ${({ theme }) => theme.color.dark};`

const MenuSection = styled.View`
    margin: 16px 20px 0;
    background-color: ${({ theme }) => theme.color.white};
    border-radius: 16px; overflow: hidden; elevation: 2;
`
const MenuRow = styled.TouchableOpacity<{ last?: boolean }>`
    flex-direction: row; align-items: center; gap: 14px; padding: 16px;
    border-bottom-width: ${({ last }) => (last ? 0 : 1)}px;
    border-bottom-color: ${({ theme }) => theme.color.lightGray};
`
const MenuIconBox = styled.View`
    width: 38px; height: 38px; border-radius: 12px;
    background-color: ${({ theme }) => `${theme.color.primary}18`};
    align-items: center; justify-content: center;
`
const MenuInfo = styled.View`flex: 1;`
const MenuLabel = styled.Text`font-size: 14px; font-weight: 600; color: ${({ theme }) => theme.color.dark};`
const MenuSub = styled.Text`font-size: 12px; color: ${({ theme }) => theme.color.gray}; margin-top: 1px;`

const LogoutBtn = styled.TouchableOpacity`
    margin: 16px 20px 0; flex-direction: row; align-items: center;
    justify-content: center; gap: 10px;
    background-color: ${({ theme }) => `${theme.color.danger}22`}; border-radius: 14px; padding: 16px;
    border-width: 1px; border-color: ${({ theme }) => `${theme.color.danger}44`};
`
const LogoutText = styled.Text`font-size: 15px; font-weight: 700; color: ${({ theme }) => theme.color.danger};`
const VersionText = styled.Text`text-align: center; font-size: 12px; color: ${({ theme }) => theme.color.gray}; margin-top: 20px;`
