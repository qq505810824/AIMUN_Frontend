'use client';

import { useAppContext } from '@/context/app-context';
import { update_password } from '@/service/common';
import ErrorList from '@/utils/ErrorList';
import { useRouter } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';
import Input from '../../base/input';
import Toast from '../../base/toast';
import RecoveryEmailSettings from '@/app/components/user/RecoveryEmailSettings';

const SettingMain = () => {
    const changePwdForm = useRef<HTMLFormElement>(null);
    const router = useRouter();
    const [errors, setErrors] = useState<any>();
    const [saveing, setSaveing] = useState(false);
    const { userProfile } = useAppContext();
    const [isImageLoading, setIsImageLoading] = useState(true);
    const [imageError, setImageError] = useState(false);
    const [currentDateTime, setCurrentDateTime] = useState<string>('');
    const loadingTimeoutRef = useRef<NodeJS.Timeout | null>(null);

    // Format date time function
    const formatDateTime = () => {
        const now = new Date();
        const year = now.getFullYear();
        const month = String(now.getMonth() + 1).padStart(2, '0');
        const day = String(now.getDate()).padStart(2, '0');
        const hours = String(now.getHours()).padStart(2, '0');
        const minutes = String(now.getMinutes()).padStart(2, '0');
        const seconds = String(now.getSeconds()).padStart(2, '0');

        return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
    };

    // Update time
    useEffect(() => {
        // Initial time setup
        setCurrentDateTime(formatDateTime());

        // Update time every second
        const timer = setInterval(() => {
            setCurrentDateTime(formatDateTime());
        }, 1000);

        // Clear timer
        return () => clearInterval(timer);
    }, []);

    // Set loading timeout to prevent infinite loading state
    useEffect(() => {
        if (isImageLoading && userProfile?.school?.logo_square_url) {
            loadingTimeoutRef.current = setTimeout(() => {
                setIsImageLoading(false);
                setImageError(true);
            }, 5000); // 5 seconds timeout for loading
        }

        return () => {
            if (loadingTimeoutRef.current) {
                clearTimeout(loadingTimeoutRef.current);
            }
        };
    }, [isImageLoading, userProfile?.school?.logo_square_url]);

    // Check if school logo exists
    const hasValidSchoolLogo =
        userProfile?.school &&
        (userProfile.school.logo_square_url || userProfile.school.logo_small_url) &&
        !imageError;

    const onSubmit = async (e: any) => {
        e.preventDefault();
        let formData = new FormData(e.currentTarget);
        let postData = {
            current_password: formData.get('current_password'),
            password: formData.get('password'),
            password_confirmation: formData.get('password_confirmation')
        };
        if (formData.get('password') === formData.get('password_confirmation')) {
            setErrors(null);
            setSaveing(true);
            const res = await update_password({
                url: '/api/v1/general_users/me/password',
                body: postData
            });
            setSaveing(false);
            if (res.success) {
                Toast.notify({
                    type: 'success',
                    message: 'Password changed successfully. Please log in again.'
                });
                router.push('/login');
            } else {
                setErrors(res.errors);
            }
        } else {
            setSaveing(false);
            Toast.notify({
                type: 'error',
                message: 'The passwords do not match.'
            });
        }
    };

    // Get student information
    const studentInfo =
        userProfile?.enrollments && userProfile.enrollments.length > 0
            ? userProfile.enrollments[0]
            : null;

    // Get teacher information
    const teacherInfo =
        userProfile?.teaching_assignments && userProfile.teaching_assignments.length > 0
            ? userProfile.teaching_assignments[0]
            : null;

    // 更新用戶資料的函數（簡單實現，重新載入頁面）
    const refreshUserProfile = () => {
        window.location.reload();
    };

    return (
        <div className="mx-auto p-8 w-full">
            {/* Display current time */}
            <div className="w-full md:w-3/4 mx-auto mb-4 px-2">
                <h1 className="text-2xl font-bold pb-2 mb-2">Profile Settings</h1>
                <p className="text-right text-sm text-gray-500">Current Time: {currentDateTime}</p>
            </div>

            <div className="flex flex-col gap-4 w-full justify-center">
                {/* User information block */}
                <div className="w-full md:w-3/4 mx-auto items-center bg-white rounded-xl p-6 shadow-sm">
                    <div className="flex flex-col md:flex-row items-start md:items-center gap-6">
                        {/* User avatar or placeholder */}
                        <div className="flex-shrink-0">
                            {hasValidSchoolLogo ? (
                                <div className="relative w-28 h-28 rounded-lg overflow-hidden border border-gray-200">
                                    {isImageLoading && (
                                        <div className="absolute inset-0 flex items-center justify-center bg-gray-50">
                                            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-violet-500"></div>
                                        </div>
                                    )}
                                    <img
                                        src={
                                            userProfile?.school?.logo_square_url ||
                                            userProfile?.school?.logo_small_url ||
                                            ''
                                        }
                                        alt={userProfile?.school?.name || 'School logo'}
                                        className={`w-full h-full object-cover ${isImageLoading ? 'opacity-0' : 'opacity-100'}`}
                                        onLoad={() => {
                                            setIsImageLoading(false);
                                            if (loadingTimeoutRef.current) {
                                                clearTimeout(loadingTimeoutRef.current);
                                            }
                                        }}
                                        onError={() => {
                                            setImageError(true);
                                            setIsImageLoading(false);
                                            if (loadingTimeoutRef.current) {
                                                clearTimeout(loadingTimeoutRef.current);
                                            }
                                        }}
                                    />
                                </div>
                            ) : (
                                <div className="w-28 h-28 bg-violet-100 rounded-lg flex items-center justify-center">
                                    <span className="text-2xl font-bold text-violet-700">
                                        {userProfile?.nickname?.charAt(0)?.toUpperCase() ||
                                            userProfile?.email?.charAt(0)?.toUpperCase() ||
                                            'U'}
                                    </span>
                                </div>
                            )}
                        </div>

                        {/* User information */}
                        <div className="flex-grow">
                            <div className="mb-4">
                                <h2 className="text-xl font-semibold text-gray-900">
                                    {userProfile?.nickname || 'User'}
                                </h2>
                                <p className="text-gray-600">{userProfile?.email || ''}</p>
                            </div>

                            {userProfile?.role && (
                                <div className="flex items-center gap-2 mb-3">
                                    <span className="text-sm text-gray-500">Role:</span>
                                    <span className="px-2 py-1 text-xs font-medium bg-violet-100 text-violet-800 rounded-full">
                                        {userProfile.role === 'teacher'
                                            ? 'Teacher'
                                            : userProfile.role === 'student'
                                              ? 'Student'
                                              : userProfile.role}
                                    </span>
                                </div>
                            )}

                            {userProfile?.school?.name && (
                                <div className="flex items-center gap-2 mb-2">
                                    <span className="text-sm text-gray-500">School:</span>
                                    <span className="text-gray-700">{userProfile.school.name}</span>
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Student detailed information */}
                    {userProfile?.role === 'student' && studentInfo && (
                        <div className="mt-6 pt-5 border-t border-gray-100">
                            <h3 className="text-base font-medium text-gray-800 mb-3">
                                Student Information
                            </h3>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                                {studentInfo.academic_year && (
                                    <div className="flex items-center gap-2">
                                        <span className="text-sm font-medium text-gray-500">
                                            Academic Year:
                                        </span>
                                        <span className="text-gray-700">
                                            {studentInfo.academic_year.name}
                                        </span>
                                    </div>
                                )}

                                {studentInfo.class_name && (
                                    <div className="flex items-center gap-2">
                                        <span className="text-sm font-medium text-gray-500">
                                            Class:
                                        </span>
                                        <span className="text-gray-700">
                                            {studentInfo.class_name}
                                        </span>
                                    </div>
                                )}

                                {studentInfo.class_number && (
                                    <div className="flex items-center gap-2">
                                        <span className="text-sm font-medium text-gray-500">
                                            Student ID:
                                        </span>
                                        <span className="text-gray-700">
                                            {studentInfo.class_number}
                                        </span>
                                    </div>
                                )}

                                {userProfile?.whats_app_number && (
                                    <div className="flex items-center gap-2">
                                        <span className="text-sm font-medium text-gray-500">
                                            WhatsApp:
                                        </span>
                                        <span className="text-gray-700">
                                            {userProfile.whats_app_number}
                                        </span>
                                    </div>
                                )}

                                {userProfile?.phone && (
                                    <div className="flex items-center gap-2">
                                        <span className="text-sm font-medium text-gray-500">
                                            Phone:
                                        </span>
                                        <span className="text-gray-700">{userProfile.phone}</span>
                                    </div>
                                )}

                                {userProfile?.date_of_birth && (
                                    <div className="flex items-center gap-2">
                                        <span className="text-sm font-medium text-gray-500">
                                            Date of Birth:
                                        </span>
                                        <span className="text-gray-700">
                                            {userProfile.date_of_birth}
                                        </span>
                                    </div>
                                )}

                                {studentInfo.created_at && (
                                    <div className="flex items-center gap-2">
                                        <span className="text-sm font-medium text-gray-500">
                                            Registration Date:
                                        </span>
                                        <span className="text-gray-700">
                                            {new Date(studentInfo.created_at).toLocaleDateString(
                                                'en-US'
                                            )}
                                        </span>
                                    </div>
                                )}
                            </div>
                        </div>
                    )}

                    {/* Teacher detailed information */}
                    {userProfile?.role === 'teacher' && teacherInfo && (
                        <div className="mt-6 pt-5 border-t border-gray-100">
                            <h3 className="text-base font-medium text-gray-800 mb-3">
                                Teacher Information
                            </h3>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                                {teacherInfo.academic_year && (
                                    <div className="flex items-center gap-2">
                                        <span className="text-sm font-medium text-gray-500">
                                            Academic Year:
                                        </span>
                                        <span className="text-gray-700">
                                            {teacherInfo.academic_year.name}
                                        </span>
                                    </div>
                                )}

                                {/* {teacherInfo.department && (
                                    <div className="flex items-center gap-2">
                                        <span className="text-sm font-medium text-gray-500">
                                            Department:
                                        </span>
                                        <span className="text-gray-700">
                                            {teacherInfo.department}
                                        </span>
                                    </div>
                                )} */}

                                {/* {teacherInfo.position && (
                                    <div className="flex items-center gap-2">
                                        <span className="text-sm font-medium text-gray-500">
                                            Position:
                                        </span>
                                        <span className="text-gray-700">
                                            {teacherInfo.position}
                                        </span>
                                    </div>
                                )} */}

                                {userProfile?.phone && (
                                    <div className="flex items-center gap-2">
                                        <span className="text-sm font-medium text-gray-500">
                                            Phone:
                                        </span>
                                        <span className="text-gray-700">{userProfile.phone}</span>
                                    </div>
                                )}

                                {teacherInfo.created_at && (
                                    <div className="flex items-center gap-2">
                                        <span className="text-sm font-medium text-gray-500">
                                            Registration Date:
                                        </span>
                                        <span className="text-gray-700">
                                            {new Date(teacherInfo.created_at).toLocaleDateString(
                                                'en-US'
                                            )}
                                        </span>
                                    </div>
                                )}
                            </div>
                        </div>
                    )}
                </div>

                {/* Recovery Email Settings */}
                <div className="w-full md:w-3/4 mx-auto items-center mt-4">
                    <RecoveryEmailSettings
                        recoveryEmail={userProfile?.recovery_email || null}
                        isConfirmed={!!userProfile?.is_recovery_email_confirmed}
                        onUpdate={refreshUserProfile}
                    />
                </div>

                {/* Change password block */}
                <div className="w-full md:w-3/4 mx-auto items-center bg-white rounded-xl p-6 shadow-sm">
                    <h2 className="text-xl font-bold mb-4">Change Password</h2>
                    <form
                        className="items-center"
                        ref={changePwdForm}
                        onSubmit={(e) => onSubmit(e)}
                    >
                        <div className="flex flex-col gap-4 w-full">
                            <Input
                                name="current_password"
                                placeholder={'Current Password'}
                                displayName={'Current Password'}
                                type={'password'}
                                required={true}
                                value=""
                                onChange={() => {}}
                            />
                            <Input
                                name="password"
                                placeholder={'New Password'}
                                displayName={'New Password'}
                                type={'password'}
                                required={true}
                                value=""
                                onChange={() => {}}
                            />
                            <Input
                                name="password_confirmation"
                                placeholder={'Password Confirmation'}
                                displayName={'Password Confirmation'}
                                type={'password'}
                                required={true}
                                value=""
                                onChange={() => {}}
                            />
                        </div>
                        <div className="mt-6">
                            <button
                                type="submit"
                                className="px-6 py-2 bg-violet-600 font-medium text-white rounded-lg hover:bg-violet-700 transition-colors shadow-sm"
                            >
                                {saveing ? 'Saving...' : 'Save'}
                            </button>
                        </div>
                    </form>
                    {errors && (
                        <div className="mt-4 p-3 bg-red-50 rounded-lg">
                            <ul className="list-disc list-inside text-red-600">
                                <ErrorList errors={errors} />
                            </ul>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default SettingMain;
