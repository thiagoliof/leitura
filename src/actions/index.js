export const LOAD_CATEGORY = 'LOAD_CATEGORY'
export const SELECT_MENU = 'SELECT_MENU'

export function loadCategory (categories) {
    return {
        type: LOAD_CATEGORY,
        categories
    }
}