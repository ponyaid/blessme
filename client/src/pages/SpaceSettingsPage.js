import { Link } from 'react-router-dom'
import { Navbar } from '../components/Navbar'
import { GeneralSettings } from '../components/GeneralSettings'
import { SocialSettings } from '../components/SocialSettings'
import classes from '../static/scss/settings.module.scss'
import { LevelsSettings } from '../components/LevelsSettings'


export const SpaceSettingsPage = ({ section }) => {
    return (
        <>
            <Navbar />
            <div className="content">
                <div className="content__head">
                    <h1>Public Page Settings</h1>
                </div>
                <div className="content__body">
                    <div className="content__grid">
                        <div>
                            <nav className={classes.nav}>
                                <Link
                                    to="/settings/general"
                                    className={`${classes.nav__item} 
                                ${section === 'general' ? classes.nav__item_active : ''}`}>
                                    General
                                </Link>
                                <Link
                                    to="/settings/social"
                                    className={`${classes.nav__item} 
                                ${section === 'social' ? classes.nav__item_active : ''}`}>
                                    Social media
                                </Link>
                                <Link
                                    to="/settings/levels"
                                    className={`${classes.nav__item} 
                                ${section === 'levels' ? classes.nav__item_active : ''}`}>
                                    Partnership levels
                                </Link>
                                <Link
                                    to="/settings/notifications"
                                    className={`${classes.nav__item} 
                                ${section === 'notifications' ? classes.nav__item_active : ''}`}>
                                    Notifications
                                </Link>
                                <Link
                                    to="/settings/billing"
                                    className={`${classes.nav__item} 
                                ${section === 'billing' ? classes.nav__item_active : ''}`}>
                                    Billing
                                </Link>
                            </nav>
                        </div>

                        {section === 'general' && <GeneralSettings />}
                        {section === 'social' && <SocialSettings />}
                        {section === 'levels' && <LevelsSettings />}

                    </div>
                </div>
            </div>
        </>
    )
}