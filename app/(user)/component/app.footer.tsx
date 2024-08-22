import React from 'react';

export default function AppFooter() {
    return (
        <footer className="bg-secondary">
            <div className="container">
                <div className="row py-4">
                    <div className="col-md-3">
                        <h5>Resources</h5>
                        <ul className="list-unstyled">
                            <li><a href="#" className="text-decoration-none text-light">Find A Store</a></li>
                            <li><a href="#" className="text-decoration-none text-light">Become A Member</a></li>
                            <li><a href="#" className="text-decoration-none text-light">Send Us Feedback</a></li>
                            <li><a href="#" className="text-decoration-none text-light">Find A Store</a></li>
                            <li><a href="#" className="text-decoration-none text-light">Become A Member</a></li>
                            <li><a href="#" className="text-decoration-none text-light">Send Us Feedback</a></li>
                        </ul>
                    </div>
                    <div className="col-md-3">
                        <h5>Help</h5>
                        <ul className="list-unstyled">
                            <li><a href="#" className="text-decoration-none text-light">Get Help</a></li>
                            <li><a href="#" className="text-decoration-none text-light">Order Status</a></li>
                            <li><a href="#" className="text-decoration-none text-light">Delivery</a></li>
                            <li><a href="#" className="text-decoration-none text-light">Returns</a></li>
                            <li><a href="#" className="text-decoration-none text-light">Payment Options</a></li>
                            <li><a href="#" className="text-decoration-none text-light">Contact Us</a></li>
                        </ul>
                    </div>
                    <div className="col-md-3">
                        <h5>About Shop</h5>
                        <ul className="list-unstyled">
                            <li><a href="#" className="text-decoration-none text-light">About Nike</a></li>
                            <li><a href="#" className="text-decoration-none text-light">News</a></li>
                            <li><a href="#" className="text-decoration-none text-light">Careers</a></li>
                            <li><a href="#" className="text-decoration-none text-light">Investors</a></li>
                            <li><a href="#" className="text-decoration-none text-light">Sustainability</a></li>
                        </ul>
                    </div>
                    <div className="col-md-3">
                        <h5>Follow Us</h5>
                        <ul className="list-unstyled">
                            <li>
                                <a href="#" className="text-white text-decoration-none">
                                    <svg className="bi me-2" width="16" height="16"><use xlinkHref="#twitter-icon" /></svg>
                                    Twitter
                                </a>
                            </li>
                            <li>
                                <a href="#" className="text-white text-decoration-none">
                                    <svg className="bi me-2" width="16" height="16"><use xlinkHref="#facebook-icon" /></svg>
                                    Facebook
                                </a>
                            </li>
                            <li>
                                <a href="#" className="text-white text-decoration-none">
                                    <svg className="bi me-2" width="16" height="16"><use xlinkHref="#instagram-icon" /></svg>
                                    Instagram
                                </a>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
            <div className="container-fluid bg-dark text-light text-center py-3">
                &copy; 2024 Adodas Shop By NLV
            </div>
        </footer>
    );
}
