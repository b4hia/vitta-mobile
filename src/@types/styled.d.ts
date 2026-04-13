import {
  ThemeBorderRadius,
  ThemeColors,
  ThemeFontSizes,
  ThemeFontWeights,
  ThemeSpacings,
} from '../interfaces/styles';

declare module 'styled-components/native' {
  export interface DefaultTheme {
    color: {
      [ThemeColors.PRIMARY]: string;
      [ThemeColors.SECONDARY]: string;
      [ThemeColors.TERTIARY]: string;
      [ThemeColors.SUCCESS]: string;
      [ThemeColors.ERROR]: string;
      [ThemeColors.WARNING]: string;
      [ThemeColors.DANGER]: string;
      [ThemeColors.INFO]: string;
      [ThemeColors.LIGHT]: string;
      [ThemeColors.DARK]: string;
      [ThemeColors.WHITE]: string;
      [ThemeColors.BLACK]: string;
      [ThemeColors.GRAY]: string;
      [ThemeColors.LIGHT_GRAY]: string;
      [ThemeColors.LIGHT_DARK]: string;
      [ThemeColors.YELLOW]: string;
      [ThemeColors.NONE]: string;
    };
    font: {
      size: {
        [ThemeFontSizes.XS]: number;
        [ThemeFontSizes.SM]: number;
        [ThemeFontSizes.MD]: number;
        [ThemeFontSizes.LG]: number;
        [ThemeFontSizes.XL]: number;
        [ThemeFontSizes.XXL]: number;
        [ThemeFontSizes.XXXL]: number;
      };
      weight: {
        [ThemeFontWeights.EXTRALIGHT]: string;
        [ThemeFontWeights.LIGHT]: string;
        [ThemeFontWeights.THIN]: string;
        [ThemeFontWeights.NORMAL]: string;
        [ThemeFontWeights.MEDIUM]: string;
        [ThemeFontWeights.SEMIBOLD]: string;
        [ThemeFontWeights.BOLD]: string;
        [ThemeFontWeights.EXTRABOLD]: string;
        [ThemeFontWeights.BLACK]: string;
      };
    };
    spacing: {
      [ThemeSpacings.SM]: number;
      [ThemeSpacings.MD]: number;
      [ThemeSpacings.LG]: number;
      [ThemeSpacings.XL]: number;
      [ThemeSpacings.XXL]: number;
      [ThemeSpacings.XXXL]: number;
    };
    border: {
      radius: {
        [ThemeBorderRadius.NONE]: number;
        [ThemeBorderRadius.SM]: number;
        [ThemeBorderRadius.MD]: number;
        [ThemeBorderRadius.LG]: number;
        [ThemeBorderRadius.XL]: number;
        [ThemeBorderRadius.XXL]: number;
        [ThemeBorderRadius.PILL]: number;
      };
      width: {
        0: number;
        1: number;
        2: number;
        3: number;
        4: number;
        5: number;
      };
    };
    gap: {
      0: number;
      1: number;
      2: number;
      3: number;
      4: number;
      5: number;
    };
    col: {
      1: number;
      2: number;
      3: number;
      4: number;
      5: number;
      6: number;
      7: number;
      8: number;
      9: number;
      10: number;
      11: number;
      12: number;
    };
    width: {
      auto: string;
      '25': string;
      '50': string;
      '75': string;
      '100': string;
    };
    height: {
      auto: string;
      '25': string;
      '50': string;
      '75': string;
      '100': string;
    };
    activeOpacity: number;
  }
}
