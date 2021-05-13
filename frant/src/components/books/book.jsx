import React from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { useState } from 'react';
import { useEffect } from 'react';


const Book = () => {

    const books = useSelector(state => state.books);
    
    const [search,setSearch]=useState("");
    const [list,setList]=useState([]);
    useEffect(() => setList(books), [books]);
    const filterbooks = list.filter((book) => book.title.includes(search));

    return (
        <React.Fragment>
                <div className="container">
                     <div className="search-form">
                <form>
                    <input
                        type="text"
                        name=""
                        placeholder="نام کتاب بزن!؟"
                        onChange={e=>setSearch(e.target.value)}
                    />
                </form>
            </div>
                </div>
            {filterbooks.map(book => (
                <div
                    key={book._id}
                    className="col-lg-3 col-md-4 col-sm-6 col-xs-12 term-col"
                >
                    <article>
                        <Link
                            to="/"
                            className="img-layer"
                        >
                            <img src={`http://localhost:4000/${book.imageUrl}`}></img>
                               
                            
                        </Link>
                        <h2>
                            <Link to="/">
                                {book.title}

                            </Link>
                        </h2>
                        <span>
                            قیمت: {book.price === 0
                                ? "رایگان"
                                : `${book.price}`}</span>

                    </article>
                </div>
            ))}
      

</React.Fragment>


    );
}

export default Book;