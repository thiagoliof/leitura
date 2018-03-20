export const LOAD_CATEGORY  = 'LOAD_CATEGORY'
export const LOAD_POSTS      = 'LOAD_POSTS'
export const ORDER_POST     = 'ORDER_POST'
export const LOAD_POST      = 'LOAD_POST'

export function loadCategory (categories) {
    return {
        type: LOAD_CATEGORY,
        categories
    }
}

export function loadPosts (posts) {
    return {
        type: LOAD_POSTS,
        posts
    }
}

export function loadPost (id) {
    return {
        type: LOAD_POST,
        id
    }
}

export function orderPosts (order) {
    return {
        type: ORDER_POST,
        order
    }
}
