import "./styles/global.css"
import { theme } from "./styles/theme"
import { ThemeProvider } from "styled-components/native"
import Routes from "./route"
import { AuthProvider } from "./contexts/auth"
import { AppConstantsProvider } from "./contexts/constants"
import { NotificationProvider } from "./contexts/notification"
export default function App() {
    return (
        <ThemeProvider theme={theme}>
            <AppConstantsProvider>
                <NotificationProvider>
                    <AuthProvider>
                        <Routes />
                    </AuthProvider>
                </NotificationProvider>
            </AppConstantsProvider>
        </ThemeProvider>
    )
}
