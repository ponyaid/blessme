import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { logout } from '../redux/actions'


export const Navbar = () => {
    const dispatch = useDispatch()
    const { user } = useSelector(state => state.auth)
    const [isMenu, setIsMenu] = useState(false)

    const logoutHandler = e => {
        e.preventDefault()
        dispatch(logout())
    }

    const menuBtnHandler = e => {
        e.preventDefault()
        setIsMenu(!isMenu)
    }

    return (
        <header className="navbar">
            <Link to="/" className="logo navbar__logo">blessme</Link>
            {user ?
                <div className="navbar__nav">
                    <button onClick={menuBtnHandler} className="navbar__menuBtn navbar__navItem">
                        <div className="navbar__avatar">
                            <img
                                width="40"
                                height="40"
                                alt="avatar"
                                src={user.avatar?.url || 'https://picsum.photos/200/300'}
                            />
                        </div>
                        {isMenu && <div className="dropMenu">
                            <ul className="dropMenu__list">
                                <li className="dropMenu__listItem">
                                    <Link to={user.space?.isActive ? '/space' : '/create'}>
                                        Public page
                                    </Link>
                                </li>
                                <li className="dropMenu__listItem">
                                    <Link to='/'>Profile settings</Link>
                                </li>
                                <li className="dropMenu__listItem">
                                    <Link to='/'>My subscriptions</Link>
                                </li>
                                <li
                                    onClick={logoutHandler}
                                    className="dropMenu__listItem dropMenu__listItem_border">
                                    Logout
                                </li>
                            </ul>
                        </div>}
                    </button>

                </div> :
                <div className="navbar__nav">
                    <Link to="/register" className="btn navbar__navItem">Register</Link>
                    <Link to="/login" className="btn btn_secondary navbar__navItem">Login</Link>
                </div>
            }
        </header>
    )
}