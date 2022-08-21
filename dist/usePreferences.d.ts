import { AvailableResult } from './util/models';
interface PreferencesResult extends AvailableResult {
    get: (key: string) => Promise<string | null>;
    set: (key: string, value: string) => Promise<void>;
    remove: (key: string) => void;
    getKeys: () => Promise<{
        keys: string[];
    }>;
    clear: () => Promise<void>;
}
declare type PreferencesItemResult<T> = [T | undefined, (value: T) => Promise<void>, boolean];
export declare const availableFeatures: {
    usePreferences: boolean;
};
export declare function usePreferences(): PreferencesResult;
export declare function usePreferencesItem<T>(key: string, initialValue?: T): PreferencesItemResult<T>;
export {};
