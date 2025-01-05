import { BrowserRouter as Router, Routes, Route } from "react-router-dom"

import Login from "./pages/login"
import Register from "./pages/register"
import NotFound from "./pages/NotFound"
import Home from "./pages/Home"
import CreateDock from "./pages/CreateDock"
import Dock from "./pages/Dock"
// function Logout() {
//   localStorage.clear()
//   return <Navigate to="/login" />
// }


function App() {

  return (
    <div className="h-max-window">

      <Router>

        <Routes>

          <Route path="/*" element={<NotFound/>} />
          <Route path="/register" element={<Register/>} />
          <Route path="/login" element={<Login/>} />
          {/* <Route path="/logout" element={<Logout/>} /> */}
          
          <Route path='/home' element={<Home/>} />
          <Route path='//home/create-dock' element={<CreateDock/>} />
          <Route path='/home/dock/:id' element={<Dock/>} />








        </Routes>

      </Router>
    </div>
  )
}

export default App
