import constants from '../contants'

const handleResponse = (response) => {
    if (response.ok) {
        return response.json();
    } else {
        let error = new Error(response.statusText);
        error.response = response;
        throw error;
    }
}

export function fetchUsers() {
    return dispatch => {
        return fetch('/api/users')
            .then(handleResponse)
            .then(res => {
                dispatch({
                    type: constants.SET_USERS,
                    users: res
                })
            })
    }
}
export function fetchUser(userID) {
    return dispatch => {
        return fetch('/api/users/' + userID)
            .then(handleResponse)
            .then(res => {
                dispatch({
                    type: constants.FETCH_USER,
                    user: res
                })
            })
    }
}
export function saveUser(data) {
    console.log(data)
    return dispatch => {
        const {id} = data
        return fetch('/api/users' + (id > 0 ? ('/' + id) : ''), {
            method: (id > 0 ? "put" : "post"),
            body: JSON.stringify(data),
            headers: {
                'Content-Type': 'application/json'
            }
        })
            .then(handleResponse)
            .then(res => dispatch({
                type: constants.ADD_USER,
                user: res
            }));
    }
}

export function deleteUser(userID) {
    return dispatch => {
        return fetch('/api/users/' + userID, {
            method: "delete",
        })
            .then(res => dispatch({
                type: constants.DELETE_USER,
                userID: userID
            }));
    }
}