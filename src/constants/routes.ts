export enum AuthRouteMapKeys {
    LOGIN = "Login",
    SIGN_UP = "Cadastrar-se",
    ONBOARDING = "Boas-vindas",
    FORGOT_PASSWORD = "Recuperar senha",
}

export enum CommonRouteMapKeys {
    SETTINGS = "Configurações",
    EDIT_PROFILE = "Editar perfil",
    HELP_CENTER = "Central de ajuda",
    SUPPORT_CHAT = "Chat de suporte",
    NOTIFICATIONS = "Avisos",
    CONSTANTS_NOT_FOUND = "Erro de carregamento",
}

export enum ClientRouteMapKeys {
    // Bottom Tabs
    TAB_HOME = "Início",
    TAB_SEARCH = "Explorar",
    TAB_MY_APPOINTMENTS = "Minhas Consultas",
    TAB_PROFILE = "Meu Perfil",

    // Stacks
    SCHEDULE_NEW = "Agendar nova consulta",
    CLINIC_DETAILS = "Informações da clínica",
    DOCTOR_PROFILE = "Perfil do médico",
    APPOINTMENT_DETAILS = "Detalhes da consulta",
    EXAM_RESULTS = "Resultados de exames",
    PRESCRIPTIONS = "Receitas e Atestados",
    HEALTH_PLAN_CARD = "Carteirinha virtual",
    DEPENDENTS = "Dependentes",
    FEEDBACK = "Avaliar atendimento",
    TELEMEDICINE_ROOM = "Sala de espera e Vídeo",
}

export enum DoctorRouteMapKeys {
    // Bottom Tabs
    TAB_DASHBOARD = "Painel",
    TAB_SCHEDULE = "Minha Agenda",
    TAB_PATIENTS = "Meus Pacientes",

    // Stacks
    APPOINTMENT_EXECUTION = "Atendimento em andamento",
    PATIENT_MEDICAL_RECORD = "Prontuário do Paciente",
    WRITE_PRESCRIPTION = "Emitir Receita/Atestado",
    TELEMEDICINE_HOST_ROOM = "Sala de Vídeo (Médico)",
    MY_FINANCIALS = "Meus Repasses/Ganhos",
}

export enum ClinicRouteMapKeys {
    // Bottom Tabs
    TAB_RECEPTION = "Recepção",
    TAB_CALENDAR = "Agenda Geral",
    TAB_MANAGEMENT = "Gestão",

    // Stacks
    PATIENT_CHECK_IN = "Confirmar Presença",
    MANAGE_APPOINTMENTS = "Gerenciar Agendamentos",
    DOCTOR_ROSTER = "Corpo Clínico",
    BILLING_APPROVALS = "Aprovações de Convênio",
    CLINIC_REPORTS = "Relatórios da Clínica",
}

export enum SystemAdminRouteMapKeys {
    // Bottom Tabs
    TAB_OVERVIEW = "Visão Geral",
    TAB_APPROVALS = "Aprovações",
    TAB_CLINICS = "Clínicas Cadastradas",

    // Stacks
    APPROVE_DOCTOR = "Analisar Cadastro de Médico",
    APPROVE_CLINIC = "Analisar Cadastro de Clínica",
    PLATFORM_FINANCIALS = "Faturamento da Plataforma",
    SYSTEM_SETTINGS = "Parâmetros do Sistema",
}

export enum TopTabMapKeys {
    // Client / Doctor
    UPCOMING = "Próximas",
    PAST = "Realizadas",
    CANCELED = "Canceladas",

    // Admin / Operational / Attendant / Clinic
    PENDING = "Pendentes",
    APPROVED = "Aprovadas",
    IN_PROGRESS = "Em Atendimento",
}
