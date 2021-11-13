import { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'
import { Navbar } from '../components/Navbar'
import { GeneralSettings } from '../components/GeneralSettings'
import { SocialSettings } from '../components/SocialSettings'
import classes from '../static/scss/settings.module.scss'
import { LevelsSettings } from '../components/LevelsSettings'
import {
    getSpace,
    updateGeneral,
    uploadOne
} from '../redux/actions/space.actions'


const initialState = {
    alias: '',
    title: '',
    about: '',
    cover: '',
    avatar: '',
    tagline: '',
}


export const SpaceSettingsPage = ({ section }) => {
    const dispatch = useDispatch()
    const [form, setForm] = useState(initialState)
    const { user } = useSelector(state => state.auth)
    const { space } = useSelector(state => state.space)
    const { loading } = useSelector(state => state.app)

    useEffect(() => {
        if (user) dispatch(getSpace(user.space?.alias))
    }, [user, dispatch])

    useEffect(() => {
        if (space) setForm(space)
    }, [space])

    const changeHandler = e => {
        setForm({ ...form, [e.target.name]: e.target.value })
    }

    const saveHandler = e => {
        e.preventDefault()
        dispatch(updateGeneral(user.space.alias,
            { ...space, [e.target.name]: form[e.target.name] }
        ))
    }

    const setEditorContent = about => {
        setForm({ ...form, about })
    }

    const uploadHandler = async ({ target }) => {
        const formData = new FormData()
        formData.append('file', target.files[0])
        dispatch(uploadOne(user.space.alias, formData, 'avatar'))
        target.value = ''
    }

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

                        {section === 'general' && <GeneralSettings
                            form={form}
                            space={space}
                            loading={loading}
                            saveHandler={saveHandler}
                            uploadHandler={uploadHandler}
                            changeHandler={changeHandler}
                            setEditorContent={setEditorContent}
                        />}
                        {section === 'social' && <SocialSettings />}
                        {section === 'levels' && <LevelsSettings />}
                    </div>
                </div>
            </div>
        </>
    )
}