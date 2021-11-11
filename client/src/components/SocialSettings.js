import { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { FaInstagram, FaFacebook, FaYoutube, FaTelegram } from 'react-icons/fa'
import classes from '../static/scss/settings.module.scss'
import { Loader } from '../components/Loader'
import { getSpace, updateSocial } from '../redux/actions/space.actions'


const initialState = {
    instagram: '',
    facebook: '',
    telegram: '',
    youtube: '',
}

export const SocialSettings = () => {
    const dispatch = useDispatch()
    const [social, setSocial] = useState(initialState)
    const { user } = useSelector(state => state.auth)
    const { space } = useSelector(state => state.space)
    const { loading } = useSelector(state => state.app)

    useEffect(() => {
        if (user) dispatch(getSpace(user.space?.alias))
    }, [user, dispatch])

    useEffect(() => {
        if (space) {
            const { instagram, facebook, telegram, youtube } = space
            setSocial({ instagram, facebook, telegram, youtube })
        }
    }, [space])

    const changeHandler = e => {
        setSocial({ ...social, [e.target.name]: e.target.value })
    }

    const saveHandler = e => {
        e.preventDefault()
        dispatch(updateSocial(user.space.alias,
            { [e.target.name]: social[e.target.name] }
        ))
    }

    if (!space) return <Loader />

    return (
        <div>
            <div className={classes.component}>
                <form className={classes.form}>
                    <div className={classes.form__inputs}>
                        <h3 className={classes.form__inputsTitle}>
                            Instagram
                        </h3>
                        <p className={classes.form__inputsDesc}>
                            This is URL to your instagram page.
                        </p>
                        <div className={`form__inputGroup ${classes.form__inputGroup}`}>
                            <span className={`form__inputGroupText ${classes.form__inputGroupText}`}>
                                <FaInstagram />
                            </span>
                            <input
                                id="instagram"
                                type="text"
                                name="instagram"
                                maxLength="64"
                                disabled={loading}
                                value={social.instagram}
                                onChange={changeHandler}
                                className={`form__inputGroupInput ${classes.form__inputGroupInput}`}
                            />
                        </div>
                    </div>
                    <div className={classes.form__footer}>
                        <div className={classes.form__footerDetails}>
                            <p>Please use 64 characters at maximum.</p>
                        </div>
                        <div className={classes.form__btnGroup}>
                            <button
                                name="instagram"
                                onClick={saveHandler}
                                className="btn btn_secondary"
                                disabled={social.instagram === space.instagram}>
                                Save
                            </button>
                        </div>
                    </div>
                </form>
            </div>
            <div className={classes.component}>
                <form className={classes.form}>
                    <div className={classes.form__inputs}>
                        <h3 className={classes.form__inputsTitle}>
                            Facebook
                        </h3>
                        <p className={classes.form__inputsDesc}>
                            This is URL to your facebook page.
                        </p>
                        <div className={`form__inputGroup ${classes.form__inputGroup}`}>
                            <span className={`form__inputGroupText ${classes.form__inputGroupText}`}>
                                <FaFacebook />
                            </span>
                            <input
                                id="facebook"
                                type="text"
                                name="facebook"
                                maxLength="64"
                                disabled={loading}
                                value={social.facebook}
                                onChange={changeHandler}
                                className={`form__inputGroupInput ${classes.form__inputGroupInput}`}
                            />
                        </div>
                    </div>
                    <div className={classes.form__footer}>
                        <div className={classes.form__footerDetails}>
                            <p>Please use 64 characters at maximum.</p>
                        </div>
                        <div className={classes.form__btnGroup}>
                            <button
                                name="facebook"
                                onClick={saveHandler}
                                className="btn btn_secondary"
                                disabled={social.facebook === space.facebook}>
                                Save
                            </button>
                        </div>
                    </div>
                </form>
            </div>
            <div className={classes.component}>
                <form className={classes.form}>
                    <div className={classes.form__inputs}>
                        <h3 className={classes.form__inputsTitle}>
                            Telegram
                        </h3>
                        <p className={classes.form__inputsDesc}>
                            This is URL to your telegram page.
                        </p>
                        <div className={`form__inputGroup ${classes.form__inputGroup}`}>
                            <span className={`form__inputGroupText ${classes.form__inputGroupText}`}>
                                <FaTelegram />
                            </span>
                            <input
                                id="telegram"
                                type="text"
                                name="telegram"
                                maxLength="64"
                                disabled={loading}
                                value={social.telegram}
                                onChange={changeHandler}
                                className={`form__inputGroupInput ${classes.form__inputGroupInput}`}
                            />
                        </div>
                    </div>
                    <div className={classes.form__footer}>
                        <div className={classes.form__footerDetails}>
                            <p>Please use 64 characters at maximum.</p>
                        </div>
                        <div className={classes.form__btnGroup}>
                            <button
                                name="telegram"
                                onClick={saveHandler}
                                className="btn btn_secondary"
                                disabled={social.telegram === space.telegram}>
                                Save
                            </button>
                        </div>
                    </div>
                </form>
            </div>
            <div className={classes.component}>
                <form className={classes.form}>
                    <div className={classes.form__inputs}>
                        <h3 className={classes.form__inputsTitle}>
                            Youtube
                        </h3>
                        <p className={classes.form__inputsDesc}>
                            This is URL to your youtube page.
                        </p>
                        <div className={`form__inputGroup ${classes.form__inputGroup}`}>
                            <span className={`form__inputGroupText ${classes.form__inputGroupText}`}>
                                <FaYoutube />
                            </span>
                            <input
                                id="youtube"
                                type="text"
                                name="youtube"
                                maxLength="64"
                                disabled={loading}
                                value={social.youtube}
                                onChange={changeHandler}
                                className={`form__inputGroupInput ${classes.form__inputGroupInput}`}
                            />
                        </div>
                    </div>
                    <div className={classes.form__footer}>
                        <div className={classes.form__footerDetails}>
                            <p>Please use 64 characters at maximum.</p>
                        </div>
                        <div className={classes.form__btnGroup}>
                            <button
                                name="youtube"
                                onClick={saveHandler}
                                className="btn btn_secondary"
                                disabled={social.youtube === space.youtube}>
                                Save
                            </button>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    )
}