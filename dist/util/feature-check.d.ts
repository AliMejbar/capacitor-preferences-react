declare const featureMap: {
    Preferences: {
        usePreferences: {
            web: boolean;
            ios: boolean;
            android: boolean;
            electron: boolean;
        };
    };
};
export declare function isFeatureAvailable<T extends typeof featureMap, PluginKeys extends keyof NonNullable<T>, FeatureKeys extends keyof NonNullable<NonNullable<T>[PluginKeys]>>(plugin: PluginKeys, method: FeatureKeys): boolean;
export declare function featureNotAvailableError(): any;
export {};
