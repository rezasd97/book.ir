import {  getBook } from './../services/bookService';

export const getSingleBook = bookId => {
    return async dispatch => {
        const { data } = await getBook(bookId);
        await dispatch({ type: "GET_BOOK", payload: data.book });
        
    };
};
