import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { createSpace } from '../redux/actions'


export const CreateSpaceForm = ({ backHandler }) => {
    const dispatch = useDispatch()
    const { loading } = useSelector(state => state.app)
    const [form, setForm] = useState({
        title: '',
        alias: '',
        direction: '',
        onlyAdult: false
    })

    const changeHandler = e => {
        setForm({ ...form, [e.target.name]: e.target.value })
    }

    const createHandler = async (e) => {
        e.preventDefault()
        dispatch(createSpace({ ...form }))
    }

    return (
        <section className="component">
            <h3 className="component__title">Become a creator</h3>
            <p className="component__desc">
                Almost ready! Complete and publish the page.
            </p>
            <form className="form">
                <div className="form__inputs">
                    <p className="form__inputsTitle">Enter title</p>
                    <input
                        id="title"
                        name="title"
                        type="text"
                        value={form.title}
                        placeholder="Title"
                        onChange={changeHandler}
                        className="form__input"
                    />
                </div>
                <div className="form__inputs">
                    <p className="form__inputsTitle">Enter URL alias</p>
                    <input
                        id="alias"
                        name="alias"
                        type="text"
                        value={form.alias}
                        placeholder="publicname"
                        onChange={changeHandler}
                        className="form__input"
                    />
                </div>
                <div className="form__inputs">
                    <p className="form__inputsTitle">Enter direction</p>
                    <input
                        id="direction"
                        name="direction"
                        type="text"
                        value={form.direction}
                        placeholder="Preacher"
                        onChange={changeHandler}
                        className="form__input"
                    />
                </div>
                {/* <div className="form__inputs">
                    <p className="form__inputsTitle">Adult content</p>
                    <label className="form__checkbox">
                        <input
                            id="onlyAdult"
                            name="onlyAdult"
                            type="checkbox"
                            checked={form.onlyAdult}
                        />
                        <span>There is adult content</span>
                    </label>
                </div> */}
                <button
                    disabled={loading}
                    onClick={createHandler}
                    className="btn btn_primary form__btn">
                    Create a page
                </button>
                <button
                    disabled={loading}
                    onClick={backHandler}
                    className="btn form__btn">
                    Back
                </button>
                <div className="form__details">
                    <p>
                        By creating a page, you agree to our&nbsp;
                        <a href="/">Terms of Service</a>,&nbsp;
                        <a href="/">Privacy Policy</a> and&nbsp;
                        <a href="/">Cookie Policy</a>.
                    </p>
                </div>
            </form>
        </section>
    )
}