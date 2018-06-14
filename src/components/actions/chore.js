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