import { cn } from '@/lib/utils';
import React from 'react';

interface FieldLabelProps extends React.ComponentProps<'label'> {
    label: string;
    htmlFor?: string;
    error?: string | string[];
}

const FieldLabel = React.forwardRef<HTMLLabelElement, FieldLabelProps>(({ label, htmlFor, error, className }, ref) => {
    const hasError = !!error && (Array.isArray(error) ? error.length > 0 : true);

    return (
        <label
            htmlFor={htmlFor}
            ref={ref}
            className={cn(
                'absolute -top-3 left-1 z-30 bg-white px-2 text-sm font-medium text-gray-600 transition-all duration-300 ease-in-out',
                {
                    'text-red-500': hasError,
                },
                className,
            )}
        >
            {label}
        </label>
    );
});

// Set a display name for better debugging in React DevTools
FieldLabel.displayName = 'FieldLabel';

interface AnimatedFieldLabelProps extends React.ComponentProps<'label'> {
    label: string;
    move: boolean;
    htmlFor: string;
    className?: string;
    error?: string;
    floatingClassName?: string;
}

const AnimatedFieldLabel = React.forwardRef<HTMLLabelElement, AnimatedFieldLabelProps>(
    ({ label, move, error, htmlFor, onClick, className, floatingClassName }, ref) => {
        const hasError = error != undefined && error != '';

        return (
            <label
                onClick={(e) => {
                    if (onClick) onClick(e);
                }}
                htmlFor={htmlFor}
                ref={ref} // Forward the ref to the label element
                className={cn(
                    'absolute left-2 px-2 transition-all duration-300 ease-in-out',
                    move
                        ? '-top-3 z-30 bg-inherit text-sm font-medium text-gray-600'
                        : cn('text-muted-foreground top-[25%] z-0 bg-transparent', floatingClassName),
                    {
                        'text-red-500': hasError,
                    },
                    className,
                )}
            >
                {label}
            </label>
        );
    },
);

// Set a display name for better debugging in React DevTools
AnimatedFieldLabel.displayName = 'AnimatedFieldLabel';

export { AnimatedFieldLabel, FieldLabel };
