import React from 'react'
import { Switch, Route, Redirect } from 'react-router-dom'
import { LoginPage } from './pages/LoginPage'
import { RegisterPage } from './pages/RegisterPage'
import { HomePage } from './pages/HomePage'
import { SpacePage } from './pages/SpacePage'
import { PostCreatePage } from './pages/PostCreatePage'
import { SpaceCreatePage } from './pages/SpaceCreatePage'
import { SpaceSettingsPage } from './pages/SpaceSettingsPage'
import { LevelCreatePage } from './pages/LevelCreatePage'
import { LevelPage } from './pages/LevelPage'
import { LandingPage } from './pages/LandingPage'
import { ProfilePage } from './pages/ProfilePage'


export const useRoutes = isAuthenticated => {

    if (isAuthenticated) {
        return (
            <Switch>
                <Route path="/login" exact> <Redirect to="/home" /></Route>
                <Route path="/register" exact> <Redirect to="/home" /></Route>

                <Route path="/home" exact><HomePage /></Route>
                <Route path="/create" exact><SpaceCreatePage /></Route>

                <Route path="/posts/create" exact><PostCreatePage /></Route>

                <Route path="/levels/create" exact><LevelCreatePage /></Route>
                <Route path="/levels/:id" exact><LevelPage /></Route>

                <Route path="/settings" exact>
                    <Redirect to="/settings/general" />
                </Route>
                <Route path="/settings/general" exact>
                    <SpaceSettingsPage section="general" />
                </Route>
                <Route path="/settings/social" exact>
                    <SpaceSettingsPage section="social" />
                </Route>
                <Route path="/settings/notifications" exact>
                    <SpaceSettingsPage section="notifications" />
                </Route>
                <Route path="/settings/billing" exact>
                    <SpaceSettingsPage section="billing" />
                </Route>
                <Route path="/settings/levels" exact>
                    <SpaceSettingsPage section="levels" />
                </Route>

                <Route path="/profile" exact>
                    <Redirect to="/profile/general" />
                </Route>
                <Route path="/profile/general" exact>
                    <ProfilePage section="general" />
                </Route>
                <Route path="/profile/security" exact>
                    <ProfilePage section="security" />
                </Route>
                <Route path="/profile/subscriptions" exact>
                    <ProfilePage section="subscriptions" />
                </Route>
                <Route path="/profile/notifications" exact>
                    <ProfilePage section="notifications" />
                </Route>
                <Route path="/profile/billing" exact>
                    <ProfilePage section="billing" />
                </Route>

                <Route path="/:alias" exact><SpacePage /></Route>
                <Redirect to="/home" />
            </Switch>
        )
    }
    return (
        <Switch>
            <Route path="/" exact><LandingPage /></Route>
            <Route path="/login" exact><LoginPage /></Route>
            <Route path="/register" exact><RegisterPage /></Route>
            <Route path="/:alias"><SpacePage /></Route>
            <Redirect to="/" />
        </Switch>
    )
}