import {
    FETCH_CHORE_REQUEST,
    FETCH_CHORE_SUCCESS,
    FETCH_CHORE_ERROR,
    ADD_CHORE_ERROR,
    ADD_CHORE_SUCCESS
} from '../actions/chore';

const initialState = {
    choreData: [],
    error: null,
    isFetching: false
};

export default function reducer(state = initialState, action){
    if(action.type === FETCH_CHORE_REQUEST){
        return Object.assign({}, state, {
        choreData: [],
        isFetching: true
        });
    }
    else if(action.type === FETCH_CHORE_SUCCESS){
        return Object.assign({}, state, {
            isFetching: false,
            choreData: action.data
        });
    }
    else if(action.type === FETCH_CHORE_ERROR){
        return Object.assign({}, state, {
            error: action.error
        });
    }
    else if(action.type === ADD_CHORE_ERROR){
        return Object.assign({}, state, {
           error: action.error 
        });
    }else if (action.type === ADD_CHORE_SUCCESS){
        return Object.assign({}, state,{
            choreData: [...state.choreData, action.data]
        });
    }
    return state;
}
