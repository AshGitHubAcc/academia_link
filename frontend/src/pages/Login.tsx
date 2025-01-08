import { useState } from "react"
import api from "../api"
import { ACCESS_TOKEN, REFRESH_TOKEN } from "../constants"
import { useNavigate } from "react-router"

export default function Login() {
    const navigate = useNavigate()

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')



    async function handleSubmit(e) {
        e.preventDefault()
        
        try {
            const response = await api.post('/api/auth/login/', {'username': email, 'password': password})
            console.log('Registration Successful', response.data);
            localStorage.setItem(ACCESS_TOKEN, response.data.access)
            localStorage.setItem(REFRESH_TOKEN, response.data.refresh)
            navigate('/home')


        } catch (error) {
            console.log("ERROR=========", error)
        }

    }


    return (
    <div className="h-full flex justify-center items-center">


        <form className="space-y-6" onSubmit={handleSubmit}>
            <div className="space-y-2">
                <label className="text-sm font-medium text-gray-300">
                    Email
                </label>
                <input
                    type="text"
                    name="email"
                    value={email}
                    onChange={(e)=>setEmail(e.target.value)}
                    className="w-full px-3 py-2 border rounded-md focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
                />
                </div>

                <div className="space-y-2">
                <label className="text-sm font-medium text-gray-300">
                    Password
                </label>
                <input
                    type="text"
                    name="password"
                    value={password}
                    onChange={(e)=>setPassword(e.target.value)}
                    className="w-full px-3 py-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
                </div>
            

            <button
                type="submit"
                className="w-full px-4 py-2 text-white bg-blue-600 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
            >
                Submit
            </button>
        </form>
    </div>
    )
}