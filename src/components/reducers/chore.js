import {
    FETCH_CHORE_REQUEST,
    FETCH_CHORE_SUCCESS,
    FETCH_CHORE_ERROR,
    ADD_CHORE_ERROR,
    ADD_CHORE_SUCCESS,
    DELETE_CHORE_FAILURE,
    DELETE_CHORE_SUCCESS,
    DELETE_CHORE_REQUEST,
    UPDATE_CHORE_REQUEST,
    UPDATE_CHORE_SUCCESS,
    UPDATE_CHORE_FAILURE
} from '../actions/chore';

const initialState = {
    choreData: [],
    error: null,
    isFetching: false,
    isDeleting: false,
    isEditing: false
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
    }else if(action.type ===DELETE_CHORE_REQUEST){
        return Object.assign({}, state,{
            isDeleting: true
        });
    }else if(action.type === DELETE_CHORE_FAILURE){
        return Object.assign({}, state, {
            isDeleting: false,
            error: action.error
        });
    }else if(action.type === DELETE_CHORE_SUCCESS){
       let filteredState = [...state.choreData.filter(choreItem => choreItem._id !== action.data)];
       return Object.assign({}, state, {
           isDeleting: false,
           choreData: filteredState
        });   
    }else if(action.type === UPDATE_CHORE_REQUEST){
        return Object.assign({}, state, {
            isEditing: true
        });
    }else if(action.type === UPDATE_CHORE_FAILURE){
        return Object.assign({}, state,{
            isEditing: false,
            error: action.error
        });
    }else if(action.type === UPDATE_CHORE_SUCCESS){
        return Object.assign({}, state, {
            isEditing: false

        });
    }
    return state;
}
