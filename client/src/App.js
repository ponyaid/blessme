import React from 'react'
import { useSelector } from 'react-redux'
import { BrowserRouter as Router } from 'react-router-dom'
import { IconContext } from 'react-icons'
import { useRoutes } from './routes'
import { Navbar } from './components/Navbar'
import { Footer } from './components/Footer'


function App() {
  const { token } = useSelector(state => state.auth)
  const routes = useRoutes(!!token)

  return (
    <Router>
      <IconContext.Provider value={{ className: "reactIcon" }}>
        <Navbar />
        <div className="main">
          {routes}
        </div>
      </IconContext.Provider>
      <Footer />
    </Router>
  )
}

export default App