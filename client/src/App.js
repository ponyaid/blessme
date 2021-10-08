import React from 'react'
import { useSelector } from 'react-redux'
import { BrowserRouter as Router } from 'react-router-dom'
import { IconContext } from 'react-icons'
import { useRoutes } from './routes'


function App() {
  const { token } = useSelector(state => state.auth)
  const routes = useRoutes(!!token)

  return (
    <Router>
      <IconContext.Provider value={{ className: "reactIcon" }}>
        <div className="main">
          {routes}
        </div>
      </IconContext.Provider>
    </Router>
  )
}

export default App