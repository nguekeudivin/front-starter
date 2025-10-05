import { ReactNode, useEffect, useState } from 'react';
import { create } from 'zustand';

interface DisplayState {
    visible: Record<string, boolean>;
    callbacks: Record<string, any>;
    data: Record<string, any>;
    set: (key: string, value: boolean) => void;
    show: (key: string, callback?: any) => void;
    hide: (key: string, callbackData?: any) => void;
    toggle: (key: string) => void;
    reset: () => void;
    when: ({ visible, not, children }: { visible?: string; not?: string; children: ReactNode }) => any;
}

export const useDisplay = create<DisplayState>((set, get) => ({
    visible: {},
    callbacks: {},
    data: {},
    set: (key, value) => {
        set((state) => ({
            visible: {
                ...state.visible,
                [key]: value,
            },
        }));
    },

    show: (key, options: any) => {
        set((state) => ({
            visible: {
                ...state.visible,
                [key]: true,
            },
            callbacks: {
                [key]: options?.callback,
            },
            data: {
                [key]: options?.data ?? {},
            },
        }));
    },

    hide: (key: string, callbackData?: any) => {
        set((state) => {
            const newValues: Record<string, any> = {};
            for (const k in state.visible) {
                if (k != key) {
                    newValues[k] = state.visible[k];
                }
            }
            return {
                visible: newValues,
            };
        });

        const callbacks = get().callbacks;
        if (callbacks[key]) {
            const callback = callbacks[key];
            console.log(callback);
            callback(callbackData);
            set((state) => ({
                callbacks: Object.fromEntries(Object.entries(state.callbacks).filter((pair) => pair[0] != key)),
            }));
        }
    },

    toggle: (key) => {
        set((state) => {
            if (state.visible.hasOwnProperty(key)) {
                const newValues: Record<string, any> = {};
                for (const k in state.visible) {
                    if (k != key) {
                        newValues[k] = state.visible[k];
                    }
                }
                return {
                    visible: newValues,
                };
            } else {
                return {
                    visible: {
                        ...state.visible,
                        [key]: true,
                    },
                };
            }
        });
    },
    reset: () => set(() => ({})),
    when: ({ visible, not, children }: { visible?: string; not?: string; children: ReactNode }) => {
        if (visible != undefined) {
            if (get().visible[visible]) {
                return <>{children}</>;
            } else {
                return null;
            }
        }

        if (not != undefined) {
            if (!get().visible[not]) {
                return <>{children}</>;
            } else {
                return null;
            }
        }
    },
}));

export function getDisplayData<T>() {
    const [data, setData] = useState<T>();
    const display = useDisplay();

    useEffect(() => {
        setData(data);
    }, [display.data]);

    return {
        data,
    };
}
