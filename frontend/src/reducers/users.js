export default function users(state = [], action = {}) {
    switch (action.type){
        case "SET_USERS":
            return action.users

        case "ADD_USER":
            return [
                ...state,
                action.user
            ];
        case "FETCH_USER":
            const index = state.findIndex(item => item.id === action.user.id);
            if (index > -1) {
                return state.map(item => {
                    if (item.id === action.user.id) return action.user;
                    return item;
                });
            } else {
                return [
                    ...state,
                    action.user
                ];
            }
        case "DELETE_USER":
            return state.filter(item => item.id !== action.userID);

        default: return state
    }
}