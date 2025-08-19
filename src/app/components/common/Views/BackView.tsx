import { ChevronLeftIcon } from '@heroicons/react/24/outline';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

interface ViewProps {
    title?: string;
    onClick?: any;
    children?: React.ReactNode;

    rightButtonText?: string;
    rightButtonClick?: any;
}

const useScreenOrientation = () => {
    const [orientation, setOrientation] = useState('portrait');

    useEffect(() => {
        const handleOrientationChange = () => {
            const isPortrait = window.matchMedia('(orientation: portrait)').matches;
            setOrientation(isPortrait ? 'portrait' : 'landscape');
        };

        window.addEventListener('orientationchange', handleOrientationChange);
        handleOrientationChange(); // 初次檢查

        return () => {
            window.removeEventListener('orientationchange', handleOrientationChange);
        };
    }, []);

    return orientation;
};

export default function BackView(props: ViewProps) {
    const { title, onClick, rightButtonText, rightButtonClick, children } = props;
    const router = useRouter();

    const handleBack = () => {
        router.back();
    };
    const orientation = useScreenOrientation();

    return (
        <>
            <div
                className={`container mx-auto px-4 sm:px-8 py-2 sm:py-2 w-full max-w-7xl flex justify-between items-center`}
            >
                <div
                    className="flex flex-row cursor-pointer hover:text-gray-500"
                    onClick={onClick ? onClick : handleBack}
                >
                    <ChevronLeftIcon className="w-4" />
                    <span className="ml-2">{title || 'Back'}</span>
                </div>
                <div className="flex flex-row items-center">
                    {children}
                    {rightButtonClick && (
                        <button
                            onClick={rightButtonClick}
                            className=" bg-violet-500 text-white sm:px-2 sm:py-1 px-2 py-1 text-xs sm:text-sm rounded hover:bg-violet-700 transition"
                        >
                            {rightButtonText || 'Save'}
                        </button>
                    )}
                </div>
            </div>
        </>
    );
}
