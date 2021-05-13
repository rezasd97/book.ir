import { seccess } from './../utils/toastmessage';
import { newBook, deleteBook, updateBook, getBooks } from './../services/bookService';

export const getAllBooks = () => {
    return async (dispatch) => {
        const { data } = await getBooks();
        await dispatch({
            type: "INIT",
            payload: data.books
        });

    };
};

export const createNewBook = (book) => {
    return async (dispatch, getState) => {
        const { data, status } = await newBook(book);
        if (status === 201) seccess("کتاب با موفقیت ساخته شد");
        await dispatch({
            type: "ADD_BOOK",
            payload: [...getState().books, data.book],
        });
    };
};

export const DeletedBook = (bookId) => {
    return async (dispatch, getstate) => {
        const books = [...getstate().books];
        const filterbook = books.filter(
            (book) => book._id !== bookId
        );

        try {
            await dispatch({
                type: "DELETE_BOOK",
                payload: [...filterbook]
            });
            const { status } = await deleteBook(bookId);
            if (status === 200) {
                seccess("کتاب حذف شد")
            }
        } catch (ex) {
            await dispatch({
                type: "DELETE_BOOK",
                payload: [...books]
            })
        }
    }
};

export const handleBookUpdate = (bookId, updatedBook) => {
    return async (dispatch, getState) => {
        const books = [...getState().books];
        const updatebooks = [...books];
        const findbook = updatebooks.findIndex(book => book._id == bookId)

        let book = updatebooks[findbook];
        book = { ...Object.fromEntries(updatedBook) };
        updatebooks[findbook] = book;

        try {
            const { status } = await updateBook(bookId, updatedBook);
            await dispatch({
                type: "UPDATE_BOOK", payload: [...updatebooks],
            });
            if (status === 200) {
                seccess("کتاب با موفقیت ویرایش شد.");
            }
        } catch (ex) {
            await dispatch({ type: "UPDATE_BOOK", payload: [...books] });
        }
    };
};
















