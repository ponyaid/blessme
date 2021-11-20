import { Editor } from '../components/Editor'
import classes from '../static/scss/settings.module.scss'

const disabledStyles = {
    opacity: '0.4',
    userSelect: 'none',
    cursor: 'not-allowed',
    pointerEvents: 'none'
}

export const LevelSettings = ({
    form,
    level,
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
                            Level name
                        </h3>
                        <p className={classes.form__inputsDesc}>
                            Levels are the options available to your audience to support your ministry.
                        </p>
                        <input
                            id="name"
                            type="text"
                            name="name"
                            maxLength="32"
                            value={form.name}
                            onChange={changeHandler}
                            placeholder="Displayed name"
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
                                disabled={level ? form.name === level.name : !form.name}>
                                Save
                            </button>
                        </div>
                    </div>
                </form>
            </div>
            <div
                className={classes.component}
                style={!level ? disabledStyles : {}}>
                <form className={classes.form}>
                    <div className={classes.form__inputs}>
                        <h3 className={classes.form__inputsTitle}>
                            Level cost
                        </h3>
                        <p className={classes.form__inputsDesc}>
                            To get a fair cost, consider how much time and effort you will spend.
                        </p>
                        <div className={`form__inputGroup ${classes.form__inputGroup}`}>
                            <span className={`form__inputGroupText ${classes.form__inputGroupText}`}>
                                €
                            </span>
                            <input
                                id="price"
                                name="price"
                                type="number"
                                placeholder="0"
                                disabled={!level}
                                value={form.price}
                                onChange={level && changeHandler}
                                className={`form__inputGroupInput ${classes.form__inputGroupInput}`}
                            />
                        </div>
                    </div>
                    <div className={classes.form__footer}>
                        <div className={classes.form__footerDetails}>
                            <p>Recommended level cost from €3.</p>
                        </div>
                        <div className={classes.form__btnGroup}>
                            <button
                                name="price"
                                onClick={saveHandler}
                                className="btn btn_secondary"
                                disabled={!level || form.price === level.price}>
                                Save
                            </button>
                        </div>
                    </div>
                </form>
            </div>
            <div
                className={classes.component}
                style={!level ? disabledStyles : {}}>
                <form className={classes.form}>
                    <div className={classes.form__inputsWrap}>
                        <div className={classes.form__inputs}>
                            <h3 className={classes.form__inputsTitle}>
                                Level image
                            </h3>
                            <p className={classes.form__inputsDesc}>
                                The visual component is important for brand development and page design.
                            </p>
                        </div>
                        <div className={classes.form__uploadImageWrap}>
                            <div className={classes.form__uploadImage}>
                                {form.picture && <img alt="avatar" src={form.picture} />}
                                <label
                                    htmlFor="picture"
                                    className={classes.form__uploadImageLabel} />
                                <input
                                    type="file"
                                    id="picture"
                                    accept="image/*"
                                    onChange={uploadHandler}
                                    disabled={!level || loading}
                                    className={classes.form__uploadImageInput} />
                            </div>
                        </div>
                    </div>
                    <div className={classes.form__footer}>
                        <div className={classes.form__footerDetails}>
                            <p>An image is optional but strongly recommended.</p>
                        </div>
                    </div>
                </form>
            </div>
            <div
                className={classes.component}
                style={!level ? disabledStyles : {}}>
                <form className={classes.form}>
                    <div className={classes.form__inputs}>
                        <h3 className={classes.form__inputsTitle}>
                            Level description
                        </h3>
                        <p className={classes.form__inputsDesc}>
                            This text will help future partners decide whether to subscribe to this level.
                            <br />Tell which partners will receive. Simple and fun.
                        </p>
                        <Editor
                            content={level ? level.description : ''}
                            setConvertedContent={setEditorContent}
                            toolbar={{
                                options: ['inline', 'list', 'emoji'],
                                inline: { options: ['bold', 'italic', 'underline'] },
                                list: { options: ['unordered'] },
                            }}
                        />
                    </div>
                    <div className={classes.form__footer}>
                        <div className={classes.form__footerDetails}>
                            <p>Please use 200 characters at maximum.</p>
                        </div>
                        <div className={classes.form__btnGroup}>
                            <button
                                name="about"
                                onClick={saveHandler}
                                className="btn btn_secondary"
                                disabled={!level || form.description === level.description}>
                                Save
                            </button>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    )
}