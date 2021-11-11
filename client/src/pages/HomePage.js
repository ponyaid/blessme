import React, { useEffect } from 'react'
// import 'moment/locale/ru'
import Moment from 'react-moment'
import { Link } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { Post } from '../components/Post'
import { Navbar } from '../components/Navbar'
import classes from '../static/scss/home.module.scss'
import { getSubscribers } from '../redux/actions/subscription.actions'


export const HomePage = () => {
    const dispatch = useDispatch()
    const { user } = useSelector(state => state.auth)
    const { subscribers } = useSelector(state => state.subscription)

    useEffect(() => {
        if (user && user.space) {
            dispatch(getSubscribers(user.space._id))
        }
    }, [dispatch, user])

    return (
        <>
            <Navbar />
            <div className="content">
                <div className="content__head">
                    <h1>Hello, {user.name}</h1>
                    <div className="content__head-nav">
                        <Link to="/profile" className="btn btn_secondary">Manage</Link>
                    </div>
                </div>
                {user.space && <section className={classes.main}>
                    <div className={classes.main__head}>
                        <h2>Your Public Page</h2>
                        <div className={classes.main__nav}>
                            <Link to={`/${user.space.alias}`} className="btn btn_border">Visit</Link>
                            <Link to={`/settings`} className="btn btn_border">Settings</Link>
                        </div>
                    </div>
                    <p className={classes.main__desc}>
                        Manage the Teams that you're a part of, join suggested ones, or create a new one.
                    </p>
                    <div className={classes.space}>
                        <div className={classes.space__grid}>
                            <Link
                                to={`/${user.space.alias}`}
                                className={classes.space__cover}>
                                <img
                                    alt="space"
                                    width="404"
                                    height="192"
                                    src={user.space.cover || 'https://picsum.photos/404/192'}
                                />
                            </Link>
                            <div className={classes.space__info}>
                                <div>
                                    <div className={classes.space__infoRow}>
                                        <div>
                                            <dt className={classes.space__infoTitle}>
                                                Title
                                            </dt>
                                            <dd className={classes.space__infoDesc}>
                                                {user.space.title}
                                            </dd>
                                        </div>
                                        <div>
                                            <dt className={classes.space__infoTitle}>
                                                Status
                                            </dt>
                                            <dd className={`${classes.space__infoDesc}`}>
                                                Complete
                                            </dd>
                                        </div>
                                    </div>
                                    <div className={classes.space__infoRow}>
                                        <div>
                                            <dt className={classes.space__infoTitle}>
                                                Activity
                                            </dt>
                                            <dd className={classes.space__infoDesc}>
                                                <span>{subscribers.length} followers</span>
                                            </dd>
                                        </div>
                                        <div>
                                            <dt className={classes.space__infoTitle}>
                                                Profit
                                            </dt>
                                            <dd className={classes.space__infoDesc}>
                                                <span>€320 per month</span>
                                            </dd>
                                        </div>
                                    </div>
                                    <div className={classes.space__infoRow}>
                                        <div>
                                            <dt className={classes.space__infoTitle}>
                                                Created
                                            </dt>
                                            <dd className={classes.space__infoDesc}>
                                                <Moment
                                                    ago
                                                    fromNow
                                                    locale="ru">
                                                    {user.space.createdAt}
                                                </Moment>
                                            </dd>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>}
                <div className="content__body">
                    <div className="content__grid">
                        <div></div>
                        <div>
                            <div className="dropdownGroup">
                                <div className="dropdown">
                                    <p className="dropdown__title">Все уровни</p>
                                </div>
                                <div className="dropdown">
                                    <p className="dropdown__title">Все уровни</p>
                                </div>
                                <div className="dropdown">
                                    <p className="dropdown__title">Все уровни</p>
                                </div>
                            </div>
                            <Post />
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}