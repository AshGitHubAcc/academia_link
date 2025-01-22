import { useSearchParams } from "react-router-dom"  

import DockLayout from './DockLayout'
import api from '../api'
import { useEffect, useState } from "react"



export default function HomeMiddle({dockCreationOpened, setDockCreationOpened, refetchDocksSignal, setRefetchDocksSignal, userData}) {
    const [searchParams] = useSearchParams()
    const [docks, setDocks] = useState([])

    

    async function fetchDocks() {
        const query = searchParams.get('query') || ''
        const filterTopicId = searchParams.get('filter_topic_id') || ''
        

        try {

            const response = await api.get(`/api/rooms/`, {
                params: {
                    query: query,
                    filter_topic_id: filterTopicId,
                },
            });
            setDocks(response.data.results)
        } catch (error) {
            console.error('Error fetching rooms:', error)
        }
    }

    useEffect(()=>{
        fetchDocks()
    },[searchParams, refetchDocksSignal])






    return (
        <div className="h-auto w-[50%]">


            <div className='flex justify-between h-14  mb-5'>
                <div className=' flex items-end'>
                    <p className='font-bold text-[#828181] text-md  text-end flex-none'>Total Rooms: {docks.length}</p>
                </div>
                <div>
                    <button onClick={()=> setDockCreationOpened(!dockCreationOpened)} className='flex-none h-10 text-[#bcbcbc]'>Dock +</button>
                </div>
            </div>


            {docks.map((ele, index)=> (


                <DockLayout key={index} dockData={ele} userData={userData}
                refetchDocksSignal={refetchDocksSignal} setRefetchDocksSignal={setRefetchDocksSignal}

                
                />
            ))


            }
        </div>
    )
}