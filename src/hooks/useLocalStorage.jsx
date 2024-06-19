import { useState, useEffect } from 'react';

export default function useLocalStorage(key, initialValue) {
    const prefixedKey = "codekalam-" + key;

    const [value, setValue] = useState(() => {
        const jsonValue = localStorage.getItem(prefixedKey);
        if (jsonValue != null) {
            try {
                return JSON.parse(jsonValue);
            } catch (e) {
                console.error("Error parsing JSON from localStorage", e);
                return initialValue;
            }
        }

        if (typeof initialValue === "function") {
            return initialValue();
        } else {
            return initialValue;
        }
    });

    useEffect(() => {
        localStorage.setItem(prefixedKey, JSON.stringify(value));
    }, [prefixedKey, value]);

    return [value, setValue];
}
