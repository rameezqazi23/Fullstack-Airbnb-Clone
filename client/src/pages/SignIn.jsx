import { useState } from "react";
import { Link, useNavigate } from "react-router-dom"
import axios from "axios";

const SignIn = () => {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const navigate = useNavigate();

  const handleSignIn = async (e) => {
    e.preventDefault();

    try {
      await axios.post('/signin', { email, password });
      alert("Sign in Success")
      navigate('/')

    } catch (error) {
      console.log("Login Error==>", error)
      setError("Incorrect email or password")

    }

    // .then(function (response) {
    //   console.log(response)

    //   if (response.statusText === "OK") {
    //     console.log("User Sign In success==>", { email, password })
    //     navigate('/')

    //   } else {
    //     console.log("Login Error==>")
    //     setError("This email is already registered")
    //   }
    // })


  }


  return (
    <div className="w-full h-full">
      <div className="fixed w-full px-4 py-16 z-10">
        <div className="max-w-[500px] h-[600px] mx-auto overflow-visible ">
          <div className="max-w-[380px] mx-auto py-12 px-7 rounded-md border border-gray-300 ">

            {error &&
              (
                <div className="text-[14px] text-red-600 text-center mb-8">
                  <p>{error}</p>
                </div>
              )
            }

            <h1 className="text-2xl font-bold text-gray-700">Login</h1>

            <form onSubmit={handleSignIn} className="w-full flex flex-col py-4">

              <input onChange={(e) => setEmail(e.target.value)} value={email} type="email" autoComplete="on" placeholder="email"
                className='p-2 my-2 border border-gray-400 outline-none rounded text-gray-700' required />

              <input onChange={(e) => setPassword(e.target.value)} value={password} type="password" placeholder="password"
                className='p-2 my-2 border border-gray-400 outline-none rounded text-gray-700' required />

              <button type="submit" className="bg-primary text-white font-medium text-[18px] p-2 rounded">Sign in</button>

              <div className="flex gap-2 mt-4">
                <p className="text-[16px] text-gray-600">Create new account</p>
                <Link to='/signup' className="text-[16px] underline font-semibold">Signup</Link>
              </div>
            </form>

          </div>

        </div>

      </div>



    </div>
  )
}

export default SignIn
