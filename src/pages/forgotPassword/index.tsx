import { ForgotPasswordProvider } from "./forgotPassword"
import { ForgotPasswordFormBase } from "./formBase"

export function ForgotPasswordStep() {
    return (
        <ForgotPasswordProvider>
            <ForgotPasswordFormBase />
        </ForgotPasswordProvider>
    )
}
