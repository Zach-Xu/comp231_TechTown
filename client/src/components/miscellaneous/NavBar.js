import React, { Fragment } from 'react'
import { Link } from 'react-router-dom'

export default function NavBar() {

    return (
        <Fragment>
            <nav className="navbar bg-dark">
                <h1>
                    <Link to='/'>
                        COMP231 Tech Town
                    </Link>
                </h1>
                <ul>
                    <li><Link to="/signup">Register</Link></li>
                    <li><Link to="/login">Login</Link></li>
                </ul>
            </nav >
        </Fragment >
    )
}
