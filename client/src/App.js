import React, { Suspense } from 'react'
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
    <Suspense fallback="loading">
      <Router>
        <IconContext.Provider value={{ className: "reactIcon" }}>
          <div className="main">
            <Navbar />
            {routes}
            <Footer />
          </div>
        </IconContext.Provider>
      </Router >
    </Suspense>
  )
}

export default App