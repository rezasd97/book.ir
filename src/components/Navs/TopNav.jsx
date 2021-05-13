import React from "react";
import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import { isEmpty } from "lodash";

const TopNav = () => {
    const user = useSelector(state => state.user);

    return (
        <nav>
            <div className="row">
                <div className="col-sm-6 col-xs-12">
                    <ul>
                        <li>
                            <NavLink
                                to="/"
                                exact
                                activeStyle={{ color: "lime" }}
                            >
                                {" "}
                                صفحه اصلی{" "}
                            </NavLink>
                           
                            
                        </li>
                    </ul>
                </div>
                <div className="col-sm-6 col-xs-12">
                    <div className="clientarea">
                        {!isEmpty(user) ? (
                            <div className="loggein ">
                                <i className="zmdi zmdi-account"></i>
                                <NavLink to="/user-profile">
                                    {" "}
                                    {user.fullname}{" "}
                                </NavLink>/
                                {"    "}
                                {user.isAdmin ? (
                                    <NavLink to="/paneladmin">
                                        پنل امین
                                    </NavLink>
                                ) : null}/
                                <NavLink to="/logout">
                                    {" "}
                          خروج{" "}
                                </NavLink>
                            </div>
                        ) : (
                            <div className="signin ">
                                <i className="zmdi zmdi-account"></i>
                                <NavLink
                                    to="/login"
                                    activeStyle={{ color: "lime" }}
                                >
                                    {" "}
                                ورود{" "}
                                </NavLink>{" "}
                            /
                                <NavLink
                                    to="/register"
                                    activeStyle={{ color: "lime" }}
                                >
                                    {" "}
                                عضویت{" "}
                                </NavLink>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default TopNav;


