import { Capacitor } from '@capacitor/core';
import { FeatureNotAvailableError } from './models';
const allTrue = {
    web: true,
    ios: true,
    android: true,
    electron: true,
};
const featureMap = {
    Preferences: {
        usePreferences: allTrue,
    },
};
export function isFeatureAvailable(plugin, method) {
    const isPluginAvailable = Capacitor.isPluginAvailable(plugin);
    const isFeatureSupported = featureMap[plugin][method][Capacitor.getPlatform()];
    if (isPluginAvailable && !!isFeatureSupported) {
        return true;
    }
    return false;
}
export function featureNotAvailableError() {
    throw new FeatureNotAvailableError();
}
//# sourceMappingURL=feature-check.js.map