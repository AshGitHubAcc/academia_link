import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import api from "../api"
import { useNavigate } from "react-router-dom"




export default function Home() {

    const navigate = useNavigate()
    const [docks, setDocks] = useState([])


    async function getAllDocks() {
        try {
            const response = await api.get('/api/rooms/')
            setDocks(response.data)
            console.log(response.data)
            
        } catch (error) {
            console.log("ERROR: ", error)
        }

    }


    useEffect(()=>{
        getAllDocks()
    },[])


    return (
        <div>
            <h1>HOME</h1>

            <Link to='/home/create-dock' className="text-[30px] border">Dock +</Link>

            <div className="flex flex-col gap-5 p-5">
                {docks.map((dock) => (
                    <div key={dock.id} onClick={()=>navigate(`/home/dock/${dock.id}`)} className="bg-gray-500 p-3 hover:cursor-pointer">
                        {dock.title} 
                        <small> Creator: {dock.creator.username}</small>
                    </div>
                    ))
                }


            </div>
            



        </div>
    )
}
