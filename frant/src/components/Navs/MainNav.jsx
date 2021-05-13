import React from "react";
import { Link } from 'react-router-dom';


const MainNav = () => {
    return (
        <div className="main-menu">
            <div className="container">
                <nav>
                    <span className="responsive-sign"><i className="zmdi zmdi-menu"></i></span>
                    <ul>
                        <li><Link to="">کتاب ها </Link>
                            <ul>
                                <li><Link to=""> علمی </Link></li>
                                <li><Link to=""> غیر علمی </Link></li>
                            </ul>
                        </li>
                        <li><Link to=""> نویسندگان </Link>
                            <ul>
                                <li><Link to=""> ایرانی </Link></li>
                                <li><Link to=""> خارحی </Link></li>
                            </ul>
                        </li>
                    </ul>
                </nav>
            </div>
        </div>
    );
};

export default MainNav;
