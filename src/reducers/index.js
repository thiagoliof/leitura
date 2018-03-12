import {
    LOAD_CATEGORY,
} from '../actions'
import { combineReducers } from 'redux';

const initialCategoryState = {
    "categories": [
        {
            "name": "react",
            "path": "react"
        },
        {
            "name": "redux",
            "path": "redux"
        },
        {
            "name": "udacity",
            "path": "udacity"
        }
    ]
}

function category (state = initialCategoryState, action){
    const { categories } = action
    console.log(categories)
    switch (action.type) {
        
        case LOAD_CATEGORY :
            return {
                ...state,
            }

        default :
            return state
    }
}

export default combineReducers({category}) 