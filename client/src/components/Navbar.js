import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { FaRegEnvelopeOpen } from 'react-icons/fa'
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
                    <div className="navbar__notif navbar__navItem">
                        <span>2</span>
                        <FaRegEnvelopeOpen />
                    </div>
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
                            <div className="dropMenu__list">
                                <Link
                                    to={user.space?.alias ? `/${user.space.alias}` : '/create'}
                                    className="dropMenu__listItem">
                                    Public page
                                </Link>
                                <Link to='/' className="dropMenu__listItem">
                                    Profile settings
                                </Link>
                                <Link to='/' className="dropMenu__listItem">
                                    My subscriptions
                                </Link>
                                <div
                                    onClick={logoutHandler}
                                    className="dropMenu__listItem dropMenu__listItem_border">
                                    Logout
                                </div>
                            </div>
                        </div>}
                    </button>
                </div>
                :
                <div className="navbar__nav">
                    <Link to="/login" className="btn navbar__navItem">Login</Link>
                    <Link to="/register" className="btn btn_secondary navbar__navItem">Join</Link>
                </div>
            }
        </header>
    )
}