export type Inputs = Record<string, string | number | object>;
export type OnSend = (message: string) => void;

export type ChatItem = IChatItem & {
    isError?: boolean;
    workflowProcess?: WorkflowProcess;
    conversationId?: string;
};

export type IChatItem = {
    id: string;
    content: string;
    citation?: any[];
    /**
     * Specific message type
     */
    isAnswer: boolean;
    /**
     * The user feedback result of this message
     */
    feedback?: any;
    /**
     * The admin feedback result of this message
     */
    adminFeedback?: any;
    /**
     * Whether to hide the feedback area
     */
    feedbackDisabled?: boolean;
    /**
     * More information about this message
     */
    more?: any;
    annotation?: any;
    useCurrentUserAvatar?: boolean;
    isOpeningStatement?: boolean;
    suggestedQuestions?: string[];
    log?: { role: string; text: string; files?: any[] }[];
    agent_thoughts?: ThoughtItem[];
    message_files?: any[];
    workflow_run_id?: string;
    // for agent log
    conversationId?: string;
    input?: any;
};

export type WorkflowProcess = {
    status: any;
    tracing: any[];
    expand?: boolean; // for UI
    resultText?: string;
};

export type ThoughtItem = {
    id: string;
    tool: string; // plugin or dataset. May has multi.
    thought: string;
    tool_input: string;
    message_id: string;
    observation: string;
    position: number;
    files?: string[];
    message_files?: any[];
};
