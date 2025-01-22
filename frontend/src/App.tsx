// import { BrowserRouter as Router, Routes, Route } from "react-router-dom"

// import Login from "./pages/login"
// import Register from "./pages/register"
// import NotFound from "./pages/NotFound"
// import Home from "./pages/OldHome"
// import CreateDock from "./pages/CreateDock"
// import Dock from "./pages/Dock"
// import UpdateDock from "./pages/UpdateDock"
// import Testing from "./pages/Testing"




// function App() {

//   return (
//     <div className="h-max-window">

//       <Router>

//         <Routes>

//           <Route path="/*" element={<NotFound/>} />
//           <Route path="/register" element={<Register/>} />
//           <Route path="/login" element={<Login/>} />
          
//           <Route path='/home' element={<Home/>} />
//           <Route path='/home/dock/:id' element={<Dock/>} />
//           <Route path='/home/create-dock' element={<CreateDock/>} />
//           <Route path='/home/update-dock' element={<UpdateDock/>} />

//           <Route path='/testing' element={<Testing/>} />

//         </Routes>

//       </Router>
//     </div>
//   )
// }

// export default App




import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import Home from "./pages/Home"
import Login from './pages/Login'
import './css/custom.css'

function App() {
  return (
    <div className="h-max-window">


      <Router>
        <Routes>
          
          <Route path='/login' element={<Login/>}/>

          <Route path='/home' element={<Home/>}/>



        </Routes>
      </Router>

    </div>
  )}
export default App
