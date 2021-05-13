import React from "react";
import { Link } from 'react-router-dom';

const Footer = () => {
    return (
        <React.Fragment>
            <hr></hr>
            <footer>
                <div className="top-footer">
                    <div className="container">
                        <div className="row">
                            <div className="col-md-3 col-sm-6 col-xs-12">
                                <section className="list">
                                    <header><h4> دسترسی سریع</h4></header>
                                    <ul>
                                        <li><Link to="">مشاهده تمامی  کتاب ها</Link></li>
                                        <li><Link to="">قوانین خرید از سایت </Link></li>
                                        <li><Link to="">راهنمای خرید از سایت </Link></li>
                                        <li><Link to="">همکاری با کتاب حانه </Link></li>

                                    </ul>
                                </section>
                            </div>
                            <div className="col-md-3 col-sm-6 col-xs-12">
                                <section className="list">
                                    <header><h4>  تماس با ما</h4></header>
                                    <ul>
                                        <li><Link to="">تلفن (***01932594)</Link></li>
                                        <li><Link to="">ایمیل</Link></li>


                                    </ul>

                                </section>
                            </div>
                            <div className="col-md-3 col-sm-6 col-xs-12">
                                <section className="list">

                                </section>
                            </div>
                            <div className="col-md-3 col-sm-6 col-xs-12">
                                <section className="list">

                                </section>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="bottom-footer">
                    <div className="container">
                        <p>

                        </p>
                    </div>
                </div>
            </footer>
        </React.Fragment>
    );
};

export default Footer;
