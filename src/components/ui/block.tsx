import { Button } from '@/components/ui/button';
import { useDisplay } from '@/hooks/use-display';
import { cn } from '@/lib/utils';
import { X } from 'lucide-react';
import { ReactNode, useEffect, useState } from 'react';

interface BlocksProps {
    items: Record<string, ReactNode>;
    base?: string;
    className?: string;
}

export const Blocks = ({ items, base, className }: BlocksProps) => {
    const display = useDisplay();
    const [current, setCurrent] = useState<string>('');
    useEffect(() => {
        const displayedNames = Object.keys(display.visible).filter((item) => display.visible[item]);
        const blocksNames = Object.keys(items);
        const candidatesNames = blocksNames.filter((item) => displayedNames.includes(item));
        if (candidatesNames.length != 0) {
            setCurrent(candidatesNames[candidatesNames.length - 1]);
        } else {
            if (candidatesNames.length == 0 && base) {
                setCurrent(base);
            }
        }
    }, [display.visible]);

    return <div className={cn(className)}>{items[current]}</div>;
};

interface BlockProps {
    header?: ReactNode;
    footer?: ReactNode;
    title?: string;
    cancelText?: string;
    submitText?: string;
    name?: string;
    loading?: boolean;
    submit?: any;
    children: ReactNode;
    className?: string;
    defaultClose?: boolean;
}

export const Block = ({
    header,
    footer,
    title,
    name,
    loading,
    cancelText = 'Cancel',
    submitText = 'Valider',
    submit,
    children,
    className,
    defaultClose = true,
}: BlockProps) => {
    const display = useDisplay();
    return (
        <div className={cn('relative rounded-md shadow', className)}>
            {!header && (
                <header className="px-8 py-4">
                    <h3 className="text-xl font-semibold">{title} </h3>
                </header>
            )}
            <div className="px-8">{children}</div>
            {!footer && (
                <footer className="flex items-center gap-4 px-8 py-4">
                    <Button color="neutral" onClick={() => display.hide(name as string)}>
                        {cancelText}
                    </Button>
                    <Button onClick={submit} loading={loading}>
                        {submitText}
                    </Button>
                </footer>
            )}
            {defaultClose && (
                <button
                    type="button"
                    onClick={() => display.toggle(name as string)}
                    className="absolute top-3 right-3 inline-flex h-8 w-8 items-center justify-center rounded-lg text-sm text-gray-500 hover:bg-gray-200 hover:text-gray-900"
                >
                    <X className="h-4 w-4" />
                    <span className="sr-only">Close block</span>
                </button>
            )}
        </div>
    );
};

export const CloseBlockButton = ({ name }: { name: string }) => {
    const display = useDisplay();
    return (
        <button
            type="button"
            onClick={() => {
                return display.toggle(name as string);
            }}
            className="absolute top-3 right-3 inline-flex h-8 w-8 items-center justify-center rounded-lg text-sm text-gray-400 hover:bg-gray-200 hover:text-gray-900"
        >
            <X className="h-4 w-4" />
            <span className="sr-only">Close block</span>
        </button>
    );
};
