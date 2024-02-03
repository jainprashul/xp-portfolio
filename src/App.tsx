
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './App.css'
import routes from './views/routes'


function App() {

  return (
    <BrowserRouter>
      <Routes>
      {
        routes.map((route, index) => {
          return (
            <Route
              key={index}
              path={route.path}
              element={route.component}
            />
          )
        })
      }
      </Routes>
    </BrowserRouter>
  )

}

export default App

