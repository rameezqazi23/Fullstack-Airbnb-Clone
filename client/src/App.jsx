import { Navbar } from "./components"
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ChakraProvider } from '@chakra-ui/react'
import { Account, Home, SignIn, SignUp } from "./pages";
import axios from "axios";
import { UserContextProvider } from "./context/userContext";
import Test from "./pages/Test";

axios.defaults.baseURL = 'http://localhost:8000';
axios.defaults.withCredentials = true;


function App() {

  return (
    <>
      <ChakraProvider>

        <UserContextProvider>
          <Router>
            <Navbar />
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/signup" element={<SignUp />} />
              <Route path="/signin" element={<SignIn />} />
              <Route path="/account/:subpage?" element={<Account />} />
              <Route path="/account/:subpage/:action" element={<Account />} />
              <Route path="/test" element={<Test />} />
            </Routes>
          </Router>
        </UserContextProvider>
      </ChakraProvider>

    </>
  )
}

export default App
