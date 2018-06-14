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