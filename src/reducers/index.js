import {
    LOAD_CATEGORY,
    LOAD_POSTS,
    ORDER_POST,
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

function orderPost (state = {}, action){
    
    switch (action.type) {
        
        case ORDER_POST :
            return action.order
        
        default :
            return state
    }
}


export default combineReducers({category, posts, orderPost}) 