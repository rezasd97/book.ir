import React from 'react';
import { Link, withRouter } from 'react-router-dom';

const Adminside = (location) => {
    return (
        <div>
            <ul className="nav navbar-nav side-nav" style={{ height: "100vh" }}>
                <li
                    className={
                        location.pathname === "/" ? "active" : ""
                    }
                >
                    <Link to="/">
                        <i className="fa fa-fw fa-dashboard"></i> صفحه اصلی
                </Link>
                </li>
                <li
                    className={
                        location.pathname === "/dashboard" ? "active" : ""
                    }
                >
                    <Link to="/dashboard">
                        <i className="fa fa-fw fa-dashboard"></i> کتاب ها
                </Link>
                </li>
                <li
                    className={
                        location.pathname === "/Addnewbook"
                            ? "active"
                            : ""
                    }
                >
                    <Link to="/Addnewbook">
                        <i className="fa fa-plus"></i>  ساخت کتاب جدید
                </Link>
                </li>
            </ul>
        </div>);
}

export default withRouter(Adminside);