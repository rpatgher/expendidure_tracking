export const generateId = () => {
    return Math.random().toString(36).slice(2) + Date.now().toString(36);
}

export const formatDate = date => {
    return new Date(date).toLocaleDateString('en-US', {
            day: '2-digit',
            month: 'short',
            year: 'numeric'
        }
    );
};