import { ActivityIndicator, Text, TouchableOpacity, View, Image } from "react-native"
import { SignupParamsUserKeys, HealthPlanKeys, DependentKeys } from "@/interfaces/services/auth"
import { SystemConstantsKeys, BasicConstantKeys } from "@/interfaces/services/constants"
import {
    Title,
    Subtitle,
    PrimaryButton,
    ButtonText,
    SecondaryButton,
    SecondaryButtonText,
    Label,
    SelectionButton,
    SelectionText,
    OperatorCircle,
    OperatorInitial,
    OperatorInitialText,
    OperatorName,
    HorizontalScroll,
    DependentsContainer,
    DependentCard,
    DependentTitle,
} from "../style"
import { useCadastroContext } from "../cadastroContext"
import { useAppConstants } from "@/contexts/constants"
import { useState } from "react"
import { OperatorLogos } from "@/interfaces/pages/login"
import { DocumentValidator } from "@/utils/Format/DocumentValidator"
import { FormattedInput } from "@/components/FormattedInput"
import { FormattedDatePicker } from "@/components/FormattedDataPicker"

export function HealthPlanStep() {
    const { formData, updateField, nextStep, prevStep } = useCadastroContext()
    const { constants, loadingConstants } = useAppConstants()
    const [errors, setErrors] = useState<Record<string, string>>({})
    const currentHealthPlan = formData[SignupParamsUserKeys.HEALTH_PLAN]
    const operators = constants?.[SystemConstantsKeys.HEALTH_INSURANCE] || []
    const allPlans = constants?.[SystemConstantsKeys.HEALTH_INSURANCE_PLANS] || []
    const [selectedOperatorId, setSelectedOperatorId] = useState<string | null>(() => {
        if (currentHealthPlan?.[HealthPlanKeys.PLAN_ID] && allPlans.length > 0) {
            const savedPlan = allPlans.find(
                (p) => p.id === currentHealthPlan[HealthPlanKeys.PLAN_ID]
            )
            if (savedPlan && savedPlan[BasicConstantKeys.ID]) {
                return savedPlan[BasicConstantKeys.ID]
            }
        }
        return null
    })

    const filteredPlans = allPlans.filter((plan) => {
        const operator = operators.find((op) => op.id === selectedOperatorId)
        return operator && plan[BasicConstantKeys.NAME]
            ? plan[BasicConstantKeys.NAME]
                  .toLowerCase()
                  .includes(operator[BasicConstantKeys.KEY]?.toLowerCase() || "")
            : false
    })

    const handleSelectNoPlan = () => {
        updateField(SignupParamsUserKeys.HEALTH_PLAN, null)
        setSelectedOperatorId(null)
    }

    const handleSelectOperator = (operatorId: string) => {
        if (operatorId !== selectedOperatorId) {
            setSelectedOperatorId(operatorId)
            updateField(SignupParamsUserKeys.HEALTH_PLAN, null)
        }
    }

    const handleSelectPlan = (planId: string) => {
        const existingContractNumber = currentHealthPlan?.[HealthPlanKeys.CONTRACT_NUMBER] || ""
        const existingDependents = currentHealthPlan?.[HealthPlanKeys.DEPENDENTS] || []

        updateField(SignupParamsUserKeys.HEALTH_PLAN, {
            [HealthPlanKeys.PLAN_ID]: planId,
            [HealthPlanKeys.CONTRACT_NUMBER]: existingContractNumber,
            [HealthPlanKeys.DEPENDENTS]: existingDependents,
        })
    }

    const addDependent = () => {
        if (!currentHealthPlan) return
        const newDependent = {
            [DependentKeys.ID]: String(Date.now()),
            [DependentKeys.NAME]: "",
            [DependentKeys.CPF]: "",
            [DependentKeys.BIRTH_DATE]: new Date(),
        }
        updateField(SignupParamsUserKeys.HEALTH_PLAN, {
            ...currentHealthPlan,
            [HealthPlanKeys.DEPENDENTS]: [
                ...currentHealthPlan[HealthPlanKeys.DEPENDENTS],
                newDependent,
            ],
        })
    }

    const updateDependent = (index: number, key: DependentKeys, value: any) => {
        if (!currentHealthPlan) return
        const updatedDependents = [...currentHealthPlan[HealthPlanKeys.DEPENDENTS]]
        updatedDependents[index] = { ...updatedDependents[index], [key]: value }
        updateField(SignupParamsUserKeys.HEALTH_PLAN, {
            ...currentHealthPlan,
            [HealthPlanKeys.DEPENDENTS]: updatedDependents,
        })
        if (errors[`dep_${key}_${index}`]) {
            setErrors((prev) => ({ ...prev, [`dep_${key}_${index}`]: "" }))
        }
    }

    const removeDependent = (index: number) => {
        if (!currentHealthPlan) return
        const updatedDependents = currentHealthPlan[HealthPlanKeys.DEPENDENTS].filter(
            (_, i) => i !== index
        )
        updateField(SignupParamsUserKeys.HEALTH_PLAN, {
            ...currentHealthPlan,
            [HealthPlanKeys.DEPENDENTS]: updatedDependents,
        })
    }

    const handleNext = () => {
        const newErrors: Record<string, string> = {}
        if (currentHealthPlan) {
            const contractNumber = currentHealthPlan[HealthPlanKeys.CONTRACT_NUMBER]
            if (!contractNumber) {
                newErrors["contract_number"] = "O número de contrato é obrigatório"
            } else {
                const sum = contractNumber
                    .replace(/\D/g, "")
                    .split("")
                    .reduce((acc, curr) => acc + parseInt(curr, 10), 0)

                if (sum !== 26) {
                    newErrors["contract_number"] = "Número de contrato inválido"
                }
            }

            currentHealthPlan[HealthPlanKeys.DEPENDENTS].forEach((dep, index) => {
                if (!dep[DependentKeys.NAME])
                    newErrors[`dep_${DependentKeys.NAME}_${index}`] = "Nome obrigatório"

                const cleanCpf = dep[DependentKeys.CPF]
                if (!cleanCpf || !DocumentValidator.isValidCPF(cleanCpf)) {
                    newErrors[`dep_${DependentKeys.CPF}_${index}`] = "CPF inválido"
                }
            })
        }
        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors)
            return
        }
        nextStep()
    }

    if (loadingConstants) return <ActivityIndicator size="large" color="#92400e" />

    return (
        <>
            <Title>Criar Conta - Plano de Saúde</Title>
            <Subtitle>Selecione seu convênio médico:</Subtitle>

            <SelectionButton
                selected={currentHealthPlan === null && !selectedOperatorId}
                onPress={handleSelectNoPlan}
            >
                <SelectionText selected={currentHealthPlan === null && !selectedOperatorId}>
                    Não possuo plano de saúde
                </SelectionText>
            </SelectionButton>

            <Label style={{ marginTop: 16 }}>Operadora</Label>
            <HorizontalScroll horizontal showsHorizontalScrollIndicator={false}>
                {operators.map((op) => {
                    const key = op[BasicConstantKeys.KEY]
                    const logoSource = key ? OperatorLogos[key] : undefined

                    return (
                        <OperatorCircle
                            key={op.id}
                            selected={selectedOperatorId === op.id}
                            onPress={() => handleSelectOperator(op.id)}
                        >
                            <OperatorInitial selected={selectedOperatorId === op.id}>
                                {logoSource ? (
                                    <Image
                                        source={logoSource}
                                        style={{
                                            width: 46,
                                            height: 46,
                                            borderRadius: 23,
                                            resizeMode: "contain",
                                        }}
                                    />
                                ) : (
                                    <OperatorInitialText selected={selectedOperatorId === op.id}>
                                        {key?.substring(0, 2) || "OP"}
                                    </OperatorInitialText>
                                )}
                            </OperatorInitial>
                            <OperatorName numberOfLines={2}>{op.value}</OperatorName>
                        </OperatorCircle>
                    )
                })}
            </HorizontalScroll>

            {selectedOperatorId && (
                <View style={{ marginTop: 16 }}>
                    <Label>
                        Escolha o seu plano{" "}
                        {operators.find((o) => o.id === selectedOperatorId)?.value}
                    </Label>
                    {filteredPlans.map((plan) => (
                        <SelectionButton
                            key={plan.id}
                            selected={currentHealthPlan?.[HealthPlanKeys.PLAN_ID] === plan.id}
                            onPress={() => handleSelectPlan(plan.id)}
                        >
                            <SelectionText
                                selected={currentHealthPlan?.[HealthPlanKeys.PLAN_ID] === plan.id}
                            >
                                {plan.name}
                            </SelectionText>
                        </SelectionButton>
                    ))}
                </View>
            )}

            {currentHealthPlan?.[HealthPlanKeys.PLAN_ID] && (
                <View style={{ marginTop: 16 }}>
                    <FormattedInput
                        label="Número do Contrato"
                        type="default"
                        placeholder="Digite o número da carteirinha"
                        value={currentHealthPlan[HealthPlanKeys.CONTRACT_NUMBER]}
                        onChangeText={(text) =>
                            updateField(SignupParamsUserKeys.HEALTH_PLAN, {
                                ...currentHealthPlan,
                                [HealthPlanKeys.CONTRACT_NUMBER]: text.replace(/\D/g, ""),
                            })
                        }
                        keyboardType="numeric"
                        error={errors["contract_number"]}
                    />
                </View>
            )}

            {currentHealthPlan && (
                <DependentsContainer>
                    <Subtitle>Dependentes do Plano</Subtitle>
                    {currentHealthPlan[HealthPlanKeys.DEPENDENTS].map((dep, index) => (
                        <DependentCard key={dep[DependentKeys.ID]}>
                            <View
                                style={{
                                    flexDirection: "row",
                                    justifyContent: "space-between",
                                    marginBottom: 12,
                                }}
                            >
                                <DependentTitle>Dependente {index + 1}</DependentTitle>
                                <TouchableOpacity onPress={() => removeDependent(index)}>
                                    <Text style={{ color: "red" }}>Remover</Text>
                                </TouchableOpacity>
                            </View>

                            <FormattedInput
                                label="Nome Completo"
                                type="name"
                                placeholder="Nome do dependente"
                                value={dep[DependentKeys.NAME]}
                                onChangeText={(t) => updateDependent(index, DependentKeys.NAME, t)}
                                error={errors[`dep_${DependentKeys.NAME}_${index}`]}
                            />

                            <FormattedInput
                                label="CPF"
                                type="cpf_cnpj"
                                placeholder="000.000.000-00"
                                value={dep[DependentKeys.CPF]}
                                onChangeText={(t) => updateDependent(index, DependentKeys.CPF, t)}
                                error={errors[`dep_${DependentKeys.CPF}_${index}`]}
                            />

                            <FormattedDatePicker
                                label="Data de Nascimento"
                                mode="date"
                                maximumDate={new Date()}
                                value={dep[DependentKeys.BIRTH_DATE] as Date}
                                onChange={(date) =>
                                    updateDependent(index, DependentKeys.BIRTH_DATE, date)
                                }
                            />
                        </DependentCard>
                    ))}

                    <SecondaryButton onPress={addDependent} style={{ marginTop: 8 }}>
                        <SecondaryButtonText>+ Adicionar Dependente</SecondaryButtonText>
                    </SecondaryButton>
                </DependentsContainer>
            )}

            <View style={{ marginTop: 32 }}>
                <PrimaryButton onPress={handleNext}>
                    <ButtonText>Próximo Passo</ButtonText>
                </PrimaryButton>
                <SecondaryButton onPress={prevStep}>
                    <SecondaryButtonText>Voltar ao passo anterior</SecondaryButtonText>
                </SecondaryButton>
            </View>
        </>
    )
}
