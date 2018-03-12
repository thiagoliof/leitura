export const LOAD_CATEGORY = 'LOAD_CATEGORY'

export function loadCategory ({ category }) {
    return {
        type: LOAD_CATEGORY,
        category,
    }
} 