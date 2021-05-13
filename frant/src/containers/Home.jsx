import React from "react";

import { Switch, Route, Redirect } from "react-router-dom";

import MainLayout from "../components/Layouts/MainLayout";
import Login from "../components/Login/Login";
import Register from "./../components/Register/Register";
import { useDispatch, useSelector } from 'react-redux';
import { clearUser } from "../actions/user";
import { addUser } from './../actions/user';
import { useEffect } from "react";
import { decodeToken } from './../utils/decode';
import Logout from './../components/Login/Logout';
import { isEmpty } from 'lodash';
import Adminlayout from './../components/Layouts/Adminlayout';
import UserContext from "../components/context/userContext";
import Book from './../components/books/book';
import Dashbordadmin from './../components/admin/Dashbordadmin';
import Addnewbook from "../components/admin/adminbook/Addnewbook";
import Updatebook from './../components/admin/adminbook/Updatebook';
import Paneladmin from './../components/admin/Paneladmin';








const Home = props => {

    const dispatch = useDispatch();
    const user = useSelector(state => state.user);
    

    useEffect(() => {
        const token = localStorage.getItem("token");
        if (token) {
            const decodetoken = decodeToken(token);
            const datenow = Date.now() / 1000;
            if (decodetoken.payload.exp < datenow) {
                localStorage.removeItem("token");
                dispatch(clearUser());
            } else dispatch(addUser(decodetoken.payload.user));
        }
    }, []);
    return (
        <Switch>
            <Route path={["/dashboard","/Addnewbook","/updatebook","/paneladmin"]}>
                <Adminlayout>
                    <Route
                        path="/paneladmin"
                        exact
                        render={() =>
                            !isEmpty(user) && user.isAdmin ? (
                                <Paneladmin />
                            ) : (
                                <Redirect to="/" />
                            )
                        }
                    />
                    <Route
                        path="/dashboard"
                        exact
                        render={() =>
                            !isEmpty(user) && user.isAdmin ? (
                                <Dashbordadmin />
                            ) : (
                                <Redirect to="/" />
                            )
                        }
                    />
                     
                     <Route
                        path="/Addnewbook"
                        exact
                        render={() =>
                            !isEmpty(user) && user.isAdmin ? (
                                <UserContext><Addnewbook /></UserContext>
                                
                            ) : (
                                <Redirect to="/" />
                            )
                        }
                    />
                    <Route
                        path="/updatebook"
                        exact
                        render={() =>
                            !isEmpty(user) && user.isAdmin ? (
                            
                                <Updatebook />
                            ) : (
                                <Redirect to="/" />
                            )
                        }
                    />
                </Adminlayout>
            </Route>
            <Route path={["/", "login", "logout"]}>
                <MainLayout>
                    <Switch>
                        <Route path="/login" render={() => isEmpty(user) ? (
                            <UserContext>
                                <Login />
                            </UserContext>
                        ) : (<Redirect to="/" />)}
                        />
                        <Route path="/logout" render={() => isEmpty(user)
                            ? <Redirect to="/" />
                            : <Logout />}
                        />
                        <Route path="/register" render={() => isEmpty(user) ? (
                            <UserContext>
                                <Register />
                            </UserContext>
                        ) : (<Redirect to="/" />)}
                         />
                        <Route path="/" exact component={Book} />
                    </Switch>
                </MainLayout>
            </Route>
        </Switch>
    );
};

export default Home;
