import { SignupStepKeys } from "@/interfaces/pages/login"
import { useCadastroContext } from "./cadastroContext"
import { ScrollContainer } from "./style"
import { PersonalDataStep } from "./steps/dadosPessoais"
import { ChronicDiseaseStep } from "./steps/doencasCronicas"
import { HealthPlanStep } from "./steps/planoSaude"
import { ContactDataStep } from "./steps/dadosContato"
import { AddressDataStep } from "./steps/dadosEndereco"
import { PasswordStep } from "./steps/senha"
import { KeyboardAvoidingView, Platform, View } from "react-native"
import { Pagination } from "@/components/reacticx/molecules/Pagination/Pagination"
import { GestureHandlerRootView } from "react-native-gesture-handler"
import { ProfileStep } from "./steps/roleSection"
export function CadastroFormBase() {
    const { currentStep, highestStep, goToStep } = useCadastroContext()
    const totalSteps = 7
    const activePageIndex = typeof currentStep === "number" ? currentStep : 1
    const handlePaginationChange = (index: number) => {
        const requestedStep = index + 1

        if (requestedStep <= highestStep) {
            goToStep(requestedStep as SignupStepKeys)
        } else {
            goToStep(currentStep as SignupStepKeys)
        }
    }
    return (
        <GestureHandlerRootView style={{ flex: 1 }}>
            <KeyboardAvoidingView
                style={{ flex: 1 }}
                behavior={Platform.OS === "ios" ? "padding" : undefined}
            >
                <ScrollContainer
                    contentContainerStyle={{
                        flexGrow: 1,
                        justifyContent: "center",
                        paddingBottom: 40,
                    }}
                    showsVerticalScrollIndicator={false}
                    keyboardShouldPersistTaps="handled"
                >
                    <View style={{ alignItems: "center", marginBottom: 32, marginTop: 16 }}>
                        <Pagination
                            totalItems={totalSteps}
                            activeIndex={activePageIndex - 1}
                            onIndexChange={handlePaginationChange}
                        />
                    </View>
                    {currentStep === SignupStepKeys.PERSONAL_DATA && <PersonalDataStep />}
                    {currentStep === SignupStepKeys.CONTACT_DATA && <ContactDataStep />}
                    {currentStep === SignupStepKeys.ADRESS_DATA && <AddressDataStep />}
                    {currentStep === SignupStepKeys.CHRONIC_DISEASE && <ChronicDiseaseStep />}
                    {currentStep === SignupStepKeys.HEALTH_PLAN && <HealthPlanStep />}
                    {currentStep === SignupStepKeys.PASSWORD && <PasswordStep />}
                    {currentStep === SignupStepKeys.SELECT_ROLE && <ProfileStep />}
                </ScrollContainer>
            </KeyboardAvoidingView>
        </GestureHandlerRootView>
    )
}
