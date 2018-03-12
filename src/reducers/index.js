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
    switch (action.type) {
        default :
            return state
    }
}

export default combineReducers({category}) 