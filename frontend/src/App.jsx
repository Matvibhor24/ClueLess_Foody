import {BrowserRouter, Route , Routes , Navigate} from "react-router-dom"
import {useAuthContext} from "./hooks/useAuthContext"
import {Home} from "./pages/Home"
import {Login} from "./pages/Login"

function App() {
  const {user} = useAuthContext();
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element = {user ? <Home/> : <Navigate to = '/login'/>}/>
        <Route path="/login" element = { !user ? <Login/> : <Navigate to = '/'/>}/>
      </Routes>
    </BrowserRouter>
  )
}

export default App
