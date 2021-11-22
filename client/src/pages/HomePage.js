import React, { useEffect } from 'react'
import 'moment/locale/ru'
import Moment from 'react-moment'
import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { useSelector, useDispatch } from 'react-redux'
import { Post } from '../components/Post'
import classes from '../static/scss/home.module.scss'
import { getPosts } from '../redux/actions/post.actions'
import {
    getSubscribers,
    getSubscriptions
} from '../redux/actions/subscription.actions'


export const HomePage = () => {
    const dispatch = useDispatch()
    const { t, i18n } = useTranslation()
    const { user } = useSelector(state => state.auth)
    const { posts } = useSelector(state => state.post)
    const { subscribers, subscriptions } = useSelector(state => state.subscription)

    useEffect(() => {
        dispatch(getSubscriptions())

        if (user && user.space) {
            dispatch(getSubscribers(user.space._id))
        }
    }, [dispatch, user])

    useEffect(() => {
        if (subscriptions?.length) {
            dispatch(getPosts({ spaces: subscriptions.map(sub => sub.space._id) }))
        }
    }, [dispatch, subscriptions])

    return (
        <>
            <div className="content">
                <div className="content__head">
                    <h1>
                        {t('home.title')}&#44;&nbsp;
                        {user.name}&nbsp;&#128075;
                    </h1>
                    <div className="content__head-nav">
                        <Link to="/profile" className="btn btn_secondary">
                            {t('home.manage')}
                        </Link>
                    </div>
                </div>
                {user.space ?
                    <section className={classes.main}>
                        <div className={classes.main__head}>
                            <h2>{t('home.space.title')}</h2>
                            <div className={classes.main__nav}>
                                <Link
                                    to={`/${user.space.alias}`}
                                    className="btn btn_border">
                                    {t('home.space.visit')}
                                </Link>
                                <Link
                                    to={`/settings`}
                                    className="btn btn_border">
                                    {t('home.space.settings')}
                                </Link>
                            </div>
                        </div>
                        <p className={classes.main__desc}>
                            {t('home.space.desc')}
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
                                                    {t('home.info.title')}
                                                </dt>
                                                <dd className={classes.space__infoDesc}>
                                                    {user.space.title}
                                                </dd>
                                            </div>
                                            <div>
                                                <dt className={classes.space__infoTitle}>
                                                    {t('home.info.status')}
                                                </dt>
                                                <dd className={`${classes.space__infoDesc}`}>
                                                    Complete
                                                </dd>
                                            </div>
                                        </div>
                                        <div className={classes.space__infoRow}>
                                            <div>
                                                <dt className={classes.space__infoTitle}>
                                                    {t('home.info.activity')}
                                                </dt>
                                                <dd className={classes.space__infoDesc}>
                                                    <span>
                                                        {subscribers.length}&nbsp;
                                                        {t('home.info.followers')}
                                                    </span>
                                                </dd>
                                            </div>
                                            <div>
                                                <dt className={classes.space__infoTitle}>
                                                    {t('home.info.profit')}
                                                </dt>
                                                <dd className={classes.space__infoDesc}>
                                                    <span>
                                                        €320&nbsp;
                                                        {t('home.info.per-month')}
                                                    </span>
                                                </dd>
                                            </div>
                                        </div>
                                        <div className={classes.space__infoRow}>
                                            <div>
                                                <dt className={classes.space__infoTitle}>
                                                    {t('home.info.created')}
                                                </dt>
                                                <dd className={classes.space__infoDesc}>
                                                    <Moment
                                                        ago
                                                        fromNow
                                                        locale={i18n.language}>
                                                        {user.space.createdAt}
                                                    </Moment>
                                                </dd>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section> :
                    <section className={classes.main}>
                        <div className={classes.main__head}>
                            <h2>{t('home.space.title')}</h2>
                        </div>
                        <p className={classes.main__desc}>
                            {t('home.space.desc')}
                        </p>
                        <div
                            className={classes.space}
                            style={{
                                border: 'none',
                                padding: '2.5rem 20px',
                                backgroundColor: 'transparent',
                                boxShadow: '0px 8px 24px -6px rgb(59 69 75 / 18%)'
                            }}>
                            <div>
                                <div style={{
                                    display: 'flex',
                                    flexFlow: 'column',
                                    alignItems: 'center'
                                }}>
                                    <h3>{t('home.space.become-title')}</h3>
                                    <p style={{
                                        fontSize: '14px',
                                        lineHeight: '140%',
                                        letterSpacing: '0.5px',
                                        color: '#272b46',
                                        margin: '12px 0'
                                    }}>
                                        {t('home.space.become-desc')}
                                    </p>
                                    <Link
                                        to="/create"
                                        className="btn btn_primary">
                                        {t('home.space.become-btn')}
                                    </Link>
                                </div>
                            </div>
                        </div>

                    </section>
                }
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
                            {posts.map((post =>
                                <Post
                                    post={post}
                                    user={user}
                                    key={post._id}
                                />
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}