import React from 'react';
import { Link } from 'react-router-dom';
import './NotFound.css'; // Assuming you will put your styles in a separate CSS file


export function NotFound() {
    return (
        <div className="main-container d-flex flex-wrap align-content-center bg-light justify-content-center align-items-center">
            <div className="p-4 text-center">
                <section className="error-container">
                    <span className="four"><span className="screen-reader-text">4</span></span>
                    <span className="zero"><span className="screen-reader-text">0</span></span>
                    <span className="four"><span className="screen-reader-text">4</span></span>
                </section>
                <h1>Page Not Found</h1>
                <div className="link-container mb-4">
                    <Link className="fw-bold text-color more-link" to="/">Return To Home</Link>
                </div>
            </div>
        </div>
    );
}
