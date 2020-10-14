import {types} from './actions'

const exampleReducer = (state = "", action) => {
    switch(action.type) {
        case types.EXAMPLE_SET: 
            return action.payload;
        default:
            return state
    }
}

export default exampleReducer