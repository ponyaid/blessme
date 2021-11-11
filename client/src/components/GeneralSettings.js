import { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import avatarSvg from '../static/img/avatar.svg'
import classes from '../static/scss/settings.module.scss'
import { Loader } from '../components/Loader'
import { Editor } from '../components/Editor'
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

export const GeneralSettings = () => {
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

    if (!space) return <Loader />

    return (
        <div>
            <div className={classes.component}>
                <form className={classes.form}>
                    <div className={classes.form__inputs}>
                        <h3 className={classes.form__inputsTitle}>
                            Your Namespace
                        </h3>
                        <p className={classes.form__inputsDesc}>
                            This is your URL namespace.
                        </p>
                        <div className={`form__inputGroup ${classes.form__inputGroup}`}>
                            <span className={`form__inputGroupText ${classes.form__inputGroupText}`}>
                                blessme.com/
                            </span>
                            <input
                                id="alias"
                                type="text"
                                name="alias"
                                maxLength="32"
                                disabled={loading}
                                value={form.alias}
                                onChange={changeHandler}
                                className={`form__inputGroupInput ${classes.form__inputGroupInput}`}
                            />
                        </div>
                    </div>
                    <div className={classes.form__footer}>
                        <div className={classes.form__footerDetails}>
                            <p>Please use 32 characters at maximum.</p>
                        </div>
                        <div className={classes.form__btnGroup}>
                            <button
                                name="alias"
                                onClick={saveHandler}
                                className="btn btn_secondary"
                                disabled={form.alias === space.alias}>
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
                            Your Title
                        </h3>
                        <p className={classes.form__inputsDesc}>
                            Please enter your page title, or a display name you are comfortable with..
                        </p>
                        <input
                            id="title"
                            type="text"
                            name="title"
                            maxLength="32"
                            value={form.title}
                            placeholder="Title here"
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
                                name="title"
                                onClick={saveHandler}
                                className="btn btn_secondary"
                                disabled={form.title === space.title}>
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
                                <img alt="avatar" src={space.avatar || avatarSvg} />
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
            <div className={classes.component}>
                <form className={classes.form}>
                    <div className={classes.form__inputs}>
                        <h3 className={classes.form__inputsTitle}>
                            About Yourself
                        </h3>
                        <p className={classes.form__inputsDesc}>
                            Please enter your page title, or a display name you are comfortable with..
                        </p>
                        <Editor
                            content={space.about}
                            setConvertedContent={setEditorContent}
                        />
                    </div>
                    <div className={classes.form__footer}>
                        <div className={classes.form__footerDetails}>
                            <p>Please use 1000 characters at maximum.</p>
                        </div>
                        <div className={classes.form__btnGroup}>
                            <button
                                name="about"
                                onClick={saveHandler}
                                className="btn btn_secondary"
                                disabled={form.about === space.about}>
                                Save
                            </button>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    )
}