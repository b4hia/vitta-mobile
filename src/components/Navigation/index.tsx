import { View, Platform } from "react-native"
import { Ionicons } from "@expo/vector-icons"
import { BottomTabNavigationOptions } from "@react-navigation/bottom-tabs"
import { theme } from "@/styles/theme"

export const getTabBarOptions = (): BottomTabNavigationOptions => ({
    headerShown: false,
    tabBarActiveTintColor: theme.color.primary,
    tabBarInactiveTintColor: theme.color.gray,
    tabBarStyle: {
        backgroundColor: theme.color.white,
        borderTopWidth: 0,
        elevation: 20,
        shadowColor: theme.color.black,
        shadowOffset: { width: 0, height: -4 },
        shadowOpacity: 0.08,
        shadowRadius: 12,
        height: Platform.OS === "ios" ? 84 : 64,
        paddingBottom: Platform.OS === "ios" ? 24 : 8,
        paddingTop: 8,
    },
    tabBarLabelStyle: {
        fontSize: 11,
        fontWeight: "600",
        marginTop: 2,
    },
})

interface ITabBarIconProps {
    focused: boolean
    color: string
    activeIcon: keyof typeof Ionicons.glyphMap
    inactiveIcon: keyof typeof Ionicons.glyphMap
}

export const TabBarIcon = ({ focused, color, activeIcon, inactiveIcon }: ITabBarIconProps) => (
    <View
        style={{
            alignItems: "center",
            justifyContent: "center",
            width: 44,
            height: 32,
            borderRadius: 16,
            backgroundColor: focused ? `${theme.color.primary}22` : "transparent",
        }}
    >
        <Ionicons
            name={focused ? activeIcon : inactiveIcon}
            size={focused ? 24 : 22}
            color={color}
        />
    </View>
)
