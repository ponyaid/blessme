import React from 'react'
import { Switch, Route, Redirect } from 'react-router-dom'
import { LoginPage } from './pages/LoginPage'
import { RegisterPage } from './pages/RegisterPage'
import { HomePage } from './pages/HomePage'
import { SpacePage } from './pages/SpacePage'
import { CreatePostPage } from './pages/CreatePostPage'
import { CreateSpacePage } from './pages/CreateSpacePage'
import { useSelector } from 'react-redux'


export const useRoutes = isAuthenticated => {
    const { user } = useSelector(state => state.auth)

    if (user) {
        return (
            <Switch>
                <Route path="/login" exact> <Redirect to="/home" /></Route>
                <Route path="/register" exact> <Redirect to="/home" /></Route>
                <Route path="/home" exact><HomePage /></Route>
                <Route path="/create" exact>
                    {user.space
                        ? <Redirect to={`/${user.space.alias}`} />
                        : <CreateSpacePage />
                    }
                </Route>
                <Route path="/create-post" exact><CreatePostPage /></Route>
                <Route path="/:alias" exact><SpacePage /></Route>
                <Redirect to="/home" />
            </Switch>
        )
    }
    return (
        <Switch>
            <Route path="/" exact><HomePage /></Route>
            <Route path="/login" exact><LoginPage /></Route>
            <Route path="/register" exact><RegisterPage /></Route>
            <Route path="/:alias"><SpacePage /></Route>
            <Redirect to="/" />
        </Switch>
    )
}