import { cn } from '@/lib/utils';
import { Image, X } from 'lucide-react';
import { ReactNode } from 'react';

export interface ImageFile {
    file: File | undefined;
    src: string;
}

export interface ImageFieldProps {
    image?: ImageFile | undefined;
    onImageChange: (image: ImageFile | undefined) => void;
    id: string;
    error?: string | string[];
    className?: string;
    name: string;
    placeholder?: ReactNode;
    accept?: string;
}

export function ImageField({ image, onImageChange, id, error, className, name, placeholder, accept = '*/*' }: ImageFieldProps) {
    const upload = (event: any) => {
        const file = event.target.files[0];
        // reach theme
        if (file) {
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = (e: any) => {
                onImageChange({
                    file: file,
                    src: e.target.result,
                });
            };
        }
    };

    const hasError = !!error && (Array.isArray(error) ? error.length > 0 : true);
    const generatedId = id ?? `input-${name}`;

    return (
        <div>
            <label
                htmlFor={id}
                className={cn(
                    'relative flex h-[300px] w-full items-center justify-center rounded-xl border border-gray-300 bg-gray-100 bg-cover bg-center',
                    className,
                    {
                        'border-red-500': hasError,
                    },
                )}
                style={{ backgroundImage: `url(${image?.src})` }}
            >
                {image == undefined ? (
                    <>
                        {placeholder ? (
                            <>{placeholder}</>
                        ) : (
                            <div className="p-8 text-center">
                                <Image className="mx-auto h-12 w-12 text-gray-400" />
                                <p className="mt-4 font-medium">Drop or select an image</p>
                                <p className="mt-2 text-center text-sm text-gray-600">
                                    Drop iamge here or click to
                                    <span className="text-primary-600 ml-1 underline">browser</span> through your machine
                                </p>
                            </div>
                        )}
                    </>
                ) : (
                    <label htmlFor={id} className="h-full w-full hover:bg-gray-200/30">
                        <button
                            onClick={(e: any) => {
                                e.preventDefault();
                                onImageChange(undefined);
                            }}
                            className="absolute top-2 right-2 rounded-full bg-gray-900/60 p-0.5 text-white transition-all duration-300 ease-in-out hover:bg-gray-900"
                        >
                            <X className="h-4 w-4" />
                        </button>
                    </label>
                )}
            </label>

            {hasError && (
                <div className="mt-1 text-sm text-red-500">
                    {Array.isArray(error) ? (
                        <ul>
                            {error.map((msg, i) => (
                                <li key={`${generatedId}-error-${i}`}>{msg}</li>
                            ))}
                        </ul>
                    ) : (
                        <span>{error}</span>
                    )}
                </div>
            )}

            <input type="file" multiple={true} id={id} className="hidden" accept={accept} name={id} onChange={upload} />
        </div>
    );
}
