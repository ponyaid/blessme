import { Link } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { FaSearch, FaEllipsisV } from 'react-icons/fa'
import classes from '../static/scss/settings.module.scss'
import { getSubscriptions } from '../redux/actions/subscription.actions'
import avatarSvg from '../static/img/avatar.svg'


const Subscription = ({ subscription }) => {
    return (
        <div className={classes.subscription}>
            <div className={classes.subscription__cover}>
                {subscription.space.cover &&
                    <img src={subscription.space.cover} alt="cover" />
                }
            </div>
            <div className={classes.subscription__head}>
                <Link
                    to={`/${subscription.space.alias}`}
                    className={classes.subscription__avatar}>
                    <img
                        width="48"
                        height="48"
                        alt="avatar"
                        src={subscription.space.avatar || avatarSvg}
                    />
                </Link>
                <div style={{
                    display: 'flex',
                    flexFlow: 'column'
                }}>
                    <Link
                        to={`/${subscription.space.alias}`}
                        className={classes.subscription__title}>
                        {subscription.space.title}
                    </Link>
                    <Link
                        to={`/${subscription.space.alias}`}
                        className={classes.subscription__desc}>
                        @{subscription.space.alias}
                    </Link>
                </div>
            </div>
            <div className={classes.subscription__body}>
                <button className={`btn btn_border ${classes.subscription__btn}`}>
                    {subscription.level ? `${subscription.level.price} per month` : 'Free'}
                </button>
            </div>
        </div>
    )
}


export const Subscriptions = () => {
    const dispatch = useDispatch()
    const [form, setForm] = useState({ search: '' })
    const { loading } = useSelector(state => state.app)
    const { subscriptions } = useSelector(state => state.subscription)

    useEffect(() => {
        dispatch(getSubscriptions())
    }, [dispatch])

    const changeHandler = e => {
        setForm({ ...form, [e.target.name]: e.target.value })
    }

    return (
        <div>
            <section className={classes.subscriptions}>
                <header className={classes.subscriptions__head}>
                    <h2>Subscriptions</h2>
                </header>
                <p className={classes.subscriptions__desc}>
                    Manage the Teams that you're a part of, join suggested ones, or create a new one.
                </p>
                <div className={classes.subscriptions__search}>
                    <span className={classes.subscriptions__searchIcon}>
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
                        className={`form__input ${classes.subscriptions__searchInput}`}
                    />
                </div>
                <div style={{
                    gap: '12px',
                    width: '100%',
                    display: 'grid',
                    gridTemplateColumns: '1fr 1fr 1fr'
                }}>
                    {subscriptions.map(subscription =>
                        <Subscription
                            key={subscription._id}
                            dispatch={dispatch}
                            subscription={subscription}
                        />
                    )}
                </div>
            </section>
        </div>
    )
}