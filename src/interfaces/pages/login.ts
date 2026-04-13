export enum LoginStepKeys {
    SIGN_IN = 1,
    LOGIN,
    FORGOT_PASSWORD,
    FORCE_PASSWORD_CHANGE,
}

export enum SignupStepKeys {
    PERSONAL_DATA = 1,
    CONTACT_DATA,
    ADRESS_DATA,
    CHRONIC_DISEASE,
    HEALTH_PLAN,
    PASSWORD,
    SELECT_ROLE,
}

export const OperatorLogos: Record<string, any> = {
    ALLIANZ: require("../../assets/images/operator/allianz.png"),
    AMIL: require("../../assets/images/operator/amil.png"),
    BRADESCO: require("../../assets/images/operator/bradesco.png"),
    PORTO: require("../../assets/images/operator/porto.png"),
    SULAMERICA: require("../../assets/images/operator/sulamerica.png"),
    UNIMED: require("../../assets/images/operator/unimed.png"),
    HAPVIDA: require("../../assets/images/operator/hapvida.png"),
    NOTREDAME: require("../../assets/images/operator/notredame.png"),
}
