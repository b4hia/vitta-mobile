import { CadastroFormBase } from "./formBase"
import { CadastroProvider } from "./cadastroContext"

export default function CadastroScreen() {
    return (
        <CadastroProvider>
            <CadastroFormBase />
        </CadastroProvider>
    )
}
