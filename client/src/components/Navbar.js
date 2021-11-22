import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { FaRegEnvelopeOpen } from 'react-icons/fa'
import { useTranslation } from 'react-i18next'
import { logout } from '../redux/actions/auth.actions'
import { OutsideClickWrapper } from '../components/OutsideClickWrapper'



export const Navbar = () => {
    const dispatch = useDispatch()
    const { t, i18n } = useTranslation()
    const { user } = useSelector(state => state.auth)
    const [isMenu, setIsMenu] = useState(false)

    const logoutHandler = e => {
        e.preventDefault()
        dispatch(logout())
    }

    const menuBtnHandler = () => {
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
                                referrerPolicy="no-referrer"
                                src={user.imageUrl || 'https://picsum.photos/200/300'}
                            />
                        </div>
                        {isMenu &&
                            <OutsideClickWrapper onOutsideClick={menuBtnHandler}>
                                <DropMenu
                                    user={user}
                                    logoutHandler={logoutHandler}
                                />
                            </OutsideClickWrapper>
                        }
                    </button>
                </div>
                :
                <div className="navbar__nav">
                    <Link to="/login" className="btn navbar__navItem">
                        {t('navbar.login')}
                    </Link>
                    <Link to="/register" className="btn btn_secondary navbar__navItem">
                        {t('navbar.join')}
                    </Link>
                </div>
            }
        </header>
    )
}

const DropMenu = ({ user, logoutHandler }) => {
    const { t, i18n } = useTranslation()

    return (
        <div className="dropMenu">
            <div className="dropMenu__list">
                <Link
                    to='/home'
                    className="dropMenu__listItem">
                    {t('dropmenu.home')}
                </Link>
                {!user.space && <Link
                    to={`/create`}
                    className="dropMenu__listItem">
                    {t('dropmenu.create-page')}
                </Link>}
                {user.space && <Link
                    to={`/${user.space.alias}`}
                    className="dropMenu__listItem">
                    {t('dropmenu.my-page')}
                </Link>}
                {user.space && <Link
                    to={`/settings`}
                    className="dropMenu__listItem">
                    {t('dropmenu.page-settings')}
                </Link>}
                <Link to='/profile' className="dropMenu__listItem  dropMenu__listItem_border">
                    {t('dropmenu.profile')}
                </Link>
                <Link to='/profile/subscriptions' className="dropMenu__listItem">
                    {t('dropmenu.my-subscriptions')}
                </Link>
                <div
                    onClick={logoutHandler}
                    className="dropMenu__listItem dropMenu__listItem_border">
                    {t('dropmenu.logout')}
                </div>
            </div>
        </div>
    )
}