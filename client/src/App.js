import React from 'react'
import { useSelector } from 'react-redux'
import { BrowserRouter as Router } from 'react-router-dom'
import { useRoutes } from './routes'


function App() {
  const { token } = useSelector(state => state.auth)
  const routes = useRoutes(!!token)

  return (
    <Router>
      <div className="main">
        {routes}
      </div>
    </Router>
  )
}

export default App