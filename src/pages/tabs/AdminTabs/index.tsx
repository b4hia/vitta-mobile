import { createBottomTabNavigator } from "@react-navigation/bottom-tabs"
import { SystemAdminRouteMapKeys, CommonRouteMapKeys } from "@/constants/routes"
import { getTabBarOptions, TabBarIcon } from "@/components/Navigation"
import HomeScreen from "@/pages/home"
import ApprovalsScreen from "@/pages/approvals"
import ClinicsScreen from "@/pages/clinics"
import SupportChatScreen from "@/pages/chat"
import { ApprovalsProvider } from "@/pages/approvals/approvalsContext"
import ProfileScreen from "@/pages/profile"

const Tab = createBottomTabNavigator()

export function AdminTabs() {
    return (
        <ApprovalsProvider>
            <Tab.Navigator screenOptions={getTabBarOptions()}>
                <Tab.Screen
                    name={SystemAdminRouteMapKeys.TAB_OVERVIEW}
                    component={HomeScreen}
                    options={{
                        tabBarLabel: "Painel",
                        tabBarIcon: (p) => (
                            <TabBarIcon {...p} activeIcon="grid" inactiveIcon="grid-outline" />
                        ),
                    }}
                />

                <Tab.Screen
                    name={SystemAdminRouteMapKeys.TAB_APPROVALS}
                    component={ApprovalsScreen}
                    options={{
                        tabBarLabel: "Aprovações",
                        tabBarIcon: (p) => (
                            <TabBarIcon
                                {...p}
                                activeIcon="checkmark-circle"
                                inactiveIcon="checkmark-circle-outline"
                            />
                        ),
                    }}
                />

                <Tab.Screen
                    name={SystemAdminRouteMapKeys.TAB_CLINICS}
                    component={ClinicsScreen}
                    options={{
                        tabBarLabel: "Clínicas",
                        tabBarIcon: (p) => (
                            <TabBarIcon
                                {...p}
                                activeIcon="business"
                                inactiveIcon="business-outline"
                            />
                        ),
                    }}
                />
                <Tab.Screen
                    name={CommonRouteMapKeys.SUPPORT_CHAT}
                    component={SupportChatScreen}
                    options={{
                        tabBarLabel: "Chat",
                        tabBarIcon: (p) => (
                            <TabBarIcon
                                {...p}
                                activeIcon="chatbubbles"
                                inactiveIcon="chatbubbles-outline"
                            />
                        ),
                    }}
                />
                <Tab.Screen
                    name="Profile"
                    component={ProfileScreen}
                    options={{
                        tabBarLabel: "Perfil",
                        tabBarIcon: (p) => (
                            <TabBarIcon
                                {...p}
                                activeIcon="person-circle"
                                inactiveIcon="person-circle-outline"
                            />
                        ),
                    }}
                />
            </Tab.Navigator>
        </ApprovalsProvider>
    )
}
