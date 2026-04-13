import { Dimensions } from "react-native"
import styled from "styled-components/native"
import { SafeAreaView } from "react-native-safe-area-context"

const { width, height } = Dimensions.get("window")
export const SafeArea = styled(SafeAreaView)`
    position: absolute;
    z-index: 2;
    width: 100%;
    height: 100%;
`

export const Modal = styled.Modal``

export const Content = styled.View`
    position: absolute;
    z-index: 2;
    width: 100%;
    height: 100%;
    align-items: center;
    justify-content: center;
    background-color: ${({ theme }) => theme.color.primary};
`
export const Logo = styled.Image.attrs(() => ({
    style: { width: width / 1.5, height: height / 5 },
}))``

export const Description = styled.Text.attrs(({ theme }) => ({
    style: { fontSize: theme.font.size.xl },
}))`
    position: absolute;
    z-index: 5;
    bottom: 32px;
    padding: 0 16px;
    color: ${({ theme }) => theme.color.white};
`
