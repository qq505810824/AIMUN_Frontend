'use client';

import { useEffect, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { useTranslation } from 'react-i18next';
import Toast from '@/app/components/base/toast';

// 確認狀態枚舉
enum ConfirmationStatus {
    LOADING,
    SUCCESS,
    FAILED
}

export default function ConfirmRecoveryEmailPage() {
    const { t } = useTranslation();
    const router = useRouter();
    const searchParams = useSearchParams();
    const [status, setStatus] = useState<ConfirmationStatus>(ConfirmationStatus.LOADING);
    const [errorType, setErrorType] = useState('');

    useEffect(() => {
        // 從URL參數中獲取確認結果
        const confirmed = searchParams.get('recovery_email_confirmed');
        const error = searchParams.get('error_type');

        if (confirmed === 'true') {
            setStatus(ConfirmationStatus.SUCCESS);
            Toast.notify({
                type: 'success',
                message: t('backupEmail.confirmationSuccess')
            });

            // 短暫延遲後自動重定向到首頁或設置頁面
            setTimeout(() => {
                router.push('/');
            }, 3000);
        } else {
            setStatus(ConfirmationStatus.FAILED);
            setErrorType(error || 'unknown');

            Toast.notify({
                type: 'error',
                message: getErrorMessage(error)
            });
        }
    }, [searchParams, router, t]);

    // 根據錯誤類型獲取本地化的錯誤消息
    const getErrorMessage = (errorType: string | null): string => {
        switch (errorType) {
            case 'token_invalid':
                return t('backupEmail.errors.tokenInvalid');
            case 'token_expired':
                return t('backupEmail.errors.tokenExpired');
            case 'token_used':
                return t('backupEmail.errors.tokenUsed');
            default:
                return t('backupEmail.errors.confirmationFailed');
        }
    };

    // 渲染不同狀態的內容
    const renderContent = () => {
        switch (status) {
            case ConfirmationStatus.LOADING:
                return (
                    <div className="text-center">
                        <p>{t('common.loading')}</p>
                    </div>
                );

            case ConfirmationStatus.SUCCESS:
                return (
                    <div className="text-center">
                        <h1 className="text-2xl font-bold text-green-600 mb-4">
                            {t('backupEmail.confirmationSuccess')}
                        </h1>
                        <p>{t('backupEmail.redirecting')}</p>
                    </div>
                );

            case ConfirmationStatus.FAILED:
                return (
                    <div className="text-center">
                        <h1 className="text-2xl font-bold text-red-600 mb-4">
                            {t('backupEmail.confirmationFailed')}
                        </h1>
                        <p>{getErrorMessage(errorType)}</p>
                        <div className="mt-4">
                            <button
                                className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                                onClick={() => router.push('/')}
                            >
                                {t('common.backToHome')}
                            </button>
                        </div>
                    </div>
                );

            default:
                return null;
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
            <div className="max-w-md w-full bg-white p-8 rounded-lg shadow-md">
                {renderContent()}
            </div>
        </div>
    );
}
