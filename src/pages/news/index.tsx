import React from "react"
import { SafeAreaView } from "react-native-safe-area-context"
import { Ionicons } from "@expo/vector-icons"
import styled from "styled-components/native"

export default function NewsScreen() {
    return (
        <Safe>
            <Scroll contentContainerStyle={{ padding: 20 }}>
                <HeaderTitle>Notícias & Dicas</HeaderTitle>
                <FeaturedCard>
                    <FeaturedTitle>Bem-vindo às novidades Vitta!</FeaturedTitle>
                </FeaturedCard>
            </Scroll>
        </Safe>
    )
}

const Safe = styled(SafeAreaView)`flex: 1; background-color: ${({ theme }) => theme.color.light};`
const Scroll = styled.ScrollView``
const HeaderTitle = styled.Text`font-size: 24px; font-weight: 800; color: ${({ theme }) => theme.color.tertiary}; margin-bottom: 20px;`
const FeaturedCard = styled.View`background-color: ${({ theme }) => theme.color.tertiary}; border-radius: 20px; padding: 22px; margin-bottom: 18px;`
const FeaturedTitle = styled.Text`font-size: 18px; font-weight: 800; color: ${({ theme }) => theme.color.white};`
