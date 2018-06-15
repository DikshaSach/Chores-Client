export const FETCH_CHORE_REQUEST = 'FETCH_CHORE_REQUEST';
export const fetchChoreRequest = () => ({
    type: FETCH_CHORE_REQUEST
});
export const FETCH_CHORE_SUCCESS = "FETCH_CHORE_SUCCESS";
export const fetchChoreSuccess = data => ({
    type : FETCH_CHORE_SUCCESS,
    data
});
export const FETCH_CHORE_ERROR = "FETCH_CHORE_ERROR";
export const fetchChoreError = error => ({
    type: FETCH_CHORE_ERROR,
    error
});
export const ADD_CHORE_SUCCESS = "ADD_CHORE_SUCCESS";
export const addChoreSuccess = data => ({
    type: ADD_CHORE_SUCCESS,
    data
});
export const ADD_CHORE_ERROR = "ADD_CHORE_ERROR";
export const addChoreError = error => ({
    type: ADD_CHORE_ERROR,
    error
});
export const DELETE_CHORE_SUCCESS = "DELETE_CHORE_SUCCESS";
export const deleteChoreSuccess = data =>({
    type: DELETE_CHORE_SUCCESS,
    data
});
export const DELETE_CHORE_FAILURE = "DELETE_CHORE_FAILURE";
export const deleteChoreFailure = error => ({
    type: DELETE_CHORE_FAILURE,
    error
});
export const DELETE_CHORE_REQUEST = "DELETE_CHORE_REQUEST";
export const deleteChoreRequest = () => ({
    type: DELETE_CHORE_REQUEST
})

// get endpoint for getting all chores
export const fetchChores = (id, date) => (dispatch) => {
    dispatch(fetchChoreRequest());
    return fetch('http://localhost:8080/chores/' + id + '/' + date,  {
        method: 'GET'
    })
    .then(res => res.json())
    .then (data => dispatch(fetchChoreSuccess(data)))
    .catch(err => {
        dispatch(fetchChoreError(err));
    });
};

export const addChore = (choreDetails) => dispatch =>{
    return fetch('http://localhost:8080/chores/add/chore', {
        method: 'POST',
        body: JSON.stringify(choreDetails),
        headers: {
            'content-type': 'application/json'
        }
    })
    .then(res => res.json())
    .then(data => dispatch(addChoreSuccess(data)))
    .catch(err => dispatch(addChoreError(err)))
}
export const deleteChore = (id) => dispatch => {
    dispatch(deleteChoreRequest());
    return fetch('http://localhost:8080/chores/delete/chore/' + id,{
        method: 'DELETE',
    })
    .then(dispatch(deleteChoreSuccess(id)))
    .catch(err => dispatch(deleteChoreFailure(err)))
}