// Function to save data to localStorage
export const saveToLocalStorage = (key, data) => {
    localStorage.setItem(key, JSON.stringify(data));
};

// Function to get data from localStorage
export const getFromLocalStorage = (key) => {
    try {
        const data = localStorage.getItem(key);
        return data ? JSON.parse(data) : null;
    } catch (error) {
        console.error(`Error parsing JSON for key '${key}':`, error);
        return null;
    }
};