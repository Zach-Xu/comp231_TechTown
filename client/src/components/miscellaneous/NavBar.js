import React, { Fragment } from 'react'
import { Link } from 'react-router-dom'
import { GlobalState } from '../../context/GlobalProvider'
import { useNavigate } from 'react-router-dom'

import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import Toolbar from "@mui/material/Toolbar";

export default function NavBar({ handleDrawerOpen, open }) {

    const { user, setUser } = GlobalState()

    const navigate = useNavigate()

    const logout = () => {
        localStorage.removeItem('techTownToken')
        setUser()
        navigate('/')
    }

    console.log('contextuser', user);

    return (
        <Toolbar className='navbar bg-dark' sx={{ d: 'flex', justifyContent: 'space-between' }}>
            <div style={{ display: 'flex', alignItems: 'center' }}>
                {
                    user && <IconButton
                        color="inherit"
                        aria-label="open drawer"
                        onClick={handleDrawerOpen}
                        edge="start"
                        sx={{ mr: 2, ...(open && { display: 'none' }) }}
                    >
                        <MenuIcon />
                    </IconButton>
                }
                <h2>
                    <Link to={user ? '/posts' : '/'}>
                        COMP231 Tech Town
                    </Link>
                </h2>
            </div>
            <ul>
                <li><Link to='/posts'>Posts</Link></li>
                {user ?
                    <>
                        <li><Link to="/post">Ask Question</Link></li>
                        <li><span>{`Welcome, ${user.username}`}</span></li>
                        <li onClick={logout} className="btn-li">Logout</li>
                    </>
                    :
                    <>
                        <li><Link to="/signup">Register</Link></li>
                        <li><Link to="/login">Login</Link></li>
                    </>}
            </ul>
        </Toolbar>
    )
}
