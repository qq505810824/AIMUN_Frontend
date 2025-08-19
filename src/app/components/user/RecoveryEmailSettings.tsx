'use client';

import { useState } from 'react';
// import { useTranslation } from 'react-i18next'; // Removed
import Button from '@/app/components/base/button';
import Toast from '@/app/components/base/toast';
import {
    setRecoveryEmail,
    resendRecoveryEmailConfirmation,
    removeRecoveryEmail
} from '@/service/user';
import {
    EnvelopeIcon,
    CheckCircleIcon,
    ArrowPathIcon,
    ExclamationCircleIcon,
    PencilIcon,
    TrashIcon
} from '@heroicons/react/24/outline';

interface RecoveryEmailSettingsProps {
    recoveryEmail: string | null;
    isConfirmed: boolean;
    onUpdate: () => void; // 用於更新用戶數據的回調
}

const RecoveryEmailSettings = ({
    recoveryEmail,
    isConfirmed,
    onUpdate
}: RecoveryEmailSettingsProps) => {
    // const { t } = useTranslation(); // Removed
    const [isEditing, setIsEditing] = useState(false);
    const [email, setEmail] = useState(recoveryEmail || '');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    // 提交新的後備Email
    const handleSubmit = async () => {
        if (!email) {
            setError('Please enter an email address'); // Hardcoded English
            return;
        }

        setError('');
        setLoading(true);

        try {
            await setRecoveryEmail(email);
            Toast.notify({
                type: 'success',
                message: 'Recovery email has been updated' // Hardcoded English
            });
            onUpdate(); // 刷新用戶數據
            setIsEditing(false);
        } catch (err: any) {
            setError(err.message || 'An unknown error occurred.'); // Hardcoded English
        } finally {
            setLoading(false);
        }
    };

    // 重新發送確認郵件
    const handleResendConfirmation = async () => {
        setError('');
        setLoading(true);

        try {
            await resendRecoveryEmailConfirmation();
            Toast.notify({
                type: 'success',
                message: 'A new confirmation email has been successfully sent.' // Hardcoded English
            });
        } catch (err: any) {
            setError(err.message || 'An unknown error occurred.'); // Hardcoded English
        } finally {
            setLoading(false);
        }
    };

    // 移除後備Email
    const handleRemove = async () => {
        if (!window.confirm('Are you sure you want to remove your recovery email?')) {
            // Hardcoded English
            return;
        }

        setError('');
        setLoading(true);

        try {
            await removeRecoveryEmail();
            Toast.notify({
                type: 'success',
                message: 'Recovery email has been removed' // Hardcoded English
            });
            onUpdate(); // 刷新用戶數據
        } catch (err: any) {
            setError(err.message || 'An unknown error occurred.'); // Hardcoded English
        } finally {
            setLoading(false);
        }
    };

    // 如果沒有設置後備Email
    if (!recoveryEmail && !isEditing) {
        return (
            <div className="p-6 bg-white rounded-xl shadow-sm border border-gray-100">
                <div className="flex items-center mb-4">
                    <div className="bg-gray-100 w-10 h-10 flex items-center justify-center rounded-full mr-3">
                        <EnvelopeIcon className="h-5 w-5 text-gray-600" />
                    </div>
                    <h3 className="text-lg font-medium text-gray-900">Set Recovery Email</h3>{' '}
                    {/* Hardcoded English */}
                </div>

                <div className="bg-gray-50 rounded-lg p-4 mb-4 border border-gray-200">
                    <p className="text-sm text-gray-600">
                        You have not set a recovery email yet. A recovery email helps you regain
                        access to your account if you forget your password.
                    </p>{' '}
                    {/* Hardcoded English */}
                </div>

                <div className="mt-4">
                    <Button
                        onClick={() => setIsEditing(true)}
                        className="flex items-center"
                        type="primary"
                    >
                        <EnvelopeIcon className="h-4 w-4 mr-1.5" />
                        Add Recovery Email
                    </Button>{' '}
                    {/* Hardcoded English */}
                </div>
            </div>
        );
    }

    // 如果正在編輯
    if (isEditing) {
        return (
            <div className="p-6 bg-white rounded-xl shadow-sm border border-gray-100">
                <div className="flex items-center mb-4">
                    <div className="bg-primary-50 w-10 h-10 flex items-center justify-center rounded-full mr-3">
                        <EnvelopeIcon className="h-5 w-5 text-primary-600" />
                    </div>
                    <h3 className="text-lg font-medium text-gray-900">Set Recovery Email</h3>{' '}
                    {/* Hardcoded English */}
                </div>

                <div className="mt-4">
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                        Recovery Email Address
                    </label>{' '}
                    {/* Hardcoded English */}
                    <div className="relative rounded-md shadow-sm">
                        <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                            <EnvelopeIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
                        </div>
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="pl-10 block w-full rounded-lg border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500"
                            placeholder="Please enter your recovery email address" // Hardcoded English
                        />
                    </div>
                </div>

                {error && (
                    <div className="mt-3 flex items-center p-3 bg-red-50 rounded-lg">
                        <ExclamationCircleIcon className="h-5 w-5 text-red-500 mr-2" />
                        <p className="text-sm text-red-600">{error}</p>
                    </div>
                )}

                <div className="mt-5 flex justify-end space-x-3">
                    <Button
                        onClick={() => {
                            setIsEditing(false);
                            setEmail(recoveryEmail || '');
                            setError('');
                        }}
                        className="border border-gray-200"
                    >
                        Cancel
                    </Button>{' '}
                    {/* Hardcoded English */}
                    <Button
                        onClick={handleSubmit}
                        loading={loading}
                        disabled={!email}
                        type="primary"
                        className="flex items-center"
                    >
                        Save
                    </Button>{' '}
                    {/* Hardcoded English */}
                </div>
            </div>
        );
    }

    // 如果已設置後備Email
    return (
        <div className="p-6 bg-white rounded-xl shadow-sm border border-gray-100">
            <div className="flex items-center mb-4">
                <div
                    className={`w-10 h-10 flex items-center justify-center rounded-full mr-3 ${isConfirmed ? 'bg-green-50' : 'bg-yellow-50'}`}
                >
                    {isConfirmed ? (
                        <CheckCircleIcon className="h-5 w-5 text-green-600" />
                    ) : (
                        <ArrowPathIcon className="h-5 w-5 text-yellow-600" />
                    )}
                </div>
                <h3 className="text-lg font-medium text-gray-900">Recovery Email</h3>{' '}
                {/* Hardcoded English */}
            </div>

            <div className="bg-gray-50 rounded-lg p-4 border border-gray-200 mb-4">
                <div className="flex items-center justify-between">
                    <div className="flex items-center">
                        <EnvelopeIcon className="h-5 w-5 text-gray-500 mr-2" />
                        <span className="text-sm font-medium text-gray-700">{recoveryEmail}</span>
                        {isConfirmed ? (
                            <span className="ml-2 px-2.5 py-0.5 text-xs bg-green-100 text-green-800 rounded-full flex items-center">
                                <CheckCircleIcon className="h-3 w-3 mr-1" />
                                Confirmed
                            </span> /* Hardcoded English */
                        ) : (
                            <span className="ml-2 px-2.5 py-0.5 text-xs bg-yellow-100 text-yellow-800 rounded-full flex items-center">
                                <ArrowPathIcon className="h-3 w-3 mr-1" />
                                Pending
                            </span> /* Hardcoded English */
                        )}
                    </div>
                </div>
            </div>

            {error && (
                <div className="mt-3 mb-4 flex items-center p-3 bg-red-50 rounded-lg">
                    <ExclamationCircleIcon className="h-5 w-5 text-red-500 mr-2" />
                    <p className="text-sm text-red-600">{error}</p>
                </div>
            )}

            <div className="mt-5 flex flex-wrap gap-2">
                <Button
                    onClick={() => setIsEditing(true)}
                    className="border border-gray-200 flex items-center"
                >
                    <PencilIcon className="h-4 w-4 mr-1.5" />
                    Change
                </Button>{' '}
                {/* Hardcoded English */}
                {!isConfirmed && (
                    <Button
                        onClick={handleResendConfirmation}
                        loading={loading}
                        type="primary"
                        className="flex items-center"
                    >
                        <ArrowPathIcon className="h-4 w-4 mr-1.5" />
                        Resend Confirmation Email
                    </Button> /* Hardcoded English */
                )}
                <Button
                    onClick={handleRemove}
                    loading={loading}
                    type="warning"
                    className="flex items-center"
                >
                    <TrashIcon className="h-4 w-4 mr-1.5" />
                    Remove
                </Button>{' '}
                {/* Hardcoded English */}
            </div>
        </div>
    );
};

export default RecoveryEmailSettings;
