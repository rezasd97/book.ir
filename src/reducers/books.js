export const booksReducer = (state = [], action) => {
    switch (action.type) {
        case "INIT":
            return [...action.payload];
        case "ADD_BOOK":
            return [...action.payload];
        case "DELETE_BOOK":
            return [...action.payload];
        case "UPDATE_BOOK":
            return [...action.payload];
        default:
            return state;
    }
};
