import { PostSettings } from '../components/PostSettings'
import { } from '../redux/actions/space.actions'
import { BackButton } from '../components/BackButton'


const initialState = {
    body: '',
    title: '',
    cover: '',
    level: '',
    public: true,
    commentsDisabled: false,
}


export const PostSettingsPage = () => {

    return (
        <>
            <div className="content">
                <div className="content__head">
                    <div>
                        <BackButton />
                        <h1>Post Settings</h1>
                    </div>
                </div>
                <div className="content__body">
                    <div className="content__grid">
                        <div>
                        </div>
                        <PostSettings
                        />
                    </div>
                </div>
            </div>
        </>
    )
}