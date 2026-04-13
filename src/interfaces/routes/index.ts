import { NavigatorScreenParams, RouteProp } from "@react-navigation/native"
import { NativeStackNavigationProp } from "@react-navigation/native-stack"

import {
    AuthRouteMapKeys,
    CommonRouteMapKeys,
    ClinicRouteMapKeys,
    SystemAdminRouteMapKeys,
    ClientRouteMapKeys,
    DoctorRouteMapKeys,
} from "@/constants/routes"

export interface IAppointmentParams {
    appointmentId: string
}
export interface IClinicParams {
    clinicId: string
}
export interface IDoctorParams {
    doctorId: string
}
export interface IExamParams {
    examId: string
}
export interface IPatientParams {
    patientId: string
}
export interface IApprovalParams {
    requestId: string
}

export type TAuthRoutes = {
    [AuthRouteMapKeys.LOGIN]: undefined
    [AuthRouteMapKeys.SIGN_UP]: undefined
    [AuthRouteMapKeys.ONBOARDING]: undefined
    [AuthRouteMapKeys.FORGOT_PASSWORD]: undefined
}

export type TClientTabRoutes = {
    [ClientRouteMapKeys.TAB_HOME]: undefined
    [ClientRouteMapKeys.TAB_SEARCH]: undefined
    [ClientRouteMapKeys.TAB_MY_APPOINTMENTS]: undefined
    [ClientRouteMapKeys.TAB_PROFILE]: undefined
}

export type TDoctorTabRoutes = {
    [DoctorRouteMapKeys.TAB_DASHBOARD]: undefined
    [DoctorRouteMapKeys.TAB_SCHEDULE]: undefined
    [DoctorRouteMapKeys.TAB_PATIENTS]: undefined
}

export type TClinicTabRoutes = {
    [ClinicRouteMapKeys.TAB_RECEPTION]: undefined
    [ClinicRouteMapKeys.TAB_CALENDAR]: undefined
    [ClinicRouteMapKeys.TAB_MANAGEMENT]: undefined
}

export type TSystemAdminTabRoutes = {
    [SystemAdminRouteMapKeys.TAB_OVERVIEW]: undefined
    [SystemAdminRouteMapKeys.TAB_APPROVALS]: undefined
    [SystemAdminRouteMapKeys.TAB_CLINICS]: undefined
}

export type TMainRoutes = {
    // --- Common ---
    [CommonRouteMapKeys.SETTINGS]: undefined
    [CommonRouteMapKeys.EDIT_PROFILE]: undefined
    [CommonRouteMapKeys.HELP_CENTER]: undefined
    [CommonRouteMapKeys.SUPPORT_CHAT]: undefined
    [CommonRouteMapKeys.NOTIFICATIONS]: undefined
    [CommonRouteMapKeys.CONSTANTS_NOT_FOUND]: undefined

    // --- Client routes ---
    [ClientRouteMapKeys.SCHEDULE_NEW]: IClinicParams | undefined
    [ClientRouteMapKeys.CLINIC_DETAILS]: IClinicParams
    [ClientRouteMapKeys.DOCTOR_PROFILE]: IDoctorParams
    [ClientRouteMapKeys.APPOINTMENT_DETAILS]: IAppointmentParams
    [ClientRouteMapKeys.EXAM_RESULTS]: IExamParams
    [ClientRouteMapKeys.PRESCRIPTIONS]: IAppointmentParams | undefined
    [ClientRouteMapKeys.HEALTH_PLAN_CARD]: undefined
    [ClientRouteMapKeys.DEPENDENTS]: undefined
    [ClientRouteMapKeys.FEEDBACK]: IAppointmentParams

    // --- Doctor routes ---
    [DoctorRouteMapKeys.APPOINTMENT_EXECUTION]: IAppointmentParams
    [DoctorRouteMapKeys.PATIENT_MEDICAL_RECORD]: IPatientParams
    [DoctorRouteMapKeys.WRITE_PRESCRIPTION]: IPatientParams
    [DoctorRouteMapKeys.MY_FINANCIALS]: undefined

    // --- Clinic routes ---
    [ClinicRouteMapKeys.PATIENT_CHECK_IN]: IAppointmentParams
    [ClinicRouteMapKeys.MANAGE_APPOINTMENTS]: undefined
    [ClinicRouteMapKeys.DOCTOR_ROSTER]: undefined
    [ClinicRouteMapKeys.BILLING_APPROVALS]: undefined
    [ClinicRouteMapKeys.CLINIC_REPORTS]: undefined

    // --- Operational / Admin ---
    [SystemAdminRouteMapKeys.APPROVE_DOCTOR]: IApprovalParams
    [SystemAdminRouteMapKeys.APPROVE_CLINIC]: IApprovalParams
    [SystemAdminRouteMapKeys.PLATFORM_FINANCIALS]: undefined
    [SystemAdminRouteMapKeys.SYSTEM_SETTINGS]: undefined

    ClientTabs: NavigatorScreenParams<TClientTabRoutes>
    DoctorTabs: NavigatorScreenParams<TDoctorTabRoutes>
    ClinicTabs: NavigatorScreenParams<TClinicTabRoutes>
    AdminTabs: NavigatorScreenParams<TSystemAdminTabRoutes>
}

export type TMainNavigation = NativeStackNavigationProp<TMainRoutes>
export type TAuthNavigation = NativeStackNavigationProp<TAuthRoutes>

export type TRouteProp<RouteName extends keyof TMainRoutes> = RouteProp<TMainRoutes, RouteName>

declare global {
    namespace ReactNavigation {
        interface RootParamList extends TMainRoutes, TAuthRoutes {}
    }
}
