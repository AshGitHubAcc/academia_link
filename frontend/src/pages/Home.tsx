import { useEffect, useState } from 'react'
import api from '../api'

import Header from "../components/Header"
import HomeLeft from '../components/HomeLeft'
import HomeMiddle from '../components/HomeMiddle'
import HomeRight from '../components/HomeRight' 

import CreateDock from '../components/CreateDock'

export default function Home() {

    const [dockCreationOpened, setDockCreationOpened] = useState(false)
    const [refetchDocksSignal, setRefetchDocksSignal] = useState(0)


    useEffect(()=>{
        console.log(refetchDocksSignal)
    }, [refetchDocksSignal])

    async function test() {
        const userResponse = await api.get('/api/user', {
            headers: { Authorization: `Bearer ${token}` },
        });
    
        setUser(userResponse.data);
    }
    
    return (
        <div className="w-full h-auto bg-[#303030b9] relative">
            
            
            <Header/>

            <div className='flex min-h-[90%] w-full pt-24 justify-between'>
                <HomeLeft/>
                <HomeMiddle dockCreationOpened={dockCreationOpened} setDockCreationOpened={setDockCreationOpened}
                    refetchDocksSignal={refetchDocksSignal} setRefetchDocksSignal={setRefetchDocksSignal}
                />
                <HomeRight/>    
            </div>


            <CreateDock dockCreationOpened={dockCreationOpened} setDockCreationOpened={setDockCreationOpened}
                refetchDocksSignal={refetchDocksSignal} setRefetchDocksSignal={setRefetchDocksSignal}
            />



           
            
        </div>       
    )
}