import { LoginFormBase } from "./formBase"
import { LoginProvider } from "./loginContext"

export default function LoginScreen() {
    return (
        <LoginProvider>
            <LoginFormBase />
        </LoginProvider>
    )
}
