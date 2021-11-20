import avatarSvg from '../static/img/avatar.svg'
import classes from '../static/scss/settings.module.scss'
import { Editor } from '../components/Editor'

const disabledStyles = {
    opacity: '0.4',
    userSelect: 'none',
    cursor: 'not-allowed',
    pointerEvents: 'none'
}

export const GeneralSettings = ({
    form,
    space,
    loading,
    saveHandler,
    changeHandler,
    uploadHandler,
    setEditorContent
}) => {
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
                        <div className={`form__inputGroup`}>
                            <span className={`form__inputGroupText`}>
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
                                className={`form__inputGroupInput`}
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
                                disabled={space ? form.alias === space.alias : !form.alias}>
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
                                disabled={space ? form.title === space.title : !form.title}>
                                Save
                            </button>
                        </div>
                    </div>
                </form>
            </div>
            <div className={classes.component}
                style={!space ? disabledStyles : {}}>
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
                                <img alt="avatar" src={space?.avatar || avatarSvg} />
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
            <div className={classes.component}
                style={!space ? disabledStyles : {}}>
                <form className={classes.form}>
                    <div className={classes.form__inputs}>
                        <h3 className={classes.form__inputsTitle}>
                            About Yourself
                        </h3>
                        <p className={classes.form__inputsDesc}>
                            Please enter your page title, or a display name you are comfortable with..
                        </p>
                        <Editor
                            content={space?.about || ''}
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
                                disabled={space ? form.about === space.about : !form.about}>
                                Save
                            </button>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    )
}