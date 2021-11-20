import { Link } from 'react-router-dom'
import classes from '../static/scss/settings.module.scss'
import { ProfileGeneral } from '../components/ProfileGeneral'
import { Subscriptions } from '../components/Subscriptions'
import { BackButton } from '../components/BackButton'


export const ProfilePage = ({ section }) => {
    return (
        <>
            <div className="content">
                <div className="content__head">
                    <div>
                        <BackButton />
                        <h1>Profile Settings</h1>
                    </div>
                </div>
                <div className="content__body">
                    <div className="content__grid">
                        <div>
                            <nav className={classes.nav}>
                                <Link
                                    to="/profile/general"
                                    className={`${classes.nav__item} 
                                ${section === 'general' ? classes.nav__item_active : ''}`}>
                                    General
                                </Link>
                                <Link
                                    to="/profile/security"
                                    className={`${classes.nav__item} 
                                ${section === 'security' ? classes.nav__item_active : ''}`}>
                                    Security
                                </Link>
                                <Link
                                    to="/profile/subscriptions"
                                    className={`${classes.nav__item} 
                                ${section === 'subscriptions' ? classes.nav__item_active : ''}`}>
                                    Subscriptions
                                </Link>
                                <Link
                                    to="/profile/notifications"
                                    className={`${classes.nav__item} 
                                ${section === 'notifications' ? classes.nav__item_active : ''}`}>
                                    Notifications
                                </Link>
                                <Link
                                    to="/profile/billing"
                                    className={`${classes.nav__item} 
                                ${section === 'billing' ? classes.nav__item_active : ''}`}>
                                    Billing
                                </Link>
                            </nav>
                        </div>

                        {section === 'general' && <ProfileGeneral />}
                        {/* {section === 'security' && <ProfileSecurity />} */}
                        {section === 'subscriptions' && <Subscriptions />}

                    </div>
                </div>
            </div>
        </>
    )
}