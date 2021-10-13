import classes from '../static/scss/post.module.scss'


export const Post = () => {
    return (
        <div className={classes.post}>
            <div className={classes.post__head}>
                <p className={classes.post__authorName}>Андрей Замай</p>
            </div>
            <div className={classes.post__body}>
                <div className={classes.post__meta}>
                    <div className={classes.post__status}>
                        <span className={classes.post__statusTitle}>
                            Only for partners
                        </span>
                    </div>
                    <p className={classes.post__createdAt}>
                        20 Oct, 06:32 PM
                    </p>
                </div>
                <div className={classes.post__titleWrap}>
                    <h3 className={classes.post__title}>
                        Пост о том, что ты можешь стать автором и о возможностях!
                    </h3>
                </div>
                <div className={classes.post__content}>
                    <div>
                        <img alt="pic" src="https://picsum.photos/400/200" />
                        <p>
                            Привет! Меня зовут Андрей Замай, я придумал такую мультизабаву как "Антихайп"
                            (товарных знак зарегистрирован) и я продолжаю свой путь в освоении новых форм донесения идей
                        </p>
                    </div>
                </div>
                <div className={classes.post__footer}>
                    <button className={classes.post__readMoreBtn}>
                        Read more
                    </button>
                </div>
            </div>
        </div>
    )
}