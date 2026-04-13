import { View, ActivityIndicator } from "react-native"
import { NavigationContainer } from "@react-navigation/native"
import { createNativeStackNavigator } from "@react-navigation/native-stack"
import { useAuth } from "./contexts/auth"
import LoginScreen from "./pages/login"
import CadastroScreen from "./pages/cadastro"
import { ForgotPasswordStep } from "./pages/forgotPassword"
import { AdminTabs } from "./pages/tabs/AdminTabs"
import { ClientTabs } from "./pages/tabs"
import ProfileScreen from "./pages/profile"
import ScheduleAppointmentScreen from "./pages/appointments"
export type AuthStackParamList = {
    Login: undefined
    Cadastro: undefined
    ForgotPassword: undefined
}

export type AppStackParamList = {
    ClientTabs: undefined
    AdminTabs: undefined
    DoctorTabs: undefined
    ProfileScreen: undefined
    ScheduleAppointmentScreen: undefined
}

const AuthStack = createNativeStackNavigator<AuthStackParamList>()
const AppStack = createNativeStackNavigator<AppStackParamList>()

function AuthRoutes() {
    return (
        <AuthStack.Navigator screenOptions={{ headerShown: false }}>
            <AuthStack.Screen name="Login" component={LoginScreen} />
            <AuthStack.Screen name="Cadastro" component={CadastroScreen} />
            <AuthStack.Screen name="ForgotPassword" component={ForgotPasswordStep} />
        </AuthStack.Navigator>
    )
}

function AppRoutes() {
    const { activeRole } = useAuth()
    return (
        <AppStack.Navigator screenOptions={{ headerShown: false }}>
            {activeRole === "CLIENT" ? (
                <>
                    <AppStack.Screen name="ClientTabs" component={ClientTabs} />
                    <AppStack.Screen
                        name="ScheduleAppointmentScreen"
                        component={ScheduleAppointmentScreen}
                    />
                </>
            ) : activeRole === "ADMIN" || activeRole === "CLINIC_ADMIN" ? (
                <AppStack.Screen name="AdminTabs" component={AdminTabs} />
            ) : (
                <AppStack.Screen name="DoctorTabs" component={ClientTabs} />
            )}
            <AppStack.Screen name="ProfileScreen" component={ProfileScreen} />
        </AppStack.Navigator>
    )
}

export default function Routes() {
    const { isAuthenticated, loading } = useAuth()

    if (loading) {
        return (
            <View
                style={{
                    flex: 1,
                    backgroundColor: "white",
                    justifyContent: "center",
                    alignItems: "center",
                }}
            >
                <ActivityIndicator size="large" color="#92400e" />
            </View>
        )
    }

    return (
        <NavigationContainer>
            {isAuthenticated ? <AppRoutes /> : <AuthRoutes />}
        </NavigationContainer>
    )
}
