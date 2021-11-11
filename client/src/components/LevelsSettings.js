import { Link } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { FaSearch, FaEllipsisV } from 'react-icons/fa'
import classes from '../static/scss/settings.module.scss'
import { getLevelsByOwner } from '../redux/actions/level.actions'
import { OutsideClickWrapper } from '../components/OutsideClickWrapper'
import { deleteLevel } from '../redux/actions/level.actions'


const Level = ({ level, dispatch }) => {
    const [isDropdown, setIsDropdown] = useState(false)

    const dropdownHandler = () => setIsDropdown(!isDropdown)

    const clickHandler = () => {
        dispatch(deleteLevel(level._id))
    }

    return (
        <div
            className={`${classes.level} ${classes.partnership__level}`}>
            <div className={classes.level__pic}>
                {level.picture && <img src={level.picture} alt="pic" />}
            </div>
            <div>
                <p className={classes.level__title}>{level.name}</p>
                <p className={classes.level__price}>${level.price} per month</p>
            </div>
            <div className={classes.level__tools}>
                <Link
                    to={`/levels/${level._id}`}
                    className='btn btn_border'>
                    Manage
                </Link>
                <button
                    className='icon-btn'
                    onClick={dropdownHandler}>
                    <FaEllipsisV />
                    {isDropdown &&
                        <OutsideClickWrapper
                            onOutsideClick={dropdownHandler}>
                            <div
                                style={{
                                    top: '100%',
                                    left: '100%',
                                    right: 'auto',
                                    border: '1px solid #d5e3ec'
                                }}
                                className="dropMenu">
                                <div className="dropMenu__list">
                                    <div
                                        className="dropMenu__listItem">
                                        Copy Invite URL
                                    </div>
                                    <div
                                        style={{ color: '#ee2c5b' }}
                                        onClick={clickHandler}
                                        className="dropMenu__listItem dropMenu__listItem_border">
                                        Remove level
                                    </div>
                                </div>
                            </div>
                        </OutsideClickWrapper>
                    }
                </button>
            </div>
        </div>
    )
}



export const LevelsSettings = () => {
    const dispatch = useDispatch()
    const [form, setForm] = useState({ search: '' })
    const { loading } = useSelector(state => state.app)
    const { levels } = useSelector(state => state.level)
    const { user } = useSelector(state => state.auth)

    useEffect(() => {
        if (user) dispatch(getLevelsByOwner())
    }, [dispatch, user])

    const changeHandler = e => {
        setForm({ ...form, [e.target.name]: e.target.value })
    }

    return (
        <div>
            <section className={classes.partnership}>
                <header className={classes.partnership__head}>
                    <h2>Levels</h2>
                    <div className={`${classes.partnership__headNav}`}>
                        <Link
                            to="/levels/create"
                            className={`btn btn_primary`}>
                            Create
                        </Link>
                    </div>
                </header>
                <p className={classes.partnership__desc}>
                    Manage the Teams that you're a part of, join suggested ones, or create a new one.
                </p>
                <div className={classes.partnership__search}>
                    <span className={classes.partnership__searchIcon}>
                        <FaSearch />
                    </span>
                    <input
                        id="search"
                        type="text"
                        name="search"
                        maxLength="64"
                        disabled={loading}
                        value={form.search}
                        onChange={changeHandler}
                        placeholder="Search..."
                        className={`form__input ${classes.partnership__searchInput}`}
                    />
                </div>
                <div className={classes.partnership__levels}>
                    {levels.map(level => <Level
                        key={level._id}
                        level={level}
                        dispatch={dispatch}
                    />)}
                </div>
            </section>
        </div>
    )
}