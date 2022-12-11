import React, { Fragment } from 'react'
import { Link } from 'react-router-dom'

export default function Landing() {
    return (
        <Fragment>
            <section className="landing">
                <div className="dark-overlay">
                    <div className="landing-inner">
                        <h1 className="x-large">Tech Town</h1>
                        <p className="lead">A social media platform for programmers at all levels</p>
                        <div className="buttons">
                            <Link to="/auth" className="btn btn-primary">
                                Sign Up</Link>
                            <Link to="/auth" className="btn btn-light">
                                Login</Link>
                        </div>
                    </div>
                </div>
            </section>
        </Fragment>
    )
}
