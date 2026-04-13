import { Alert, TouchableOpacity } from "react-native"
import { Ionicons } from "@expo/vector-icons"
import styled, { useTheme } from "styled-components/native"
import { useAuth } from "@/contexts/auth"
import dayjs from "dayjs"
import { useNavigation } from "@react-navigation/native"

const ROLE_MAP: Record<string, string> = {
    Cliente: "CLIENT",
    "Médico da Clínica": "CLINIC_DOCTOR",
    "Administrador da Clínica": "CLINIC_ADMIN",
    "Administrador do Sistema": "SYSTEM_ADMIN",
}

export function HomeHeader() {
    const { user, switchRole } = useAuth()
    console.log("🔥 RAIO-X DO USUARIO NO HEADER:", JSON.stringify(user, null, 2))
    const theme = useTheme()
    const navigation = useNavigation<any>()
    const firstName = user?.first_name || "Usuário"
    const hour = dayjs().hour()
    const greet = hour < 12 ? "Bom dia" : hour < 18 ? "Boa tarde" : "Boa noite"
    const hasMultipleRoles = user?.roles && user?.roles.length > 1
    const handleOpenRoleSelector = () => {
        if (!user?.roles) return
        const buttons = user.roles.map((roleName) => ({
            text: roleName,
            onPress: () => {
                const roleKey = ROLE_MAP[roleName]
                if (roleKey && roleKey !== user.activeRole) {
                    switchRole(roleKey)
                }
            },
        }))
        buttons.push({ text: "Cancelar", style: "cancel" } as any)
        Alert.alert(
            "Trocar Perfil",
            "Com qual perfil você deseja acessar o aplicativo agora?",
            buttons
        )
    }

    return (
        <HeaderContainer>
            <HeaderLeft>
                <Greet>{greet},</Greet>
                <UserName>{firstName} 👋</UserName>
            </HeaderLeft>

            <RightActions>
                {hasMultipleRoles && (
                    <SwapButton onPress={handleOpenRoleSelector}>
                        <Ionicons name="swap-horizontal" size={20} color={theme.color.primary} />
                    </SwapButton>
                )}

                <AvatarCircle onPress={() => navigation.navigate("Profile")}>
                    {<AvatarText>{firstName.charAt(0).toUpperCase()}</AvatarText>}
                </AvatarCircle>
            </RightActions>
        </HeaderContainer>
    )
}
const HeaderContainer = styled.View`
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 20px;
`
const HeaderLeft = styled.View``
const Greet = styled.Text`
    font-size: 14px;
    color: ${({ theme }) => theme.color.gray};
    font-weight: 500;
`
const UserName = styled.Text`
    font-size: 22px;
    font-weight: 700;
    color: ${({ theme }) => theme.color.tertiary};
    margin-top: 2px;
`
const RightActions = styled.View`
    flex-direction: row;
    align-items: center;
    gap: 12px;
`
const SwapButton = styled.TouchableOpacity`
    width: 40px;
    height: 40px;
    border-radius: 20px;
    background-color: ${({ theme }) => theme.color.primary}15;
    align-items: center;
    justify-content: center;
`
const AvatarCircle = styled.TouchableOpacity`
    width: 46px;
    height: 46px;
    border-radius: 23px;
    background-color: ${({ theme }) => theme.color.primary};
    align-items: center;
    opacity: 0.9;
    justify-content: center;
    overflow: hidden;
`
const AvatarText = styled.Text`
    font-size: 18px;
    font-weight: 700;
    color: ${({ theme }) => theme.color.white};
`
