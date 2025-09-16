import {BrowserRouter, Route , Routes , Navigate} from "react-router-dom"
import { GoogleOAuthProvider } from "@react-oauth/google"
import {useAuthContext} from "./hooks/useAuthContext"
import {Home} from "./pages/Home"
import {Login} from "./pages/Login"

function App() {
  const {user} = useAuthContext();
  console.log("")
  return (
     <GoogleOAuthProvider clientId={import.meta.env.VITE_GOOGLE_CLIENT_ID}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={user ? <Home /> : <Navigate to="/login" />} />
          <Route path="/login" element={!user ? <Login /> : <Navigate to="/" />} />
        </Routes>
      </BrowserRouter>
    </GoogleOAuthProvider>
  )
}

export default App
