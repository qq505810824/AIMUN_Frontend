'use client';

import { useEffect, useState, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
// import { useTranslation } from 'react-i18next'; // Removed
import Button from '@/app/components/base/button';
import Toast from '@/app/components/base/toast';
import { CheckCircleIcon, ExclamationCircleIcon, ArrowPathIcon } from '@heroicons/react/24/solid';
import { verifyRecoveryToken } from '@/service/user'; // Import the service function

enum VerificationStatus {
    VERIFYING,
    SUCCESS,
    FAILED,
    INVALID_TOKEN,
    EXPIRED_TOKEN
}

// Base URL for the API - consider moving to a config file
// const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001'; // No longer needed here

function VerifyRecoveryEmailContent() {
    // const { t } = useTranslation(); // Removed
    const router = useRouter();
    const searchParams = useSearchParams();
    const [status, setStatus] = useState<VerificationStatus>(VerificationStatus.VERIFYING);
    const [errorMessage, setErrorMessage] = useState<string>('');

    useEffect(() => {
        const currentToken = searchParams.get('token');

        if (!currentToken) {
            setStatus(VerificationStatus.INVALID_TOKEN);
            const msg = 'No verification token found in URL. Please use the link from your email.';
            setErrorMessage(msg);
            Toast.notify({ type: 'error', message: msg });
            return;
        }

        const callVerifyApi = async (tokenToVerify: string) => {
            setStatus(VerificationStatus.VERIFYING);
            setErrorMessage('');

            try {
                const response = await verifyRecoveryToken(tokenToVerify);

                // Assuming verifyRecoveryToken (and base 'get') throws an error for non-ok HTTP statuses
                // or for business errors if base.ts is configured to do so (e.g. response.code !== '0').
                // If it resolves successfully, we assume the API reported success.
                // The actual 'success' field might be in response.success or response.data.success
                // For now, let's assume if it doesn't throw, it's a success from API perspective.
                // The service function returns CommonResponse, which should have a 'success' field or similar.

                if (response.success) {
                    // Relying on CommonResponse structure
                    setStatus(VerificationStatus.SUCCESS);
                    Toast.notify({
                        type: 'success',
                        message: response.message || 'Recovery email verified successfully!'
                    });
                    setTimeout(() => {
                        router.push('/essay/grade');
                    }, 3000);
                } else {
                    // This case handles if API returns 2xx but with success: false in body
                    // which base.ts might not throw for, depending on its 'code' checking.
                    setStatus(VerificationStatus.FAILED);
                    let specificMessage =
                        response.message || 'Verification failed. Please try again.';
                    // Attempt to get more specific error from response if available
                    // This part is highly dependent on the actual structure of CommonResponse.errors or error_type fields
                    // For example, if response.errors is an object:
                    // if (response.errors && typeof response.errors === 'object') {
                    //    specificMessage = Object.values(response.errors).join(' ');
                    // } else if (response.error_type) { // or if there's an error_type
                    //    switch(response.error_type) { ... }
                    // }

                    setErrorMessage(specificMessage);
                    Toast.notify({ type: 'error', message: specificMessage });
                }
            } catch (error: any) {
                console.error('Verification API call failed:', error);
                let specificMessage = 'An unknown error occurred.';
                let targetStatus = VerificationStatus.FAILED;

                // Error handling now depends on how base.ts structures the error it throws.
                // It might be an object with 'message' and 'code' or 'status'.
                // Or it could be the direct error from fetch if base.ts re-throws it.

                const apiErrorMessage = error.message; // Standard for Error objects
                const apiErrorCode = error.code; // Custom property if base.ts adds it
                // const apiErrorStatus = error.status; // HTTP status if base.ts adds it

                if (apiErrorMessage) {
                    specificMessage = apiErrorMessage;
                    if (apiErrorMessage.toLowerCase().includes('expired')) {
                        targetStatus = VerificationStatus.EXPIRED_TOKEN;
                    } else if (
                        apiErrorMessage.toLowerCase().includes('invalid') ||
                        apiErrorMessage.toLowerCase().includes('malformed')
                    ) {
                        targetStatus = VerificationStatus.INVALID_TOKEN;
                    } else if (apiErrorMessage.toLowerCase().includes('used')) {
                        targetStatus = VerificationStatus.INVALID_TOKEN; // Or TOKEN_USED
                    }
                    // Add more checks based on apiErrorCode if available and meaningful
                    // e.g., if (apiErrorCode === 'SPECIFIC_BACKEND_ERROR_CODE_FOR_EXPIRED') { ... }
                } else {
                    specificMessage =
                        'Failed to connect to the verification service. Please try again.';
                }

                setStatus(targetStatus);
                setErrorMessage(specificMessage);
                Toast.notify({ type: 'error', message: specificMessage });
            }
        };

        callVerifyApi(currentToken);
    }, [searchParams, router]);

    const renderIcon = () => {
        switch (status) {
            case VerificationStatus.VERIFYING:
                return <ArrowPathIcon className="h-12 w-12 text-primary-500 animate-spin" />;
            case VerificationStatus.SUCCESS:
                return <CheckCircleIcon className="h-12 w-12 text-green-500" />;
            case VerificationStatus.FAILED:
            case VerificationStatus.INVALID_TOKEN:
            case VerificationStatus.EXPIRED_TOKEN:
                return <ExclamationCircleIcon className="h-12 w-12 text-red-500" />;
            default:
                return null;
        }
    };

    const renderMessage = () => {
        switch (status) {
            case VerificationStatus.VERIFYING:
                return <p className="text-lg text-gray-700">Verifying your email...</p>; // Hardcoded English
            case VerificationStatus.SUCCESS:
                return (
                    <>
                        <h1 className="text-2xl font-semibold text-gray-900">
                            Recovery Email Verified!
                        </h1>{' '}
                        {/* Hardcoded English */}
                        <p className="text-gray-600 mt-2">
                            You will be redirected to settings shortly.
                        </p>{' '}
                        {/* Hardcoded English */}
                    </>
                );
            case VerificationStatus.FAILED:
                return (
                    <>
                        <h1 className="text-2xl font-semibold text-gray-900">
                            Verification Failed
                        </h1>{' '}
                        {/* Hardcoded English */}
                        <p className="text-red-600 mt-2">
                            {errorMessage ||
                                'Could not verify your recovery email. Please try again.'}
                        </p>{' '}
                        {/* Hardcoded English */}
                    </>
                );
            case VerificationStatus.INVALID_TOKEN:
                return (
                    <>
                        <h1 className="text-2xl font-semibold text-gray-900">
                            Verification Failed
                        </h1>{' '}
                        {/* Hardcoded English */}
                        <p className="text-red-600 mt-2">
                            {errorMessage || 'No verification token provided or token is invalid.'}
                        </p>{' '}
                        {/* Hardcoded English */}
                    </>
                );
            case VerificationStatus.EXPIRED_TOKEN:
                return (
                    <>
                        <h1 className="text-2xl font-semibold text-gray-900">
                            Verification Failed
                        </h1>{' '}
                        {/* Hardcoded English */}
                        <p className="text-red-600 mt-2">
                            {errorMessage || 'The verification link has expired.'}
                        </p>{' '}
                        {/* Hardcoded English */}
                    </>
                );
            default:
                return null;
        }
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 p-4">
            <div className="w-full max-w-md p-8 space-y-6 bg-white rounded-xl shadow-xl text-center">
                <div className="flex justify-center mb-4">{renderIcon()}</div>
                {renderMessage()}
                {(status === VerificationStatus.FAILED ||
                    status === VerificationStatus.INVALID_TOKEN ||
                    status === VerificationStatus.EXPIRED_TOKEN) && (
                    <div className="mt-6">
                        <Button
                            type="default"
                            onClick={() => router.push('/')}
                            className="w-full mt-2"
                        >
                            Back to Home {/* Hardcoded English */}
                        </Button>
                    </div>
                )}
            </div>
        </div>
    );
}

// Next.js 要求 Suspense 用於包裝使用 useSearchParams 的組件
export default function VerifyRecoveryEmailPage() {
    return (
        <Suspense
            fallback={
                <div className="flex items-center justify-center min-h-screen">Loading...</div>
            }
        >
            {' '}
            {/* Hardcoded English for fallback */}
            <VerifyRecoveryEmailContent />
        </Suspense>
    );
}
