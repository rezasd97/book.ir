import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {  NavLink } from "react-router-dom";
import { DeletedBook } from './../../actions/book';
import { getSingleBook } from './../../actions/singelbook';


const Dashbordadmin = () => {
    const books = useSelector(state => state.books);
    const dis = useDispatch();


    const [search, setSearch] = useState("");
    const [list, setList] = useState([]);
    useEffect(() => setList(books), [books]);
    const filterbooks = list.filter((book) => book.title.includes(search));

    return (
        <section style={{ marginTop: "5em", marginRight: "2em" }}>
            <div className="container">
                <div>
                    <h3 className="alert alert-info text-center">
                        لیست کتاب  ها
                    </h3>
                    <div className="row inline-block">
                        
                        <input
                            type="text"
                            placeholder="جستجوی کتاب"
                            onChange={e => setSearch(e.target.value)}
                            className="form-control"
                            style={{
                                width: "50%",
                                float: "right",
                                marginLeft: "2em",
                            }}
                        />
                    </div>
                    <table className="table">
                        <thead>
                            <tr>
                                <th scope="col">نام کتاب </th>
                                <th scope="col">تصویر کتاب</th>
                                <th scope="col">قیمت کتاب (تومان)</th>
                                <th scope="col">ویرایش</th>
                                <th scope="col">حذف</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filterbooks.map((book) => (
                                <tr key={book._id}>
                                    <td>{book.title}</td>
                                    <td>
                                        <a
                                            href={`http://localhost:4000/${book.imageUrl}`}
                                            target="_blank"
                                            className="btn btn-info btn-sm"
                                        >
                                            نمایش تصویر
                                        </a>
                                    </td>
                                    <td>
                                        {book.price === 0
                                            ? "رایگان"
                                            : `${book.price}`}
                                    </td>
                                    <td>

                                        <NavLink to="/updatebook">
                                            <button className="btn btn-warning"
                                                onClick={() => dis(getSingleBook(book._id))}

                                            >
                                                ویرایش
                                        </button>
                                        </NavLink>
                                    </td>
                                    <td>
                                        <button
                                            className="btn btn-danger"
                                            onClick={() => {
                                                const confirmBox = window.confirm(
                                                    "مطمئنی میخوای حذفش کنی"
                                                )
                                                if (confirmBox === true) {
                                                    dis(DeletedBook(book._id))
                                                }
                                            }}>
                                                حذف
                                        </button>
                                    </td>

                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
                <div className="navbar-fixed-bottom text-center footer">

                </div>
            </div>
        </section>
    );
};

export default Dashbordadmin;
