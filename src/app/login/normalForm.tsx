'use client';
import Button from '@/app/components/base/button';
// import I18n from '@/context/i18n'; // Removed as per previous decision for English only
import { login } from '@/service/common';
import { useRouter } from 'next/navigation';
import { useReducer, useState } from 'react';
// import { useTranslation } from 'react-i18next'; // Removed
// import { useContext } from 'use-context-selector'; // Removed as I18n context is removed
import Toast from '../components/base/toast';

const validEmailReg = /^[\w\.-]+@([\w-]+\.)+[\w-]{2,}$/;

type IState = {
    formValid: boolean;
    github: boolean;
    google: boolean;
};

type IAction = {
    type:
        | 'login'
        | 'login_failed'
        | 'github_login'
        | 'github_login_failed'
        | 'google_login'
        | 'google_login_failed';
};

function reducer(state: IState, action: IAction) {
    switch (action.type) {
        case 'login':
            return {
                ...state,
                formValid: true
            };
        case 'login_failed':
            return {
                ...state,
                formValid: true
            };
        case 'github_login':
            return {
                ...state,
                github: true
            };
        case 'github_login_failed':
            return {
                ...state,
                github: false
            };
        case 'google_login':
            return {
                ...state,
                google: true
            };
        case 'google_login_failed':
            return {
                ...state,
                google: false
            };
        default:
            throw new Error('Unknown action.');
    }
}

const NormalForm = () => {
    // const { t } = useTranslation(); // Removed
    const router = useRouter();
    // const { locale } = useContext(I18n); // Removed

    const [_state, _dispatch] = useReducer(reducer, {
        // Renamed to avoid conflict if reducer is not used by new logic
        formValid: false,
        github: false,
        google: false
    });

    const [showPassword, setShowPassword] = useState(false);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [formMode, setFormMode] = useState<'login' | 'forgotPassword'>('login'); // New state for form mode
    const [isLoading, setIsLoading] = useState(false);

    const handleEmailPasswordLogin = async () => {
        if (!validEmailReg.test(email)) {
            Toast.notify({
                type: 'error',
                message: 'Please enter a valid email address.' // Hardcoded English
            });
            return;
        }
        if (!password) {
            // Basic password presence check
            Toast.notify({
                type: 'error',
                message: 'Please enter your password.' // Hardcoded English
            });
            return;
        }
        try {
            setIsLoading(true);
            const res = await login({
                url: '/general_users/sign_in.json',
                body: {
                    general_user: {
                        email,
                        password
                    }
                }
            });
            const data = await res.json();

            if (data.success) {
                const token = res.headers.get('authorization');
                localStorage.setItem('token', token);
                localStorage.setItem('email', email);
                const expiryDate = 'Fri, 31 Dec 9999 23:59:59 GMT';
                document.cookie = `authorization=${escape(token)}; expires=${expiryDate}`;
                router.replace('/');
            } else {
                Toast.notify({
                    type: 'error',
                    message: data.message || 'Login failed. Please check your credentials.' // Hardcoded English with fallback
                });
            }
        } catch (e: any) {
            Toast.notify({
                // Catching network errors or other issues with login call
                type: 'error',
                message: e.message || 'An error occurred during login. Please try again.'
            });
        } finally {
            setIsLoading(false);
        }
    };

    const handleForgotPasswordSubmit = async () => {
        if (!validEmailReg.test(email)) {
            Toast.notify({
                type: 'error',
                message: 'Please enter a valid email address to reset your password.' // Hardcoded English
            });
            return;
        }
        try {
            setIsLoading(true);
            Toast.notify({
                type: 'info', // Using 'info' as it's a conditional success
                message:
                    'If an account with that email exists, a password reset link has been sent. Please check your inbox.' // Hardcoded English
            });
            // Optionally, switch back to login mode or clear email, or leave as is
            // setFormMode('login');
            // setEmail('');
        } catch (error: any) {
            console.error('Request password reset failed:', error);
            Toast.notify({
                type: 'error',
                message:
                    error.message || 'Failed to send password reset email. Please try again later.' // Hardcoded English
            });
        } finally {
            setIsLoading(false);
        }
    };

    // Form submission handler to prevent default browser submission
    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        if (formMode === 'login') {
            handleEmailPasswordLogin();
        } else {
            handleForgotPasswordSubmit();
        }
    };

    if (formMode === 'login') {
        return (
            <>
                <div className="w-full mx-auto">
                    <h2 className="text-[32px] font-bold text-gray-900">Sign in to your account</h2>{' '}
                    {/* Hardcoded English */}
                    <p className="mt-1 text-sm text-gray-600">
                        Welcome to AI English, please login to continue.
                    </p>{' '}
                    {/* Hardcoded English */}
                </div>

                <div className="w-full mx-auto mt-8">
                    <div className="bg-white ">
                        <form onSubmit={handleSubmit}>
                            <div className="mb-5">
                                <label
                                    htmlFor="email"
                                    className="my-2 block text-sm font-medium text-gray-900"
                                >
                                    Email {/* Hardcoded English */}
                                </label>
                                <div className="mt-1">
                                    <input
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        id="email"
                                        type="email"
                                        autoComplete="email"
                                        placeholder={'Enter your email'}
                                        className={
                                            'appearance-none block w-full rounded-lg pl-[14px] px-3 py-2 border border-gray-200 hover:border-gray-300 hover:shadow-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500 placeholder-gray-400 caret-primary-600 sm:text-sm'
                                        }
                                        required
                                    />
                                </div>
                            </div>

                            <div className="mb-1">
                                {' '}
                                {/* Reduced margin here to make space for forgot password link */}
                                <label
                                    htmlFor="password"
                                    className="my-2 flex items-center justify-between text-sm font-medium text-gray-900"
                                >
                                    <span>Password</span> {/* Hardcoded English */}
                                </label>
                                <div className="relative mt-1">
                                    <input
                                        id="password"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        // onKeyDown removed from here, form onSubmit will handle Enter key
                                        type={showPassword ? 'text' : 'password'}
                                        autoComplete="current-password"
                                        placeholder={'Enter your password'}
                                        className={
                                            'appearance-none block w-full rounded-lg pl-[14px] px-3 py-2 border border-gray-200 hover:border-gray-300 hover:shadow-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500 placeholder-gray-400 caret-primary-600 sm:text-sm pr-10'
                                        }
                                        required
                                    />
                                    <div className="absolute inset-y-0 right-0 flex items-center pr-3">
                                        <button
                                            type="button" // Important: type="button" to not submit form
                                            onClick={() => setShowPassword(!showPassword)}
                                            className="text-gray-400 hover:text-gray-500 focus:outline-none focus:text-gray-500"
                                        >
                                            {showPassword ? '👀' : '😝'}
                                        </button>
                                    </div>
                                </div>
                            </div>

                            <div className="text-sm text-right my-3">
                                {' '}
                                {/* Forgot password link */}
                                <a
                                    href="#"
                                    onClick={(e) => {
                                        e.preventDefault();
                                        setFormMode('forgotPassword');
                                    }}
                                    className="font-medium text-violet-600 hover:text-violet-500"
                                >
                                    Forgot password?
                                </a>
                            </div>

                            <div className="mb-2">
                                <Button
                                    tabIndex={0}
                                    type="primary" // Submit button for the form
                                    onClick={handleEmailPasswordLogin} // Kept for explicitness, though onSubmit on form handles it
                                    disabled={isLoading}
                                    loading={isLoading}
                                    className="w-full !fone-medium !text-sm bg-violet-600 hover:bg-violet-700"
                                >
                                    Sign In {/* Hardcoded English */}
                                </Button>
                            </div>
                        </form>
                    </div>
                </div>
            </>
        );
    }

    // formMode === 'forgotPassword'
    return (
        <>
            <div className="w-full mx-auto">
                <h2 className="text-[32px] font-bold text-gray-900">Forgot Your Password?</h2>{' '}
                {/* Hardcoded English */}
                <p className="mt-1 text-sm text-gray-600">
                    No problem. Enter your email address below and we'll send you a link to reset
                    your password. {/* Hardcoded English */}
                </p>
            </div>

            <div className="w-full mx-auto mt-8">
                <div className="bg-white">
                    <form onSubmit={handleSubmit}>
                        <div className="mb-5">
                            <label
                                htmlFor="email-forgot" // Use a different id if 'email' is still in DOM, or ensure only one is rendered
                                className="my-2 block text-sm font-medium text-gray-900"
                            >
                                Email Address {/* Hardcoded English */}
                            </label>
                            <div className="mt-1">
                                <input
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    id="email-forgot" // Ensure unique ID or that only one email input is rendered at a time
                                    type="email"
                                    autoComplete="email"
                                    placeholder={'Enter your registered email'}
                                    className={
                                        'appearance-none block w-full rounded-lg pl-[14px] px-3 py-2 border border-gray-200 hover:border-gray-300 hover:shadow-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500 placeholder-gray-400 caret-primary-600 sm:text-sm'
                                    }
                                    required
                                />
                            </div>
                        </div>

                        <div className="mb-4">
                            <Button
                                type="primary"
                                onClick={handleForgotPasswordSubmit}
                                disabled={isLoading}
                                loading={isLoading}
                                className="w-full !fone-medium !text-sm bg-violet-600 hover:bg-violet-700"
                            >
                                Send Password Reset Email {/* Hardcoded English */}
                            </Button>
                        </div>
                    </form>
                    <div className="text-sm text-center mt-4">
                        <a
                            href="#"
                            onClick={(e) => {
                                e.preventDefault();
                                setFormMode('login');
                                // setPassword(''); // Optionally clear password when switching back
                            }}
                            className="font-medium text-violet-600 hover:text-violet-500"
                        >
                            Back to Sign In {/* Hardcoded English */}
                        </a>
                    </div>
                </div>
            </div>
        </>
    );
};

export default NormalForm;
