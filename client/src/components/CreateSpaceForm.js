import React from 'react'
import classes from '../static/scss/settings.module.scss'


const disabledStyles = {
    opacity: '0.4',
    userSelect: 'none',
    cursor: 'not-allowed',
    pointerEvents: 'none'
}

export const CreateSpaceForm = ({
    form,
    step,
    loading,
    nextHandler,
    backHandler,
    changeHandler,
    toggleHandler,
    createHandler
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
                        <div className={`form__inputGroup ${classes.form__inputGroup}`}>
                            <span className={`form__inputGroupText ${classes.form__inputGroupText}`}>
                                blessme.com/
                            </span>
                            <input
                                id="alias"
                                type="text"
                                name="alias"
                                maxLength="32"
                                value={form.alias}
                                onChange={changeHandler}
                                disabled={loading || step !== 1}
                                className={`form__inputGroupInput ${classes.form__inputGroupInput}`}
                            />
                        </div>
                    </div>
                    {step <= 1 && <div className={classes.form__footer}>
                        <div className={classes.form__footerDetails}>
                            <p>Please use 32 characters at maximum.</p>
                        </div>
                        <div className={classes.form__btnGroup}>
                            <button
                                name="alias"
                                onClick={nextHandler}
                                className="btn btn_secondary"
                                disabled={form.alias.length < 4}>
                                Next
                            </button>
                        </div>
                    </div>}
                </form>
            </div>

            <div className={classes.component}
                style={step < 2 ? disabledStyles : {}}>
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
                            disabled={loading || step !== 2}
                            className={`form__input ${classes.form__input}`}
                        />
                    </div>
                    {step <= 2 && <div className={classes.form__footer}>
                        <div className={classes.form__footerDetails}>
                            <p>Please use 32 characters at maximum.</p>
                        </div>
                        <div className={classes.form__btnGroup}>
                            <button
                                onClick={backHandler}
                                className="btn btn_border"
                                disabled={step < 2}>
                                Back
                            </button>
                            <button
                                name="title"
                                onClick={nextHandler}
                                className="btn btn_secondary"
                                disabled={!form.title.length}>
                                Next
                            </button>
                        </div>
                    </div>}
                </form>
            </div>

            <div className={classes.component}
                style={step < 3 ? disabledStyles : {}}>
                <form className={classes.form}>
                    <div className={classes.form__inputs}>
                        <h3 className={classes.form__inputsTitle}>
                            Adult content
                        </h3>
                        <label className={classes.toggle}>
                            <input
                                type="checkbox"
                                name="onlyAdult"
                                checked={form.onlyAdult}
                                onChange={toggleHandler}
                                disabled={loading || step !== 3} />
                            <span />
                            My blog contains "adult content"
                        </label>
                    </div>
                    {step <= 3 && <div className={classes.form__footer}>
                        <div className={classes.form__footerDetails}>
                        </div>
                        <div className={classes.form__btnGroup}>
                            <button
                                onClick={backHandler}
                                className="btn btn_border"
                                disabled={step < 3}>
                                Back
                            </button>
                            <button
                                name="title"
                                onClick={nextHandler}
                                className="btn btn_secondary"
                                disabled={step < 3}>
                                Next
                            </button>
                        </div>
                    </div>}
                </form>
            </div>

            <div className={classes.component}
                style={step < 4 ? disabledStyles : {}}>
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
                                onClick={backHandler}
                                className="btn btn_border"
                                disabled={step < 4}>
                                Back
                            </button>
                            <button
                                name="title"
                                onClick={createHandler}
                                className="btn btn_primary"
                                disabled={step < 4}>
                                Create public page
                            </button>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    )
}