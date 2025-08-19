'use client';

import { useEffect, useState, FormEvent } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import Button from '@/app/components/base/button';
import Input from '@/app/components/base/input';
import Toast from '@/app/components/base/toast';
// Import proper eye icons from heroicons
import { EyeIcon, EyeSlashIcon } from '@heroicons/react/24/outline';
// import { put } from '@/service/base'; // No longer directly used here
import { resetUserPassword } from '@/service/user'; // Import the new service function

export default function ResetPasswordPage() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const [resetPasswordToken, setResetPasswordToken] = useState<string | null>(null);
    const [password, setPassword] = useState('');
    const [passwordConfirmation, setPasswordConfirmation] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [success, setSuccess] = useState<string | null>(null);
    const [isPasswordVisible, setIsPasswordVisible] = useState(false);
    const [isConfirmPasswordVisible, setIsConfirmPasswordVisible] = useState(false);

    useEffect(() => {
        const token = searchParams.get('reset_password_token');
        if (token) {
            setResetPasswordToken(token);
        } else {
            setError('Invalid password reset link. Token is missing.');
            Toast.notify({
                type: 'error',
                message: 'Invalid password reset link. Token is missing.'
            });
        }
    }, [searchParams]);

    const togglePasswordVisibility = () => setIsPasswordVisible(!isPasswordVisible);
    const toggleConfirmPasswordVisibility = () =>
        setIsConfirmPasswordVisible(!isConfirmPasswordVisible);

    // Modified to handle clicks from Button component (MouseEvent) instead of form submission (FormEvent)
    const handleSubmit = async () => {
        setError(null);
        setSuccess(null);

        if (!resetPasswordToken) {
            setError('Password reset token is invalid or missing.');
            Toast.notify({ type: 'error', message: 'Password reset token is invalid or missing.' });
            return;
        }

        if (password !== passwordConfirmation) {
            setError('The passwords entered do not match.');
            Toast.notify({ type: 'error', message: 'The passwords entered do not match.' });
            return;
        }

        if (password.length < 8) {
            setError('Password must be at least 8 characters long.');
            Toast.notify({
                type: 'error',
                message: 'Password must be at least 8 characters long.'
            });
            return;
        }

        setIsLoading(true);

        try {
            const payload = {
                // general_user object is handled by the service function now
                reset_password_token: resetPasswordToken,
                password: password,
                password_confirmation: passwordConfirmation
            };

            // const response = await put<any>(
            //     `/general_users/password`,
            //     { body: payload }, // This payload structure was for direct `put`
            //     { isPublicAPI: true } // This option is now handled by service or base.ts defaults
            // );
            const response = await resetUserPassword(payload);

            if (response) {
                setSuccess(
                    'Password has been reset successfully! You can now log in with your new password.'
                );
                Toast.notify({
                    type: 'success',
                    message:
                        'Password has been reset successfully! You can now log in with your new password.'
                });
                setTimeout(() => {
                    router.push('/login');
                }, 3000);
            } else {
                setError('Password reset failed. Please try again later.');
                Toast.notify({
                    type: 'error',
                    message: 'Password reset failed. Please try again later.'
                });
            }
        } catch (err: any) {
            console.error('Reset password error:', err);
            let errorMessage =
                'An error occurred during the password reset process. Please try again later.';
            if (err.response && err.response.data && err.response.data.errors) {
                const backendErrors = err.response.data.errors;
                if (typeof backendErrors === 'object') {
                    errorMessage = Object.values(backendErrors).flat().join(' ');
                } else if (typeof backendErrors === 'string') {
                    errorMessage = backendErrors;
                }
            } else if (err.message) {
                errorMessage = err.message;
            }
            setError(errorMessage);
            Toast.notify({ type: 'error', message: errorMessage });
        } finally {
            setIsLoading(false);
        }
    };

    if (!resetPasswordToken && !error) {
        return (
            <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
                <p>Loading...</p>
            </div>
        );
    }

    if (error && !success && !resetPasswordToken) {
        return (
            <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4 text-center">
                <div className="max-w-md w-full bg-white shadow-md rounded-lg p-6">
                    <h1 className="text-2xl font-bold text-red-600 mb-4">Error</h1>
                    <p className="mb-6">{error}</p>
                    <Link href="/login" legacyBehavior>
                        <Button type="primary" className="w-full">
                            Back to Login
                        </Button>
                    </Link>
                </div>
            </div>
        );
    }

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
            <div className="max-w-md w-full bg-white shadow-md rounded-lg overflow-hidden">
                <div className="p-6 border-b border-gray-200">
                    <h1 className="text-2xl font-bold text-gray-800">Reset Your Password</h1>
                </div>
                {/* Removed form tag since we're using Button's onClick instead of form submission */}
                <div className="p-6 space-y-6">
                    {error && (
                        <div className="p-3 bg-red-50 border border-red-200 rounded-md text-red-600 text-sm">
                            {error}
                        </div>
                    )}
                    {success && (
                        <div className="p-3 bg-green-50 border border-green-200 rounded-md text-green-600 text-sm">
                            {success}
                        </div>
                    )}

                    {!success && (
                        <>
                            <div className="space-y-1">
                                <label className="block text-sm font-medium text-gray-700">
                                    <span className="text-red-500">*</span> New Password
                                </label>
                                <div className="relative">
                                    <Input
                                        value={password}
                                        onChange={(v) => setPassword(v)}
                                        placeholder="Enter your new password"
                                        type={isPasswordVisible ? 'text' : 'password'}
                                        required
                                        className="pr-10" // Add space for the eye icon
                                    />
                                    <button
                                        type="button"
                                        onClick={togglePasswordVisibility}
                                        className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-500 hover:text-gray-700"
                                        aria-label={
                                            isPasswordVisible ? 'Hide password' : 'Show password'
                                        }
                                    >
                                        {isPasswordVisible ? (
                                            <EyeSlashIcon className="h-5 w-5" />
                                        ) : (
                                            <EyeIcon className="h-5 w-5" />
                                        )}
                                    </button>
                                </div>
                            </div>
                            <div className="space-y-1">
                                <label className="block text-sm font-medium text-gray-700">
                                    <span className="text-red-500">*</span> Confirm New Password
                                </label>
                                <div className="relative">
                                    <Input
                                        value={passwordConfirmation}
                                        onChange={(v) => setPasswordConfirmation(v)}
                                        placeholder="Enter your new password again"
                                        type={isConfirmPasswordVisible ? 'text' : 'password'}
                                        required
                                        className="pr-10" // Add space for the eye icon
                                    />
                                    <button
                                        type="button"
                                        onClick={toggleConfirmPasswordVisibility}
                                        className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-500 hover:text-gray-700"
                                        aria-label={
                                            isConfirmPasswordVisible
                                                ? 'Hide password'
                                                : 'Show password'
                                        }
                                    >
                                        {isConfirmPasswordVisible ? (
                                            <EyeSlashIcon className="h-5 w-5" />
                                        ) : (
                                            <EyeIcon className="h-5 w-5" />
                                        )}
                                    </button>
                                </div>
                            </div>
                        </>
                    )}
                </div>
                {!success && (
                    <div className="p-6 border-t border-gray-200">
                        <Button
                            type="primary"
                            onClick={handleSubmit} // Now correctly matched to the function signature
                            className="w-full"
                            loading={isLoading}
                            disabled={isLoading || !resetPasswordToken}
                        >
                            {isLoading ? 'Resetting...' : 'Reset Password'}
                        </Button>
                    </div>
                )}
                {success && (
                    <div className="p-6 border-t border-gray-200 text-center">
                        <Link href="/login" legacyBehavior>
                            <Button type="primary" className="w-full">
                                Go to Login
                            </Button>
                        </Link>
                    </div>
                )}
                {!success && (
                    <div className="p-4 text-center text-sm border-t border-gray-100">
                        <Link href="/login" className="text-blue-600 hover:underline">
                            Back to Login
                        </Link>
                    </div>
                )}
            </div>
        </div>
    );
}
