import React from 'react'
import { Switch, Route, Redirect } from 'react-router-dom'
import { LoginPage } from './pages/LoginPage'
import { RegisterPage } from './pages/RegisterPage'
import { HomePage } from './pages/HomePage'
import { ProfilePage } from './pages/ProfilePage'
import { CreatePostPage } from './pages/CreatePostPage'
import { CreateSpacePage } from './pages/CreateSpacePage'


export const useRoutes = isAuthenticated => {
    if (isAuthenticated) {
        return (
            <Switch>
                <Route path="/home" exact><HomePage /></Route>
                <Route path="/create" exact><CreateSpacePage /></Route>
                <Route path="/create-post" exact><CreatePostPage /></Route>
                {/* <Route path="/:id" exact><ProfilePage /></Route> */}
                <Redirect to="/home" />
            </Switch>
        )
    }
    return (
        <Switch>
            <Route path="/" exact><HomePage /></Route>
            <Route path="/login" exact><LoginPage /></Route>
            <Route path="/register" exact><RegisterPage /></Route>
            <Redirect to="/" />
        </Switch>
    )
}