import http from "./httpService";
import config from "./config.json";

export const getBooks=()=>{
    return http.get(`${config.localapi}/api/books`);
}
export const getBook = (bookId) => {
    return http.get(`${config.localapi}/api/book/${bookId}`);
};

export const newBook = (book) => {
    return http.post(`${config.localapi}/api/book`, book);
};

export const deleteBook = (bookId) => {
    return http.delete(`${config.localapi}/api/book/${bookId}`);
};

export const updateBook = (bookId, book) => {
    return http.put(`${config.localapi}/api/book/${bookId}`, book);
};
