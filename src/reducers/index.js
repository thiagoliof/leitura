import {
    LOAD_CATEGORY,
    LOAD_POSTS,
    LOAD_POST,
    ORDER_POST,
    LOAD_COMMENTS
} from '../actions'
import { combineReducers } from 'redux';


function category (state = [], action){
    
    switch (action.type) {
        
        case LOAD_CATEGORY :
            return action.categories

        default :
            return state
    }
}

function posts (state = [], action){
    
    switch (action.type) {
        
        case LOAD_POSTS :
            return action.posts
        
        default :
            return state
    }
}

function post (state = {}, action){
    const { post } = action
    switch (action.type) {
        
        case LOAD_POST :
            return post
        
        default :
            return state
    }
}

function orderPost (state = { order: 'orderDown' }, action){
    
    switch (action.type) {
        
        case ORDER_POST :
            return action.order
        
        default :
            return state
    }
}

function comment (state = [], action){
    
    switch (action.type) {
        
        case LOAD_COMMENTS :
            return action.comments
        
        default :
            return state
    }
}


export default combineReducers({ category, posts, orderPost, post, comment }) 