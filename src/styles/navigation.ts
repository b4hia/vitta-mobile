import { DefaultTheme } from "@react-navigation/native"
import { theme } from "./theme"
import { NativeStackNavigationOptions } from "@react-navigation/native-stack"
import { DrawerNavigationOptions } from "@react-navigation/drawer"

export const navigationTheme = {
    ...DefaultTheme,
    colors: {
        ...DefaultTheme.colors,
        background: theme.color.white,
    },
    dark: false,
}

export const headerScreenOptionsStyle: NativeStackNavigationOptions | DrawerNavigationOptions = {
    headerStyle: {
        backgroundColor: theme.color.secondary,
    },
    headerTitleAlign: "center",
    headerTintColor: theme.color.white,
}

export const tabScreenOptionsStyle = {
    tabBarStyle: {
        backgroundColor: theme.color.white,
        elevation: 0,
    },
    tabBarLabelStyle: {
        fontWeight: "bold",
        fontSize: theme.font.size.lg,
    },
    sceneStyle: {
        backgroundColor: theme.color.white,
    },
    tabBarActiveTintColor: theme.color.primary,
    tabBarInactiveTintColor: theme.color.dark,
    tabBarPressColor: theme.color.lightGray,
    tabBarIndicatorStyle: {
        backgroundColor: theme.color.primary,
    },
}
