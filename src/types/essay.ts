import { User } from '@/utils/types';

export type Assignment = {
    id?: string;
    assignment?: string;
    topic?: string;
    code?: string;
    hints?: string;
    rubric?: Rubric;
    remark?: string;
    created_at?: string;
    updated_at?: string;
    number_of_submission?: number;
    category?: Category | undefined;
    meta?: {
        newsfeed_id?: string;
        self_upload_newsfeed?: any;
        vocabs?: any[];
        speaking_pronunciation_sentences?: any[];
        speaking_pronunciation_pass_score?: number;
    };
    newsfeed_id?: string;
    answer_visible?: boolean;
};

export type Rubric = {
    id?: string;
    name?: string;
    app_key?: {
        grading?: string;
        general_context?: string;
    };
};

export type EssayGrading = {
    id?: string;
    topic?: string;
    grading?: Grading;
    general_context?: Grading;
    essay?: string;
    essay_assignment_id?: string;
    assignment_name?: string;
    category?: Category | undefined;
    status?: string;
    created_at?: string;
    updated_at?: string;
    essay_assignment: Assignment;
    newsfeed_id?: string;
    file?: string;
    general_user?: User;

    score?: any;
    full_score?: any;

    submission_class_name?: string;
    submission_class_number?: string;
};

export type Grading = {
    app_key?: string;
    data?: {
        text?: string;
    };
    comprehension?: any;
    speaking_pronunciation_sentences?: any[];
};

export enum Category {
    essay = 'essay',
    comprehension = 'comprehension',
    speaking_conversation = 'speaking_conversation',
    speaking_essay = 'speaking_essay',
    sentence_building = 'sentence_builder',
    speaking_pronunciation = 'speaking_pronunciation'
}

export type UserGrading = {
    id?: string;
    general_user?: User;
    status?: string;
    number_of_suggestion?: string;
    created_at?: string;
    updated_at?: string;

    full_score?: string;
    questions_count?: string;
    score?: string;
    newsfeed_id?: string;
    using_time?: any;

    scores?: any;
    overall_score?: any;
    the_full_score?: string;

    submission_class_name?: string;
    submission_class_number?: string;

    grading?: any;
};
