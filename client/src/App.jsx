import { Navbar } from "./components"
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Home, Profile, SignIn, SignUp } from "./pages";

function App() {

  return (
    <>
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/signin" element={<SignIn />} />
          <Route path="/profile" element={<Profile />} />

        </Routes>
      </Router>

    </>
  )
}

export default App
