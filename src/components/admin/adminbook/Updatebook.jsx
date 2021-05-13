import React, { useEffect } from 'react';

import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { handleBookUpdate } from '../../../actions/book';
import { useSelector } from 'react-redux';
import { withRouter } from 'react-router-dom';

const Updatebook = ({ history }) => {
    const book = useSelector(state => state.book);
    const dispatch = useDispatch();

    const [bookId, setBookId] = useState();
    const [title, setTitle] = useState();
    const [price, setPrice] = useState();
    const [info, setInfo] = useState();
    const [imageUrl, setimageUrl] = useState();

    useEffect(() => {
        setBookId(book._id);
        setTitle(book.title);
        setPrice(book.price);
        setInfo(book.info);
        setimageUrl(book.imageUrl);


        return () => {
            setTitle();
            setPrice();
            setInfo();
            setimageUrl();
            setBookId();
        }

    }, [book]);

    const handleSubmit = (event) => {
        event.preventDefault();
        let data = new FormData();
        data.append("title", title);
        data.append("price", price);
        if (event.target.imageUrl.files[0])
            data.append("imageUrl", event.target.imageUrl.files[0]);
        else data.append("imageUrl", imageUrl);
        data.append("info", info);
        dispatch(handleBookUpdate(bookId, data));
        history.push("/dashboard");
    };

    return (
        <section style={{ marginTop: "5em", marginRight: "2em" }}>
            <div className="container">
                <form onSubmit={handleSubmit}>
                    <div className="form-outline mb-4">
                        <label className="form-label" >نام کتاب</label>
                        <input
                            type="text"
                            name="title"
                            className="form-control"
                            placeholder="عنوان دوره"
                            aria-describedby="title"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                        />

                    </div>
                    <div className="form-outline mb-4">
                        <label className="form-label" >قیمت</label>
                        <input
                            type="text"
                            name="price"
                            className="form-control"
                            placeholder="قیمت دوره به تومان"
                            aria-describedby="price"
                            value={price}
                            onChange={(e) => setPrice(e.target.value)}
                        />

                    </div>
                    <div className="form-outline mb-4">
                        <label className="form-label" >توضیحات کتاب </label>
                        <textarea
                            name="info"
                            placeholder="توضیحات کتاب"
                            className="form-control"
                            style={{ marginBottom: 3 }}
                            value={info}
                            onChange={(e) => setInfo(e.target.value)}
                        />
                    </div>
                    <input
                        type="file"
                        name="imageUrl"
                        className="form-control mb-2"
                        aria-describedby="imageUrl"
                    />
                    <button type="submit" className="btn btn-primary ">ویرایش  کتاب</button>
                </form>
            </div>
        </section>
    );
}

export default withRouter(Updatebook);