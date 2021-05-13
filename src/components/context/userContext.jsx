import React, { useState, useRef } from "react";
import SimpleReactValidator from "simple-react-validator";
import { useDispatch } from "react-redux";
import { context } from "./context";

import { withRouter } from "react-router";
import { addUser } from "./../../actions/user";
import { error, seccess } from './../../utils/toastmessage';
import { loginUser, registerUser } from './../../services/userService';
import { decodeToken } from './../../utils/decode';


const UserContext = ({ children, history }) => {
    const [fullname, setFullname] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [policy, setPolicy] = useState();

    const [, forceUpdate] = useState();

    const dispatch = useDispatch();

    const validator = useRef(
        new SimpleReactValidator({
            messages: {
                required: "پر کردن این فیلد الزامی میباشد",
                min: "کمتر از 5 کاراکتر نباید باشد",
                email: "ایمیل نوشته شده صحیح نمی باشد",
                integer:"باید عدد یاشد"
            },
            element: message => <div style={{ color: "red" }}>{message}</div>
        })
    );

    const resetStates = () => {
        setFullname("");
        setEmail("");
        setPassword("");
        setPolicy();
    };

    const handleLogin = async event => {
        event.preventDefault();
        const user = { email, password };

        try {
            if (validator.current.allValid()) {
                const { status, data } = await loginUser(user);
                if (status === 200) {
                    seccess("ورود موفقیت آمیز بود.");
                    localStorage.setItem("token", data.token);
                    dispatch(addUser(decodeToken(data.token).payload.user));
                    history.replace("/");
                    resetStates();
                }
            } else {
                validator.current.showMessages();
                forceUpdate(1);
            }
        } catch (ex) {
            console.log(ex);
            error("مشکلی پیش آمده.");
        }
    };

    const handleRegister = async event => {
        event.preventDefault();
        const user = {
            fullname,
            email,
            password
        };

        try {
            if (validator.current.allValid()) {
                const { status } = await registerUser(user);
                if (status === 201) {
                    seccess("کاربر با موفقیت ساخته شد.");
                    history.push("/login");
                }
            } else {
                validator.current.showMessages();
                forceUpdate(1);
            }
        } catch (ex) {
            error("مشکلی در ثبت نام پیش آمده.");
            console.log(ex);
        }
    };

    return (
        <context.Provider
            value={{
                fullname,
                setFullname,
                email,
                setEmail,
                password,
                setPassword,
                policy,
                setPolicy,
                validator,
                handleLogin,
                handleRegister
            }}
        >
            {children}
        </context.Provider>
    );
};

export default withRouter(UserContext);
