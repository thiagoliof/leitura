export const LOAD_CATEGORY = 'LOAD_CATEGORY'

export function loadCategory (categories) {
    return {
        type: LOAD_CATEGORY,
        categories
    }
} 