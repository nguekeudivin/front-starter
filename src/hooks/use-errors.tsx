import { create } from 'zustand';

const SERVER_ERROR = "Une erreur c'est produite";

interface ErrorsState {
    values: Record<string, string[]>;
    set: (key: string, value: string | string[]) => void;
    setMany: (values: any) => void;
    unset: (key: string) => void;
    catch: (error: any) => void;
    reset: () => void;
    log: (error: any) => void;
    render: () => React.ReactNode;
}

export const useErrors = create<ErrorsState>((setter, getter) => ({
    values: {},
    set: (key, value) =>
        setter((state) => ({
            values: {
                ...state.values,
                [key]: typeof value == 'string' ? [value] : value,
            },
        })),
    setMany: (errors: any) => {
        setter((state) => ({
            values: {
                ...state.values,
                ...errors,
            },
        }));
    },
    unset: (key) =>
        setter((state) => ({
            values: Object.fromEntries(Object.entries(state.values).filter(([k, v]) => k != key)),
        })),
    catch: (error) => {
        let isServerError = true;

        if (error.response != undefined) {
            if ([422, 401, 409, 404, 400].includes(error.response.status)) {
                isServerError = false;
                let values = { error: ['Le systeme est indisponible pour le moment'] };

                if (error.response.data.hasOwnProperty('errors')) {
                    values = error.response.data.errors;

                    return setter(() => ({
                        values: values,
                    }));
                }

                if (error.response.data.hasOwnProperty('message')) {
                    if (typeof error.response.data.message == 'string') {
                        values = {
                            error: [error.response.data.message],
                        };
                    }

                    if (typeof error.response.data.message == 'object') {
                        values = error.response.data.message;
                    }

                    return setter(() => ({
                        values: values,
                    }));
                }
            }
        } else {
            if (error.message != undefined) {
                return setter(() => ({
                    values: {
                        error_message: [error.message],
                    },
                }));
            }
        }

        if (isServerError) {
            return setter(() => ({
                values: {
                    server_error: [SERVER_ERROR],
                },
            }));
        }
    },
    reset: () => {
        setter(() => ({
            values: {},
        }));
    },
    log(error: any) {
        //logError(error);
    },
    render() {
        const values = getter().values;

        if (Object.keys(values).length == 0) return null;

        return (
            <div id="alert-border-1" className="mb-4 flex border-t-4 border-red-300 bg-red-50 p-4 text-red-800" role="alert">
                <div className="ms-3 text-sm font-medium">
                    {Object.entries(values).map(([key, value], index) => (
                        <div key={`error${key}${index}`} className="ms-3 text-sm font-medium">
                            {Array.isArray(value) ? (
                                <ul>
                                    {value.map((msg, i) => (
                                        <li key={`error-${i}`}>{msg}</li>
                                    ))}
                                </ul>
                            ) : (
                                <span>{value}</span>
                            )}
                        </div>
                    ))}
                </div>
                <button
                    onClick={() =>
                        setter(() => ({
                            values: {},
                        }))
                    }
                    type="button"
                    className="-mx-1.5 -my-1.5 ms-auto inline-flex h-8 w-8 items-center justify-center rounded-lg bg-red-50 p-1.5 text-red-500 hover:bg-red-200 focus:ring-2 focus:ring-red-400"
                    data-dismiss-target="#alert-border-1"
                    aria-label="Close"
                >
                    <span className="sr-only">Dismiss</span>
                    <svg className="h-3 w-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                        <path
                            stroke="currentColor"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            stroke-width="2"
                            d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                        />
                    </svg>
                </button>
            </div>
        );
    },
}));
