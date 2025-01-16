import { useSearchParams } from "react-router-dom"  

import DockLayout from './DockLayout'
import api from '../api'
import { useEffect, useState } from "react"

export default function HomeMiddle({dockCreationOpened, setDockCreationOpened, refetchDocksSignal, setRefetchDocksSignal}) {
    const [searchParams] = useSearchParams()
    const [docks, setDocks] = useState([])

    

    async function fetchDocks() {
        
        const topicId = searchParams.get('filter_topic_id')
        const url = topicId ? `/api/rooms/topic/${topicId}/` : '/api/rooms/'



        try {
            const response = await api.get('/api/rooms/')
            console.log(response.data.results)
            setDocks(response.data.results)
        } catch (error) {
            console.log(error.response.statusText)
        }
    }

    useEffect(()=>{
        fetchDocks()
    },[searchParams, refetchDocksSignal])






    return (
        <div className="h-auto w-[50%]">


            <div className='flex justify-between h-14  mb-5'>
                <div className=' flex items-end'>
                    <p className='font-bold text-[#828181] text-md  text-end flex-none'>Total Rooms: 264</p>
                </div>
                <div>
                    <button onClick={()=> setDockCreationOpened(!dockCreationOpened)} className='flex-none h-10 text-[#bcbcbc]'>Dock +</button>
                </div>
            </div>


            {docks.map((ele, index)=> (

                <DockLayout key={index} username={ele.creator.username} name={ele.creator.name} title={ele.title} 
                body={ele.body} topic={ele.topic.name} createdAt={ele.created_at}
                

                />
            ))


            }
        </div>
    )
}