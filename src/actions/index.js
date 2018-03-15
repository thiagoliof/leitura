export const LOAD_CATEGORY  = 'LOAD_CATEGORY'
export const LOAD_POST      = 'LOAD_POST'

export function loadCategory (categories) {
    return {
        type: LOAD_CATEGORY,
        categories
    }
}

export function loadPosts (posts) {
    return {
        type: LOAD_POST,
        posts
    }
}
