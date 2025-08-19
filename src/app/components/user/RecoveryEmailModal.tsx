'use client';
import { useState, useEffect } from 'react';
import Modal from '@/app/components/base/modal';
import Button from '@/app/components/base/button';
import { setRecoveryEmail, resendRecoveryEmailConfirmation } from '@/service/user';
import Toast from '@/app/components/base/toast';
import {
    EnvelopeIcon,
    CheckCircleIcon,
    ArrowPathIcon,
    ExclamationCircleIcon
} from '@heroicons/react/24/outline';

// 模態框狀態枚舉 - 簡化為兩個主要狀態
enum RecoveryEmailStep {
    INPUT, // 輸入Email
    VERIFICATION // 等待驗證
}

interface RecoveryEmailModalProps {
    isOpen: boolean;
    onClose: () => void;
    currentEmail?: string | null; // 當前已設置但未驗證的郵箱
    isConfirmed: boolean; // 是否已驗證
    onEmailSet: () => void; // 成功設置Email後的回調
}

const RecoveryEmailModal = ({
    isOpen,
    onClose,
    currentEmail,
    isConfirmed,
    onEmailSet
}: RecoveryEmailModalProps) => {
    console.log(
        '[RecoveryEmailModal] Rendering with isOpen:',
        isOpen,
        'currentEmail:',
        currentEmail,
        'isConfirmed:',
        isConfirmed
    );
    const [email, setEmail] = useState(currentEmail || '');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [resendSuccess, setResendSuccess] = useState(false); // 新增狀態追蹤重發郵件是否成功
    const [step, setStep] = useState<RecoveryEmailStep>(
        currentEmail ? RecoveryEmailStep.VERIFICATION : RecoveryEmailStep.INPUT
    );

    // 重置表單狀態
    useEffect(() => {
        if (isOpen) {
            setEmail(currentEmail || '');
            setError('');
            setResendSuccess(false);
            setStep(currentEmail ? RecoveryEmailStep.VERIFICATION : RecoveryEmailStep.INPUT);
        }
    }, [isOpen, currentEmail]);

    // 提交後備Email
    const handleSubmit = async () => {
        if (!email) return;

        setError('');
        setLoading(true);

        try {
            await setRecoveryEmail(email);
            setStep(RecoveryEmailStep.VERIFICATION);
            onEmailSet();
            Toast.notify({
                type: 'success',
                message: `A confirmation email has been sent to ${email}. Please check your inbox and click the confirmation link.`
            });
        } catch (err: any) {
            setError(err.message || 'An unknown error occurred.');
        } finally {
            setLoading(false);
        }
    };

    // 重新發送確認郵件 - 修改為不改變步驟狀態
    const handleResendConfirmation = async () => {
        setError('');
        setResendSuccess(false);
        setLoading(true);

        try {
            await resendRecoveryEmailConfirmation();
            // 不再切換步驟，只設置重發成功狀態
            setResendSuccess(true);
            Toast.notify({
                type: 'success',
                message: 'A new confirmation email has been successfully sent.'
            });
        } catch (err: any) {
            setError(err.message || 'An unknown error occurred.');
        } finally {
            setLoading(false);
        }
    };

    // 渲染不同狀態的內容
    const renderContent = () => {
        switch (step) {
            case RecoveryEmailStep.INPUT:
                return (
                    <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
                        <div className="mb-6 text-center">
                            <div className="mx-auto bg-primary-50 w-12 h-12 flex items-center justify-center rounded-full mb-4">
                                <EnvelopeIcon className="h-6 w-6 text-primary-600" />
                            </div>
                            <h3 className="text-lg font-medium text-gray-900 mb-1">
                                Set Your Recovery Email
                            </h3>
                            <p className="text-sm text-gray-500">
                                This email will help you recover your account if needed
                            </p>
                        </div>
                        <div className="mb-4">
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Recovery Email Address
                            </label>
                            <div className="relative rounded-md shadow-sm">
                                <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                                    <EnvelopeIcon
                                        className="h-5 w-5 text-gray-400"
                                        aria-hidden="true"
                                    />
                                </div>
                                <input
                                    type="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    className="block w-full h-10 rounded-lg pl-10 border-gray-300 focus:border-primary-500 focus:ring-primary-500 shadow-sm"
                                    placeholder="Please enter your recovery email address"
                                />
                            </div>
                        </div>
                        {error && (
                            <div className="mb-4 flex items-center p-3 bg-red-50 rounded-lg">
                                <ExclamationCircleIcon className="h-5 w-5 text-red-500 mr-2" />
                                <p className="text-sm text-red-600">{error}</p>
                            </div>
                        )}
                        <div className="flex justify-end space-x-3 mt-6">
                            <Button onClick={onClose} className="border border-gray-200">
                                Later
                            </Button>
                            <Button
                                onClick={handleSubmit}
                                loading={loading}
                                disabled={!email}
                                type="primary"
                                className="flex items-center"
                            >
                                Confirm
                            </Button>
                        </div>
                    </div>
                );

            case RecoveryEmailStep.VERIFICATION:
                return (
                    <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
                        <div className="mb-6 text-center">
                            <div className="mx-auto bg-yellow-50 w-12 h-12 flex items-center justify-center rounded-full mb-4">
                                <ArrowPathIcon className="h-6 w-6 text-yellow-600" />
                            </div>
                            <h3 className="text-lg font-medium text-gray-900 mb-1">
                                Verification Email Sent
                            </h3>
                            <p className="text-sm text-gray-500">
                                Please check your inbox and verify your email
                            </p>
                        </div>

                        {/* 顯示重發成功訊息 */}
                        {resendSuccess ? (
                            <div className="bg-green-50 border border-green-100 rounded-lg p-4 mb-6">
                                <div className="flex items-center">
                                    <CheckCircleIcon className="h-5 w-5 text-green-500 mr-2" />
                                    <p className="text-sm text-green-700">
                                        A new confirmation email has been successfully sent. Please
                                        check your inbox.
                                    </p>
                                </div>
                            </div>
                        ) : (
                            <div className="bg-indigo-50 border border-indigo-100 rounded-lg p-4 mb-6">
                                <p className="text-sm text-center">
                                    {`A confirmation email has been sent to `}
                                    <span className="font-medium text-indigo-700">
                                        {currentEmail || email}
                                    </span>
                                    {`. Please check your inbox and click the confirmation link.`}
                                </p>
                            </div>
                        )}

                        {error && (
                            <div className="mb-4 flex items-center p-3 bg-red-50 rounded-lg">
                                <ExclamationCircleIcon className="h-5 w-5 text-red-500 mr-2" />
                                <p className="text-sm text-red-600">{error}</p>
                            </div>
                        )}

                        <div className="flex justify-end space-x-3 mt-6">
                            <Button onClick={onClose} className="border border-gray-200">
                                Close
                            </Button>
                            <Button
                                onClick={handleResendConfirmation}
                                loading={loading}
                                disabled={resendSuccess && loading}
                                type="primary"
                                className="flex items-center"
                            >
                                <ArrowPathIcon className="h-4 w-4 mr-1" />
                                Resend Confirmation Email
                            </Button>
                        </div>
                    </div>
                );

            default:
                return null;
        }
    };

    return (
        <Modal
            isShow={isOpen}
            onClose={onClose}
            title=""
            description=""
            closable={false}
            className="max-w-lg"
        >
            {renderContent()}
        </Modal>
    );
};

export default RecoveryEmailModal;
