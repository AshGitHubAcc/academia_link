
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"

import Home from "./pages/Home"
import Login from './pages/Login'
import DockUpdate from './pages/UpdateDock'
import Dock from './pages/Dock'
import './css/custom.css'


function App() {
  return (
    <div className="h-max-window">


      <Router>
        <Routes>
          
          <Route path='/login' element={<Login/>}/>

          <Route path='/home' element={<Home/>}/>
          <Route path='/updateDock/:id' element={<DockUpdate/>} />
          <Route path='dock/:id' element={<Dock/>} />





        </Routes>
      </Router>

    </div>
  )}
export default App
