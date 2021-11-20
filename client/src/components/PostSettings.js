import React, { useState } from 'react'
import { Editor } from '../components/Editor'
import { Select } from '../components/Select'
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
    levels,
    loading,
    modesHandler,
    toggleHandler,
    saveHandler,
    changeHandler,
    isLevelsSelect,
    setEditorContent }) => {
    const [cover, setCover] = useState(null)

    const uploadHandler = async ({ target }) => {
        if (target.files[0]) {
            setCover(target.files[0])
        }
    }

    const submitHandler = e => {
        e.preventDefault()
        saveHandler(cover)
    }

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
                            <span>Modes</span>
                            <Select
                                name='modes'
                                selectHandler={modesHandler}
                                options={[
                                    { value: 'Open to everyone', text: 'Open to everyone' },
                                    { value: 'Only subscribers', text: 'Only subscribers' },
                                    { value: 'Partners only', text: 'Partners only' }
                                ]}
                            />
                        </label>
                        {isLevelsSelect &&
                            <label className={classes.form__label}>
                                <span>Levels</span>
                                <Select
                                    name='level'
                                    selectHandler={changeHandler}
                                    options={levels.map(level => {
                                        return { value: level._id, text: level.name }
                                    })}
                                />
                            </label>
                        }
                        <div className={classes.form__label}>
                            <span>Comments</span>
                            <label className={classes.toggle}>
                                <input
                                    type="checkbox"
                                    name="onlyAdult"
                                    checked={form.commentsDisabled}
                                    onChange={toggleHandler}
                                    disabled={loading} />
                                <span />
                                Disable comments
                            </label>
                        </div>
                    </div>
                </form>
            </div>

            <div className={classes.component}>
                <form className={classes.form}>
                    <div className={classes.form__inputs}>
                        <h3 className={classes.form__inputsTitle}>
                            Main content
                        </h3>
                        <p className={classes.form__inputsDesc}>
                            Content are the options available to your audience to support your ministry.
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
                            <div className={`${classes.upload}`}>
                                <span className={classes.upload__text}>
                                    Upload file
                                </span>
                                <p className={classes.upload__value}>
                                    {form.cover || cover?.name || 'No file selected'}
                                </p>
                                <input
                                    type="file"
                                    name="cover"
                                    accept="image/*"
                                    disabled={loading}
                                    onChange={uploadHandler}
                                    className={classes.upload__input}
                                />
                            </div>
                        </label>
                        {cover &&
                            <div>
                                <img
                                    alt="cover"
                                    src={URL.createObjectURL(cover)}
                                    style={{ width: '100%' }}
                                />
                            </div>
                        }
                        <label className={classes.form__label}>
                            <span>Body</span>
                            <Editor
                                content={post?.body || ''}
                                setConvertedContent={setEditorContent}
                                toolbar={{
                                    options: ['inline', 'list', 'emoji'],
                                    inline: { options: ['bold', 'italic', 'underline'] },
                                    list: { options: ['unordered'] },
                                }}
                            />
                        </label>
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
                                onClick={submitHandler}
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