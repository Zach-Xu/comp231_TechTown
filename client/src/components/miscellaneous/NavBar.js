import React, { Fragment } from 'react'
import { Link } from 'react-router-dom'
import { GlobalState } from '../../context/GlobalProvider'
import { useNavigate } from 'react-router-dom'

export default function NavBar() {

    const { user, setUser } = GlobalState()

    const navigate = useNavigate()

    const logout = () => {
        localStorage.removeItem('techTownToken')
        navigate('/')
    }

    console.log('contextuser', user);

    return (
        <Fragment>
            <nav className="navbar bg-dark">
                <h2>
                    <Link to='/'>
                        COMP231 Tech Town
                    </Link>
                </h2>
                <ul>
                    <li><Link to="/posts">Posts</Link></li>
                    {user ?
                        <>
                            <li><Link to="/login">Ask Question</Link></li>
                            <li><Link to="/">Ask Question</Link></li>
                            <li onClick={logout}>Logout</li>
                        </>
                        :
                        <>
                            <li><Link to="/signup">Register</Link></li>
                            <li><Link to="/login">Login</Link></li>
                        </>}
                </ul>
            </nav >
        </Fragment >
    )
}
