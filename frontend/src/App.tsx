import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom"

import Login from "./pages/login"
import Register from "./pages/register"
import NotFound from "./pages/NotFound"

function Logout() {
  localStorage.clear()
  return <Navigate to="/login" />
}


function App() {

  return (
    <div className="h-max-window">

      <Router>

        <Routes>

          <Route path="/*" element={<NotFound/>} />
          <Route path="/register" element={<Register/>} />
          <Route path="/login" element={<Login/>} />
          {/* <Route path="/logout" element={<Logout/>} /> */}






        </Routes>

      </Router>
    </div>
  )
}

export default App
