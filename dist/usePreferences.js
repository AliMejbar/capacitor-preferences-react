import { useState, useEffect, useCallback } from 'react';
import { Preferences } from '@capacitor/preferences';
import { notAvailable } from './util/models';
import { isFeatureAvailable, featureNotAvailableError } from './util/feature-check';
import { Capacitor } from '@capacitor/core';
if (!Capacitor.isPluginAvailable('Preferences')) {
    console.warn('The @capacitor/preferences plugin was not found, did you forget to install it?');
}
export const availableFeatures = {
    usePreferences: isFeatureAvailable('Preferences', 'usePreferences'),
};
export function usePreferences() {
    if (!availableFeatures.usePreferences) {
        return Object.assign({ get: featureNotAvailableError, set: featureNotAvailableError, remove: featureNotAvailableError, getKeys: featureNotAvailableError, clear: featureNotAvailableError }, notAvailable);
    }
    const get = useCallback(async (key) => {
        const v = await Preferences.get({ key });
        if (v) {
            return v.value;
        }
        return null;
    }, []);
    const set = useCallback((key, value) => {
        return Preferences.set({ key, value: value });
    }, []);
    const remove = useCallback((key) => {
        return Preferences.remove({ key });
    }, []);
    const getKeys = useCallback(() => {
        return Preferences.keys();
    }, []);
    const clear = useCallback(() => {
        return Preferences.clear();
    }, []);
    return { get, set, remove, getKeys, clear, isAvailable: true };
}
export function usePreferencesItem(key, initialValue) {
    if (!availableFeatures.usePreferences) {
        return [undefined, featureNotAvailableError, false];
    }
    const [storedValue, setStoredValue] = useState();
    useEffect(() => {
        async function loadValue() {
            try {
                const result = await Preferences.get({ key });
                if (result.value == undefined && initialValue != undefined) {
                    result.value =
                        typeof initialValue === 'string' ? initialValue : JSON.stringify(initialValue);
                    setValue(result.value);
                }
                else {
                    if (result.value) {
                        setStoredValue(typeof result.value === 'string' ? result.value : JSON.parse(result.value));
                    }
                    else {
                        setStoredValue(undefined);
                    }
                }
            }
            catch (e) {
                return initialValue;
            }
        }
        loadValue();
    }, [Preferences, setStoredValue, initialValue, key]);
    const setValue = async (value) => {
        try {
            setStoredValue(value);
            await Preferences.set({
                key,
                value: typeof value === 'string' ? value : JSON.stringify(value),
            });
        }
        catch (e) {
            console.error(e);
        }
    };
    return [storedValue, setValue, true];
}
//# sourceMappingURL=usePreferences.js.map