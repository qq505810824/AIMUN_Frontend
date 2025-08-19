import cn from 'classnames';
import { motion } from 'framer-motion';
import type { FC } from 'react';
import { useEffect, useRef, useState } from 'react';

type Option = {
    value: string;
    text: string;
    icon?: React.ReactNode;
};

type TabSliderProps = {
    className?: string;
    optionClassName?: string;
    optionSelectClassName?: string;
    value: string;
    onChange: (v: string) => void;
    options: Option[];
    variant?: 'default' | 'pills' | 'underline';
    size?: 'sm' | 'md' | 'lg';
    alignment?: 'start' | 'center' | 'end';
    fullWidth?: boolean;
    showScrollButtons?: boolean;
    compact?: boolean;
};

const TabSliderNew: FC<TabSliderProps> = ({
    className,
    optionClassName,
    optionSelectClassName,
    value,
    onChange,
    options,
    variant = 'default',
    size = 'md',
    alignment = 'start',
    fullWidth = false,
    showScrollButtons = true,
    compact = false
}) => {
    const [hoveredTab, setHoveredTab] = useState<string | null>(null);
    const tabsRef = useRef<HTMLDivElement>(null);
    const [showLeftScroll, setShowLeftScroll] = useState(false);
    const [showRightScroll, setShowRightScroll] = useState(false);

    // Check if scroll buttons should be shown
    useEffect(() => {
        if (!tabsRef.current || !showScrollButtons) return;

        const checkScroll = () => {
            const el = tabsRef.current;
            if (!el) return;

            setShowLeftScroll(el.scrollLeft > 20);
            setShowRightScroll(el.scrollLeft < el.scrollWidth - el.clientWidth - 20);
        };

        checkScroll();
        tabsRef.current.addEventListener('scroll', checkScroll);
        window.addEventListener('resize', checkScroll);

        return () => {
            tabsRef.current?.removeEventListener('scroll', checkScroll);
            window.removeEventListener('resize', checkScroll);
        };
    }, [options, showScrollButtons]);

    const handleScroll = (direction: 'left' | 'right') => {
        if (!tabsRef.current) return;
        const scrollAmount = direction === 'left' ? -200 : 200;
        tabsRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    };

    const getBaseTabClasses = () => {
        const sizeClasses = {
            sm: 'px-2.5 py-1.5 text-xs',
            md: 'px-3 py-2 text-sm',
            lg: 'px-4 py-2.5 text-base'
        };

        return `relative font-medium transition-all duration-200 
                ${sizeClasses[size]} 
                ${compact ? 'mr-1' : 'mr-2'} 
                ${fullWidth ? 'flex-1 text-center' : 'flex-none'}`;
    };

    const getVariantClasses = (isSelected: boolean, isHovered: boolean) => {
        if (variant === 'pills') {
            return `rounded-full ${
                isSelected
                    ? 'bg-violet-100 text-violet-800'
                    : `text-gray-600 ${isHovered ? 'bg-gray-100' : ''}`
            }`;
        } else if (variant === 'underline') {
            return `rounded-none px-1 ${
                isSelected
                    ? 'border-violet-600 text-violet-800'
                    : `border-transparent text-gray-600 ${isHovered ? 'border-gray-200' : ''}`
            }`;
        } else {
            // Default variant
            return `rounded-lg ${
                isSelected
                    ? 'bg-white shadow-sm border border-gray-200 text-violet-700'
                    : `text-gray-600 border border-transparent ${isHovered ? 'bg-gray-100' : ''}`
            }`;
        }
    };

    const alignmentClasses = {
        start: 'justify-start',
        center: 'justify-center',
        end: 'justify-end'
    };

    return (
        <div className={cn('relative', className)}>
            {showScrollButtons && showLeftScroll && (
                <button
                    onClick={() => handleScroll('left')}
                    className="absolute left-0 top-1/2 transform -translate-y-1/2 z-10 bg-white/80 backdrop-blur-sm rounded-full shadow-sm p-1.5 text-gray-600 hover:text-violet-600 hover:bg-violet-50"
                    aria-label="Scroll left"
                >
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                    >
                        <path
                            fillRule="evenodd"
                            d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z"
                            clipRule="evenodd"
                        />
                    </svg>
                </button>
            )}

            <div
                ref={tabsRef}
                className={cn(
                    'relative flex flex-1 overflow-x-auto scrollbar-hide p-1',
                    fullWidth ? 'w-full' : '',
                    alignmentClasses[alignment]
                )}
            >
                <div className={cn('flex', fullWidth ? 'w-full' : '')}>
                    {options.map((option) => (
                        <motion.div
                            key={option.value}
                            onHoverStart={() => setHoveredTab(option.value)}
                            onHoverEnd={() => setHoveredTab(null)}
                            onClick={() => onChange(option.value)}
                            className={cn(
                                getBaseTabClasses(),
                                getVariantClasses(
                                    value === option.value,
                                    hoveredTab === option.value
                                ),
                                'flex items-center cursor-pointer whitespace-nowrap',
                                optionClassName,
                                value === option.value && optionSelectClassName
                            )}
                        >
                            {option.icon && (
                                <span className={cn('inline-flex', option.text ? 'mr-1.5' : '')}>
                                    {option.icon}
                                </span>
                            )}
                            <span>{option.text}</span>

                            {variant === 'underline' && value === option.value && (
                                <motion.div
                                    className="absolute bottom-0 left-0 right-0 h-0.5 bg-violet-600"
                                    layoutId="underline"
                                />
                            )}
                        </motion.div>
                    ))}
                </div>
            </div>

            {showScrollButtons && showRightScroll && (
                <button
                    onClick={() => handleScroll('right')}
                    className="absolute right-0 top-1/2 transform -translate-y-1/2 z-10 bg-white/80 backdrop-blur-sm rounded-full shadow-sm p-1.5 text-gray-600 hover:text-violet-600 hover:bg-violet-50"
                    aria-label="Scroll right"
                >
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                    >
                        <path
                            fillRule="evenodd"
                            d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                            clipRule="evenodd"
                        />
                    </svg>
                </button>
            )}
        </div>
    );
};

export default TabSliderNew;
