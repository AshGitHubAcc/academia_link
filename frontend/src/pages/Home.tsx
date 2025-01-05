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


    async function handleDockDelete(dockId) {
        try {
            const response = await api.delete(`/api/rooms/${dockId}/`)
            console.log("Sucessful", response)

        } catch (error) {
            console.log("Error: ", error)
        }
    }





    return (
        <div>
            <h1>HOME</h1>

            <Link to='/home/create-dock' className="text-[30px] border">Dock +</Link>

            <div className="flex flex-col gap-5 p-2 mx-20">
                {docks.map((dock) => (
                    <div key={dock.id}  className="bg-gray-500 p-3 hover:cursor-pointer flex ">
                        <div onClick={()=>navigate(`/home/dock/${dock.id}`)} className="flex-[8]" >
                            {dock.title} 
                            <small> Creator: {dock.creator.username}</small>
                            <div>{dock.body}</div>
                        </div>
                        <div className="flex-1">
                            <button onClick={()=> handleDockDelete(dock.id)}>Delete</button>
                            <button onClick={()=>navigate('/home/update-dock', {state: docks.find((ele)=> ele.id === dock.id) }   )} >Update</button>

                        </div>

                    </div>
                    ))
                }


            </div>
            



        </div>
    )
}
