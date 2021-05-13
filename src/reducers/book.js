export const bookReducer = (state = {}, action) => {
    switch (action.type) {
        case "GET_BOOK":
            return { ...action.payload };
        default:
            return state;
    }
};
