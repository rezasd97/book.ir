import { combineReducers } from "redux";
import { userReducer } from "./user";
import {  booksReducer } from './books';
import { bookReducer } from "./book";

export const reducers = combineReducers({
    user: userReducer,
    books: booksReducer,
    book:bookReducer
});
