import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import './App.css'

import Header from './Components/Header'
import Signup from './Components/Signup'
import Login from './Components/Login'

function App() {
  return (
    <>
      <Router>
        <Header />
        <Routes>
          {/* <Route path='/' element={<Home />} />
          <Route path='/:id' element={<Player />} /> */}
          <Route path='/login' element={<Login />} />
          <Route path='/signup' element={<Signup />} />
        </Routes>
      </Router>
    </>
  )
}

export default App
