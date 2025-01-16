import { useState } from "react"
import api from "../api"
import { ACCESS_TOKEN, REFRESH_TOKEN } from "../constants"
import { useNavigate } from "react-router"

import Header from '../components/Header'

export default function Login() {
    const navigate = useNavigate()

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [emailErrors, setEmailErrors] = useState('')
    const [passwordErrors, setPasswordErrors] = useState('')

    function validateData() {
        if (email.trim() === '') {
            setEmailErrors("Email cannot be blank")
        }
        else if (!email.includes('@') || !email.endsWith('.edu')) {
            setEmailErrors("Email must contain '@' and end with '.edu'")
        }
        else {
            setEmailErrors(" ")
        }

        if (password.trim() === '') {
            setPasswordErrors('Password cannot be blank')
        }
        else if (password.length < 8) {
            setPasswordErrors('Password must be at least 8 characters')
        }
        else {
            setPasswordErrors(' ')
        }
        if ( (passwordErrors === ' ') || (emailErrors === ' ') ) {
            return true
        }
        return false
    }


    async function handleSubmit(e) {
        e.preventDefault()
        if (!validateData()) {
            return null
        }

        
        try {
            const response = await api.post('/api/auth/login/', {'username': email, 'password': password})
            console.log('Registration Successful', response);
            localStorage.setItem(ACCESS_TOKEN, response.data.access)
            localStorage.setItem(REFRESH_TOKEN, response.data.refresh)
            navigate('/home')


        } catch (error) {
            console.log("=========ERROR=========\n", error.response.data)
        }
    }


    return (
    <div className="h-[80vh]">

        <Header loginpage={true}/>

        <div className="h-20 w-20 mb-10"></div>

        <div className=" h-full w-[50%] flex flex-col items-center justify-center pb-10 bg-[#11111161] mx-auto">
            <div>
                <h1 className="text-[#a8a8a8] text-center text-4xl">Login</h1>
                <div className="bg-gray-400 w-[300px] h-[2px] mt-3 mb-10"></div>
            </div>

            <form action="" onSubmit={handleSubmit} className="flex flex-col mt-5 mb-32 w-[40%] items-center justify-center ">


                <input onChange={(e)=> setEmail(e.target.value)} value={email} type="text" placeholder='School Email' className="
                    flex-grow-0 text-[#a1a1a1]
                    py-2 px-10 text-center rounded-[4px] border-blue-500 focus:border-b-2 outline-none
                    transition-all duration-[700ms] ease-in-out hover:w-[55%] w-[300px] focus:w-[55%]
                    focus:placeholder:text-[#121212] placeholder:transition-all placeholder:duration-500
                "/>
                <div className="mt-0 mb-5">{emailErrors}</div>

                <input onChange={(e)=> setPassword(e.target.value)} value={password} type="text" placeholder='Password' className="
                    flex-grow-0 text-[#a1a1a1] 
                    py-2 px-10 text-center rounded-[4px] border-blue-500 focus:border-b-2 outline-none
                    transition-all duration-[700ms] ease-in-out hover:w-[55%] w-[300px] focus:w-[55%]
                    focus:placeholder:text-[#121212] placeholder:transition-all placeholder:duration-500
                "/>
                <div className="mb-14">{passwordErrors}</div>



                <button className="
                    w-[300px] text-[#a1a1a1]
                    submit-button bg-[#2d2d2d]
                
                ">Submit</button>



            </form>

        </div>






    </div>
    )
}