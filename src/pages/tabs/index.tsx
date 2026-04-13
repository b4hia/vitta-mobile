import { createBottomTabNavigator } from "@react-navigation/bottom-tabs"
import HomeScreen from "@/pages/home"
import NewsScreen from "@/pages/news"
import InsuranceScreen from "@/pages/insurance"
import ProfileScreen from "@/pages/profile"
import { getTabBarOptions, TabBarIcon } from "@/components/Navigation"
import ScheduleAppointmentScreen from "../appointments"
import { ScheduleProvider } from "../appointments/appointmentsContext"

const Tab = createBottomTabNavigator()

export function ClientTabs() {
    return (
        <ScheduleProvider>
            <Tab.Navigator screenOptions={getTabBarOptions()}>
                <Tab.Screen
                    name="Home"
                    component={HomeScreen}
                    options={{
                        tabBarLabel: "Início",
                        tabBarIcon: (p) => (
                            <TabBarIcon {...p} activeIcon="home" inactiveIcon="home-outline" />
                        ),
                    }}
                />
                <Tab.Screen
                    name="Appointments"
                    component={ScheduleAppointmentScreen}
                    options={{
                        tabBarLabel: "Consultas",
                        tabBarIcon: (p) => (
                            <TabBarIcon
                                {...p}
                                activeIcon="calendar"
                                inactiveIcon="calendar-outline"
                            />
                        ),
                    }}
                />
                <Tab.Screen
                    name="News"
                    component={NewsScreen}
                    options={{
                        tabBarLabel: "Notícias",
                        tabBarIcon: (p) => (
                            <TabBarIcon
                                {...p}
                                activeIcon="newspaper"
                                inactiveIcon="newspaper-outline"
                            />
                        ),
                    }}
                />
                <Tab.Screen
                    name="Insurance"
                    component={InsuranceScreen}
                    options={{
                        tabBarLabel: "Convênio",
                        tabBarIcon: (p) => (
                            <TabBarIcon
                                {...p}
                                activeIcon="shield-checkmark"
                                inactiveIcon="shield-checkmark-outline"
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
        </ScheduleProvider>
    )
}
