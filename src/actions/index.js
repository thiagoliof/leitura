export const LOAD_CATEGORY      = 'LOAD_CATEGORY'
export const LOAD_POSTS         = 'LOAD_POSTS'
export const ORDER_POST         = 'ORDER_POST'
export const LOAD_POST          = 'LOAD_POST'
export const LOAD_COMMENTS      = 'LOAD_COMMENTS'

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

export function loadPost (post) {
    return {
        type: LOAD_POST,
        post
    }
}

export function orderPosts (order) {
    return {
        type: ORDER_POST,
        order
    }
}

export function loadComments ({comments}) {
    return {
        type: LOAD_COMMENTS,
        comments
    }
}