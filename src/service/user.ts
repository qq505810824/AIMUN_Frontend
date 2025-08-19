import { CommonResponse } from '@/models/common';
import { get, post, put, del } from './base';

const baseURL = process.env.NEXT_PUBLIC_API_SERVER;

// 設置/更新後備Email
export const setRecoveryEmail = async (recoveryEmail: string): Promise<CommonResponse> => {
    return put<CommonResponse>(`${baseURL}/api/v1/general_users/me/recovery_email`, {
        body: { recovery_email: recoveryEmail }
    });
};

// 重新發送確認郵件
export const resendRecoveryEmailConfirmation = async (): Promise<CommonResponse> => {
    return post<CommonResponse>(
        `${baseURL}/api/v1/general_users/me/recovery_email/resend_confirmation`,
        {}
    );
};

// 移除後備Email
export const removeRecoveryEmail = async (): Promise<CommonResponse> => {
    return del<CommonResponse>(`${baseURL}/api/v1/general_users/me/recovery_email`);
};

// 確認後備Email (通過前端頁面調用API)
export const verifyRecoveryToken = async (token: string): Promise<CommonResponse> => {
    // 假設後端期望的查詢參數名是 'token'。如果不同，請修改。
    // 例如：如果期望 'recovery_confirmation_token'，則為 `recovery_confirmation_token=${encodeURIComponent(token)}`
    return get<CommonResponse>(
        `${baseURL}/api/v1/general_users/me/recovery_email_confirmation?token=${encodeURIComponent(token)}`
        // 如果此API不需要默認的Authorization頭 (因為token本身就是驗證),
        // 可能需要在 otherOptions 中設置 isPublicAPI: true 或類似配置,
        // 取決於 base.ts 中 get 函數的具體實現和默認行為。
        // 目前暫不添加，依賴 base.ts 的標準行為。
    );
};

export const requestPasswordReset = async (email: string) => {
    // The cURL uses '/general_users/password' directly under the baseURL
    return post<CommonResponse>(`${baseURL}/general_users/password`, {
        // <--- 移除了 /api/v1
        body: {
            general_user: {
                email
            }
        }
    });
};

// Type definition for the reset password payload
interface ResetPasswordPayload {
    reset_password_token: string;
    password: string;
    password_confirmation: string;
}

// Service function to reset the user's password
export const resetUserPassword = async (payload: ResetPasswordPayload): Promise<CommonResponse> => {
    return put<CommonResponse>(
        `${baseURL}/general_users/password`,
        {
            // Note: No /api/v1, consistent with requestPasswordReset
            body: {
                general_user: {
                    reset_password_token: payload.reset_password_token,
                    password: payload.password,
                    password_confirmation: payload.password_confirmation
                }
            }
        }
        // We are intentionally omitting isPublicAPI: true here for now.
        // The base `put` function's default Authorization header behavior will apply.
        // If this endpoint specifically should NOT receive an Authorization header,
        // or needs other specific header configurations, this might need adjustment later
        // or a modification in how baseFetch handles non-authenticated but sensitive operations.
    );
};
