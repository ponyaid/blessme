import { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import classes from '../static/scss/settings.module.scss'
import { updateUser, uploadAvatar } from '../redux/actions/auth.actions'
import avatarSvg from '../static/img/avatar.svg'


const initialState = {
    name: '',
    email: '',
    imageUrl: '',
}

export const ProfileGeneral = () => {
    const dispatch = useDispatch()
    const [form, setForm] = useState(initialState)
    const { user } = useSelector(state => state.auth)
    const { loading } = useSelector(state => state.app)

    useEffect(() => {
        setForm(user)
    }, [user])


    const changeHandler = e => {
        setForm({ ...form, [e.target.name]: e.target.value })
    }

    const saveHandler = e => {
        e.preventDefault()
        dispatch(updateUser(form))
    }

    const uploadHandler = async ({ target }) => {
        const formData = new FormData()
        formData.append('file', target.files[0])
        dispatch(uploadAvatar(formData))
        target.value = ''
    }


    return (
        <div>
            <div className={classes.component}>
                <form className={classes.form}>
                    <div className={classes.form__inputs}>
                        <h3 className={classes.form__inputsTitle}>
                            Name
                        </h3>
                        <p className={classes.form__inputsDesc}>
                            The name will be shown on your home page.
                        </p>
                        <input
                            id="name"
                            type="text"
                            name="name"
                            maxLength="32"
                            value={form.name}
                            placeholder="Name here"
                            onChange={changeHandler}
                            className={`form__input ${classes.form__input}`}
                        />
                    </div>
                    <div className={classes.form__footer}>
                        <div className={classes.form__footerDetails}>
                            <p>Please use 32 characters at maximum.</p>
                        </div>
                        <div className={classes.form__btnGroup}>
                            <button
                                name="name"
                                onClick={saveHandler}
                                className="btn btn_secondary"
                                disabled={form.name === user.name}>
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
                            Email
                        </h3>
                        <p className={classes.form__inputsDesc}>
                            Used to receive notification and to sign in to your account.
                        </p>
                        <input
                            id="email"
                            type="text"
                            name="email"
                            maxLength="254"
                            value={form.email}
                            placeholder="Email here"
                            onChange={changeHandler}
                            className={`form__input ${classes.form__input}`}
                        />
                    </div>
                    <div className={classes.form__footer}>
                        <div className={classes.form__footerDetails}>
                            <p>Please use 254 characters at maximum.</p>
                        </div>
                        <div className={classes.form__btnGroup}>
                            <button
                                name="email"
                                onClick={saveHandler}
                                className="btn btn_secondary"
                                disabled={form.email === user.email}>
                                Save
                            </button>
                        </div>
                    </div>
                </form>
            </div>
            <div className={classes.component}>
                <form className={classes.form}>
                    <div className={classes.form__inputsWrap}>
                        <div className={classes.form__inputs}>
                            <h3 className={classes.form__inputsTitle}>
                                Your Avatar
                            </h3>
                            <p className={classes.form__inputsDesc}>
                                This is your avatar.<br />
                                Click on the avatar to upload a custom one from your files.
                            </p>
                        </div>
                        <div className={classes.form__uploadImageWrap}>
                            <div className={classes.form__uploadImage}>
                                <img alt="avatar" src={form.imageUrl || avatarSvg} />
                                <label
                                    htmlFor="avatar"
                                    className={classes.form__uploadImageLabel} />
                                <input
                                    id="avatar"
                                    type="file"
                                    accept="image/*"
                                    disabled={loading}
                                    onChange={uploadHandler}
                                    className={classes.form__uploadImageInput} />
                            </div>
                        </div>
                    </div>
                    <div className={classes.form__footer}>
                        <div className={classes.form__footerDetails}>
                            <p>An avatar is optional but strongly recommended.</p>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    )
}