import { useEffect, useState } from "react"
import api from "../api"




export default function Home() {

    const [docks, setDocks] = useState([])
    const [dockInfo, setDockInfo] = useState({})


    async function getAllDocks() {

        try {
            const response = await api.get('/api/room/')
            setDocks(response.data)
            
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

            <button className="text-[30px]">Dock +</button>

            <div className="flex flex-col gap-5">
                <h1>asddsa</h1>
                <h1>asddsa</h1>
                <h1>asddsa</h1>
                <h1>asddsa</h1>
                <h1>asddsa</h1>
                <h1>asddsa</h1>

            </div>


        </div>
    )
}
