import * as S from "./Loading"
import { ActivityIndicator } from "react-native"
import { theme } from "@/styles/theme"
import { forwardRef, memo, useImperativeHandle, useState } from "react"
import { ILoadingFowardHandles, ILoadingProps } from "@/interfaces/components/loading"

const LogoType = memo(() => (
    <S.Logo source={require("@/assets/adaptive-icon.png")} resizeMode="contain" />
))

export const Loading = forwardRef<ILoadingFowardHandles, ILoadingProps>(
    ({ defaultDescription, isLoading }, ref) => {
        const [isVisible, setIsVisible] = useState(isLoading)
        const [description, setDescription] = useState<React.ReactNode>(defaultDescription)

        const show = (newDescription?: React.ReactNode) => {
            setIsVisible(true)
            setDescription(newDescription)
        }

        const hide = () => {
            setIsVisible(false)
        }

        useImperativeHandle(ref, () => ({
            show,
            hide,
        }))

        return (
            (isLoading || isVisible) && (
                <S.SafeArea>
                    <S.Modal
                        testID="loadingModal"
                        animationType="fade"
                        statusBarTranslucent
                        visible={isLoading || isVisible}
                        transparent
                        hardwareAccelerated={true}
                    />
                    <S.Content>
                        <LogoType />
                        <ActivityIndicator size="large" color={theme.color.primary} />
                        {(defaultDescription || description) && (
                            <S.Description>{defaultDescription || description}</S.Description>
                        )}
                    </S.Content>
                </S.SafeArea>
            )
        )
    }
)
