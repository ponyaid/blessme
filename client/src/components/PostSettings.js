import { Editor } from '../components/Editor'
import classes from '../static/scss/settings.module.scss'

const disabledStyles = {
    opacity: '0.4',
    userSelect: 'none',
    cursor: 'not-allowed',
    pointerEvents: 'none'
}

export const PostSettings = ({
    form,
    post,
    loading,
    saveHandler,
    changeHandler,
    uploadHandler,
    setEditorContent }) => {
    return (
        <div>

            <div className={classes.component}>
                <form className={classes.form}>
                    <div className={classes.form__inputs}>
                        <h3 className={classes.form__inputsTitle}>
                            Who will see the post?
                        </h3>
                        <p className={classes.form__inputsDesc}>
                            Your audience to support your ministry.
                        </p>
                        <label className={classes.form__label}>
                            <span>Levels</span>
                            <input
                                id="level"
                                type="text"
                                name="level"
                                maxLength="32"
                                value={form.level}
                                onChange={changeHandler}
                                placeholder="Displayed title"
                                className={`form__input ${classes.form__input}`}
                            />
                        </label>
                        <div className={classes.form__label}>
                            <span>Comments</span>
                            <label className={classes.toggle}>
                                <input
                                    type="checkbox"
                                    name="onlyAdult"
                                    // checked={form.onlyAdult}
                                    // onChange={toggleHandler}
                                    disabled={loading} />
                                <span />
                                Disable comments
                            </label>
                        </div>
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
                                disabled={post ? form.title === post.title : !form.title}>
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
                            Main text
                        </h3>
                        <p className={classes.form__inputsDesc}>
                            Levels are the options available to your audience to support your ministry.
                        </p>
                        <label className={classes.form__label}>
                            <span>Title</span>
                            <input
                                id="title"
                                type="text"
                                name="title"
                                maxLength="32"
                                value={form.title}
                                onChange={changeHandler}
                                placeholder="Displayed title"
                                className={`form__input ${classes.form__input}`}
                            />
                        </label>
                        <label className={classes.form__label}>
                            <span>Cover</span>
                            <input
                                id="cover"
                                type="file"
                                name="cover"
                                value={form.cover}
                            // onChange={changeHandler}
                            // className={`form__input ${classes.form__input}`}
                            />
                        </label>
                        <label className={classes.form__label}>
                            <span>Body</span>
                            <Editor
                                content={post?.body || ''}
                                setConvertedContent={setEditorContent}
                            />
                        </label>
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
                                disabled={post ? form.title === post.title : !form.title}>
                                Save
                            </button>
                        </div>
                    </div>
                </form>
            </div>

            <div className={classes.component} >
                <form className={classes.form}>
                    <div className={classes.form__inputs}>
                        <h3 className={classes.form__inputsTitle}>
                            Confirm creation
                        </h3>
                        <p className={classes.form__inputsDesc}>
                            Please enter your page title, or a display name you are comfortable with..
                        </p>
                    </div>
                    <div className={classes.form__footer}>
                        <div className={classes.form__footerDetails}>
                        </div>
                        <div className={classes.form__btnGroup}>
                            <button
                                name="title"
                                // onClick={createHandler}
                                className="btn btn_primary"
                                disabled={false}>
                                Create post
                            </button>
                        </div>
                    </div>
                </form>
            </div>

        </div>
    )
}