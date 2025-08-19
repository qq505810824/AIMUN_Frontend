import { Assignment, EssayGrading, UserGrading } from '@/types/essay';

export type CommonResponse = {
    success: true | false;
    message?: any;
    error?: string;
    errors?: string;
};

export type LoginResponse = {
    json: () => Promise<CommonResponse>;
    headers: any;
};

export type EssayAssignmentResponse = CommonResponse & {
    essay_assignments: Assignment[];
    meta: {
        current_page: number;
        next_page: number;
        prev_page: number;
        total_count: number;
        total_pages: number;
    };
};

export type EssayAssignmentDetailResponse = CommonResponse & {
    essay_assignment: Assignment;
    essay_gradings: UserGrading[];
};

export type EssayGradingResponse = CommonResponse & {
    essay_gradings: EssayGrading[];
    meta: {
        current_page: number;
        next_page: number;
        prev_page: number;
        total_count: number;
        total_pages: number;
    };
};

export type EssayGradingDetailResponse = CommonResponse & {
    essay_grading: EssayGrading;
};

export type JoinAssignmentResponse = CommonResponse & {
    essay_assignment: Assignment;
};

export type HtmlToPdfResponse = CommonResponse & {
    file_url?: string;
};

export type OauthResponse = {
    redirect_url: string;
};

export type SetupStatusResponse = {
    step: 'finished' | 'not_started';
    setup_at?: Date;
};

export type InitValidateStatusResponse = {
    status: 'finished' | 'not_started';
};

export type User = {
    id: string;
    nickname: string;
    email: string;
    role: string;
    created_at?: string;
    updated_at?: string;
    phone?: string;
    date_of_birth?: string;
    sex?: number;
    timezone?: string;
    whats_app_number?: string | null;
    banbie?: string;
    class_no?: string;
    aienglish_feature_list: string[];
    meta?: {
        aienglish_role?: string;
        aienglish_features_list?: string[];
    };
    school?: School;
    teaching_assignments?: TeachingAssignment[];
    enrollments?: Enrollment[];
    recovery_email?: string | null;
    is_recovery_email_confirmed?: boolean;
    recovery_email_confirmed_at?: string | null;
};

export type School = {
    id: string;
    name: string;
    code: string;
    logo_url: string;
    logo_thumbnail_url: string;
    logo_small_url: string;
    logo_large_url: string;
    logo_square_url: string;
};

export type AcademicYear = {
    id: string;
    name: string;
    status: string;
};

export type TeachingAssignment = {
    id: string;
    school: School;
    academic_year: AcademicYear;
    department: string;
    position: string;
    created_at: string;
};

export type Enrollment = {
    id: string;
    school: School;
    academic_year: AcademicYear;
    class_name: string;
    class_number: string;
    created_at: string;
};

export type UserProfileResponse = CommonResponse & {
    user: User;
};

export type UserProfileOriginResponse = {
    json: () => Promise<UserProfileResponse>;
    bodyUsed: boolean;
    headers: any;
};

export type ApiBasedExtension = {
    id?: string;
    name?: string;
    api_endpoint?: string;
    api_key?: string;
};

export type ExternalDataTool = {
    type?: string;
    label?: string;
    icon?: string;
    icon_background?: string;
    variable?: string;
    enabled?: boolean;
    config?: {
        api_based_extension_id?: string;
    } & Partial<Record<string, any>>;
};
