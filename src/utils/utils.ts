import { CategoryModels } from './constant';

export function openSidebar() {
    if (typeof window !== 'undefined') {
        document.body.style.overflow = 'hidden';
        document.documentElement.style.setProperty('--SideNavigation-slideIn', '1');
    }
}

export function closeSidebar() {
    if (typeof window !== 'undefined') {
        document.documentElement.style.removeProperty('--SideNavigation-slideIn');
        document.body.style.removeProperty('overflow');
    }
}

export function toggleSidebar() {
    if (typeof window !== 'undefined' && typeof document !== 'undefined') {
        const slideIn = window
            .getComputedStyle(document.documentElement)
            .getPropertyValue('--SideNavigation-slideIn');
        if (slideIn) {
            closeSidebar();
        } else {
            openSidebar();
        }
    }
}

export function convertBlobToBase64(blob: Blob) {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(blob);
        reader.onloadend = () => resolve(reader.result);
        reader.onerror = reject;
    });
}

export function convertBase64ToBlob(base64Audio: string) {
    const binaryData = atob(base64Audio);
    const arrayBuffer = new ArrayBuffer(binaryData.length);
    const uint8Array = new Uint8Array(arrayBuffer);

    for (let i = 0; i < binaryData.length; i++) {
        uint8Array[i] = binaryData.charCodeAt(i);
    }

    return new Blob([uint8Array], { type: 'audio/mpeg' });
}
export function replaceStringWithValues(
    str: string,
    promptVariables: any[],
    inputs: Record<string, any>
) {
    return str.replace(/\{\{([^}]+)\}\}/g, (match, key) => {
        const name = inputs[key];
        if (name) {
            // has set value
            return name;
        }

        const valueObj: any | undefined = promptVariables.find((v) => v.key === key);
        return valueObj ? `{{${valueObj.name}}}` : match;
    });
}

export function findNameByValue(targetValue: string) {
    for (const model of CategoryModels) {
        if (model.value === targetValue) {
            return model.name;
        }
    }
    return null; // 如果未找到匹配的 value ，返回 null
}
