import { Navbar } from "./components"
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Home, Profile, SignIn, SignUp } from "./pages";
import axios from "axios";
import { UserContextProvider } from "./context/userContext";

axios.defaults.baseURL = 'http://localhost:8000';
axios.defaults.withCredentials = true;


function App() {

  return (
    <>
      <UserContextProvider>
        <Router>
          <Navbar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="/signin" element={<SignIn />} />
            <Route path="/profile" element={<Profile />} />
          </Routes>
        </Router>
      </UserContextProvider>

    </>
  )
}

export default App
