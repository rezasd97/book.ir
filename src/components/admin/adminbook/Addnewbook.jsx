import React from 'react';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { createNewBook } from '../../../actions/book';
import { withRouter } from 'react-router-dom';
import { useContext } from 'react';
import { context } from './../../context/context';

const Addnewbook = ({ history }) => {

    const [title, setTitle] = useState();
    const [price, setPrice] = useState();
    const [info, setInfo] = useState();
    const [imageUrl, setimageUrl] = useState();
    const [, forceUpdate] = useState();

    const val = useContext(context);
    const { validator } = val;

    const dispatch = useDispatch();

    const handleSubmit = (event) => {
        event.preventDefault();
        try {
            if (validator.current.allValid()) {
                let data = new FormData();
                data.append("title", title);
                data.append("price", Number.parseInt(price));
                data.append("imageUrl", event.target.imageUrl.files[0]);
                data.append("info", info);
                dispatch(createNewBook(data));
                history.push("/dashboard");
            }
            else {
                validator.current.showMessages();
                forceUpdate(1);
            }
        } catch (ex) {
            console.log(ex);
        }
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
                            placeholder="عنوان کتاب"
                            aria-describedby="title"
                            value={title}
                            onChange={(e) => {
                                setTitle(e.target.value);
                                validator.current.showMessageFor(
                                    "title"
                                );
                            }}
                        />
                        {validator.current.message("title", title, "required|min:5")}

                    </div>


                    <div className="form-outline mb-4">
                        <label className="form-label" >قیمت</label>
                        <input
                            type="text"
                            name="price"
                            className="form-control"
                            placeholder="قیمت کتاب به تومان"
                            aria-describedby="price"
                            value={price}
                            onChange={(e) => {
                                setPrice(e.target.value);
                                validator.current.showMessageFor("price");
                            }}
                        />
                        {validator.current.message("price", price, "required|integer")}

                    </div>


                    <div className="form-outline mb-4">
                        <label className="form-label" >توضیخات</label>
                        <textarea
                        
                            name="info"
                            placeholder="توضیحات کتاب"
                            className="form-control"
                            style={{ marginBottom: 3 }}
                            value={info}
                            onChange={(e) => {
                                setInfo(e.target.value);
                                validator.current.showMessageFor(
                                    "info"
                                );

                            }}
                        />
                        {validator.current.message("info", info, "required|min:5")}

                    </div>

                    <input
                        type="file"
                        name="imageUrl"
                        className="form-control mb-2"
                        aria-describedby="imageUrl"
                        onChange={(e) => {
                            setimageUrl(true);
                            validator.current.showMessageFor("imageUrl");
                        }}
                    />
                    {validator.current.message("imageUrl", imageUrl, "required")}
                    <button type="submit" className="btn btn-primary ">ساخت کتاب</button>
                </form>
            </div>
        </section>

    );
}

export default withRouter(Addnewbook);