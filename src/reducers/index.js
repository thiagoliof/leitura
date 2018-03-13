import {
    LOAD_CATEGORY,
    SELECT_MENU,
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

function activeMenuItem (state = 'react', action){
    
    switch (action.type) {
        
        case SELECT_MENU :
            return action.itemSelected

        default :
            return state
    }
}

export default combineReducers({category, activeMenuItem}) 