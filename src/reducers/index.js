import {
    LOAD_CATEGORY,
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

export default combineReducers({category}) 