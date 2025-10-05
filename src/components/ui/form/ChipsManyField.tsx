import { cn } from '@/lib/utils';
import { Check } from 'lucide-react';

interface ChipsManyFieldProps {
    className?: string;
    values: any;
    options: any;
    onItemSelected: any;
}

export function ChipsManyField({ className, values, options, onItemSelected }: ChipsManyFieldProps) {
    return (
        <div className={cn('space-2 flex items-center gap-4', className, {})}>
            {options.map((item: any) => (
                <div
                    className={cn('flex cursor-pointer items-center gap-1 rounded-md border border-gray-300 bg-gray-200 px-2 py-2', className, {
                        'bg-secondary-600 border-secondary-600 text-white': values.includes(item.value),
                    })}
                    onClick={() => {
                        onItemSelected(item, !values.includes(item.value));
                    }}
                >
                    {values.includes(item.value) && <Check className="h-4 w-4" />}
                    {item.label}
                </div>
            ))}
        </div>
    );
}
