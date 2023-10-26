import { useState } from "react"
import { Link } from "react-router-dom"
import axios from "axios";

const SignUp = () => {

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSignUp = (e) => {
    e.preventDefault();
    console.log("UserData==>", { name, email, password })

    axios.post('/signup', { name, email, password })

    // await fetch("http://localhost:8000/signup", {
    //   method: 'POST',
    //   body: JSON.stringify({ name, email, password }),
    //   headers: {
    //     "Content-Type": "application/json"
    //   }
    // })


  }


  return (
    <div className="w-full h-full">
      <div className="fixed w-full px-4 py-16 z-10">
        <div className="max-w-[500px] h-[600px] mx-auto overflow-visible ">
          <div className="max-w-[380px] mx-auto py-12 px-7 rounded-md border border-gray-300 ">

            <h1 className="text-2xl font-bold text-gray-700">Create Account</h1>

            <form onSubmit={handleSignUp} className="w-full flex flex-col py-4">

              <input onChange={(e) => setName(e.target.value)} value={name} type="text" autoComplete="on" placeholder="John"
                className='p-2 my-2 border border-gray-400 outline-none rounded text-gray-700' required autoFocus />

              <input onChange={(e) => setEmail(e.target.value)} value={email} type="email" autoComplete="on" placeholder="youremail@xyz.com"
                className='p-2 my-2 border border-gray-400 outline-none rounded text-gray-700' required />

              <input onChange={(e) => setPassword(e.target.value)} value={password} type="password" placeholder="password"
                className='p-2 my-2 border border-gray-400 outline-none rounded text-gray-700' required />

              <button type="submit" className="bg-primary text-white font-medium text-[18px] p-2 rounded outline-none">Sign up</button>

              <div className="flex gap-2 mt-4">
                <p className="text-[16px] text-gray-600">Already have an account</p>
                <Link to='/signin' className="text-[16px] underline font-semibold">SignIn</Link>
              </div>

            </form>

          </div>

        </div>

      </div>



    </div>
  )
}

export default SignUp
